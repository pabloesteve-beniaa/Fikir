import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso y compra en Fikir Coffee.",
  alternates: { canonical: "/terminos" },
};

const LAST_UPDATED = "8 de mayo de 2026";

export default function TerminosPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-20 bg-fikir-brown lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl">
            Términos y condiciones
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
              <strong>Aviso:</strong> esta plantilla recoge los términos operativos
              actuales y debe ser revisada por un profesional jurídico antes de
              su publicación definitiva. Los apartados marcados <em>[PENDIENTE]</em>
              requieren datos específicos.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">1. Identificación del titular</h2>
            <p className="mt-4">
              [PENDIENTE: razón social], con NIF [PENDIENTE], domicilio en
              [PENDIENTE] (España), email <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com">hola@fikircafe.com</a>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">2. Objeto</h2>
            <p className="mt-4">
              Las presentes condiciones regulan la navegación, el uso del sitio
              www.fikircafe.com y la compra de los productos ofrecidos a través
              del mismo.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">3. Productos y precios</h2>
            <p className="mt-4">
              Los precios mostrados incluyen el IVA aplicable. La disponibilidad
              de los productos puede variar; en caso de no disponibilidad
              tras la confirmación, te ofreceremos un producto similar o
              reembolsaremos íntegramente el importe.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">4. Proceso de compra</h2>
            <p className="mt-4">
              El proceso de compra y los pagos se gestionan a través de Shopify
              Inc. Aceptamos los métodos de pago habilitados (tarjeta de crédito
              o débito, Bizum y otros indicados en el checkout). Recibirás un
              email con la confirmación de pedido.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">5. Envíos</h2>
            <p className="mt-4">
              Las condiciones de envío, plazos y zonas de cobertura están
              detalladas en nuestra{" "}
              <Link href="/envios" className="underline text-fikir-green">página de envíos y devoluciones</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">6. Derecho de desistimiento</h2>
            <p className="mt-4">
              Como consumidor tienes derecho a desistir del contrato en un plazo
              de 14 días naturales desde la recepción del producto, sin
              necesidad de justificación. Para ejercerlo, escríbenos a
              <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com"> hola@fikircafe.com</a>.
              No se admiten devoluciones de productos abiertos por motivos de
              salubridad, salvo defecto.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">7. Garantía y reclamaciones</h2>
            <p className="mt-4">
              Como consumidor dispones de los derechos legalmente reconocidos
              en materia de productos defectuosos. Para cualquier reclamación
              puedes acudir a la plataforma europea de resolución de litigios
              en línea: <a className="underline text-fikir-green" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">8. Propiedad intelectual</h2>
            <p className="mt-4">
              Los contenidos del sitio (textos, imágenes, marcas) son propiedad
              de Fikir Coffee o se utilizan con autorización. Queda prohibida
              su reproducción sin consentimiento previo.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">9. Privacidad</h2>
            <p className="mt-4">
              El tratamiento de datos personales se rige por nuestra{" "}
              <Link href="/privacidad" className="underline text-fikir-green">política de privacidad</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">10. Legislación aplicable</h2>
            <p className="mt-4">
              Estas condiciones se rigen por la legislación española. Para
              cualquier controversia, las partes se someten a los juzgados y
              tribunales del domicilio del consumidor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
