# LINEAR STORE — Migração Vite → Next.js 15

## ✅ O que foi migrado

### Estrutura (feature-based mantida)
```
src/
├── app/                          # App Router (substitui wouter + main.tsx)
│   ├── layout.tsx                # Root layout (substitui index.html + App.tsx)
│   ├── page.tsx                  # Home (/)
│   ├── sofas/page.tsx
│   ├── cabeceiras/page.tsx
│   ├── arte-em-tecido/page.tsx
│   ├── processo/page.tsx
│   ├── guia-de-design/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx       # Rota dinâmica (substitui /:slug no wouter)
│   ├── produto/[slug]/page.tsx
│   ├── api/
│   │   └── consultation_requests/route.ts  # API Route (substitui Express)
│   └── not-found.tsx
├── components/
│   ├── layout/                   # Header, Footer, Layout, WhatsAppButton
│   ├── ui/                       # shadcn/ui (sem alterações)
│   ├── ProductCard.tsx
│   └── Providers.tsx             # QueryClient + TooltipProvider (client component)
├── features/                     # Feature-based (mantida)
│   ├── home/
│   ├── collections/
│   └── guides/
├── hooks/
├── lib/
└── shared/                       # Schema e routes (sem alterações)
```

## 🔄 Principais mudanças

| Antes (Vite/Wouter)              | Depois (Next.js 15)                        |
|----------------------------------|--------------------------------------------|
| `import { Link } from "wouter"` | `import Link from "next/link"`             |
| `import { useLocation }`         | `import { usePathname } from "next/navigation"` |
| `import { useRoute }`            | `params` via `page.tsx` props              |
| `<img src={...} />`              | `<Image ... />` de `next/image`            |
| `import img from "@assets/..."` | `/assets/nome-do-arquivo.png` (public/)   |
| `vite.config.ts`                 | `next.config.ts`                           |
| Express server separado          | `app/api/*/route.ts`                       |
| Tudo client-side                 | Server Components por padrão               |
| `import.meta.env.VITE_*`         | `process.env.NEXT_PUBLIC_*`                |

## 📁 Imagens — Passo necessário

As imagens que estavam em `attached_assets/` precisam ser copiadas para `public/assets/`:

```bash
# Copie os arquivos de imagem originais para:
public/assets/home_1771119792349.png
public/assets/home_1771119344244.png
public/assets/home_1771119350222.png
public/assets/home_1_1771119344243.png
public/assets/categorias_1771119344241.png
public/assets/categorias_1771119350219.png
public/assets/product-details_1771119344244.png
public/assets/details-product_1771119350220.png
public/assets/guide_1771119344243.png
public/assets/guide_1771119350221.png
```

## 🚀 Como rodar

```bash
npm install
npm run dev
```

## 🗄️ Banco de dados (futuro)

O arquivo `src/app/api/consultation_requests/route.ts` já está pronto para receber a integração com o banco. Descomente o código de exemplo e configure a conexão com `drizzle-orm` + `pg`.

## ⚠️ Componentes "use client"

Os seguintes componentes precisam de `"use client"` porque usam hooks ou eventos de browser:
- `src/components/Providers.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/WhatsAppButton.tsx`
- `src/features/home/components/Hero.tsx`
- `src/app/processo/page.tsx` (framer-motion)
- `src/app/produto/[slug]/page.tsx` (formulário + dialog)
- `src/hooks/use-consultation.ts`
