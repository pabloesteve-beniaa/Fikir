/**
 * Shopify Storefront API client for Fikir Coffee.
 * Uses the modern Cart API (cartCreate, cartLinesAdd, cartLinesUpdate,
 * cartLinesRemove, cart query) — checkoutCreate was deprecated.
 *
 * The token is server-only (no NEXT_PUBLIC_ prefix), so these helpers
 * must be called from API route handlers, not from client components.
 */

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

let cachedClient: ReturnType<typeof createStorefrontApiClient> | null = null;

function client() {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured");
  }
  if (!cachedClient) {
    cachedClient = createStorefrontApiClient({
      storeDomain: SHOPIFY_STORE_DOMAIN,
      apiVersion: "2024-10",
      publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    });
  }
  return cachedClient;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    image?: { url: string; altText: string | null } | null;
    price: { amount: string; currencyCode: string };
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: CartLine[];
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product { title handle }
              image { url altText }
              price { amount currencyCode }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`;

type RawCart = Omit<Cart, "lines"> & {
  lines: { edges: { node: CartLine }[] };
};

function normalizeCart(raw: RawCart | null | undefined): Cart | null {
  if (!raw) return null;
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines: raw.lines.edges.map((edge) => edge.node),
  };
}

export async function createCart(): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const { data, errors } = await client().request<{
    cartCreate: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query);

  if (errors) throw new Error(errors.message || "cartCreate failed");
  return normalizeCart(data?.cartCreate?.cart);
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const { data, errors } = await client().request<{
    cartLinesAdd: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lines } });

  if (errors) throw new Error(errors.message || "cartLinesAdd failed");
  return normalizeCart(data?.cartLinesAdd?.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const { data, errors } = await client().request<{
    cartLinesUpdate: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lines } });

  if (errors) throw new Error(errors.message || "cartLinesUpdate failed");
  return normalizeCart(data?.cartLinesUpdate?.cart);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const { data, errors } = await client().request<{
    cartLinesRemove: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lineIds } });

  if (errors) throw new Error(errors.message || "cartLinesRemove failed");
  return normalizeCart(data?.cartLinesRemove?.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `;

  const { data, errors } = await client().request<{ cart: RawCart | null }>(
    query,
    { variables: { cartId } }
  );

  if (errors) throw new Error(errors.message || "getCart failed");
  return normalizeCart(data?.cart);
}
