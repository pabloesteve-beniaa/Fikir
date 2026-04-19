import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getProducts, isShopifyConfigured, type ShopifyProductSummary } from "@/lib/shopify";
import ShopifyProductCard from "@/components/tienda/ShopifyProductCard";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Compra café de especialidad, packs y suscripción mensual. Envío a toda España en 3-5 días. Cupón FIKIR5 — 5% de bienvenida.",
  alternates: { canonical: "/tienda" },
  openGraph: {
    title: "Tienda | Fikir Coffee",
    description: "Compra café de especialidad, packs y suscripción mensual.",
    images: [{ url: "/images/etiopia-product.jpg" }],
  },
};

// Revalidate Shopify catalog every 5 minutes in production.
export const revalidate = 300;

interface ShopifyProductWithVariant extends ShopifyProductSummary {
  firstVariantId?: string | null;
  isSubscription?: boolean;
}

async function loadCatalog(): Promise<ShopifyProductWithVariant[]> {
  if (!isShopifyConfigured()) return [];
  try {
    const products = await getProducts(20);
    return products.map((p) => ({
      ...p,
      // Products requiring variant picking (like Suscripción) go through the PDP.
      isSubscription: /suscripci/i.test(p.title) || /suscripci/i.test(p.handle),
    }));
  } catch (err) {
    console.error("loadCatalog error:", err);
    return [];
  }
}

export default async function TiendaPage() {
  const products = await loadCatalog();

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
                "Cupón FIKIR5 · 5% de bienvenida",
                "100% beneficio reinvertido",
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

      {/* Catalog */}
      <section className="py-16 bg-fikir-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-brown mb-12 text-center">
            Nuestro catálogo
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {products.map((p) => (
                <ShopifyProductCard
                  key={p.id}
                  handle={p.handle}
                  title={p.title}
                  description={p.description}
                  imageUrl={p.featuredImage?.url ?? null}
                  imageAlt={p.featuredImage?.altText ?? null}
                  priceAmount={p.priceRange.minVariantPrice.amount}
                  priceCurrency={p.priceRange.minVariantPrice.currencyCode}
                  availableForSale={p.availableForSale}
                  defaultVariantId={null}
                  detailsOnly={p.isSubscription}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-fikir-white">
              <p className="font-body text-base text-fikir-brown-light">
                No hemos podido cargar el catálogo en este momento. Puedes{" "}
                <Link href="/contacto" className="text-fikir-green underline">
                  contactarnos
                </Link>{" "}
                o volver a intentarlo en unos minutos.
              </p>
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
            El 100% de nuestro beneficio se reinvierte en proyectos infantiles en las comunidades donde
            nace tu café. Sin intermediarios.
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
