import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const footerLinks = {
  tienda: [
    { name: "Etiopia Yirgacheffe", href: "/producto/etiopia" },
    { name: "Kenia Nyeri", href: "/producto/kenia" },
    { name: "Uganda Mbale", href: "/producto/uganda" },
    { name: "Pack Degustacion", href: "/tienda" },
    { name: "Suscripcion", href: "/tienda" },
  ],
  marca: [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Impacto", href: "/impacto" },
    { name: "Empresas", href: "/empresas" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Politica de privacidad", href: "#" },
    { name: "Terminos y condiciones", href: "#" },
    { name: "Politica de cookies", href: "#" },
    { name: "Envios y devoluciones", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-fikir-brown text-fikir-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-transparente.png"
                alt="Fikir Café"
                width={560}
                height={843}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-fikir-cream/70 max-w-xs">
              Cafe de especialidad sin animo de lucro. Todo el beneficio vuelve
              al origen.
            </p>
            <p className="mt-6 font-body text-sm italic text-fikir-gold">
              &ldquo;Cafe con impacto en su origen&rdquo;
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Tienda
            </h3>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marca */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Fikir
            </h3>
            <ul className="space-y-3">
              {footerLinks.marca.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-body text-sm text-fikir-cream/70">
                hola@fikircoffee.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-fikir-cream/10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-fikir-cream/50">
            &copy; {new Date().getFullYear()} Fikir Coffee. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-fikir-cream/50 flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-fikir-gold fill-fikir-gold" /> para devolver al origen
          </p>
        </div>
      </div>
    </footer>
  );
}