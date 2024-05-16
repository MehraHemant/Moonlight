import { ImagesService } from '@/services/images.service';

export async function GET(request: Request, context: { params: any }) {
  const fileId = context.params.id;
  
  const [fileBuffer, contentType] = await ImagesService.serveFile(fileId);
  
  return new Response(fileBuffer,{
    status: 200,
    headers: { 'Content-Type': contentType },
  })
}