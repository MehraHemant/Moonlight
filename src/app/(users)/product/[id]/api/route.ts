import { ProductService } from "@/services/product.service";

export async function GET(request: Request, context: { params: any }) {
    const productId = context.params.id;
    const res = await ProductService.getProductDetail(productId);
    if(!res){
        return Response.json(null, {status: 404})
    }
    return Response.json(res)
}
