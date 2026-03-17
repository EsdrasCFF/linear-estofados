"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertConsultationRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useConsultationForm() {
  const { toast } = useToast();

  const form = useForm<InsertConsultationRequest>({
    resolver: zodResolver(api.consultation.create.input),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      productInterest: "General Inquiry",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConsultationRequest) => {
      const res = await fetch(api.consultation.create.path, {
        method: api.consultation.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit request");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Solicitação Recebida",
        description: "Nossa equipe entrará em contato em breve.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { form, mutation };
}
