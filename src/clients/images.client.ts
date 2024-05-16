import { ImageType } from "@/types"

export async function getImages(): Promise<ImageType[] > {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/admin/images/api', currentOrigin);
    const res = await fetch(url,
        { next: {tags: ['images']} }
    )
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return res.json() as Promise<ImageType[]>
}

export async function storeImages(formData: FormData): Promise<boolean> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/admin/images/api', currentOrigin);
    const res = await fetch(url, { 
            method: 'POST',
            body: formData,
    })

    if (!res.ok) {
        throw new Error('Failed to upload data')
    }

    return res.json() as Promise<boolean>
}

export async function deleteImage(id: string): Promise<boolean> {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL(`/admin/images/${id}/api`, currentOrigin);
    const res = await fetch(url, { 
            method: 'DELETE'
    })
    
    if (!res.ok) {
        throw new Error('Failed to delete image')
    }
    return res.json() as Promise<boolean>
}
