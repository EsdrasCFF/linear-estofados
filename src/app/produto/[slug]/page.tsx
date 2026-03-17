"use client";

import { use } from "react";
import { Layout } from "@/components/layout/Layout";
import { getProductBySlug } from "@/features/collections/data/collectionsData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ShieldCheck, Truck } from "lucide-react";
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
import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { form, mutation } = useConsultationForm();
  const [open, setOpen] = useState(false);

  if (!product) notFound();

  const onSubmit = (data: any) => {
    mutation.mutate(
      { ...data, productInterest: product.title },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary/20 rounded-lg overflow-hidden border border-border relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary/20 rounded cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all relative overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2 text-primary font-medium tracking-wide uppercase text-sm">
              {product.category.replace("-", " ")}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              {product.title}
            </h1>
            <div className="text-3xl font-light mb-8">
              R${" "}
              {product.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
              <span className="text-sm text-muted-foreground ml-2">
                (Valor estimado)
              </span>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              {product.description ||
                "Uma peça de design exclusivo, feita para durar gerações. Personalize tecidos, acabamentos e medidas para se adequar perfeitamente ao seu espaço."}
            </p>

            <div className="grid gap-4 mb-8">
              {[
                "Personalização total de tecidos e cores",
                "Estrutura em madeira maciça certificada",
                "Espumas de alta densidade para conforto duradouro",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <Check className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="flex-1 h-14 text-lg">
                    Solicitar Orçamento
                  </Button>
                </DialogTrigger>
                <DialogContent>
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
                      className="space-y-4 pt-4"
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
                              <Input
                                placeholder="seu@email.com"
                                {...field}
                              />
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
                                placeholder="Gostaria de saber mais sobre..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
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

              <Button
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg"
              >
                Baixar Catálogo
              </Button>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground border p-4 rounded bg-secondary/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Garantia de 5 anos
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Entrega em todo Brasil
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
