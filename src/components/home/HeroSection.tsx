import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-fikir-brown overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-fikir-brown via-fikir-brown/95 to-fikir-green/30" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-fikir-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-fikir-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold mb-6">
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
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
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

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light hover:shadow-lg cursor-pointer"
            >
              Comprar café
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/impacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-fikir-cream/30 font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-all duration-200 hover:bg-fikir-cream/10 hover:border-fikir-cream/50 cursor-pointer"
            >
              Ver impacto
            </Link>
          </div>

          {/* Trust metrics - real data only */}
          <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-fikir-cream/10 pt-8">
            <div>
              <p className="font-heading text-3xl font-bold text-fikir-gold">2</p>
              <p className="font-body text-xs text-fikir-cream/60 uppercase tracking-wide">
                Proyectos activos
              </p>
            </div>
            <div className="w-px h-12 bg-fikir-cream/10" />
            <div>
              <p className="font-heading text-3xl font-bold text-fikir-gold">2</p>
              <p className="font-body text-xs text-fikir-cream/60 uppercase tracking-wide">
                Comunidades
              </p>
            </div>
            <div className="w-px h-12 bg-fikir-cream/10" />
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
          </div>
        </div>
      </div>
    </section>
  );
}
