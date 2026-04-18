"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { createCheckout, isShopifyConfigured } from "@/lib/shopify";

interface PackButtonProps {
  variantId: string;
  label: string;
  className: string;
}

export default function PackButton({ variantId, label, className }: PackButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isShopifyConfigured()) {
      window.open("https://fikir-cafe.myshopify.com", "_blank", "noopener,noreferrer");
      return;
    }

    setLoading(true);
    try {
      const data = (await createCheckout(variantId, 1)) as {
        checkoutCreate: {
          checkout: { webUrl: string } | null;
          checkoutUserErrors: { message: string }[];
        };
      };

      const checkoutUrl = data?.checkoutCreate?.checkout?.webUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        const errors = data?.checkoutCreate?.checkoutUserErrors;
        console.error("Checkout errors:", errors);
        alert("No se pudo iniciar el proceso de compra. Por favor, contáctanos.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error al conectar con la tienda. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? "Cargando..." : label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
