"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-black/10 transition-transform hover:scale-110"
            onClick={() =>
              window.open("https://wa.me/5511999999999", "_blank")
            }
          >
            <MessageCircle className="w-7 h-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Fale conosco no WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
