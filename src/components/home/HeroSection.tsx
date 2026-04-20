import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex items-center bg-fikir-brown overflow-hidden min-h-[600px] lg:min-h-screen">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-fikir-brown via-fikir-brown/95 to-fikir-green/30" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-fikir-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-fikir-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl w-full px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold mb-5">
            Café de especialidad &middot; Sin ánimo de lucro
          </p>

          {/* Main headline */}
          <h1 className="font-heading text-5xl font-bold leading-tight text-fikir-cream sm:text-6xl lg:text-7xl xl:text-8xl">
            Café de especialidad de Etiopía y Kenia.
            <br />
            <span className="text-fikir-gold">El beneficio íntegro, para la infancia en origen.</span>
          </h1>

          {/* Clear value proposition - childhood focused */}
          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-fikir-cream/90 sm:text-xl">
            Sin ánimo de lucro. Cada bolsa que compras financia directamente a los niños de las comunidades donde nace tu café.
          </p>

          {/* Micro trust badges */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
            {[
              "Café de especialidad",
              "Sin ánimo de lucro",
              "Impacto real en origen",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-fikir-gold shrink-0" />
                <span className="font-body text-sm text-fikir-cream/80">{badge}</span>
              </div>
            ))}
          </div>

          {/* CTAs — primary vs secondary */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase shadow-lg shadow-fikir-gold/20 transition-all duration-200 hover:bg-fikir-gold-light hover:shadow-xl hover:shadow-fikir-gold/30 cursor-pointer"
            >
              Comprar café
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/impacto"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-semibold text-fikir-cream/80 tracking-wide uppercase transition-colors duration-200 hover:text-fikir-gold cursor-pointer"
            >
              Ver impacto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust metrics — only strong ones */}
          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-fikir-cream/10 pt-6">
            <div>
              <p className="font-heading text-3xl font-bold text-fikir-gold">100%</p>
              <p className="font-body text-xs text-fikir-cream/60 uppercase tracking-wide">
                Beneficio neto reinvertido
              </p>
            </div>
            <div className="w-px h-12 bg-fikir-cream/10" />
            <div>
              <p className="font-heading text-3xl font-bold text-fikir-gold">85+</p>
              <p className="font-body text-xs text-fikir-cream/60 uppercase tracking-wide">
                Puntuación SCA
              </p>
            </div>
            <div className="w-px h-12 bg-fikir-cream/10" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-fikir-gold shrink-0" />
              <p className="font-body text-xs text-fikir-cream/80 uppercase tracking-wide">
                Proyectos en marcha en Etiopía y Kenia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
