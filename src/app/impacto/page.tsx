import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Droplets, Users, TrendingUp, Eye, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Descubre como Fikir Coffee reinvierte el 100% de sus beneficios en proyectos sociales en Etiopia y Kenia.",
};

const projects = [
  {
    icon: BookOpen,
    country: "Etiopia",
    region: "Yirgacheffe",
    title: "Programa de educacion",
    description:
      "Financiamos la construccion de aulas, suministro de material escolar y becas de estudio para ninos de las comunidades caficultoras. La educacion es la herramienta mas poderosa para romper el ciclo de pobreza.",
    stats: [
      { value: "200+", label: "Ninos beneficiados" },
      { value: "3", label: "Aulas construidas" },
      { value: "500+", label: "Kits escolares" },
    ],
    color: "bg-fikir-green",
    accent: "text-fikir-green",
    image: "/images/impacto-recoleccion.png",
    imageAlt: "Agricultores cosechando cafe en Etiopia",
  },
  {
    icon: Droplets,
    country: "Kenia",
    region: "Nyeri",
    title: "Acceso a agua potable",
    description:
      "Construimos pozos y sistemas de purificacion de agua en comunidades rurales que dependen de fuentes no seguras. El acceso a agua limpia transforma la salud y la calidad de vida de familias enteras.",
    stats: [
      { value: "3", label: "Pozos construidos" },
      { value: "50+", label: "Familias con agua" },
      { value: "1000+", label: "Personas beneficiadas" },
    ],
    color: "bg-fikir-terracotta",
    accent: "text-fikir-terracotta",
    image: "/images/nosotros-comunidad.jpg",
    imageAlt: "Mujeres de la comunidad masai en Kenia",
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
      "Los proyectos los eligen las comunidades. No imponemos soluciones desde fuera, acompanamos sus propias prioridades.",
  },
];

export default function ImpactoPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero con foto documental */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/impacto-recoleccion.png"
          alt="Agricultores cosechando cafe en una plantacion africana"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fikir-brown via-fikir-brown/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-20 lg:pb-32 w-full">
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
              de Fikir se reinvierte en proyectos de educacion y agua potable
              en Etiopia y Kenia.
            </p>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="py-16 bg-fikir-cream-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "100%", label: "Beneficio reinvertido" },
              { value: "250+", label: "Personas beneficiadas" },
              { value: "2", label: "Paises de impacto" },
              { value: "5", label: "Proyectos activos" },
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

      {/* Projects */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Proyectos activos
            </h2>
            <p className="mt-4 font-body text-lg text-fikir-brown-light">
              Cada cafe de Fikir esta vinculado a un proyecto real.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project) => (
              <div
                key={project.title}
                className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16 items-start"
              >
                {/* Foto documental del proyecto */}
                <div className={`relative rounded-3xl overflow-hidden lg:col-span-2 aspect-video lg:aspect-square ${project.color}`}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fikir-brown/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-heading text-2xl font-bold text-fikir-cream">
                      {project.country}
                    </p>
                    <p className="font-body text-sm text-fikir-cream/80">
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
                </div>
              </div>
            ))}
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
              Como funciona Fikir
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
            Comprar cafe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}