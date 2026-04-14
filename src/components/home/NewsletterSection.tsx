"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to email service (Mailchimp, Klaviyo, etc.)
    setSubmitted(true);
  }

  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center mb-6">
            <Mail className="h-6 w-6 text-fikir-gold" />
          </div>

          <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Unete a la comunidad
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-fikir-brown-light">
            Recibe novedades sobre nuestro impacto, nuevos origenes y un{" "}
            <span className="font-semibold text-fikir-green">
              5% de descuento
            </span>{" "}
            en tu primera compra.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-5 py-4 rounded-lg border border-fikir-brown/10 bg-fikir-cream font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                aria-label="Tu email"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light shrink-0 cursor-pointer"
              >
                Suscribirme
              </button>
            </form>
          ) : (
            <div className="mt-8 flex items-center justify-center gap-3 p-4 rounded-lg bg-fikir-green/5">
              <CheckCircle className="h-5 w-5 text-fikir-green" />
              <p className="font-body text-sm font-medium text-fikir-green">
                Bienvenido/a. Revisa tu email para obtener tu descuento.
              </p>
            </div>
          )}

          <p className="mt-4 font-body text-xs text-fikir-brown-light/50">
            Sin spam. Solo cafe, impacto y cosas que importan.
          </p>
        </div>
      </div>
    </section>
  );
}
