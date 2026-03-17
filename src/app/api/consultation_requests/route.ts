import { NextRequest, NextResponse } from "next/server";
import { insertConsultationRequestSchema } from "@shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = insertConsultationRequestSchema.parse(body);

    // TODO: Save to database using drizzle-orm
    // Example:
    // import { db } from "@/lib/db";
    // import { consultationRequests } from "@shared/schema";
    // const result = await db.insert(consultationRequests).values(data).returning();
    // return NextResponse.json(result[0], { status: 201 });

    // For now, return a mock success response
    console.log("Consultation request received:", data);
    return NextResponse.json(
      { id: Date.now(), ...data, createdAt: new Date().toISOString() },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { message: "Dados inválidos", field: error.errors[0]?.path[0] },
        { status: 400 }
      );
    }
    console.error("Error processing consultation request:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
