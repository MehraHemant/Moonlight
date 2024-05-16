import { getProductsHawkEye } from '@/clients/products.client';
import ProductList from '@/components/ProductList';
import { createProductFiltersFromSearchParams } from '@/constants';
import { ProductFilters } from '@/types';

type CategoryPortfolioPageParams = {category: string}

export default async function CategoryBasedProducts({params, searchParams}: {params: CategoryPortfolioPageParams, searchParams: any}) {
    const productFilterFromParams = extractProductFiltersFromParams(params, searchParams);
    const [products, totalCount] = await getProductsHawkEye(productFilterFromParams);
    return <>{products && <ProductList initiallyFilteredProducts={products} filtersFromUrl={productFilterFromParams} pageFilterCategory={'parentCategory'}/>}</>
}

function extractProductFiltersFromParams(params: CategoryPortfolioPageParams, searchParams:any): ProductFilters {
    let filter: ProductFilters = {...createProductFiltersFromSearchParams(searchParams)}; 
    let categoryName = params.category.split("-").join(" ");
    delete filter['parentCategory']; // If params have filter on parentCategory, ignore any further filter in searchParams
    if(!filter || !filter.parentCategory){
        if(!filter) {
            filter = {parentCategory: categoryName};
        } else {
            filter.parentCategory = categoryName;
        }
    }
    else {
        filter.parentCategory = categoryName;
    }
    return filter;
}