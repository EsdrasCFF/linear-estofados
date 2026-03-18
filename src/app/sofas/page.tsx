import { CollectionPage } from "@/features/collections/components/CollectionPage";
import { getProductsByCategory } from "@/lib/db/queries";

export const revalidate = 60;

export default async function SofasPage() {
  const products = await getProductsByCategory("sofas");
  return (
    <CollectionPage
      title="Sofás Sob Medida"
      description="Peças que equilibram forma e função — cada sofá é projetado para o seu espaço e estilo de vida."
      products={products}
    />
  );
}
