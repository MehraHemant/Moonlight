import { getProductsHawkEye } from '@/clients/products.client';
import ProductList from '@/components/ProductList';
import { createProductFiltersFromSearchParams } from '@/constants';
import { ProductFilters } from '@/types';

type ChildCategoryPortfolioPageParams = {category: string, childCategory: string}

export default async function CategoryBasedProducts({params, searchParams}: {params: ChildCategoryPortfolioPageParams, searchParams: any}) {
    const productFilterFromParams = extractProductFiltersFromParams(params, searchParams);
    const [products, totalCount] = await getProductsHawkEye(productFilterFromParams);
    return <>{products && <ProductList initiallyFilteredProducts={products} filtersFromUrl={productFilterFromParams} pageFilterCategory={'childCategory'}/>}</>
}

function extractProductFiltersFromParams(params: ChildCategoryPortfolioPageParams, searchParams:any): ProductFilters {
    let filter: ProductFilters = {...createProductFiltersFromSearchParams(searchParams)}; 
    let categoryName = params.category.split("-").join(" ");
    let childCategoryName = params.childCategory.split("-").join(" ");
    delete filter['parentCategory']; // If params have filter on parentCategory, ignore any further filter in searchParams
    delete filter['childCategory']; // If params have filter on childCategory, ignore any further filter in searchParams
    // if(!filter || !filter.parentCategory){
    //     if(!filter) {
    //         filter = {parentCategory: categoryName};
    //     } else {
    //         filter.parentCategory = categoryName;
    //     }
    // }
    // else {
    //     filter.parentCategory = categoryName;
    // }

    if(!filter){
        filter = {parentCategory: categoryName, childCategory: childCategoryName}
    } else {
        filter.parentCategory = categoryName;
        filter.childCategory = childCategoryName; 
    }
    return filter;
}