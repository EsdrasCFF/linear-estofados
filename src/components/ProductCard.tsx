import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ProductWithDimensions } from "@/lib/db/schema";
import { formatPrice } from "@/lib/db/schema";

interface ProductCardProps {
  product: ProductWithDimensions;
}

export function ProductCard({ product }: ProductCardProps) {
  const thumbnail = product.imageUrls?.[0];

  return (
    <Link href={`/produto/${product.slug}`} className="group block h-full">
      <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sem imagem</span>
            </div>
          )}
          {product.color && (
            <div className="absolute top-4 left-4">
              <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border/50">
                {product.color}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex-1">
            {product.material && (
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {product.material}
              </p>
            )}
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
            <span className="font-medium text-lg">
              R$ {formatPrice(product.priceCents)}
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
