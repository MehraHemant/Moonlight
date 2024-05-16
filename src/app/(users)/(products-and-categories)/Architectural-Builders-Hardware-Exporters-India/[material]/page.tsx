import { getProductsHawkEye } from '@/clients/products.client';
import ProductList from '@/components/ProductList';
import { capitalizeFirstLetter, createProductFiltersFromSearchParams } from '@/constants';
import { ProductFilters } from '@/types';

type PortfolioPageParams = {material: string}
export default async function Products({params, searchParams}: {params: PortfolioPageParams, searchParams: any}) {
    const productFilterFromParams = extractProductFiltersFromParams(params, searchParams);
    const [products, totalCount] = await getProductsHawkEye(productFilterFromParams);
    return <>{products && <ProductList initiallyFilteredProducts={products} filtersFromUrl={productFilterFromParams} pageFilterCategory={'materials'} />}</>
}

function extractProductFiltersFromParams(params: PortfolioPageParams, searchParams: any): ProductFilters {
    let filter: ProductFilters = {...createProductFiltersFromSearchParams(searchParams)};
    delete filter['materials']; // If params had filter on materials, ignore any further filter in searchParams
    let materialName = capitalizeFirstLetter(params.material.split("-hardware")[0]);
    if(materialName === 'Zinc-zamak') {materialName = 'Zinc / Zamak'} 
    if(!filter || !filter.materials){
        if(!filter) {
            filter = {materials : [materialName]};
        } else {
            filter.materials = [materialName];
        }
    }
    else {
        filter.materials.push(materialName);
    }
    return filter;
}