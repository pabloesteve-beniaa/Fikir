import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Fikir Coffee. Cómo tratamos tus datos personales.",
  alternates: { canonical: "/privacidad" },
};

const LAST_UPDATED = "8 de mayo de 2026";

export default function PrivacidadPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-20 bg-fikir-brown lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl">
            Política de privacidad
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
              <strong>Aviso:</strong> esta plantilla recoge la información operativa
              actual de Fikir Coffee y debe ser revisada por un profesional jurídico
              antes de su publicación definitiva. Los apartados marcados como
              <em> [PENDIENTE]</em> requieren datos específicos.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">1. Responsable del tratamiento</h2>
            <ul className="mt-4 space-y-1">
              <li><strong>Titular:</strong> [PENDIENTE: razón social] (en adelante, &quot;Fikir Coffee&quot;).</li>
              <li><strong>NIF/CIF:</strong> [PENDIENTE].</li>
              <li><strong>Domicilio:</strong> [PENDIENTE], España.</li>
              <li><strong>Email de contacto:</strong> <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com">hola@fikircafe.com</a>.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">2. Datos que tratamos y finalidades</h2>
            <p className="mt-4">
              Tratamos exclusivamente los datos necesarios para los siguientes fines:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6">
              <li>
                <strong>Compra y entrega de pedidos.</strong> Datos de contacto, dirección
                de envío y pago, gestionados a través de Shopify Inc. para el procesamiento
                del checkout y los pagos.
              </li>
              <li>
                <strong>Newsletter y comunicaciones comerciales.</strong> Email facilitado
                con tu consentimiento expreso al suscribirte. Gestionado a través de Brevo
                (Sendinblue SAS).
              </li>
              <li>
                <strong>Formularios de contacto y empresas.</strong> Nombre, email, empresa
                y mensaje, transmitidos a Brevo para el envío del email a nuestra dirección.
              </li>
              <li>
                <strong>Analítica y mejora del sitio.</strong> Datos agregados de uso
                mediante Google Analytics, solo si has aceptado las cookies analíticas.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">3. Base legal</h2>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>Ejecución de contrato, para los pedidos.</li>
              <li>Consentimiento, para newsletter, formularios y cookies no esenciales.</li>
              <li>Interés legítimo, para prevención de fraude y seguridad del sitio.</li>
              <li>Cumplimiento de obligaciones legales (fiscales, contables).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">4. Conservación</h2>
            <p className="mt-4">
              Conservamos los datos durante el tiempo necesario para la finalidad para la
              que se recogieron y, posteriormente, durante los plazos legales aplicables
              (en particular, [PENDIENTE: 6 años para datos contables y fiscales]).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">5. Encargados y transferencias internacionales</h2>
            <p className="mt-4">
              Para prestar el servicio utilizamos los siguientes encargados de tratamiento:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li><strong>Shopify Inc.</strong> (Canadá / EEUU) — checkout y procesamiento de pago.</li>
              <li><strong>Sendinblue SAS (Brevo)</strong> (Francia) — newsletter y emails transaccionales.</li>
              <li><strong>Vercel Inc.</strong> (EEUU) — alojamiento del sitio.</li>
              <li><strong>Google LLC</strong> (EEUU) — analítica web (si aceptas cookies).</li>
              <li><strong>Meta Platforms Inc.</strong> (EEUU) — píxel de marketing (si aceptas cookies).</li>
            </ul>
            <p className="mt-4">
              Las transferencias fuera del EEE se amparan en las cláusulas contractuales
              tipo aprobadas por la Comisión Europea o decisiones de adecuación.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">6. Tus derechos</h2>
            <p className="mt-4">
              Puedes ejercer en cualquier momento tus derechos de acceso, rectificación,
              supresión, oposición, limitación y portabilidad escribiéndonos a{" "}
              <a className="underline text-fikir-green" href="mailto:hola@fikircafe.com">hola@fikircafe.com</a>.
              Si consideras que tu solicitud no ha sido atendida puedes presentar una
              reclamación ante la Agencia Española de Protección de Datos (
              <a className="underline text-fikir-green" href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-fikir-brown">7. Cookies</h2>
            <p className="mt-4">
              Para más información sobre el uso de cookies en el sitio consulta nuestra{" "}
              <Link href="/cookies" className="underline text-fikir-green">política de cookies</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
