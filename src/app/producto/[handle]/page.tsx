"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ArrowLeft, ShoppingBag, MapPin, Leaf, Award, Heart } from "lucide-react";

export default function ProductoPage() {
  const { handle } = useParams<{ handle: string }>();
  const product = products.find((p) => p.handle === handle);
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-fikir-brown">
            Producto no encontrado
          </h1>
          <Link
            href="/tienda"
            className="mt-4 inline-flex items-center gap-2 font-body text-sm text-fikir-green hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const colorMap = {
    green: {
      bg: "bg-fikir-green",
      button: "bg-fikir-green hover:bg-fikir-green-light",
      accent: "text-fikir-green",
      dot: "bg-fikir-green",
    },
    terracotta: {
      bg: "bg-fikir-terracotta",
      button: "bg-fikir-terracotta hover:bg-fikir-terracotta-light",
      accent: "text-fikir-terracotta",
      dot: "bg-fikir-terracotta",
    },
  };

  const colors = colorMap[product.color];

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav className="flex items-center gap-2 font-body text-sm text-fikir-brown-light">
          <Link href="/tienda" className="hover:text-fikir-brown transition-colors">
            Tienda
          </Link>
          <span>/</span>
          <span className="text-fikir-brown font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Product image area */}
            <div className={`${colors.bg} rounded-3xl flex items-center justify-center p-12 aspect-square lg:aspect-auto lg:min-h-[600px]`}>
              <div className="text-center">
                <p className="font-body text-sm tracking-[0.3em] uppercase text-fikir-cream/60">
                  Fikir Coffee
                </p>
                <h2 className="mt-4 font-heading text-7xl font-bold text-fikir-cream lg:text-8xl">
                  {product.origin}
                </h2>
                <p className="mt-2 font-heading text-2xl italic text-fikir-cream/70">
                  {product.region}
                </p>
                <div className="mt-6 inline-block px-4 py-2 rounded-full bg-fikir-cream/10 backdrop-blur-sm">
                  <span className="font-body text-sm text-fikir-cream">
                    SCA {product.scaScore} &middot; Specialty
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Product info */}
            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                Cafe {product.name}
              </h1>
              <p className="mt-2 font-body text-base text-fikir-brown-light">
                {product.region}, {product.origin} &middot; {product.weight}
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-fikir-brown">
                {product.price.toFixed(2)}&euro;
              </p>

              {/* Flavor notes */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 rounded-full bg-fikir-cream-dark font-body text-sm text-fikir-brown-light"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-6 font-body text-base leading-relaxed text-fikir-brown-light">
                {product.description}
              </p>

              {/* Product specs */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Origen</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.region}, {product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Proceso</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.process}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Puntuacion SCA</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.scaScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Tueste</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.roast}</p>
                  </div>
                </div>
              </div>

              {/* Variant selector */}
              <div className="mt-8">
                <p className="font-body text-sm font-semibold text-fikir-brown mb-3">
                  Formato
                </p>
                <div className="flex gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-6 py-3 rounded-lg border-2 font-body text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedVariant === index
                          ? `border-fikir-brown bg-fikir-brown text-fikir-cream`
                          : `border-fikir-brown/20 text-fikir-brown hover:border-fikir-brown/40`
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <button
                className={`mt-8 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg ${colors.button} font-body text-base font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 cursor-pointer`}
              >
                <ShoppingBag className="h-5 w-5" />
                Comprar &mdash; {product.price.toFixed(2)}&euro;
              </button>

              <p className="mt-3 font-body text-xs text-fikir-brown-light text-center">
                Envio a toda Espana &middot; Entrega en 2-4 dias laborables
              </p>

              {/* Impact story */}
              <div className="mt-10 p-6 rounded-2xl bg-fikir-cream-dark border border-fikir-gold/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <h3 className="font-heading text-lg font-bold text-fikir-brown">
                    Impacto de este cafe
                  </h3>
                </div>
                <p className="font-body text-sm leading-relaxed text-fikir-brown-light">
                  {product.impact}
                </p>
              </div>

              {/* Origin story */}
              <div className="mt-6 p-6 rounded-2xl bg-fikir-white border border-fikir-brown/5">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-3">
                  La historia del origen
                </h3>
                <p className="font-body text-sm leading-relaxed text-fikir-brown-light">
                  {product.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
