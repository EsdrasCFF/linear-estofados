import Link from "next/link";
import { Facebook, Instagram, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1D23] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <h3 className="font-sans text-2xl font-bold tracking-tight">
              LINEAR STORE
            </h3>
            <p className="text-white/40 leading-relaxed max-w-xs text-sm">
              Redefinindo o luxo através do conforto e da educação material.
              Peças autorais feitas para durar gerações.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
                <Facebook className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white/30">
              COLEÇÕES
            </h4>
            <ul className="space-y-5 text-sm text-white/50">
              <li>
                <Link href="/sofas" className="hover:text-white transition-colors">
                  Sofás
                </Link>
              </li>
              <li>
                <Link href="/cabeceiras" className="hover:text-white transition-colors">
                  Cabeceiras
                </Link>
              </li>
              <li>
                <Link href="/arte-em-tecido" className="hover:text-white transition-colors">
                  Arte em Tecido
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white/30">
              CONTATO
            </h4>
            <ul className="space-y-5 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <span>Av. Design, 1020 - Jardins, São Paulo/SP</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0" />
                <span>+55 (11) 9999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-white/20 uppercase tracking-[0.2em]">
          <p>© 2024 Linear Store Experience. Todos os direitos reservados.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
