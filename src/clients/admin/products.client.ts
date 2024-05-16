import { ProductDetail } from "@/types"

export async function getProductDetails(): Promise<[ProductDetail[], number]> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/admin/product-details/api', currentOrigin);
    const res = await fetch(url, { next: {tags: ['products']}})
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return res.json() as Promise<[ProductDetail[], number]>
}

export async function storeProducts(formData: FormData): Promise<boolean> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/admin/products/api', currentOrigin);
    const res = await fetch(url, { 
            method: 'POST',
            body: formData,
    })

    if (!res.ok) {
        if(res.status === 400 && res.statusText.startsWith('CUSTOM::')){
            throw new Error(res.statusText);
        }
        throw new Error('Failed to upload products file')
    }

    return res.json() as Promise<boolean>
}

export async function deleteProduct(id: string): Promise<boolean> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL(`/admin/products/${id}/api`, currentOrigin);
    const res = await fetch(url, { 
            method: 'DELETE'
    })
    
    if (!res.ok) {
        throw new Error('Failed to delete product')
    }
    return res.json() as Promise<boolean>
}