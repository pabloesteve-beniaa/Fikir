import { Heart, Sprout, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Sin animo de lucro",
    description:
      "Fikir no es un negocio. Es un proyecto con alma. Cada euro de beneficio se reinvierte en las comunidades donde nace nuestro cafe.",
  },
  {
    icon: Sprout,
    title: "Impacto en origen",
    description:
      "Financiamos proyectos de educacion en Etiopia y acceso a agua potable en Kenia. Devolvemos al origen lo que el cafe nos da.",
  },
  {
    icon: Users,
    title: "Comunidad global",
    description:
      "Cada persona que toma una taza de Fikir se convierte en parte de un cambio real. Tu ritual diario tiene un proposito.",
  },
];

export default function PurposeSection() {
  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Nuestro proposito
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Cafe que devuelve
            <br />lo que recibe
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            Fikir significa &ldquo;amor&rdquo; en amharico, la lengua de Etiopia.
            Nace de la creencia de que un buen cafe puede hacer mucho mas que
            despertar tus sentidos.
          </p>
        </div>

        {/* Values grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 rounded-2xl bg-fikir-cream/50 hover:bg-fikir-cream transition-colors duration-300"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                <value.icon className="h-6 w-6 text-fikir-gold" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-fikir-brown">
                {value.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
