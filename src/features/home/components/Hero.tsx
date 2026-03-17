"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="relative min-h-[440px] md:h-[600px] rounded-[2rem] md:rounded-3xl overflow-hidden group">
          {/* Background Image */}
          <Image
            src="/assets/home_1771119792349.png"
            alt="Linear Store Hero"
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container px-6 md:px-12 lg:px-20 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <h1 className="text-white text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
                  Sofás pensados para o seu espaço e seu uso diário
                </h1>
                <p className="text-white/90 text-sm md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
                  Descubra o equilíbrio perfeito entre design autoral e o
                  conforto que a sua rotina merece. Consultoria especializada
                  para peças sob medida.
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full md:w-auto">
                  <Link href="/sofas">
                    <Button
                      size="lg"
                      className="h-12 md:h-14 px-10 text-base md:text-lg rounded-full bg-[#D97706] hover:bg-[#B45309] text-white w-full md:w-auto"
                    >
                      Conhecer Coleção
                    </Button>
                  </Link>
                  <Link href="/processo">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 md:h-14 px-10 text-base md:text-lg rounded-full border-white text-white hover:bg-white/10 backdrop-blur-sm w-full md:w-auto"
                    >
                      Agendar Consultoria
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
