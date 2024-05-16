import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { ProductService } from "@/services/product.service";
import { UserPresentableError } from "@/constants";

export async function POST(request: NextRequest, response: NextResponse) {

    const formData = await request.formData();
    
    const file = formData.get("file") as Blob | null;
    if (!file) {
      throw new Error("File is required.")
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    try {
      await ProductService.storeProductsFromFile(fileBuffer);
    } catch(err : any){
      if(err instanceof UserPresentableError){
        return Response.json({}, {status: 400, statusText: err.message})
      } 
      throw err;
    }
    revalidateTag('products');
    
    return Response.json({});
}