import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    value: "Meki",
    label: "Orfanato apoyado en Etiopía",
    color: "text-fikir-green",
  },
  {
    icon: GraduationCap,
    value: "Migori",
    label: "Centro de Formación Profesional en Kenia",
    color: "text-fikir-terracotta",
  },
  {
    icon: Users,
    value: "100%",
    label: "Beneficio reinvertido en infancia",
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
              Proyectos reales,
              <br />historias reales
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
              No es marketing. Son proyectos con los que el equipo fundador de
              Fikir tiene una conexión personal y directa. Lugares donde
              convivió, trabajó y formó parte de su vida.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-fikir-green shrink-0" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-fikir-brown">
                    Meki, Etiopía &mdash; Orfanato
                  </h4>
                  <p className="font-body text-sm text-fikir-brown-light mt-1">
                    El equipo fundador de Fikir convivió y trabajó aquí
                    durante años. Tu café mejora directamente la vida de estos
                    niños.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-fikir-terracotta shrink-0" />
                <div>
                  <h4 className="font-body text-sm font-semibold text-fikir-brown">
                    Migori, Kenia &mdash; Fundación Pablo Horstmann
                  </h4>
                  <p className="font-body text-sm text-fikir-brown-light mt-1">
                    Centro de Formación Profesional Kuria: talleres técnicos
                    para jóvenes de la comunidad Kuria, con foco en igualdad
                    de género y prevención de la MGF.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/impacto"
              className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold text-fikir-green tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green-light cursor-pointer"
            >
              Conocer toda la historia
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
