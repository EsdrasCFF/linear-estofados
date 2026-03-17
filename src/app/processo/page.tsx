"use client";

import { Layout } from "@/components/layout/Layout";
import { PencilRuler, Hammer, Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: PencilRuler,
    title: "1. Consultoria & Design",
    description:
      "Entendemos sua visão, analisamos seu espaço e propomos designs que se alinham perfeitamente ao seu estilo de vida.",
  },
  {
    icon: Hammer,
    title: "2. Produção Artesanal",
    description:
      "Nossos artesãos dão vida ao projeto utilizando materiais premium e técnicas tradicionais de tapeçaria.",
  },
  {
    icon: CheckCircle,
    title: "3. Controle de Qualidade",
    description:
      "Cada peça passa por uma rigorosa inspeção para garantir acabamento impecável e durabilidade.",
  },
  {
    icon: Truck,
    title: "4. Entrega & Instalação",
    description:
      "Cuidamos de toda a logística e instalamos o móvel no seu ambiente, garantindo que tudo fique perfeito.",
  },
];

export default function ProcessPage() {
  return (
    <Layout>
      <div className="bg-primary text-primary-foreground pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">Nosso Processo</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Da concepção à entrega, cada etapa é guiada pela paixão em criar
            algo único para você.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      isEven ? "md:text-right" : "md:text-left"
                    } text-center`}
                  >
                    <h3 className="font-display text-2xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    <step.icon className="w-8 h-8" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-secondary/30 py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-4">
            Pronto para começar seu projeto?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Agende uma conversa com nossos especialistas e transforme sua ideia
            em realidade.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded font-medium hover:bg-primary/90 transition-colors shadow-lg">
            Solicitar Orçamento
          </button>
        </div>
      </section>
    </Layout>
  );
}
