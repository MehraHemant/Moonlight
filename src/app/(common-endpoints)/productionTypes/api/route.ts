import { ProductionTypeService } from "@/services/productionType.service";

export async function GET(request: Request) {
    const res = await ProductionTypeService.get();
    return Response.json({res});
}