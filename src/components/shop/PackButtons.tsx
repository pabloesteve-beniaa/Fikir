"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface PackButtonProps {
  label: string;
  style: "green" | "gold";
  // Once products exist in Shopify, pass the Shopify checkout URL for the pack variant.
  checkoutUrl?: string;
}

export function PackButton({ label, style, checkoutUrl }: PackButtonProps) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (!checkoutUrl || checkoutUrl === "#") {
      // Shopify product not wired yet — send to contact page as fallback
      window.location.href = "/contacto?asunto=pedido";
      return;
    }
    setLoading(true);
    window.location.href = checkoutUrl;
  }

  const baseClass =
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-semibold tracking-wide uppercase transition-colors duration-200 cursor-pointer disabled:opacity-60";
  const colorClass =
    style === "green"
      ? "bg-fikir-green text-fikir-cream hover:bg-fikir-green-light"
      : "bg-fikir-gold text-fikir-brown hover:bg-fikir-gold-light";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseClass} ${colorClass}`}
    >
      {loading ? "..." : label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
