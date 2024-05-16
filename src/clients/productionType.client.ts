import { ProductionType } from "@/types"

export async function getProductionTypes(): Promise<ProductionType[] > {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/productionTypes/api', currentOrigin);
    const res = await fetch(url, { cache: 'no-store' })
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return res.json() as Promise<ProductionType[]>
}