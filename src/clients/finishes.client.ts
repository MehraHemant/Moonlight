import { FinishType } from "@/types"

export async function getFinishes(): Promise<FinishType[] > {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const url = new URL('/finishes/api', currentOrigin);
    const res = await fetch(url,
        {cache: 'no-store'}
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return res.json() as Promise<FinishType[]>
}