import { db } from "@/lib/db";
import { products, productDimensions } from "@/lib/db/schema";
import type { ProductWithDimensions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// ─── Tipos internos ───────────────────────────────────────────────────────────

type JoinRow = {
  products: typeof products.$inferSelect;
  product_dimensions: typeof productDimensions.$inferSelect | null;
};

function groupProductsWithDimensions(rows: JoinRow[]): ProductWithDimensions[] {
  const map = new Map<string, ProductWithDimensions>();

  for (const row of rows) {
    const p = row.products;

    if (!map.has(p.id)) {
      map.set(p.id, { ...p, dimensions: [] });
    }

    if (row.product_dimensions) {
      map.get(p.id)!.dimensions.push(row.product_dimensions);
    }
  }

  return Array.from(map.values());
}

// ─── Queries públicas ─────────────────────────────────────────────────────────

export async function getProductsByCategory(
  category: "sofas" | "cabeceiras" | "arte-em-tecido" | "poltronas"
): Promise<ProductWithDimensions[]> {
  const rows = await db
    .select()
    .from(products)
    .leftJoin(productDimensions, eq(productDimensions.productId, products.id))
    .where(and(eq(products.category, category), eq(products.isActive, 1)))
    .orderBy(products.createdAt);

  return groupProductsWithDimensions(rows);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithDimensions | null> {
  const rows = await db
    .select()
    .from(products)
    .leftJoin(productDimensions, eq(productDimensions.productId, products.id))
    .where(eq(products.slug, slug));

  if (!rows.length) return null;

  return groupProductsWithDimensions(rows)[0] ?? null;
}

export async function getAllProducts(): Promise<ProductWithDimensions[]> {
  const rows = await db
    .select()
    .from(products)
    .leftJoin(productDimensions, eq(productDimensions.productId, products.id))
    .where(eq(products.isActive, 1))
    .orderBy(products.category, products.createdAt);

  return groupProductsWithDimensions(rows);
}
