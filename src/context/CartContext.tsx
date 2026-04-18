"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Cart } from "@/lib/shopify";

const CART_ID_STORAGE_KEY = "fikir-cart-id";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function postCart(body: object): Promise<Cart | null> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Cart API ${res.status}`);
  const data = await res.json();
  return (data?.cart as Cart | null) ?? null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const storedId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_STORAGE_KEY) : null;
    if (!storedId) return;

    fetch(`/api/cart?cartId=${encodeURIComponent(storedId)}`)
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
          return;
        }
        const data = await res.json();
        if (data?.cart) {
          setCart(data.cart);
        } else {
          // Cart expired or not found
          localStorage.removeItem(CART_ID_STORAGE_KEY);
        }
      })
      .catch(() => localStorage.removeItem(CART_ID_STORAGE_KEY));
  }, []);

  // Persist cartId whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cart?.id) {
      localStorage.setItem(CART_ID_STORAGE_KEY, cart.id);
    }
  }, [cart?.id]);

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true);
      try {
        const updated = await postCart({
          action: "add",
          cartId: cart?.id,
          lines: [{ merchandiseId, quantity }],
        });
        if (updated) setCart(updated);
        setDrawerOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await postCart({
          action: "update",
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        });
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await postCart({
          action: "remove",
          cartId: cart.id,
          lineIds: [lineId],
        });
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateItem,
      removeItem,
    }),
    [cart, loading, drawerOpen, addItem, updateItem, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
