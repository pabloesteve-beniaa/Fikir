"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "fikir-cookie-consent";

type Consent = "accept" | "reject";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accept" || value === "reject") return value;
  return null;
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener("fikir:consent-change", onChange);
  return () => window.removeEventListener("fikir:consent-change", onChange);
}

export function useConsent(): Consent | null {
  return useSyncExternalStore(
    subscribeConsent,
    () => readConsent(),
    () => null,
  );
}

function writeConsent(value: Consent) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("fikir:consent-change", { detail: value }));
}

export default function CookieBanner() {
  const consent = useConsent();
  const [dismissed, setDismissed] = useState(false);

  if (consent !== null || dismissed) return null;

  function decide(value: Consent) {
    writeConsent(value);
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl bg-fikir-brown text-fikir-cream rounded-2xl shadow-2xl p-6 sm:p-8 border border-fikir-gold/20">
        <h2 className="font-heading text-xl font-bold text-fikir-gold">
          Cookies en Fikir Coffee
        </h2>
        <p className="mt-3 font-body text-sm text-fikir-cream/80 leading-relaxed">
          Usamos cookies necesarias para que la web funcione. Con tu permiso, usamos también
          cookies analíticas y de marketing para entender el uso del sitio y mejorar la experiencia.
          Puedes consultar el detalle en nuestra{" "}
          <Link href="/cookies" className="underline text-fikir-gold hover:text-fikir-gold-light">
            política de cookies
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => decide("reject")}
            className="px-5 py-3 rounded-lg border border-fikir-cream/30 font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-cream/10 cursor-pointer"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => decide("accept")}
            className="px-5 py-3 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
