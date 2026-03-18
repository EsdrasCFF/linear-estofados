import { CollectionPage } from "@/features/collections/components/CollectionPage";
import { getProductsByCategory } from "@/lib/db/queries";

export const revalidate = 60;

export default async function CabeceirasPage() {
  const products = await getProductsByCategory("cabeceiras");
  return (
    <CollectionPage
      title="Cabeceiras Estofadas"
      description="O toque final de sofisticação para o seu quarto — estofados que transformam o descanso em experiência."
      products={products}
    />
  );
}
