import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Users, TrendingUp, Eye, Shield, Calendar, MapPin, Camera, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Descubre como Fikir Coffee reinvierte el 100% de sus beneficios en proyectos para la infancia en Etiopia y Kenia.",
};

const projects = [
  {
    icon: BookOpen,
    country: "Etiopia",
    region: "Yirgacheffe",
    title: "Programa de educacion",
    description:
      "Financiamos la construccion de aulas, suministro de material escolar y becas de estudio para ninos de las comunidades caficultoras. La educacion es la herramienta mas poderosa para romper el ciclo de pobreza. Tambien cubrimos necesidades basicas cuando es necesario.",
    stats: [
      { value: "200+", label: "Ninos beneficiados" },
      { value: "3", label: "Aulas construidas" },
      { value: "500+", label: "Kits escolares" },
    ],
    evidence: [
      { date: "Marzo 2026", text: "Entrega de 150 kits escolares en Yirgacheffe", location: "Yirgacheffe, Etiopia" },
      { date: "Enero 2026", text: "Inauguracion de la 3a aula del programa", location: "Yirgacheffe, Etiopia" },
    ],
    color: "bg-fikir-green",
    accent: "text-fikir-green",
  },
  {
    icon: Heart,
    country: "Kenia",
    region: "Nyeri",
    title: "Desarrollo infantil",
    description:
      "Impulsamos programas de desarrollo integral para ninos en Nyeri: educacion temprana, actividades extraescolares y oportunidades que abren puertas. Invertir en la infancia es invertir en el futuro de comunidades enteras.",
    stats: [
      { value: "150+", label: "Ninos beneficiados" },
      { value: "3", label: "Programas activos" },
      { value: "2", label: "Comunidades apoyadas" },
    ],
    evidence: [
      { date: "Febrero 2026", text: "Lanzamiento del programa de educacion temprana en Nyeri", location: "Nyeri, Kenia" },
      { date: "Noviembre 2025", text: "Inicio de actividades extraescolares para 80 ninos", location: "Nyeri, Kenia" },
    ],
    color: "bg-fikir-terracotta",
    accent: "text-fikir-terracotta",
  },
];

const principles = [
  {
    icon: TrendingUp,
    title: "100% reinvertido",
    description:
      "No retenemos beneficios. Todo el excedente despues de cubrir costes operativos se destina integramente a proyectos en origen.",
  },
  {
    icon: Eye,
    title: "Transparencia total",
    description:
      "Publicamos informes periodicos sobre a donde va cada euro. Creemos que la rendicion de cuentas es la base de la confianza.",
  },
  {
    icon: Shield,
    title: "Relacion directa",
    description:
      "Trabajamos directamente con cooperativas locales y organizaciones en terreno. Sin intermediarios que diluyan el impacto.",
  },
  {
    icon: Users,
    title: "Comunidad primero",
    description:
      "Los proyectos los eligen las comunidades, priorizando las necesidades de sus ninos. No imponemos soluciones desde fuera, acompanamos sus propias prioridades.",
  },
];

export default function ImpactoPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 bg-fikir-brown lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Nuestro impacto
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl lg:text-7xl">
              Tu cafe
              <br />
              <span className="text-fikir-gold">construye futuro</span>
            </h1>
            <p className="mt-8 font-body text-lg leading-relaxed text-fikir-cream/80 max-w-xl">
              No es solo un eslogan. Es nuestro modelo. El 100% del beneficio
              de Fikir se reinvierte en proyectos para la infancia
              en Etiopia y Kenia.
            </p>
          </div>
        </div>
      </section>

      {/* Impact numbers - clean, no duplicates */}
      <section className="py-16 bg-fikir-cream-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "+200", label: "Ninos beneficiados" },
              { value: "5", label: "Proyectos activos" },
              { value: "4", label: "Comunidades cafetaleras apoyadas" },
              { value: "3", label: "Aulas financiadas" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with evidence */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Proyectos activos
            </h2>
            <p className="mt-4 font-body text-lg text-fikir-brown-light">
              Cada cafe de Fikir esta vinculado a un proyecto real y verificable.
            </p>
          </div>

          <div className="space-y-20">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16 items-start">
                  {/* Image placeholder */}
                  <div className={`${project.color} rounded-3xl p-12 flex items-center justify-center lg:col-span-2 aspect-video lg:aspect-square`}>
                    <div className="text-center">
                      <project.icon className="h-16 w-16 text-fikir-cream/60 mx-auto" />
                      <p className="mt-4 font-heading text-2xl font-bold text-fikir-cream">
                        {project.country}
                      </p>
                      <p className="font-body text-sm text-fikir-cream/70">
                        {project.region}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 py-4">
                    <p className={`font-body text-xs font-semibold tracking-[0.2em] uppercase ${project.accent}`}>
                      {project.country} &middot; {project.region}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                      {project.title}
                    </h3>
                    <p className="mt-4 font-body text-base leading-relaxed text-fikir-brown-light">
                      {project.description}
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-6">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className={`font-heading text-3xl font-bold ${project.accent}`}>
                            {stat.value}
                          </p>
                          <p className="mt-1 font-body text-xs text-fikir-brown-light">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Evidence timeline */}
                    <div className="mt-8 border-t border-fikir-brown/10 pt-6">
                      <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-fikir-brown-light mb-4">
                        Ultimas actualizaciones
                      </h4>
                      <div className="space-y-4">
                        {project.evidence.map((ev) => (
                          <div key={ev.date} className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-fikir-cream-dark flex items-center justify-center shrink-0">
                              <Camera className="h-4 w-4 text-fikir-brown-light" />
                            </div>
                            <div>
                              <p className="font-body text-sm text-fikir-brown font-medium">
                                {ev.text}
                              </p>
                              <div className="mt-1 flex items-center gap-3">
                                <span className="flex items-center gap-1 font-body text-xs text-fikir-brown-light">
                                  <Calendar className="h-3 w-3" /> {ev.date}
                                </span>
                                <span className="flex items-center gap-1 font-body text-xs text-fikir-brown-light">
                                  <MapPin className="h-3 w-3" /> {ev.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency section - NEW */}
      <section className="py-24 bg-fikir-cream-dark lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Transparencia
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              A donde va tu dinero
            </h2>
            <p className="mt-4 font-body text-lg text-fikir-brown-light">
              Este es nuestro modelo. Sin letra pequena.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="bg-fikir-white rounded-2xl p-8 text-center">
                <p className="font-heading text-4xl font-bold text-fikir-brown">14,99&euro;</p>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">Precio por bolsa</p>
                <div className="mt-4 pt-4 border-t border-fikir-brown/10">
                  <p className="font-body text-xs text-fikir-brown-light uppercase tracking-wide">Ingresos</p>
                </div>
              </div>
              <div className="bg-fikir-white rounded-2xl p-8 text-center">
                <p className="font-heading text-4xl font-bold text-fikir-brown-light">~70%</p>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">Costes operativos</p>
                <div className="mt-4 pt-4 border-t border-fikir-brown/10">
                  <p className="font-body text-xs text-fikir-brown-light">Cafe verde, tueste, packaging, envio, logistica</p>
                </div>
              </div>
              <div className="bg-fikir-green rounded-2xl p-8 text-center">
                <p className="font-heading text-4xl font-bold text-fikir-cream">~30%</p>
                <p className="mt-2 font-body text-sm text-fikir-cream/80">Beneficio reinvertido</p>
                <div className="mt-4 pt-4 border-t border-fikir-cream/20">
                  <p className="font-body text-xs text-fikir-cream/70">Reinvertido en infancia en Etiopia y Kenia</p>
                </div>
              </div>
            </div>
            <p className="mt-6 font-body text-xs text-fikir-brown-light/60 text-center">
              Cifras orientativas. Publicaremos informes detallados periodicamente.
            </p>
          </div>
        </div>
      </section>

      {/* How the model works */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Nuestro modelo
            </p>
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Por que funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="p-8 rounded-2xl bg-fikir-white"
              >
                <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <principle.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-fikir-brown">
                  {principle.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-fikir-green text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Se parte del cambio
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            Con cada taza de Fikir, estas apoyando directamente a comunidades
            en Etiopia y Kenia. Tu cafe de la manana tiene mas poder del que
            crees.
          </p>
          <Link
            href="/tienda"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Comprar cafe con impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
