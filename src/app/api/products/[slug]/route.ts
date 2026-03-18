import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/db/queries";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[API /products/:slug]", error);
    return NextResponse.json(
      { message: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}
