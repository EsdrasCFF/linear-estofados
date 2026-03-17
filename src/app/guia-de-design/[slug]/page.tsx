import { Layout } from "@/components/layout/Layout";
import { getGuideBySlug, guides } from "@/features/guides/data/guidesData";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return {
    title: guide ? `${guide.title} | Linear Store` : "Guia não encontrado",
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <Layout>
      <div className="pt-32 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          <Link href="/guia-de-design">
            <span className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Voltar para o Guia
            </span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {guide.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b border-border/50 pb-8">
            <span className="font-medium text-foreground">{guide.author}</span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {guide.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {guide.readTime} de leitura
            </span>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden mb-12 bg-secondary/20 relative">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-foreground/80 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </article>
      </div>
    </Layout>
  );
}
