import { packs } from "@/data/products";
import { getProductByHandle, isShopifyConfigured } from "@/lib/shopify";
import SuscripcionClient from "./SuscripcionClient";

export const revalidate = 300;

const FALLBACK = packs.find((p) => p.handle === "suscripcion");
const SHOPIFY_HANDLES = ["suscripcion", "suscripcion-mensual"];

export default async function SuscripcionPage() {
  let data = null;
  if (isShopifyConfigured()) {
    for (const handle of SHOPIFY_HANDLES) {
      try {
        data = await getProductByHandle(handle);
        if (data) break;
      } catch {
        // try next handle
      }
    }
  }

  if (data) {
    const variant = data.variants[0] ?? null;
    const plans = data.sellingPlanGroups[0]?.sellingPlans ?? [];
    return (
      <SuscripcionClient
        variantId={variant?.id ?? null}
        sellingPlans={plans}
        title={data.title}
        description={data.description || FALLBACK?.description || ""}
        priceAmount={data.priceRange.minVariantPrice.amount}
        priceCurrency={data.priceRange.minVariantPrice.currencyCode}
        imageUrl={data.featuredImage?.url ?? null}
        imageAlt={data.featuredImage?.altText ?? null}
        availableForSale={data.availableForSale}
      />
    );
  }

  // Fallback: Shopify unavailable → render the static editorial version
  // so the page still works before the product is wired up.
  return (
    <SuscripcionClient
      variantId={FALLBACK?.shopifyVariantId ?? null}
      sellingPlans={[]}
      title={FALLBACK?.name ?? "Suscripción Mensual"}
      description={FALLBACK?.description ?? ""}
      priceAmount={(FALLBACK?.price ?? 12.99).toFixed(2)}
      priceCurrency={FALLBACK?.currency ?? "EUR"}
      imageUrl={null}
      imageAlt={null}
      availableForSale={true}
    />
  );
}
