import { ImagesService } from "@/services/images.service";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";


export async function GET(request: Request, context: { params: any }) {
  const res = await ImagesService.getImages();
  return Response.json(res);
}

export async function POST(request: NextRequest, response: NextResponse) {

const formData = await request.formData();

const files = formData.getAll("files") as Blob[] | null;
if (!files) {
  throw new Error("File blob is required.")
}
await ImagesService.storeImages(files);
revalidateTag('images');

return Response.json({});
}
