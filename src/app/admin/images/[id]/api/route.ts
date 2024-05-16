import { ImagesService } from "@/services/images.service";
import { revalidateTag } from "next/cache";

export async function GET(request: Request, context: { params: any }) {
    const imageId = context.params.id;
    const res = await ImagesService.getImageById(imageId);
    return Response.json(res);
}


export async function DELETE(request: Request, context: { params: any }) {
    const imageId = context.params.id;
    const res = await ImagesService.deleteImageById(imageId);
    revalidateTag('images');
    return Response.json(res);
}