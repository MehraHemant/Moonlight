import { MaterialsService } from "@/services/materials.service";


export async function GET(request: Request) {
  const res = await MaterialsService.getMaterials();
  return Response.json(res);
}