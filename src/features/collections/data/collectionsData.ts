// NOTE: In Next.js, local images from /public are referenced by path string.
// Place your original images in /public/assets/ and update the paths below.
// Alternatively, keep using external URLs or import images directly in components.

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  image: string;
  tags?: string[];
  description?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "sofa-modular-horizon",
    title: "Sofá Modular Horizon",
    category: "sofas",
    price: 4500,
    image: "/assets/categorias_1771119344241.png",
    tags: ["Best Seller", "Modular"],
    description: "Um sofá modular versátil que se adapta a qualquer espaço com elegância.",
  },
  {
    id: "2",
    slug: "poltrona-classica-luna",
    title: "Poltrona Clássica Luna",
    category: "sofas",
    price: 2200,
    image: "/assets/product-details_1771119344244.png",
    tags: ["Novo"],
    description: "Design clássico com um toque contemporâneo, perfeita para leitura.",
  },
  {
    id: "3",
    slug: "cabeceira-imperial",
    title: "Cabeceira Imperial",
    category: "cabeceiras",
    price: 1800,
    image: "/assets/details-product_1771119350220.png",
    tags: ["Premium"],
    description: "Estofado capitonê feito à mão para um quarto majestoso.",
  },
  {
    id: "4",
    slug: "cabeceira-minimalista-zen",
    title: "Cabeceira Minimalista Zen",
    category: "cabeceiras",
    price: 1200,
    image: "/assets/categorias_1771119344241.png",
    tags: ["Minimalista"],
    description: "Linhas retas e tecido de linho puro para tranquilidade visual.",
  },
  {
    id: "5",
    slug: "almofadas-artesanais",
    title: "Conjunto Almofadas Artesanais",
    category: "arte-em-tecido",
    price: 450,
    image: "/assets/product-details_1771119344244.png",
    tags: ["Handmade"],
    description: "Bordados exclusivos em tecidos naturais.",
  },
  {
    id: "6",
    slug: "cortina-linho-puro",
    title: "Cortina Linho Puro",
    category: "arte-em-tecido",
    price: 890,
    image: "/assets/details-product_1771119350220.png",
    tags: ["Natural"],
    description: "Leveza e sofisticação para filtrar a luz natural.",
  },
];

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
