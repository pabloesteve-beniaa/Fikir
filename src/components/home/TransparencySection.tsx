import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TransparencySection() {
  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Transparencia
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Donde va tu dinero
          </h2>
          <p className="mt-4 font-body text-lg text-fikir-brown-light">
            Nuestro modelo es simple. Sin letra pequena.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="bg-fikir-cream rounded-2xl p-8 text-center">
              <p className="font-heading text-4xl font-bold text-fikir-brown">14,99&euro;</p>
              <p className="mt-2 font-body text-sm text-fikir-brown-light">Precio por bolsa</p>
              <div className="mt-4 pt-4 border-t border-fikir-brown/10">
                <p className="font-body text-xs text-fikir-brown-light uppercase tracking-wide">Ingresos</p>
              </div>
            </div>
            <div className="bg-fikir-cream rounded-2xl p-8 text-center">
              <p className="font-heading text-4xl font-bold text-fikir-brown-light">~70%</p>
              <p className="mt-2 font-body text-sm text-fikir-brown-light">Costes operativos</p>
              <div className="mt-4 pt-4 border-t border-fikir-brown/10">
                <p className="font-body text-xs text-fikir-brown-light">Cafe, tueste, packaging, envio</p>
              </div>
            </div>
            <div className="bg-fikir-green rounded-2xl p-8 text-center">
              <p className="font-heading text-4xl font-bold text-fikir-cream">~30%</p>
              <p className="mt-2 font-body text-sm text-fikir-cream/80">Reinvertido en infancia</p>
              <div className="mt-4 pt-4 border-t border-fikir-cream/20">
                <p className="font-body text-xs text-fikir-cream/70">100% a proyectos infantiles</p>
              </div>
            </div>
          </div>
          <p className="mt-6 font-body text-xs text-fikir-brown-light/60 text-center">
            Cifras orientativas. Publicaremos informes detallados periodicamente.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/impacto"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-fikir-green tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green-light cursor-pointer"
            >
              Ver desglose completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
