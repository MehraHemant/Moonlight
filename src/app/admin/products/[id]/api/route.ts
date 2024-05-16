import { ProductService } from "@/services/product.service";
import { revalidateTag } from "next/cache";

export async function DELETE(request: Request, context: { params: any }) {
    const productId = context.params.id;
    const res = await ProductService.deleteProductById(productId);
    revalidateTag('products');
    return Response.json(res);
}