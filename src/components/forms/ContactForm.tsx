"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setError("No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a hola@fikircafe.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-6 rounded-lg bg-fikir-green/10 border border-fikir-green/20">
        <CheckCircle className="h-5 w-5 text-fikir-green shrink-0" />
        <p className="font-body text-sm text-fikir-brown">
          Mensaje recibido. Te respondemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="tu@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Asunto
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors cursor-pointer"
        >
          <option value="">Selecciona un tema</option>
          <option value="pedido">Sobre mi pedido</option>
          <option value="producto">Sobre el café</option>
          <option value="impacto">Sobre el impacto</option>
          <option value="empresa">Propuesta para empresas</option>
          <option value="colaborar">Quiero colaborar</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
          placeholder="Cuéntanos..."
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
        {submitting ? "Enviando..." : "Enviar mensaje"}
      </button>
      <p className="font-body text-xs text-fikir-brown-light/60 text-center">
        Te respondemos en menos de 24 horas.
      </p>
    </form>
  );
}
