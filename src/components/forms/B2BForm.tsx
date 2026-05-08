"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function B2BForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      company: formData.get("company"),
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind: "b2b" }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setError("No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a hola@fikircafe.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-lg bg-fikir-green/10 border border-fikir-green/20">
        <CheckCircle className="h-5 w-5 text-fikir-green shrink-0" />
        <p className="font-body text-sm text-fikir-brown">
          Solicitud recibida. Te respondemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="Nombre de la empresa"
          />
        </div>
        <div>
          <label htmlFor="b2b-name" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="b2b-name"
            name="name"
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="Tu nombre"
          />
        </div>
      </div>
      <div>
        <label htmlFor="b2b-email" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Email
        </label>
        <input
          type="email"
          id="b2b-email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
          placeholder="tu@empresa.com"
        />
      </div>
      <div>
        <label htmlFor="service" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Qué te interesa
        </label>
        <select
          id="service"
          name="service"
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors cursor-pointer"
        >
          <option value="">Selecciona una opción</option>
          <option value="oficina">Café para oficina</option>
          <option value="regalo">Regalos corporativos</option>
          <option value="rsc">RSC y eventos</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="b2b-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Mensaje
        </label>
        <textarea
          id="b2b-message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
          placeholder="Cuéntanos qué necesitas..."
        />
      </div>
      {error && (
        <p className="font-body text-sm text-fikir-terracotta" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Enviando..." : "Solicitar propuesta en 24h"}
      </button>
      <p className="font-body text-xs text-fikir-brown-light/60 text-center">
        Sin compromiso. Te respondemos en menos de 24 horas.
      </p>
    </form>
  );
}
