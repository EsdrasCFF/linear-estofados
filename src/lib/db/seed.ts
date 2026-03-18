import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const { products, productDimensions } = schema;

async function seed() {
  console.log("🌱 Seedando banco de dados...\n");

  // ─── Sofás ──────────────────────────────────────────────────────────────────

  const [sofaHorizon] = await db
    .insert(products)
    .values({
      slug: "sofa-modular-horizon",
      title: "Sofá Modular Horizon",
      category: "sofas",
      priceCents: 450000,
      shortDescription:
        "Um sofá modular versátil que se adapta a qualquer espaço com elegância.",
      differentials: [
        "Personalização total de tecidos e cores",
        "Estrutura em madeira maciça certificada",
        "Espumas de alta densidade para conforto duradouro",
        "Módulos reconfiguráveis conforme o espaço",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      ],
      color: "Cinza Chumbo",
      material: "Linho Belga",
      weightKg: "65.00",
    })
    .returning();

  await db.insert(productDimensions).values([
    {
      productId: sofaHorizon.id,
      label: "2 Lugares",
      widthCm: 180,
      depthCm: 92,
      heightCm: 85,
    },
    {
      productId: sofaHorizon.id,
      label: "3 Lugares",
      widthCm: 240,
      depthCm: 92,
      heightCm: 85,
    },
    {
      productId: sofaHorizon.id,
      label: "L-Shape",
      widthCm: 310,
      depthCm: 165,
      heightCm: 85,
    },
  ]);
  console.log("✅ Sofá Modular Horizon");

  // ────────────────────────────────────────────────────────────────────────────

  const [sofaLuna] = await db
    .insert(products)
    .values({
      slug: "poltrona-classica-luna",
      title: "Poltrona Clássica Luna",
      category: "sofas",
      priceCents: 220000,
      shortDescription:
        "Design clássico com toque contemporâneo, perfeita para leitura e relaxamento.",
      differentials: [
        "Estrutura interna em eucalipto reflorestado",
        "Molas ensacadas individualmente",
        "Acabamento em couro italiano legítimo",
        "Pés em madeira de carvalho natural",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
      ],
      color: "Cognac",
      material: "Couro Italiano",
      weightKg: "28.50",
    })
    .returning();

  await db.insert(productDimensions).values({
    productId: sofaLuna.id,
    label: "Padrão",
    widthCm: 90,
    depthCm: 88,
    heightCm: 100,
  });
  console.log("✅ Poltrona Clássica Luna");

  // ─── Cabeceiras ─────────────────────────────────────────────────────────────

  const [cabImperial] = await db
    .insert(products)
    .values({
      slug: "cabeceira-imperial",
      title: "Cabeceira Imperial",
      category: "cabeceiras",
      priceCents: 180000,
      shortDescription:
        "Estofado capitonê feito à mão para um quarto majestoso e acolhedor.",
      differentials: [
        "Botões capitonê costurados à mão",
        "Espuma D33 com revestimento antialérgico",
        "Disponível em todos os tamanhos de cama",
        "Fixação com suporte oculto incluso",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      ],
      color: "Azul Petróleo",
      material: "Veludo Premium",
      weightKg: "18.00",
    })
    .returning();

  await db.insert(productDimensions).values([
    {
      productId: cabImperial.id,
      label: "Casal (140cm)",
      widthCm: 150,
      depthCm: 12,
      heightCm: 110,
    },
    {
      productId: cabImperial.id,
      label: "Queen (160cm)",
      widthCm: 170,
      depthCm: 12,
      heightCm: 110,
    },
    {
      productId: cabImperial.id,
      label: "King (193cm)",
      widthCm: 203,
      depthCm: 12,
      heightCm: 110,
    },
  ]);
  console.log("✅ Cabeceira Imperial");

  // ────────────────────────────────────────────────────────────────────────────

  const [cabZen] = await db
    .insert(products)
    .values({
      slug: "cabeceira-minimalista-zen",
      title: "Cabeceira Minimalista Zen",
      category: "cabeceiras",
      priceCents: 120000,
      shortDescription:
        "Linhas retas e tecido de linho puro para tranquilidade visual e elegância atemporal.",
      differentials: [
        "Tecido de linho 100% natural",
        "Design sem costura aparente",
        "Fácil instalação e limpeza",
        "Perfil slim de apenas 8cm de profundidade",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      ],
      color: "Areia Natural",
      material: "Linho Natural",
      weightKg: "12.00",
    })
    .returning();

  await db.insert(productDimensions).values([
    {
      productId: cabZen.id,
      label: "Casal (140cm)",
      widthCm: 150,
      depthCm: 8,
      heightCm: 80,
    },
    {
      productId: cabZen.id,
      label: "Queen (160cm)",
      widthCm: 170,
      depthCm: 8,
      heightCm: 80,
    },
  ]);
  console.log("✅ Cabeceira Minimalista Zen");

  // ─── Arte em Tecido ──────────────────────────────────────────────────────────

  const [artAlmofadas] = await db
    .insert(products)
    .values({
      slug: "conjunto-almofadas-artesanais",
      title: "Conjunto Almofadas Artesanais",
      category: "arte-em-tecido",
      priceCents: 45000,
      shortDescription:
        "Bordados exclusivos em tecidos naturais — cada peça única, feita à mão.",
      differentials: [
        "Bordado manual em ponto cheio",
        "Enchimento em fibra de silicone antialérgica",
        "Tecidos naturais certificados Oeko-Tex",
        "Capa removível com zíper oculto",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800",
      ],
      color: "Terracota / Off-White",
      material: "Algodão Egípcio",
      weightKg: "1.20",
    })
    .returning();

  await db.insert(productDimensions).values([
    {
      productId: artAlmofadas.id,
      label: "45 × 45cm",
      widthCm: 45,
      depthCm: 15,
      heightCm: 45,
    },
    {
      productId: artAlmofadas.id,
      label: "60 × 40cm",
      widthCm: 60,
      depthCm: 15,
      heightCm: 40,
    },
  ]);
  console.log("✅ Conjunto Almofadas Artesanais");

  // ────────────────────────────────────────────────────────────────────────────

  const [artCortina] = await db
    .insert(products)
    .values({
      slug: "cortina-linho-puro",
      title: "Cortina Linho Puro",
      category: "arte-em-tecido",
      priceCents: 89000,
      shortDescription:
        "Leveza e sofisticação para filtrar a luz natural com elegância atemporal.",
      differentials: [
        "Linho 100% natural de origem europeia",
        "Filtro UV com passagem de luz difusa",
        "Ilhós em latão envelhecido incluso",
        "Lavagem a 30°C sem encolhimento",
      ],
      imageUrls: [
        "https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=800",
      ],
      color: "Off-White Natural",
      material: "Linho Europeu",
      weightKg: "2.40",
    })
    .returning();

  await db.insert(productDimensions).values({
    productId: artCortina.id,
    label: "Padrão",
    widthCm: 140,
    depthCm: 1,
    heightCm: 260,
  });
  console.log("✅ Cortina Linho Puro");

  console.log("\n🎉 Seed concluído!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
