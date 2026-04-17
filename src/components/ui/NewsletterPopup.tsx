"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("fikir-newsletter-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setIsOpen(false);
    localStorage.setItem("fikir-newsletter-dismissed", "true");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        console.error("Newsletter subscription error:", await res.json());
      }
    } catch (err) {
      console.error("Newsletter fetch error:", err);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
      setTimeout(() => handleClose(), 3000);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Suscríbete a la newsletter"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-fikir-brown/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-fikir-cream rounded-2xl shadow-2xl p-8 animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-fikir-brown-light hover:text-fikir-brown transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-fikir-gold/20 flex items-center justify-center">
                <Gift className="h-6 w-6 text-fikir-gold" />
              </div>
            </div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown text-center">
              Únete a la comunidad Fikir
            </h2>
            <p className="mt-2 font-body text-sm text-fikir-brown-light text-center leading-relaxed">
              Suscríbete y recibe un <span className="font-semibold text-fikir-green">5% de descuento</span>{" "}
              en tu primera compra. Además, serás el primero en conocer nuestro impacto.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                aria-label="Tu email"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Quiero mi 5% de descuento"}
              </button>
            </form>
            <p className="mt-3 font-body text-xs text-fikir-brown-light/60 text-center">
              Sin spam. Solo café e impacto.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-fikir-green/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-fikir-green" />
              </div>
            </div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">
              Bienvenido/a
            </h2>
            <p className="mt-2 font-body text-sm text-fikir-brown-light">
              Revisa tu email para obtener tu descuento.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
