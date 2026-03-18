import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory, getAllProducts } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as
      | "sofas"
      | "cabeceiras"
      | "arte-em-tecido"
      | null;

    const data = category
      ? await getProductsByCategory(category)
      : await getAllProducts();

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API /products]", error);
    return NextResponse.json(
      { message: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
