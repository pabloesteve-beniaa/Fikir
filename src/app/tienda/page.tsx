import type { Metadata } from "next";
import Link from "next/link";
import { products as editorialProducts, packs } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ShopifyProductCard from "@/components/tienda/ShopifyProductCard";
import {
  getProducts,
  isShopifyConfigured,
  type ShopifyProductSummary,
} from "@/lib/shopify";
import { ArrowRight, Coffee, Repeat, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Compra café de especialidad: Etiopía Yirgacheffe y Kenia Nyeri, packs y suscripción mensual. Envío a toda España en 3-5 días.",
  alternates: { canonical: "/tienda" },
  openGraph: {
    title: "Tienda | Fikir Coffee",
    description:
      "Compra café de especialidad: Etiopía Yirgacheffe y Kenia Nyeri, packs y suscripción mensual.",
    images: [{ url: "/images/etiopia-product.jpg" }],
  },
};

// Revalidate Shopify catalog every 5 minutes in production.
export const revalidate = 300;

interface ShopifyProductWithVariant extends ShopifyProductSummary {
  isSubscription?: boolean;
}

async function loadCatalog(): Promise<ShopifyProductWithVariant[]> {
  if (!isShopifyConfigured()) return [];
  try {
    const items = await getProducts(20);
    return items.map((p) => ({
      ...p,
      isSubscription: /suscripci/i.test(p.title) || /suscripci/i.test(p.handle),
    }));
  } catch (err) {
    console.error("loadCatalog error:", err);
    return [];
  }
}

function isSuscripcion(p: ShopifyProductWithVariant): boolean {
  return Boolean(p.isSubscription);
}

export default async function TiendaPage() {
  const catalog = await loadCatalog();

  // Surface Suscripción first regardless of Shopify ordering.
  const ordered = [...catalog].sort((a, b) => {
    const aSub = isSuscripcion(a) ? 0 : 1;
    const bSub = isSuscripcion(b) ? 0 : 1;
    return aSub - bSub;
  });

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 bg-fikir-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Tienda
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl lg:text-6xl">
              Café con propósito
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
              Café de especialidad tostado en pequeños lotes. Cada bolsa financia
              proyectos para la infancia en comunidades cafetaleras.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {[
                "Envío 3-5 días · Gratis >50€",
                "100% del beneficio neto reinvertido",
                "Café tostado en pequeños lotes",
                "SCA 85+",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-fikir-green" />
                  <span className="font-body text-xs text-fikir-brown-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-fikir-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-brown mb-12 text-center">
            Nuestros productos
          </h2>

          {ordered.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {ordered.map((p) => {
                const sub = isSuscripcion(p);
                return (
                  <div key={p.id} className="relative">
                    {sub && (
                      <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-fikir-gold font-body text-xs font-semibold text-fikir-brown shadow">
                        Más popular
                      </span>
                    )}
                    <ShopifyProductCard
                      handle={p.handle}
                      title={p.title}
                      description={p.description}
                      imageUrl={p.featuredImage?.url ?? null}
                      imageAlt={p.featuredImage?.altText ?? null}
                      priceAmount={p.priceRange.minVariantPrice.amount}
                      priceCurrency={p.priceRange.minVariantPrice.currencyCode}
                      availableForSale={p.availableForSale}
                      defaultVariantId={null}
                      detailsOnly={sub}
                    />
                    {sub && (
                      <p className="mt-2 text-center font-body text-xs text-fikir-brown-light">
                        Ahorra ~2€/mes vs compra unitaria · Pausa o cancela cuando quieras
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Static fallback when Shopify is not configured or fails.
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Suscripción — featured first */}
              <div className="bg-fikir-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border-2 border-fikir-gold/30">
                <div className="relative aspect-video bg-gradient-to-br from-fikir-brown to-fikir-brown/80 flex items-center justify-center p-8">
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-fikir-gold font-body text-xs font-semibold text-fikir-brown">
                    Más popular
                  </div>
                  <div className="text-center">
                    <Repeat className="h-12 w-12 text-fikir-gold mx-auto" />
                    <span className="mt-4 block font-heading text-3xl font-bold text-fikir-cream">
                      Suscripción
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-fikir-brown">
                    {packs[1].name}
                  </h3>
                  <p className="font-body text-sm text-fikir-brown-light mt-2 leading-relaxed">
                    {packs[1].description}
                  </p>
                  <p className="mt-2 font-body text-sm italic text-fikir-brown-light/70">
                    Recíbelo cada mes sin preocuparte. Ahorra un 13%.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {["Mínimo 2 meses", "Cancela cuando quieras", "Modifica o pausa"].map((t) => (
                      <span key={t} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-fikir-green" />
                        <span className="font-body text-xs text-fikir-brown-light">{t}</span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="font-body text-2xl font-semibold text-fikir-brown">
                        {packs[1].price.toFixed(2)}&euro;
                      </span>
                      <span className="font-body text-sm text-fikir-brown-light ml-1">
                        /mes
                      </span>
                      <p className="font-body text-xs text-fikir-brown-light/70 mt-1">
                        Ahorra ~2€/mes vs compra unitaria · Pausa o cancela cuando quieras
                      </p>
                    </div>
                    <Link
                      href="/producto/suscripcion"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-gold-light cursor-pointer"
                    >
                      Suscribirse
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <ProductCard product={editorialProducts[0]} badge="Más vendido" />
              <ProductCard product={editorialProducts[1]} badge="Intenso y complejo" />

              {/* Pack Degustación */}
              <div className="bg-fikir-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-video bg-gradient-to-br from-fikir-green to-fikir-terracotta flex items-center justify-center p-8">
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-fikir-gold font-body text-xs font-semibold text-fikir-brown">
                    Ideal para empezar
                  </div>
                  <div className="text-center">
                    <Coffee className="h-12 w-12 text-fikir-cream/80 mx-auto" />
                    <span className="mt-4 block font-heading text-3xl font-bold text-fikir-cream">
                      Pack Degustación
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-fikir-brown">
                    {packs[0].name}
                  </h3>
                  <p className="font-body text-sm text-fikir-brown-light mt-2 leading-relaxed">
                    {packs[0].description}
                  </p>
                  <p className="mt-2 font-body text-sm italic text-fikir-brown-light/70">
                    Perfecto para descubrir tu favorito
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-body text-2xl font-semibold text-fikir-brown">
                      {packs[0].price.toFixed(2)}&euro;
                    </span>
                    <Link
                      href="/producto/pack-degustacion"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
                    >
                      Comprar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 bg-fikir-green text-center lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Cada bolsa financia proyectos para la infancia en origen
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            El 100% del beneficio neto —tras cubrir costes operativos— se reinvierte en proyectos para la infancia en origen. Sin intermediarios.
          </p>
          <Link
            href="/impacto"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Descubrir el impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
