import Link from "next/link";
import { ArrowRight, BookOpen, Droplets, Users } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    value: "200+",
    label: "Ninos con acceso a educacion",
    color: "text-fikir-green",
  },
  {
    icon: Droplets,
    value: "3",
    label: "Pozos de agua potable financiados",
    color: "text-fikir-terracotta",
  },
  {
    icon: Users,
    value: "50+",
    label: "Familias beneficiadas directamente",
    color: "text-fikir-gold",
  },
];

export default function ImpactSection() {
  return (
    <section className="py-24 bg-fikir-cream-dark lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Nuestro impacto
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Cada taza deja huella
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
              No es marketing. Es nuestro modelo. Fikir existe para devolver
              al origen lo que el cafe nos da. Sin intermediarios, sin
              beneficios ocultos. Transparencia total.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-fikir-green shrink-0" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-fikir-brown">
                    Etiopia &mdash; Educacion
                  </h4>
                  <p className="font-body text-sm text-fikir-brown-light mt-1">
                    Construccion de aulas, material escolar y becas para
                    ninos en las comunidades caficultoras de Yirgacheffe.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-fikir-terracotta shrink-0" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-fikir-brown">
                    Kenia &mdash; Agua potable
                  </h4>
                  <p className="font-body text-sm text-fikir-brown-light mt-1">
                    Pozos de agua y sistemas de purificacion para las
                    comunidades rurales de Nyeri.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/impacto"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold text-fikir-green tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green-light cursor-pointer"
            >
              Ver todo nuestro impacto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-fikir-white rounded-2xl p-8 text-center lg:text-left lg:flex lg:items-center lg:gap-6"
              >
                <div className="mx-auto lg:mx-0 w-14 h-14 rounded-full bg-fikir-cream flex items-center justify-center shrink-0">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="mt-4 lg:mt-0">
                  <p className={`font-heading text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-fikir-brown-light mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
