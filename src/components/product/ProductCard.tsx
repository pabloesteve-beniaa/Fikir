import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product, badge }: { product: Product; badge?: string }) {
  const colorMap = {
    green: {
      bg: "bg-fikir-green",
      badge: "bg-fikir-green text-fikir-cream",
      hover: "group-hover:text-fikir-green",
    },
    terracotta: {
      bg: "bg-fikir-terracotta",
      badge: "bg-fikir-terracotta text-fikir-cream",
      hover: "group-hover:text-fikir-terracotta",
    },
  };

  const colors = colorMap[product.color];

  return (
    <Link
      href={`/producto/${product.handle}`}
      className="group block bg-fikir-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image area */}
      <div className={`relative aspect-square ${colors.bg} flex items-center justify-center p-8`}>
        <div className="text-center">
          <span className="font-heading text-6xl font-bold text-fikir-cream/90 lg:text-7xl">
            {product.origin}
          </span>
          <p className="mt-2 font-body text-sm text-fikir-cream/70">
            {product.region}
          </p>
        </div>
        {/* SCA Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-fikir-cream/20 backdrop-blur-sm">
          <span className="font-body text-xs font-semibold text-fikir-cream">
            SCA {product.scaScore}
          </span>
        </div>
        {/* Optional marketing badge */}
        {badge && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-fikir-gold font-body text-xs font-semibold text-fikir-brown">
            {badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-fikir-brown">
              {product.name}
            </h3>
            <p className="font-body text-sm text-fikir-brown-light mt-1">
              {product.region} &middot; {product.weight}
            </p>
          </div>
          <span className="font-body text-lg font-semibold text-fikir-brown">
            {product.price.toFixed(2)}&euro;
          </span>
        </div>

        {/* Profile hint - helps quick decision */}
        <p className="mt-3 font-body text-sm italic text-fikir-brown-light/80">
          {product.profileHint}
        </p>

        {/* Flavor notes */}
        <div className="mt-3 flex flex-wrap gap-2">
          {product.flavorNotes.map((note) => (
            <span
              key={note}
              className="px-3 py-1 rounded-full bg-fikir-cream-dark font-body text-xs text-fikir-brown-light"
            >
              {note}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-6 flex items-center gap-2 font-body text-sm font-semibold text-fikir-brown-light ${colors.hover} transition-colors duration-200`}>
          <span>Ver cafe</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
