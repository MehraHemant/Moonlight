import { FinishesService } from "@/services/finishes.service";


export async function GET(request: Request) {
  const res = await FinishesService.getFinishes();
  return Response.json(res);
}