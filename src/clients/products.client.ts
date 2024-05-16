import { ProductDetail, ProductFilters, ProductHawkEye } from "@/types"

export async function getProductsHawkEye(filters?: ProductFilters, limit?: number, page?: number): Promise<[ProductHawkEye[], number]> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/products/api', currentOrigin);
    if(filters){
        url.searchParams.append("filters", JSON.stringify(filters));
    }
    if(limit!==undefined){
        url.searchParams.append("limit", limit.toString());
    }
    if(page!==undefined){
        url.searchParams.append("page", page.toString());
    }
    const res = await fetch(url, { next: { tags:['products'] } })
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<[ProductHawkEye[], number]>
}

export async function getProduct(productId: string): Promise<ProductDetail> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL(`/product/${productId}/api`, currentOrigin);
    const res = await fetch(url, 
        {next: { tags: ['products'] } }
        )

    if (!res.ok) {
        if(res.status === 404){
            throw new Error("No such product exists");
        }
      // @TODO: This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}