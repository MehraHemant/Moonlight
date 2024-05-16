import { MaterialType } from "@/types"

export async function getMaterials(): Promise<MaterialType[] > {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/admin/materials/api', currentOrigin);
    const res = await fetch(url,
         { next: {tags: ['materials']} }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return res.json() as Promise<MaterialType[]>
}