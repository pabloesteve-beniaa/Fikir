import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function VisualImpactBlock() {
  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold-dark">
            Impacto real
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Donde tu café cambia vidas
          </h2>
          <p className="mt-4 font-body text-lg text-fikir-brown-light leading-relaxed">
            No es marketing. Son proyectos con los que tenemos una conexión personal y directa.
            Lugares donde nuestro fundador vivió, trabajó y formó su vida.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Etiopía - Meki */}
          <div className="rounded-2xl overflow-hidden bg-fikir-cream">
            <div className="relative aspect-video">
              <Image
                src="/images/meki-grupo.jpg"
                alt="Niños del orfanato en Meki, Etiopía"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-fikir-green" />
                <span className="font-body text-xs font-semibold text-fikir-green uppercase tracking-wide">
                  Meki, Etiopía
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-fikir-brown">
                Orfanato en Meki
              </h3>
              <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                Donde nuestro fundador vivió y trabajó durante años.
                Tu café mejora directamente las condiciones de vida de estos niños.
              </p>
            </div>
          </div>

          {/* Kenia - Migori */}
          <div className="rounded-2xl overflow-hidden bg-fikir-cream">
            <div className="relative aspect-video">
              <Image
                src="/images/fundador-meki.jpg"
                alt="Centro de Formación Profesional de Migori, Kenia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-fikir-terracotta" />
                <span className="font-body text-xs font-semibold text-fikir-terracotta uppercase tracking-wide">
                  Migori, Kenia
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-fikir-brown">
                Centro de Formación Profesional
              </h3>
              <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                Formación profesional para jóvenes Kuria con las
                Hermanas Misioneras Sociales y la Fundación Pablo Horstmann.
              </p>
            </div>
          </div>

          {/* Uganda - Dokolo */}
          <div className="rounded-2xl overflow-hidden bg-fikir-cream">
            <div className="relative aspect-video">
              <Image
                src="/images/fundador-lalibela.jpg"
                alt="Colegio en Dokolo, Uganda con la Fundación Pablo Horstmann"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-fikir-moss" />
                <span className="font-body text-xs font-semibold text-fikir-moss uppercase tracking-wide">
                  Dokolo, Uganda
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-fikir-brown">
                Colegio en Dokolo
              </h3>
              <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                Colegio de infantil y primaria con la Fundación Pablo Horstmann.
                Educación, comedor y oportunidades para los niños y niñas de la comunidad.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to full impact page */}
        <div className="mt-12 text-center">
          <Link
            href="/impacto"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-fikir-green tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green-light cursor-pointer"
          >
            Conocer toda la historia
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
