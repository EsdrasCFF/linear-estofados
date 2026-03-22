"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "sofas",
    title: "Sofás Sob Medida",
    image: "/categories/sofa-cover-2.png",
    link: "/sofas",
  },
  {
    id: "cabeceiras",
    title: "Cabeceiras Estofadas",
    image: "/categories/headboard-cover.png",
    link: "/cabeceiras",
  },
  {
    id: "arte",
    title: "Arte em Tecido",
    image: "/categories/fabric-art-cover.png",
    link: "/arte-em-tecido",
  },
];

export function CategorySection() {
  const pathname = usePathname();

  return (
    <section className="py-12 md:py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="mb-8 md:mb-12">
          <span
            className={cn(
              "text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 block",
              pathname.includes("collections") ? "mt-4" : ""
            )}
          >
            EXCLUSIVIDADE
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Nossas Categorias Principais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative block overflow-hidden rounded-[2rem] md:rounded-3xl aspect-[3/4] md:aspect-[3.5/4.5] shadow-lg"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 md:opacity-80" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
