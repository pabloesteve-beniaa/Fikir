import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, packs } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Compra cafe de especialidad de Etiopia y Kenia. Cada bolsa financia proyectos sociales en origen.",
};

export default function TiendaPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero con imagen */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/tienda-hero.png"
          alt="Los tres packagings de Fikir Coffee en estantería rústica"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-fikir-brown/60" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Tienda
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-fikir-cream sm:text-5xl lg:text-6xl">
              Cafe con proposito
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-cream/80">
              Cafe de especialidad tostado con cuidado. Cada bolsa que compras
              financia proyectos de educacion y agua potable en origen.
            </p>
          </div>
        </div>
      </section>

      {/* Main Products */}
      <section className="py-16 bg-fikir-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-brown mb-12 text-center">
            Nuestros origenes
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Packs & Subscription */}
      <section className="py-16 bg-fikir-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-brown mb-12 text-center">
            Mas opciones
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Pack Degustacion */}
            <div className="bg-fikir-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/pack-degustacion.png"
                  alt="Pack degustacion Fikir Coffee — Etiopia, Kenia y Uganda"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-fikir-brown">
                      {packs[0].name}
                    </h3>
                    <p className="font-body text-sm text-fikir-brown-light mt-2 leading-relaxed">
                      {packs[0].description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-body text-2xl font-semibold text-fikir-brown">
                    {packs[0].price.toFixed(2)}&euro;
                  </span>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
                  >
                    Comprar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Suscripcion */}
            <div className="bg-fikir-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border-2 border-fikir-gold/30">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/suscripcion.png"
                  alt="Suscripcion mensual Fikir Coffee — cafe en casa"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-fikir-gold font-body text-xs font-semibold text-fikir-brown">
                  Ahorra un 13%
                </div>
              </div>
              <div className="p-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-fikir-brown">
                    {packs[1].name}
                  </h3>
                  <p className="font-body text-sm text-fikir-brown-light mt-2 leading-relaxed">
                    {packs[1].description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-body text-2xl font-semibold text-fikir-brown">
                      {packs[1].price.toFixed(2)}&euro;
                    </span>
                    <span className="font-body text-sm text-fikir-brown-light ml-1">
                      /mes
                    </span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-gold-light cursor-pointer"
                  >
                    Suscribirse
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 bg-fikir-green text-center lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Cada bolsa financia proyectos de educacion en origen
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            El 100% de nuestro beneficio se reinvierte en las comunidades donde
            nace tu cafe. Sin intermediarios.
          </p>
          <Link
            href="/impacto"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Ver nuestro impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}