import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Fikir Coffee. Qué cookies usamos y cómo gestionarlas.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "8 de mayo de 2026";

export default function CookiesPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-20 bg-fikir-brown lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl">
            Política de cookies
          </h1>
          <p className="mt-4 font-body text-sm text-fikir-cream/60">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-20 bg-fikir-white lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 font-body text-base text-fikir-brown-light leading-relaxed space-y-10">
          <div className="p-4 rounded-lg bg-fikir-cream-dark/60 border border-fikir-gold/20">
            <p className="text-sm text-fikir-brown">
              <strong>Aviso:</strong> esta plantilla refleja el uso real de cookies
              en el sitio. Debe ser revisada por un profesional jurídico antes de
              su publicación definitiva.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">¿Qué son las cookies?</h2>
            <p className="mt-4">
              Las cookies son pequeños archivos que un sitio web guarda en tu
              dispositivo para recordar información. En Fikir Coffee solo usamos
              cookies estrictamente necesarias por defecto. El resto se cargan
              únicamente si das tu consentimiento explícito a través del banner
              que aparece en tu primera visita.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Tipos de cookies que usamos</h2>
            <div className="mt-6 space-y-6">
              <div className="p-6 rounded-xl bg-fikir-cream-dark/40">
                <h3 className="font-heading text-lg font-bold text-fikir-brown">
                  1. Cookies estrictamente necesarias
                </h3>
                <p className="mt-2 text-sm">
                  Permiten el funcionamiento básico del sitio: gestión de la
                  sesión, carrito de la compra y guardado de tu elección sobre
                  cookies. No pueden desactivarse.
                </p>
                <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                  <li><code className="text-fikir-brown">fikir-cookie-consent</code> — almacena tu preferencia (localStorage).</li>
                  <li><code className="text-fikir-brown">fikir-newsletter-dismissed</code> — recuerda si cerraste el popup (localStorage).</li>
                  <li><code className="text-fikir-brown">fikir-cart-id</code> — identifica tu carrito en Shopify.</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-fikir-cream-dark/40">
                <h3 className="font-heading text-lg font-bold text-fikir-brown">
                  2. Cookies analíticas (opcionales)
                </h3>
                <p className="mt-2 text-sm">
                  Solo se cargan si aceptas. Nos permiten entender de forma
                  agregada cómo se usa el sitio y qué podemos mejorar.
                </p>
                <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                  <li><strong>Google Analytics 4</strong> — proveedor: Google LLC.</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-fikir-cream-dark/40">
                <h3 className="font-heading text-lg font-bold text-fikir-brown">
                  3. Cookies de marketing (opcionales)
                </h3>
                <p className="mt-2 text-sm">
                  Solo se cargan si aceptas. Nos permiten medir la efectividad
                  de nuestras campañas y, en su caso, mostrar publicidad relevante.
                </p>
                <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                  <li><strong>Meta Pixel</strong> — proveedor: Meta Platforms Inc.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Cómo cambiar tu elección</h2>
            <p className="mt-4">
              Puedes revocar tu consentimiento en cualquier momento borrando
              <code> fikir-cookie-consent</code> de tu almacenamiento local
              o usando las herramientas de tu navegador para eliminar cookies.
              También puedes configurar tu navegador para bloquear todas las
              cookies; en ese caso, algunas partes del sitio pueden no funcionar
              correctamente.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Más información</h2>
            <p className="mt-4">
              Consulta también nuestra{" "}
              <Link href="/privacidad" className="underline text-fikir-green">política de privacidad</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
