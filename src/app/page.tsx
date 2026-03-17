import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/features/home/components/Hero";
import { CategorySection } from "@/features/home/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Densidade Ideal",
    desc: "A escolha correta da espuma influencia diretamente na longevidade e no suporte postural.",
    icon: "🟫",
  },
  {
    title: "Tecidos Premium",
    desc: "Tecnologia de ponta com toque natural: linhos, veludos e fibras de alta performance.",
    icon: "🍂",
  },
  {
    title: "Proporções",
    desc: "Analisamos a circulação do seu ambiente para garantir harmonia e funcionalidade.",
    icon: "📏",
  },
  {
    title: "Garantia Vitalícia",
    desc: "Estruturas em madeira nobre com garantia estendida para sua tranquilidade.",
    icon: "🛡️",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-[#F5F5F5] min-h-screen">
        <Hero />
        <CategorySection />

        {/* Sofa Guide Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-foreground leading-tight">
                  Como escolher o sofá perfeito
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Nós guiamos você através de cada detalhe técnico para garantir
                  que seu investimento se traduza em anos de conforto e estilo.
                </p>
                <Button
                  variant="ghost"
                  className="text-[#D97706] font-bold p-0 h-auto flex items-center justify-center md:justify-start gap-2 text-lg md:text-xl hover:bg-transparent"
                >
                  Baixar Guia de Ergonomia <Download className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-transparent hover:border-[#D97706]/20 transition-all text-center md:text-left"
                  >
                    <div className="text-2xl mb-4 md:mb-6 text-[#D97706]">
                      {f.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                      {f.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 md:py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-[1200px]">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-10 md:mb-16 block">
              NOSSOS PARCEIROS & PROJETOS
            </span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-20">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 md:w-32 h-10 md:h-16 bg-[#D1D1D1] rounded-lg" />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-32 bg-[#F5F5F5]">
          <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
            <div className="bg-white p-8 md:p-24 rounded-[2.5rem] md:rounded-[40px] shadow-xl text-center relative overflow-hidden">
              <div className="relative z-10 max-w-4xl mx-auto">
                <p className="text-xl md:text-4xl font-medium text-foreground leading-relaxed md:leading-[1.5] mb-8 md:mb-12 italic">
                  &ldquo;O processo de consultoria transformou minha sala. Não
                  foi apenas comprar um móvel, foi entender como a textura do
                  tecido e a densidade do sofá mudariam meu descanso
                  diário.&rdquo;
                </p>
                <div className="flex flex-col items-center gap-4 md:gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-[#F5F5F5] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
                      alt="Helena Viana"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Helena Viana</p>
                    <p className="text-[10px] md:text-sm text-[#D97706] uppercase tracking-widest font-bold">
                      Arquiteta e Cliente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
