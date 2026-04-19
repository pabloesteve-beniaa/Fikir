"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ShopifyProductCardProps {
  handle: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  priceAmount: string;
  priceCurrency: string;
  availableForSale: boolean;
  /**
   * First variant GID from Shopify. Provided when the product has a single
   * buyable option. Subscription products should link to their PDP instead.
   */
  defaultVariantId: string | null;
  /** Skip inline buy button and only show "Ver detalles" (e.g. for products that need a PDP selector). */
  detailsOnly?: boolean;
}

function formatMoney(amount: string, currency: string): string {
  const n = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

export default function ShopifyProductCard({
  handle,
  title,
  description,
  imageUrl,
  imageAlt,
  priceAmount,
  priceCurrency,
  availableForSale,
  defaultVariantId,
  detailsOnly = false,
}: ShopifyProductCardProps) {
  const { addToCart, loading } = useCart();
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (!defaultVariantId) return;
    setError(null);
    try {
      await addToCart(defaultVariantId, 1);
    } catch (err) {
      console.error("Add to cart error:", err);
      setError("No hemos podido añadir al carrito. Inténtalo de nuevo.");
    }
  }

  const canBuyInline = availableForSale && defaultVariantId && !detailsOnly;

  return (
    <article className="flex flex-col bg-fikir-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/producto/${handle}`} className="relative aspect-square block overflow-hidden bg-fikir-white">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-fikir-green to-fikir-terracotta">
            <span className="font-heading text-2xl font-bold text-fikir-cream">{title}</span>
          </div>
        )}
        {!availableForSale && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-fikir-brown/90 font-body text-xs font-semibold text-fikir-cream uppercase tracking-wide">
            Agotado
          </span>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <Link href={`/producto/${handle}`} className="font-heading text-xl font-bold text-fikir-brown hover:text-fikir-green transition-colors">
          {title}
        </Link>
        {description && (
          <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          <span className="font-body text-2xl font-semibold text-fikir-brown">
            {formatMoney(priceAmount, priceCurrency)}
          </span>
          {canBuyInline ? (
            <button
              type="button"
              onClick={handleBuy}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="h-4 w-4" />
              {loading ? "..." : "Añadir"}
            </button>
          ) : (
            <Link
              href={`/producto/${handle}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-fikir-brown font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-brown-light cursor-pointer"
            >
              Ver detalles
            </Link>
          )}
        </div>
        {error && (
          <p className="mt-2 font-body text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}
