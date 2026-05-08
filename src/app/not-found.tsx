import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, ArrowRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o se ha movido.",
};

export default function NotFound() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-24 bg-fikir-cream lg:py-32 min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-fikir-gold/10 flex items-center justify-center">
            <Coffee className="h-7 w-7 text-fikir-gold-dark" />
          </div>
          <p className="mt-6 font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold-dark">
            Error 404
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-brown sm:text-6xl">
            Página no encontrada
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            La página que buscas no existe o se ha movido. ¿Te apetece un café mientras tanto?
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
            >
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-fikir-brown/20 font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-brown/5 cursor-pointer"
            >
              Ver la tienda
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
