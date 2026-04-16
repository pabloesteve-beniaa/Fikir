import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Heart, Users, TrendingUp, Eye, Shield, Calendar, MapPin, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Descubre como Fikir Coffee reinvierte el 100% de sus beneficios en proyectos para la infancia en Etiopía y Kenia.",
};

const projects = [
  {
    icon: BookOpen,
    country: "Etiopía",
    region: "Meki",
    title: "Orfanato en Meki",
    description:
      "El fundador de Fikir vivió y trabajó en este orfanato en Meki durante dos años, seis meses de ellos en terreno. Esta conexión personal es el corazón de Fikir. Cada bolsa de Etiopía contribuye directamente a mejorar las condiciones de vida, el material educativo y las necesidades basicas de los niños que aquí crecen.",
    stats: [
      { value: "Proyecto activo", label: "" },
      { value: "Conexión directa", label: "" },
      { value: "Meki, Etiopía", label: "" },
    ],
    evidence: [
      { date: "2024-presente", text: "Apoyo continuo al orfanato donde el fundador vivió", location: "Meki, Etiopía" },
    ],
    color: "bg-fikir-green",
    accent: "text-fikir-green",
    imagePlaceholder: "Foto del orfanato en Meki",
  },
  {
    icon: Heart,
    country: "Kenia",
    region: "Dokolo",
    title: "Fundación Pablo Horstmann",
    description:
      "Junto a la Fundación Pablo Horstmann, Fikir apoya el desarrollo de un nuevo proyecto para la infancia en Dokolo. Un compromiso que nace de la experiencia directa del fundador en Kenia y de la relación con esta fundación de referencia en cooperación infantil.",
    stats: [
      { value: "En desarrollo", label: "" },
      { value: "Fundación Pablo Horstmann", label: "" },
      { value: "Dokolo, Kenia", label: "" },
    ],
    evidence: [
      { date: "2025-presente", text: "Desarrollo del proyecto infantil con Fundación Pablo Horstmann", location: "Dokolo, Kenia" },
    ],
    color: "bg-fikir-terracotta",
    accent: "text-fikir-terracotta",
    imagePlaceholder: "Foto del proyecto en Dokolo",
  },
];

const principles = [
  {
    icon: TrendingUp,
    title: "100% reinvertido",
    description:
      "No retenemos beneficios. Todo el excedente después de cubrir costes operativos se destina íntegramente a proyectos en origen.",
  },
  {
    icon: Eye,
    title: "Transparencia total",
    description:
      "Publicamos informes periódicos sobre a donde va cada euro. Creemos que la rendición de cuentas es la base de la confianza.",
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
      "Los proyectos los eligen las comunidades, priorizando las necesidades de sus niños. No imponemos soluciones desde fuera, acompañamos sus propias prioridades.",
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
              Tu café
              <br />
              <span className="text-fikir-gold">construye futuro</span>
            </h1>
            <p className="mt-8 font-body text-lg leading-relaxed text-fikir-cream/80 max-w-xl">
              El 100% del beneficio de Fikir se reinvierte en proyectos para la infancia en Etiopía y Kenia.
            </p>
          </div>
        </div>
      </section>

      {/* Mas que café */}
      <section className="py-20 bg-fikir-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Mas que café, oportunidades reales
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
              Despues de vivir en Kenia y Etiopía y formar alli parte de su vida, el fundador de Fikir sintió una deuda personal con estas comunidades. Fikir nace de esa conexión: no como un proyecto distante, sino como algo profundamente personal.
            </p>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="py-16 bg-fikir-cream-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "2", label: "Proyectos activos" },
              { value: "2", label: "Comunidades apoyadas" },
              { value: "100%", label: "Beneficio reinvertido" },
              { value: "85+", label: "Puntuación SCA" },
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
              Cada café de Fikir esta vinculado a un proyecto real y verificable.
            </p>
          </div>

          <div className="space-y-20">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16 items-start">
                  {/* Image placeholder */}
                  <div className="rounded-3xl overflow-hidden lg:col-span-2 relative aspect-video lg:aspect-square">
                    <Image
                      src={project.region === "Meki" ? "/images/meki-orfanato.jpg" : "/images/fundador-lalibela.jpg"}
                      alt={project.region === "Meki" ? "Orfanato en Meki, Etiopía" : "Pablo en Kenia"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
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
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <p className={`font-heading text-sm font-bold ${project.accent}`}>
                            {stat.value}
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

                    {/* Media: real photo for Meki, YouTube embed for Dokolo */}
                    {project.region === "Meki" ? (
                      <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                          src="/images/meki-grupo.jpg"
                          alt="Pablo con los niños del orfanato en Meki"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </div>
                    ) : (
                      <div className="mt-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden">
                          <iframe
                            src="https://www.youtube.com/embed/0HcMMGiaruw"
                            title="Proyecto Fikir en Dokolo con Fundación Pablo Horstmann"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        {/* FPH partner logo */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="relative w-10 h-10 shrink-0">
                            <Image
                              src="/images/logo-fph.png"
                              alt="Logo Fundación Pablo Horstmann"
                              fill
                              className="object-contain"
                              sizes="40px"
                            />
                          </div>
                          <p className="font-body text-xs text-fikir-brown-light">
                            En colaboración con la Fundación Pablo Horstmann
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency section */}
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
              Este es nuestro modelo. Sin letra pequeña.
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
                  <p className="font-body text-xs text-fikir-brown-light">Café verde, tueste, packaging, envío, logistica</p>
                </div>
              </div>
              <div className="bg-fikir-green rounded-2xl p-8 text-center">
                <p className="font-heading text-4xl font-bold text-fikir-cream">~30%</p>
                <p className="mt-2 font-body text-sm text-fikir-cream/80">Beneficio reinvertido</p>
                <div className="mt-4 pt-4 border-t border-fikir-cream/20">
                  <p className="font-body text-xs text-fikir-cream/70">Reinvertido en infancia en Etiopía y Kenia</p>
                </div>
              </div>
            </div>
            <p className="mt-6 font-body text-xs text-fikir-brown-light/60 text-center">
              Desglose aproximado. Actualizaremos con datos reales a medida que crezcamos.
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
            en Etiopía y Kenia. Tu café de la mañana tiene mas poder del que
            crees.
          </p>
          <Link
            href="/tienda"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Comprar café con impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
