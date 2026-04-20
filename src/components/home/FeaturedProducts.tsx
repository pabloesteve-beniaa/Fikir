import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-fikir-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Nuestros cafes
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            Dos orígenes, un propósito
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            Café de especialidad tostado con cuidado. Cada bolsa financia
            proyectos de educación en origen.
          </p>
        </div>

        {/* Products grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Subscription secondary CTA */}
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-fikir-brown-light">
            ¿Prefieres recibirlo cada mes? →{" "}
            <Link
              href="/producto/suscripcion"
              className="font-semibold text-fikir-green hover:text-fikir-green-light underline underline-offset-4 transition-colors"
            >
              Suscripción desde 12,99€/mes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
