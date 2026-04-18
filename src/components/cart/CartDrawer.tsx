"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function formatMoney(amount: string, currencyCode: string): string {
  const value = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currencyCode,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currencyCode}`;
  }
}

export default function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, updateItem, removeItem, loading } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-fikir-brown/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[95] h-full w-full max-w-md bg-fikir-cream shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito"
        aria-hidden={!drawerOpen}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-fikir-brown/10">
          <h2 className="font-heading text-xl font-bold text-fikir-brown">Tu carrito</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
            className="p-1 text-fikir-brown-light hover:text-fikir-brown transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-full bg-fikir-gold/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-fikir-gold" />
              </div>
              <p className="font-heading text-lg font-bold text-fikir-brown">
                Tu carrito está vacío
              </p>
              <p className="mt-2 font-body text-sm text-fikir-brown-light">
                Descubre nuestros cafés de especialidad en la tienda.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((line) => {
                const img = line.merchandise.image;
                return (
                  <li key={line.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-fikir-white shrink-0">
                      {img?.url && (
                        <Image
                          src={img.url}
                          alt={img.altText || line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-fikir-brown truncate">
                        {line.merchandise.product.title}
                      </p>
                      <p className="font-body text-xs text-fikir-brown-light mt-0.5">
                        {line.merchandise.title}
                      </p>
                      <p className="mt-1 font-body text-sm font-medium text-fikir-brown">
                        {formatMoney(
                          line.cost.totalAmount.amount,
                          line.cost.totalAmount.currencyCode
                        )}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center border border-fikir-brown/20 rounded-md">
                          <button
                            type="button"
                            disabled={loading || line.quantity <= 1}
                            onClick={() => updateItem(line.id, line.quantity - 1)}
                            className="p-1.5 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            aria-label="Restar cantidad"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 font-body text-sm text-fikir-brown tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            className="p-1.5 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            aria-label="Sumar cantidad"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => removeItem(line.id)}
                          className="p-1 text-fikir-brown-light hover:text-red-600 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <footer className="border-t border-fikir-brown/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-fikir-brown-light">Subtotal</span>
              <span className="font-heading text-lg font-bold text-fikir-brown">
                {formatMoney(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode
                )}
              </span>
            </div>
            <p className="font-body text-xs text-fikir-brown-light">
              Impuestos y envío calculados en el checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
            >
              Ir al checkout
            </a>
          </footer>
        )}
      </aside>
    </>
  );
}
