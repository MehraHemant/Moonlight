import { NextRequest } from "next/server";
import { ProductService } from "@/services/product.service";

export async function GET(request: NextRequest) {
  const res = await ProductService.getProducts();
  return Response.json(res)
}