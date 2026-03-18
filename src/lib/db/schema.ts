import {
  pgTable,
  text,
  serial,
  timestamp,
  uuid,
  integer,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const categoryEnum = pgEnum("category", [
  "sofas",
  "cabeceiras",
  "arte-em-tecido",
]);

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: categoryEnum("category").notNull(),
  priceCents: integer("price_cents").notNull(),
  shortDescription: text("short_description"),
  differentials: text("differentials").array().default([]),
  imageUrls: text("image_urls").array().default([]),
  color: text("color"),
  material: text("material"),
  weightKg: decimal("weight_kg", { precision: 6, scale: 2 }),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Product Dimensions ───────────────────────────────────────────────────────
// Sofás: múltiplas variações (2 Lugares, 3 Lugares, L-Shape)
// Outros: uma entrada com label "Padrão"

export const productDimensions = pgTable("product_dimensions", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  label: text("label").notNull().default("Padrão"),
  widthCm: integer("width_cm"),
  depthCm: integer("depth_cm"),
  heightCm: integer("height_cm"),
});

// ─── Consultation Requests ────────────────────────────────────────────────────

export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  productInterest: text("product_interest"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDimensionSchema = createInsertSchema(productDimensions).omit(
  {
    id: true,
  }
);

export const insertConsultationRequestSchema = createInsertSchema(
  consultationRequests
).omit({ id: true, createdAt: true });

export const selectProductSchema = createSelectSchema(products);

// ─── Types ────────────────────────────────────────────────────────────────────

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type ProductDimension = typeof productDimensions.$inferSelect;
export type InsertDimension = z.infer<typeof insertDimensionSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertConsultationRequest = z.infer<
  typeof insertConsultationRequestSchema
>;

// ─── Joined type usado na aplicação ──────────────────────────────────────────

export type ProductWithDimensions = Product & {
  dimensions: ProductDimension[];
};

// ─── Helper de preço ──────────────────────────────────────────────────────────

export function formatPrice(priceCents: number): string {
  return (priceCents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
}
