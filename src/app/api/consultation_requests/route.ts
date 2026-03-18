import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  consultationRequests,
  insertConsultationRequestSchema,
} from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = insertConsultationRequestSchema.parse(body);

    const [result] = await db
      .insert(consultationRequests)
      .values(data)
      .returning();

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { message: "Dados inválidos", field: error.errors[0]?.path[0] },
        { status: 400 }
      );
    }
    console.error("[API /consultation_requests]", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
