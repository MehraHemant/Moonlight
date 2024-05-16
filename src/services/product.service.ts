import { CATEGORIES, CHILD_CATEGORIES, FINISHES, MATERIALS, PRODUCTION_TYPES, UserPresentableError } from "@/constants";
import { dbExecute, dbQuery } from "@/db";
import { isStringSafeToStoreInDb } from '@/constants';
import { ProductDetail, ProductFilters, ProductHawkEye } from "@/types";
import { RowDataPacket } from "mysql2";
import { WorkSheet, read, utils } from "xlsx";

const hawkEyeFieldNames = ['sku', 'image_id',
    'model_name',
    'model_number',
    'category'
];

const expectedHeadersInProductExcel = ['SKU', 'Image Name', 'Model Name',
    'Model Number', 'Material', 'Finishes', 'Production Type', 'Is Top Selling', 'Child Category',
     'Technical Description',
    'Accessories & Features', 'Miscellaneous'
] as const;

type HEADERS_IN_PRODUCT_EXCEL = typeof expectedHeadersInProductExcel[number]

const userFriendlyExcelHeadersToDbNameMapping: Record<HEADERS_IN_PRODUCT_EXCEL, string> = {
    "SKU": "sku",
    "Image Name": 'image_id',
    "Model Name": 'model_name',
    "Model Number": 'model_number',
    "Material": 'material',
    "Finishes": "finishes",
    "Production Type": "production_type",
    "Is Top Selling": "is_top_selling",
    "Child Category": "category",
    'Technical Description': 'technical_description',
    'Accessories & Features': 'accessories_and_features',
    'Miscellaneous': 'miscellaneous'
}
const SELECT_AND_LOAD_IMAGE_DATA_ON_PRODUCT = ", i.data as image_data, i.name as image_name FROM product p JOIN image i ON p.image_id = i.id"

export class ProductService {
    static getProducts = async (filters?: any, limit: number = 25, page: number = 1): Promise<[ProductDetail[], number]> => {
        const offset = (page - 1) * limit;
        const [rows] = await dbQuery('SELECT * FROM product LIMIT ? OFFSET ?', [limit, offset]);
        const [total] = await dbExecute('SELECT COUNT(sku) AS count FROM product');
        const totalCount = total[0].count;
        return [mapDBResultToProduct(rows as RowDataPacket[]), totalCount]
    }
    static getProductsHawkEye = async ({filters, limit = 25, page = 1}: {filters?: ProductFilters, limit?: number, page?: number}): Promise<[ProductHawkEye[], number]> => {
        if(limit>25){
            throw new Error('Please make sure you request not more than 25 items at a time')
        }
        const offset = (page - 1) * limit;

        let whereClauses = [];
        let queryParams = [];
        let query = '';
        let totalCountComputingQuery = 'SELECT COUNT(sku) AS count FROM product'
        let baseQuery = `SELECT ${hawkEyeFieldNames.join(',')} FROM product`;
        console.info("IN THE SERVICE??", filters)
        if(filters){
            if (filters.parentCategory !==undefined && filters.parentCategory !==null && CATEGORIES[0][filters.parentCategory]) {
                queryParams.push([CATEGORIES[0][filters.parentCategory]]);
                whereClauses.push(`category IN ?`);
            }
            if (filters.childCategory !==undefined && filters.childCategory !==null) {
                queryParams.push(filters.childCategory);
                whereClauses.push(`category = ?`);
            }
            if (filters.materials && filters.materials.length > 0) {
                queryParams.push([filters.materials]);
                whereClauses.push(`material IN ?`);
            }
            if (filters.finishes && filters.finishes.length > 0) {
                let finishesConditions = filters.finishes.map((finish) => {
                    queryParams.push(finish);
                    return "FIND_IN_SET(?, finishes)";
                });
                whereClauses.push(`(${finishesConditions.join(' OR ')})`);
            }
            if (filters.productionType && filters.productionType.length > 0) {
                queryParams.push([filters.productionType]);
                whereClauses.push(`production_type IN ?`);
            }
            if(filters.isTopSelling !==undefined && filters.isTopSelling !==null){
                queryParams.push(filters.isTopSelling);
                whereClauses.push(`is_top_selling = ?`)
            }
        }

        query = whereClauses.length > 0 ? `${baseQuery} WHERE ${whereClauses.join(' AND ')} LIMIT ? OFFSET ?` : baseQuery;
        totalCountComputingQuery = whereClauses.length > 0 ? `${totalCountComputingQuery} WHERE ${whereClauses.join(' AND ')}` : totalCountComputingQuery;
        queryParams.push(limit);
        queryParams.push(offset);

        const [rows, _] = await dbQuery(query, queryParams);
        const [total] = await dbQuery(totalCountComputingQuery, queryParams.slice(0, queryParams.length-2));
        
        const totalCount = total[0].count;
        return [mapDBResultToProductHawkEye(rows as RowDataPacket[]), totalCount]
    }

    static getProductDetail = async (id: string): Promise<ProductDetail> => {
        const [rows, _] = await dbExecute(`SELECT * FROM product WHERE sku=?`, [id]);
        return mapDBResultToProduct(rows as RowDataPacket[])[0]
    }

    static storeProductsFromFile = async (file: Buffer) => {
        const workBook = read(file.buffer, { type: "buffer" });
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        if (!workSheet['!ref']) {
            throw new UserPresentableError('Please upload a valid products template');
        }
        const range = utils.decode_range(workSheet['!ref']);

        const headerPositioningMapping: Record<string, number> = {};

        for (let C = range.s.c; C <= range.e.c; ++C) {
            const headerCell = utils.encode_cell({ r: range.s.r, c: C });
            const headerName = workSheet[headerCell]?.v;
            if(!headerName){
                continue;
            }
            const isRelevantHeader: boolean = expectedHeadersInProductExcel.includes(headerName);
            if(isRelevantHeader){
                if(headerPositioningMapping[headerName]){
                    throw new UserPresentableError(`Column ${headerName} provided multiple times in the excel, please make sure the column is provided just once.`)
                }
                headerPositioningMapping[headerName] = C;
            }
        }

        const missingColumns = expectedHeadersInProductExcel.filter((val) => !Object.keys(headerPositioningMapping).includes(val))
        if (missingColumns.length > 0) {
            throw new UserPresentableError(`${missingColumns.join(",")} columns are missing in the uploaded excel. Please upload a valid products template`)
        }

        let productsIntermediate = [];
        let requestedImageNames: Set<string> =  new Set<string>();
        let skuSet: Set<string>= new Set<string>();
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            let productIntermediate: Record<string, string> = {};
            for(let C of Object.values(headerPositioningMapping)){
                    const cellRef = utils.encode_cell({ r: R, c: C });
                    const header: HEADERS_IN_PRODUCT_EXCEL = Object.entries(headerPositioningMapping).find(([headerName, position])=>position===C)?.[0] as HEADERS_IN_PRODUCT_EXCEL;
                    if(!header){
                        console.error("this should never have happened");
                        throw new Error('Something went wrong');
                    }
                    const processedValue = getProcessedInput(header, workSheet, cellRef);
                    if(header === 'SKU'){
                        if(skuSet.has(processedValue)){
                            throw new UserPresentableError(`SKU ${processedValue} was already provided and is duplicated in ${cellRef}. Please make sure only one row exists for a given SKU`);
                        }
                        skuSet.add(processedValue);
                    } else if(header === 'Image Name'){
                        requestedImageNames.add(processedValue);
                    }
                    
                    productIntermediate[userFriendlyExcelHeadersToDbNameMapping[header]] = processedValue;
            }
            productsIntermediate.push(productIntermediate)
        }
        if (productsIntermediate.length === 0) {
            throw new UserPresentableError('No Products found. Please upload a valid products template');
        }
        const requestedImageNamesArray =  Array.from(requestedImageNames)
        let imageSearchCommand = dbQuery(`SELECT id, name FROM image WHERE (name) IN ?`, [[requestedImageNamesArray]]);
        const [imagesRows, _fields] = await imageSearchCommand

        const nonExistentImageNames = requestedImageNamesArray.filter((imName)=> !imagesRows.some((r)=>r.name === imName))
        if(nonExistentImageNames.length > 0){
            throw new UserPresentableError(`Images named "${nonExistentImageNames.join(',')}" were not found. Please head over to Images Section to upload them.`);
        }

        const storableProducts = productsIntermediate.map((p)=>({...p, "image_id": imagesRows.find((r)=>r.name === p['image_id'])?.id}))

        const productColumns = Object.keys(storableProducts[0]).join(', ');

        // Creating a placeholder string for values (?, ?, ?, ...)
        const productQueryPlaceholders = new Array(storableProducts.length).fill('(' + new Array(Object.keys(storableProducts[0]).length).fill('?').join(', ') + ')').join(', ');
        
        // Flattening data array for `execute`
        const productValuesToInsert = storableProducts.reduce((acc, obj) => acc.concat(Object.values(obj) as any), []);
        
        // Constructing the SQL query
        const sql = `INSERT INTO product (${productColumns}) VALUES ${productQueryPlaceholders} ON DUPLICATE KEY UPDATE 
        image_id = VALUES(image_id), 
        model_name = VALUES(model_name), 
        model_number = VALUES(model_number), 
        material = VALUES(material),
        finishes = VALUES(finishes),
        production_type = VALUES(production_type),
        is_top_selling = VALUES(is_top_selling),
        category = VALUES(category),
        technical_description = VALUES(technical_description),
        accessories_and_features = VALUES(accessories_and_features),
        miscellaneous = VALUES(miscellaneous)
        `;
        
        let command = dbExecute(sql,productValuesToInsert);

        const [productRows, _] = await command
        // console.info("We inserted", productValuesToInsert, productRows);
        return true;
    }

    static deleteProductById = async (id: string): Promise<boolean> => {
        let command = dbExecute(`DELETE FROM product WHERE sku= ?`, [id]);
        const result = await command
        return true;
    }
}

const mapDBResultToProductHawkEye = (rows: RowDataPacket[]): ProductHawkEye[] => {
    return rows.map(productHawkEyeMapper);
}

const productHawkEyeMapper = (r: RowDataPacket): ProductHawkEye => ({
    id: r["sku"],
    imageId: r["image_id"],
    modelName: r["model_name"],
    modelNumber: r["model_number"],
    category: r["category"],
})

const productMapper = (r: RowDataPacket): ProductDetail => {
    return {
        ...productHawkEyeMapper(r),
        material: r["material"],
        finishes: r["finishes"],
        productionType: r["production_type"],
        isTopSelling: r["is_top_selling"],
        technicalDescription: r["technical_description"],
        accessoriesAndFeatures: r["accessories_and_features"],
        miscellaneous: r["miscellaneous"]
    }
}

const mapDBResultToProduct = (rows: RowDataPacket[]): ProductDetail[] => {
    return rows.map(productMapper);
}

const getProcessedInput = (name: HEADERS_IN_PRODUCT_EXCEL, workSheet: WorkSheet, cellRef: string): string => {
    let processedValue = workSheet[cellRef]?.v;

    if(name === 'Is Top Selling'){
        if(workSheet[cellRef]?.t !== 'b'){
            throw new UserPresentableError(`Column ${name} should only have TRUE or FALSE values, please check the value in cell ${cellRef}`)
        }
        if(processedValue === undefined || processedValue === null){
            throw new UserPresentableError(`${name} should always be provided. Missing in cell ${cellRef}`);
        }
    } else if(name === 'Miscellaneous'){
        if(!processedValue){ // Store empty value for miscellaneous
            processedValue = '';
        }
    } else {
        if (!processedValue) {
            throw new UserPresentableError(`${name} should always be provided. Missing in cell ${cellRef}`);
        }
    }

    switch (name) {
        case "SKU":
            break;
        case "Image Name":
            break;
        case "Material":
            if (!MATERIALS.includes(processedValue)) {
                throw new UserPresentableError(`${name} "${processedValue}" does not exist, but provided in cell ${cellRef}`)
            }
            break;
        case "Production Type":
            if (!PRODUCTION_TYPES.map((pt) => pt.name).includes(processedValue)) {
                throw new UserPresentableError(`${name} "${processedValue}" does not exist, but provided in cell ${cellRef}`)
            }
            break;
        case "Model Number":
            break;
        case "Model Name":
            break;
        case "Child Category":
            if (!CHILD_CATEGORIES.includes(processedValue)) {
                throw new UserPresentableError(`${name} "${processedValue}" does not exist, but provided in cell ${cellRef}`)
            }
            break;
        case "Finishes":
            let providedFinishes = processedValue.split(",").map((f: string)=>f.trim());
            for(let finish of providedFinishes){
                if (!FINISHES.map((f) => f.name).includes(finish)) {
                    throw new UserPresentableError(`${name} "${finish}" does not exist, but provided in cell ${cellRef}`)
                }
                if (!isStringSafeToStoreInDb(finish)) {
                    throw new UserPresentableError(`${finish} has invalid characters in cell ${cellRef}`);
                }
            }
            break;
        case "Is Top Selling":
            break;
        case "Technical Description":
            break;
        case "Accessories & Features":
            break;
        case "Miscellaneous":
            break;
    }

    if (name !== 'Finishes' && name !== "Is Top Selling" && (name === "Miscellaneous" && processedValue !== '')) {
        if (!isStringSafeToStoreInDb(processedValue)) {
            throw new UserPresentableError(`${processedValue} has invalid characters in cell ${cellRef}`);
        }
    }

    return processedValue;
}
