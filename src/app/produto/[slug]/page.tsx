"use client";

import { use, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ShieldCheck,
  Truck,
  MessageCircle,
  Ruler,
  Weight,
} from "lucide-react";
import { useConsultationForm } from "@/hooks/use-consultation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { ProductWithDimensions } from "@/lib/db/schema";
import { formatPrice } from "@/lib/db/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

function buildWhatsAppUrl(productTitle: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511999999999";
  const message = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${productTitle}*. Pode me dar mais informações?`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const { form, mutation } = useConsultationForm();
  const [open, setOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(
    null
  );

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductWithDimensions>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) throw new Error("Produto não encontrado");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm">
              Carregando produto...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !product) notFound();

  const activeDimension =
    product.dimensions.find((d) => d.id === selectedDimensionId) ??
    product.dimensions[0] ??
    null;

  const images = product.imageUrls ?? [];

  const onSubmit = (data: any) => {
    mutation.mutate(
      { ...data, productInterest: product.title },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-32 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Galeria ── */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary/20 rounded-2xl overflow-hidden border border-border relative">
              {images[activeImageIndex] ? (
                <Image
                  src={images[activeImageIndex]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                  <span className="text-muted-foreground text-sm">
                    Sem imagem
                  </span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                      i === activeImageIndex
                        ? "border-[#D97706]"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div>
            <p className="text-[#D97706] font-medium tracking-wide uppercase text-sm mb-2">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2 leading-tight">
              {product.title}
            </h1>

            <div className="text-3xl font-light mb-6">
              R$ {formatPrice(product.priceCents)}
              <span className="text-sm text-muted-foreground ml-2">
                (Valor estimado)
              </span>
            </div>

            {product.shortDescription && (
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {product.shortDescription}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.material && (
                <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full border border-border/60">
                  {product.material}
                </span>
              )}
              {product.color && (
                <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full border border-border/60">
                  {product.color}
                </span>
              )}
              {product.weightKg && (
                <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full border border-border/60 flex items-center gap-1">
                  <Weight className="w-3 h-3" />
                  {product.weightKg} kg
                </span>
              )}
            </div>

            {/* Diferenciais */}
            {product.differentials && product.differentials.length > 0 && (
              <div className="grid gap-3 mb-6">
                {product.differentials.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <Check className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Dimensões */}
            {product.dimensions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                  Dimensões disponíveis
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.dimensions.map((dim) => (
                    <button
                      key={dim.id}
                      onClick={() => setSelectedDimensionId(dim.id)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedDimensionId === dim.id ||
                        (!selectedDimensionId &&
                          product.dimensions[0]?.id === dim.id)
                          ? "border-[#D97706] bg-[#D97706]/10 text-[#D97706]"
                          : "border-border hover:border-[#D97706]/50"
                      }`}
                    >
                      {dim.label}
                    </button>
                  ))}
                </div>

                {activeDimension && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary/30 rounded-xl px-4 py-3">
                    <Ruler className="w-4 h-4 shrink-0" />
                    <span>
                      {activeDimension.widthCm &&
                        `L ${activeDimension.widthCm}cm`}
                      {activeDimension.depthCm &&
                        ` × P ${activeDimension.depthCm}cm`}
                      {activeDimension.heightCm &&
                        ` × A ${activeDimension.heightCm}cm`}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Separator className="my-6" />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={buildWhatsAppUrl(product.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full h-14 text-base bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar via WhatsApp
                </Button>
              </a>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 h-14 text-base rounded-xl"
                  >
                    Solicitar Orçamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Interesse em: {product.title}</DialogTitle>
                    <DialogDescription>
                      Preencha seus dados e nossa equipe entrará em contato com
                      opções de personalização.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 pt-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone (Opcional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(11) 99999-9999"
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem (Opcional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Gostaria de saber mais sobre personalização..."
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-[#D97706] hover:bg-[#B45309] text-white"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending
                          ? "Enviando..."
                          : "Enviar Solicitação"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust badges */}
            <div className="flex justify-between items-center text-xs text-muted-foreground border border-border/60 p-4 rounded-xl bg-secondary/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                Garantia de 5 anos
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D97706]" />
                Entrega em todo Brasil
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
