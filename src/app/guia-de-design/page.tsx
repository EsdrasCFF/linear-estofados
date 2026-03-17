import { Layout } from "@/components/layout/Layout";
import { guides } from "@/features/guides/data/guidesData";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

export default function GuidesPage() {
  return (
    <Layout>
      <div className="bg-secondary/30 pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Guia de Design
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dicas, tendências e inspirações para transformar sua casa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guia-de-design/${guide.slug}`}
              className="group cursor-pointer"
            >
              <article className="flex flex-col h-full">
                <div className="aspect-video overflow-hidden rounded-lg mb-6 bg-muted relative">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {guide.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {guide.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>

                <p className="text-foreground/70 mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-border/50">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-4 h-4 text-foreground/60" />
                  </div>
                  <span className="text-sm font-medium">{guide.author}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
