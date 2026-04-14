import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Globe, Coffee, Sparkles, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce la historia de Fikir Coffee. Un proyecto sin animo de lucro que devuelve al origen lo que el cafe nos da.",
};

const timeline = [
  {
    year: "2024",
    title: "La semilla",
    description:
      "Fikir nace de una pregunta sencilla: que pasaria si un cafe de especialidad devolviera todo su beneficio a las comunidades donde se cultiva? No como caridad, sino como modelo.",
  },
  {
    year: "2024",
    title: "El primer viaje",
    description:
      "Viajamos a Etiopia y Kenia para encontrar los mejores granos. Cafes con puntuacion SCA superior a 85, cultivados con metodos tradicionales por familias caficultoras.",
  },
  {
    year: "2025",
    title: "Las primeras bolsas",
    description:
      "Lanzamos las dos primeras referencias: Etiopia Yirgacheffe y Kenia Nyeri. Los primeros clientes se convierten en los primeros embajadores del proyecto.",
  },
  {
    year: "2025",
    title: "El impacto empieza",
    description:
      "Financiamos el primer pozo de agua en Nyeri y los primeros kits escolares en Yirgacheffe. El circulo se cierra: el cafe vuelve a su origen.",
  },
  {
    year: "2026",
    title: "Hoy: una comunidad que crece",
    description:
      "Mas de 250 personas beneficiadas, 5 proyectos activos, 3 pozos construidos. Cada persona que elige Fikir se une a un movimiento donde el consumo consciente genera impacto real.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Autenticidad",
    description: "Sin greenwashing. Sin palabras vacias. Cada euro que decimos que va al origen, va al origen.",
  },
  {
    icon: Globe,
    title: "Transparencia",
    description: "Publicamos donde va cada euro. Creemos que la confianza se construye con hechos, no con promesas.",
  },
  {
    icon: Coffee,
    title: "Excelencia",
    description: "El impacto social no esta renido con la calidad. Nuestros cafes son excepcionales, porque el origen lo merece.",
  },
  {
    icon: Sparkles,
    title: "Proposito",
    description: "No somos un negocio que dona. Somos un proyecto social que vende cafe para financiar su mision.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-20 bg-fikir-brown lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Sobre nosotros
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold text-fikir-cream sm:text-6xl lg:text-7xl">
              Fikir significa
              <br />
              <span className="text-fikir-gold italic">amor</span>
            </h1>
            <p className="mt-8 font-body text-lg leading-relaxed text-fikir-cream/80 max-w-xl">
              En amharico, la lengua de Etiopia. Y eso es exactamente lo que
              ponemos en cada bolsa: amor por el cafe, por las personas que lo
              cultivan y por la idea de que las cosas se pueden hacer de otra
              manera.
            </p>
          </div>
        </div>
      </section>

      {/* Founder letter - NEW */}
      <section className="py-24 bg-fikir-cream-dark lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Founder photo placeholder */}
            <div className="w-24 h-24 rounded-full bg-fikir-brown/10 flex items-center justify-center mb-8">
              <User className="h-10 w-10 text-fikir-brown-light/40" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-fikir-brown sm:text-4xl">
              Una carta personal
            </h2>
            <div className="mt-8 font-body text-base leading-relaxed text-fikir-brown-light text-left max-w-2xl space-y-4">
              <p>
                Fikir no empezo como un negocio. Empezo como una frustracion: la de ver que los
                paises que nos dan el mejor cafe del mundo son los que menos se benefician de el.
              </p>
              <p>
                Quise hacer algo diferente. No una marca que dona un porcentaje para lavar su
                imagen. Un proyecto donde <span className="font-semibold text-fikir-brown">todo el beneficio, literalmente todo,</span> vuelve
                al origen. Sin salarios inflados, sin marketing millonario. Solo cafe y proposito.
              </p>
              <p>
                Cada vez que alguien elige Fikir, esta diciendo que hay otra forma de hacer las
                cosas. Y eso, para mi, vale mas que cualquier margen de beneficio.
              </p>
              <p className="font-semibold text-fikir-brown">
                Gracias por ser parte de esto.
              </p>
            </div>
            <p className="mt-6 font-heading text-xl italic text-fikir-gold">
              &mdash; Fundador de Fikir Coffee
            </p>
          </div>
        </div>
      </section>

      {/* Story / Timeline with dates */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Nuestra historia
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {timeline.map((item, index) => (
              <div key={item.title} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center shrink-0">
                    <span className="font-body text-xs font-bold text-fikir-gold">
                      {item.year}
                    </span>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-fikir-gold/20 mt-4" />
                  )}
                </div>
                <div className="pb-12">
                  <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-fikir-gold">
                    {item.year}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-fikir-brown">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-fikir-brown-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Lo que nos mueve
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-fikir-white"
              >
                <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <value.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-fikir-brown">
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

      {/* CTA */}
      <section className="py-20 bg-fikir-green text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Unete al movimiento
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            Cada taza de Fikir es un acto de amor hacia las comunidades que
            hacen posible tu cafe de cada manana.
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
