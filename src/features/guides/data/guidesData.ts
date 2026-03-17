export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  image: string;
  content: string;
  date: string;
}

export const guides: Guide[] = [
  {
    slug: "como-escolher-tecido-ideal",
    title: "Como Escolher o Tecido Ideal para seu Sofá",
    excerpt:
      "Linho, veludo ou algodão? Entenda as características de cada material para fazer a escolha perfeita para sua rotina.",
    readTime: "5 min",
    author: "Sofia Martins",
    image: "/assets/guide_1771119344243.png",
    date: "12 Mar, 2024",
    content: `
      <h3>Entendendo as Fibras Naturais</h3>
      <p>O linho é conhecido por sua elegância e respirabilidade, ideal para climas quentes. Já o algodão oferece um toque suave e é extremamente versátil.</p>
      <h3>Durabilidade e Manutenção</h3>
      <p>Para lares com crianças ou pets, tecidos com tratamentos impermeabilizantes ou tramas mais fechadas são recomendados para garantir longevidade sem perder a beleza.</p>
    `,
  },
  {
    slug: "tendencias-design-interiores-2024",
    title: "Tendências de Design de Interiores para 2024",
    excerpt:
      "Descubra as cores, texturas e formatos que estão definindo o novo padrão de elegância no design mundial.",
    readTime: "7 min",
    author: "Roberto Alencar",
    image: "/assets/guide_1771119350221.png",
    date: "05 Fev, 2024",
    content: `
      <h3>O Retorno do Orgânico</h3>
      <p>Formas curvas e materiais naturais continuam em alta, trazendo uma sensação de acolhimento e conexão com a natureza para dentro de casa.</p>
      <h3>Paleta de Cores Terrosas</h3>
      <p>Tons de terracota, verde musgo e bege arenoso criam ambientes serenos e sofisticados, servindo como base perfeita para mobiliário de destaque.</p>
    `,
  },
];

export const getGuideBySlug = (slug: string) =>
  guides.find((g) => g.slug === slug);
