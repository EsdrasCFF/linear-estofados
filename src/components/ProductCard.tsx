import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/features/collections/data/collectionsData";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block h-full">
      <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-sm text-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {product.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
            <span className="font-medium text-lg">
              R${" "}
              {product.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Ver Detalhes <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
