import { CollectionPage } from "@/features/collections/components/CollectionPage";
import { getProductsByCategory } from "@/lib/db/queries";

export const revalidate = 60;

export default async function PoltronasPage() {
  const products = await getProductsByCategory("poltronas");
  return (
    <CollectionPage
      title="Poltronas"
      description="O toque final de conforto e sofisticação para o seu ambiente — poltronas que unem design, aconchego e personalidade em cada detalhe."
      products={products}
    />
  );
}
