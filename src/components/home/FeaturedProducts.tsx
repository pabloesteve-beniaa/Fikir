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
            Dos origenes, un proposito
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            Cafe de especialidad tostado con cuidado. Cada bolsa financia
            proyectos de educacion en origen.
          </p>
        </div>

        {/* Products grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
