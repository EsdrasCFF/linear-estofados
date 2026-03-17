import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/features/collections/data/collectionsData";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  category: string;
  title: string;
}

export function CollectionPage({ category, title }: CollectionPageProps) {
  const products = getProductsByCategory(category);

  if (!products) notFound();

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção exclusiva, onde cada peça é criada com
            atenção meticulosa aos detalhes e conforto.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-4">
              Nenhum produto encontrado nesta categoria.
            </h3>
          </div>
        )}
      </div>
    </Layout>
  );
}
