"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", newsletter: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-fikir-cream rounded-2xl p-8 lg:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-fikir-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-fikir-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-fikir-brown">¡Mensaje enviado!</h3>
        <p className="mt-2 font-body text-sm text-fikir-brown-light">
          Te respondemos en menos de 24 horas laborables. Revisa también tu bandeja de entrada.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-fikir-cream rounded-2xl p-8 lg:p-12">
      <h2 className="font-heading text-2xl font-bold text-fikir-brown mb-8">
        Envíanos un mensaje
      </h2>
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
              value={form.name}
              onChange={handleChange}
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
              value={form.email}
              onChange={handleChange}
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
            value={form.subject}
            onChange={handleChange}
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
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
            placeholder="Cuéntanos..."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-fikir-brown/20 text-fikir-green focus:ring-fikir-gold/50 cursor-pointer"
          />
          <label htmlFor="newsletter" className="font-body text-sm text-fikir-brown-light cursor-pointer">
            Quiero recibir novedades e historias de impacto de Fikir Coffee (sin spam, cancela cuando quieras)
          </label>
        </div>

        {status === "error" && (
          <p className="font-body text-sm text-red-600">
            Algo salió mal. Por favor, inténtalo de nuevo o escríbenos directamente a hola@fikircoffee.com
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </button>
        <p className="font-body text-xs text-fikir-brown-light/60 text-center">
          Te respondemos en menos de 24 horas. Al enviar aceptas nuestra{" "}
          <a href="/privacidad" className="underline">política de privacidad</a>.
        </p>
      </form>
    </div>
  );
}
