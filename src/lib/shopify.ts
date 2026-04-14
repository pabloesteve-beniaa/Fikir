/**
 * Shopify Storefront API integration for Fikir Coffee.
 *
 * To connect:
 * 1. Set NEXT_PUBLIC_SHOPIFY_DOMAIN in .env.local (e.g. "fikir-coffee.myshopify.com")
 * 2. Set NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local
 * 3. Products, checkout, and cart will automatically use Shopify as backend
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

const SHOPIFY_GRAPHQL_URL = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
  : "";

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured. Set environment variables.");
  }

  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

export async function getProducts() {
  return shopifyFetch(`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
            variants(first: 10) {
              edges { node { id title priceV2 { amount currencyCode } } }
            }
          }
        }
      }
    }
  `);
}

export async function getProductByHandle(handle: string) {
  return shopifyFetch(`
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 5) { edges { node { url altText } } }
        variants(first: 10) {
          edges { node { id title priceV2 { amount currencyCode } } }
        }
      }
    }
  `, { handle });
}

export async function createCheckout(variantId: string, quantity: number = 1) {
  return shopifyFetch(`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors { message field }
      }
    }
  `, {
    input: {
      lineItems: [{ variantId, quantity }],
    },
  });
}

/**
 * Get the checkout URL for a product.
 * When Shopify is not configured, returns "#" as a placeholder.
 */
export function getCheckoutUrl(variantId?: string): string {
  if (!isShopifyConfigured()) {
    return "#shopify-not-configured";
  }
  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`;
}
