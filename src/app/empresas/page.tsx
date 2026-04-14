import type { Metadata } from "next";
import { Building2, Gift, Heart, Coffee, CheckCircle, ArrowRight, MessageSquare, Package, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Empresas",
  description:
    "Cafe con proposito para tu empresa. Oficinas, eventos y regalos corporativos con impacto social.",
};

const services = [
  {
    icon: Building2,
    title: "Cafe para oficinas",
    description:
      "Lleva cafe de especialidad a tu oficina. Tus empleados disfrutaran de un cafe excepcional mientras tu empresa apoya proyectos sociales en origen.",
    features: [
      "Cafe de especialidad SCA 85+",
      "Suministro recurrente personalizado",
      "Grano o molido segun tus necesidades",
      "Certificado de impacto social",
    ],
  },
  {
    icon: Gift,
    title: "Regalos corporativos",
    description:
      "Un regalo con significado. Packs personalizados de cafe de especialidad con la historia de impacto. Perfecto para clientes, partners y equipo.",
    features: [
      "Packs personalizados con tu marca",
      "Tarjeta con la historia de impacto",
      "Desde 25 unidades",
      "Opciones de grano, molido o mixto",
    ],
  },
  {
    icon: Heart,
    title: "RSC y eventos",
    description:
      "Asocia tu marca con un proposito real. Fikir puede ser parte de tu estrategia de responsabilidad social corporativa o de tus eventos de empresa.",
    features: [
      "Co-branding con impacto",
      "Informe de impacto personalizado",
      "Activaciones para eventos",
      "Charlas sobre cafe e impacto social",
    ],
  },
];

const process = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Entendemos tu necesidad",
    description: "Hablamos contigo para conocer que buscas: cafe para oficina, regalos, eventos o RSC.",
  },
  {
    step: "02",
    icon: Package,
    title: "Disenamos tu propuesta",
    description: "Te preparamos una propuesta personalizada con cantidades, formatos y branding adaptado.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Entregamos cafe + impacto",
    description: "Recibes cafe excepcional y un certificado de impacto real para compartir con tu equipo.",
  },
];

export default function EmpresasPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 bg-fikir-brown lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Para empresas
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl lg:text-7xl">
              Cafe con proposito
              <br />
              <span className="text-fikir-gold">para tu empresa</span>
            </h1>
            <p className="mt-8 font-body text-lg leading-relaxed text-fikir-cream/80 max-w-xl">
              Cafe de especialidad que genera impacto social real. Para tu
              oficina, tus clientes o tus eventos. Sin animo de lucro, con
              todo el sabor.
            </p>
            <a
              href="#contacto-b2b"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
            >
              Solicitar propuesta en 24h
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-fikir-cream hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-fikir-gold" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-fikir-brown">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-fikir-green mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-fikir-brown-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work - NEW process block */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Proceso
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Como trabajamos
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {process.map((item) => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-fikir-white">
                <div className="mx-auto w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center relative">
                  <item.icon className="h-6 w-6 text-fikir-gold" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-fikir-gold flex items-center justify-center font-body text-[10px] font-bold text-fikir-brown">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-fikir-brown">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fikir */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Por que Fikir para tu empresa
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { icon: Coffee, title: "Calidad SCA 85+", desc: "Cafe de especialidad, no cafe comercial" },
              { icon: Heart, title: "Sin animo de lucro", desc: "Tu compra es impacto directo" },
              { icon: Building2, title: "RSC real", desc: "Certificado de impacto para tu empresa" },
              { icon: Gift, title: "Personalizable", desc: "Adaptamos el formato a tus necesidades" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-fikir-brown">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form with strong CTA */}
      <section id="contacto-b2b" className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Empecemos
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Solicitar propuesta en 24h
            </h2>
            <p className="mt-4 font-body text-base text-fikir-brown-light">
              Cuentanos que necesitas y te respondemos con una propuesta personalizada en menos de 24 horas.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="block font-body text-sm font-medium text-fikir-brown mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label htmlFor="b2b-name" className="block font-body text-sm font-medium text-fikir-brown mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="b2b-name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
            <div>
              <label htmlFor="b2b-email" className="block font-body text-sm font-medium text-fikir-brown mb-2">
                Email
              </label>
              <input
                type="email"
                id="b2b-email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                placeholder="tu@empresa.com"
              />
            </div>
            <div>
              <label htmlFor="service" className="block font-body text-sm font-medium text-fikir-brown mb-2">
                Que te interesa
              </label>
              <select
                id="service"
                name="service"
                className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors cursor-pointer"
              >
                <option value="">Selecciona una opcion</option>
                <option value="oficina">Cafe para oficina</option>
                <option value="regalo">Regalos corporativos</option>
                <option value="rsc">RSC y eventos</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="b2b-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
                Mensaje
              </label>
              <textarea
                id="b2b-message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
                placeholder="Cuentanos que necesitas..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
            >
              Solicitar propuesta en 24h
            </button>
            <p className="font-body text-xs text-fikir-brown-light/60 text-center">
              Sin compromiso. Te respondemos en menos de 24 horas.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
