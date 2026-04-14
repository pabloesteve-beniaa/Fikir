import { ShoppingBag, Heart, Globe } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    step: "01",
    title: "Compras tu cafe",
    description:
      "Elige entre nuestros origenes de Etiopia o Kenia. Cafe de especialidad, tostado con cuidado, directo a tu puerta.",
  },
  {
    icon: Heart,
    step: "02",
    title: "Generamos impacto",
    description:
      "Todo el beneficio de tu compra se reinvierte en proyectos sociales en las comunidades donde nace tu cafe.",
  },
  {
    icon: Globe,
    step: "03",
    title: "Vuelve al origen",
    description:
      "Educacion en Etiopia, agua potable en Kenia. Tu cafe financia proyectos reales con impacto medible.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-fikir-green lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Como funciona
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-cream sm:text-5xl">
            De tu taza al origen
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-cream/80">
            Un modelo transparente donde cada paso tiene un impacto directo.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative text-center p-8"
            >
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[80%] h-px bg-fikir-cream/20" />
              )}

              <div className="relative">
                <div className="mx-auto w-16 h-16 rounded-full border-2 border-fikir-gold/40 flex items-center justify-center bg-fikir-green">
                  <item.icon className="h-7 w-7 text-fikir-gold" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-fikir-gold flex items-center justify-center font-body text-xs font-bold text-fikir-brown">
                  {item.step}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-fikir-cream">
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-fikir-cream/70 max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
