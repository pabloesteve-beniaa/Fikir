import { MapPin, ImageIcon } from "lucide-react";

export default function VisualImpactBlock() {
  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Impacto real
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Donde tu café cambia vidas
          </h2>
          <p className="mt-4 font-body text-lg text-fikir-brown-light leading-relaxed">
            Cada taza financia oportunidades reales para niños en comunidades como
            Meki (Etiopía) y Dokolo (Kenia).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Etiopía - Meki */}
          <div className="rounded-2xl overflow-hidden bg-fikir-cream">
            <div className="aspect-video bg-fikir-green/10 flex items-center justify-center">
              <div className="text-center p-8">
                <ImageIcon className="h-12 w-12 text-fikir-green/30 mx-auto" />
                <p className="mt-3 font-body text-sm text-fikir-green/60">
                  Foto del proyecto en Meki
                </p>
              </div>
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
                Donde el fundador de Fikir vivió y trabajó durante años.
                Tu café mejora directamente las condiciones de vida de estos niños.
              </p>
            </div>
          </div>

          {/* Kenia - Dokolo */}
          <div className="rounded-2xl overflow-hidden bg-fikir-cream">
            <div className="aspect-video bg-fikir-terracotta/10 flex items-center justify-center">
              <div className="text-center p-8">
                <ImageIcon className="h-12 w-12 text-fikir-terracotta/30 mx-auto" />
                <p className="mt-3 font-body text-sm text-fikir-terracotta/60">
                  Foto del proyecto en Dokolo
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-fikir-terracotta" />
                <span className="font-body text-xs font-semibold text-fikir-terracotta uppercase tracking-wide">
                  Dokolo, Kenia
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-fikir-brown">
                Fundación Pablo Horstmann
              </h3>
              <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                Nuevo proyecto para la infancia en desarrollo.
                Educación, oportunidades y futuro para niños en Dokolo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
