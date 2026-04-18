"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a hola@fikircoffee.com.");
      }
    } catch (err) {
      console.error("Contacto fetch error:", err);
      setError("Error de conexión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-fikir-cream rounded-2xl p-8 lg:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-fikir-green/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-fikir-green" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-fikir-brown">¡Mensaje enviado!</h3>
        <p className="mt-2 font-body text-sm text-fikir-brown-light">
          Hemos recibido tu mensaje. Te responderemos en menos de 24 horas laborables.
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
              name="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
              placeholder="tu@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Mensaje
          </label>
          <textarea
            id="contact-message"
            name="mensaje"
            rows={5}
            required
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
            placeholder="Cuéntanos..."
          />
        </div>

        {error && (
          <p className="font-body text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Enviando..." : "Enviar mensaje"}
        </button>
        <p className="font-body text-xs text-fikir-brown-light/60 text-center">
          Te respondemos en menos de 24 horas.
        </p>
      </form>
    </div>
  );
}
