import { CollectionPage } from "@/features/collections/components/CollectionPage";
import { getProductsByCategory } from "@/lib/db/queries";

export const revalidate = 60;

export default async function ArteEmTecidoPage() {
  const products = await getProductsByCategory("arte-em-tecido");
  return (
    <CollectionPage
      title="Arte em Tecido"
      description="Peças únicas que contam histórias — bordados artesanais e tecidos naturais que elevam qualquer ambiente."
      products={products}
    />
  );
}
