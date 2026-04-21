import type { Metadata } from "next";
import Link from "next/link";
import {
  products as editorialProducts,
  packs,
  CARD_METADATA,
  TIENDA_ORDER,
  type Product,
} from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ShopifyProductCard from "@/components/tienda/ShopifyProductCard";
import {
  getProducts,
  isShopifyConfigured,
  type ShopifyProductSummary,
} from "@/lib/shopify";
import { ArrowRight, CheckCircle } from "lucide-react";

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

async function loadCatalog(): Promise<ShopifyProductSummary[]> {
  if (!isShopifyConfigured()) return [];
  try {
    return await getProducts(20);
  } catch (err) {
    console.error("loadCatalog error:", err);
    return [];
  }
}

function orderByTienda<T extends { handle: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ai = TIENDA_ORDER.indexOf(a.handle);
    const bi = TIENDA_ORDER.indexOf(b.handle);
    const aRank = ai === -1 ? TIENDA_ORDER.length : ai;
    const bRank = bi === -1 ? TIENDA_ORDER.length : bi;
    return aRank - bRank;
  });
}

function requiresPdpSelector(handle: string): boolean {
  // Subscription picks frequency + grano/molido on its PDP; always link there.
  return handle === "suscripcion";
}

export default async function TiendaPage() {
  const catalog = await loadCatalog();
  const ordered = orderByTienda(catalog);

  // Build a static fallback list preserving the same order and shape.
  const packByHandle = new Map(packs.map((p) => [p.handle, p]));
  const staticProducts: Product[] = editorialProducts;

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-fikir-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-fikir-gold">
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

      {/* Unified product grid */}
      <section className="bg-fikir-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {ordered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {ordered.map((p) => (
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
                  detailsOnly={requiresPdpSelector(p.handle)}
                />
              ))}
            </div>
          ) : (
            // Static fallback when Shopify is not configured or fails.
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {staticProducts.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
              {TIENDA_ORDER.filter(
                (h) => !staticProducts.some((p) => p.handle === h) && packByHandle.has(h)
              ).map((h) => {
                const pack = packByHandle.get(h)!;
                const meta = CARD_METADATA[h];
                return (
                  <ShopifyProductCard
                    key={pack.id}
                    handle={pack.handle}
                    title={pack.name}
                    description={pack.description}
                    imageUrl={pack.image ?? null}
                    imageAlt={pack.name}
                    priceAmount={pack.price.toFixed(2)}
                    priceCurrency={pack.currency}
                    availableForSale={true}
                    defaultVariantId={null}
                    detailsOnly={requiresPdpSelector(pack.handle) || !meta}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Impact banner */}
      <section className="bg-fikir-green py-16 text-center lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Cada bolsa financia proyectos para la infancia en origen
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-fikir-cream/80">
            El 100% del beneficio neto —tras cubrir costes operativos— se reinvierte en proyectos para la infancia en origen. Sin intermediarios.
          </p>
          <Link
            href="/impacto"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fikir-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-fikir-brown transition-all duration-200 hover:bg-fikir-gold-light"
          >
            Descubrir el impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
