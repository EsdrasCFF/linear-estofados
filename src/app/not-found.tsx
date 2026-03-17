import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-primary/20 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-[#D97706] hover:bg-[#B45309] text-white rounded-full px-8">
          Voltar ao Início
        </Button>
      </Link>
    </div>
  );
}
