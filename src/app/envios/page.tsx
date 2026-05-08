import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos y devoluciones",
  description: "Plazos, zonas de envío y política de devoluciones de Fikir Coffee.",
  alternates: { canonical: "/envios" },
};

const LAST_UPDATED = "8 de mayo de 2026";

export default function EnviosPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-20 bg-fikir-brown lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Información práctica
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl">
            Envíos y devoluciones
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
              <strong>Aviso:</strong> los plazos, tarifas y zonas de cobertura
              son los habituales del proyecto. Cualquier cambio operativo
              (zonas adicionales, transportistas) debe actualizarse en este
              documento.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Zonas de envío</h2>
            <p className="mt-4">
              Enviamos a cualquier punto de la <strong>España peninsular</strong>.
              Si vives en Baleares, Canarias, Ceuta o Melilla, escríbenos a{" "}
              <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com">hola@fikircafe.com</a>{" "}
              y valoramos un envío especial.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Plazos</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Preparación: 24-48 h laborables desde la confirmación del pedido.</li>
              <li>Tránsito: 3-5 días laborables a la España peninsular.</li>
              <li>Recibirás un email con el número de seguimiento cuando salga.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Tarifas</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li><strong>Envío estándar peninsular:</strong> [PENDIENTE: tarifa].</li>
              <li><strong>Envío gratuito</strong> a partir de 50 € de pedido.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Devoluciones</h2>
            <p className="mt-4">
              Como consumidor dispones de 14 días naturales desde la recepción
              para desistir de la compra. Para ejercerlo, escríbenos a{" "}
              <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com">hola@fikircafe.com</a>.
              Por motivos de salubridad, las bolsas abiertas no son
              elegibles para devolución, salvo defecto de fabricación.
            </p>
            <p className="mt-3">
              Si el producto llega defectuoso o dañado, ponte en contacto con
              nosotros en las primeras 48 h y lo solucionamos sin coste para ti.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">Más información</h2>
            <p className="mt-4">
              Para cualquier duda sobre tu pedido, consulta también nuestros{" "}
              <Link href="/terminos" className="underline text-fikir-green">términos y condiciones</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
