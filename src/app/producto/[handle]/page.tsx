"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { ArrowLeft, ShoppingBag, MapPin, Leaf, Award, Heart, CheckCircle, Clock, Truck, BookOpen, GraduationCap, ChevronDown } from "lucide-react";

export default function ProductoPage() {
  const { handle } = useParams<{ handle: string }>();
  const product = products.find((p) => p.handle === handle);
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-fikir-brown">
            Producto no encontrado
          </h1>
          <Link
            href="/tienda"
            className="mt-4 inline-flex items-center gap-2 font-body text-sm text-fikir-green hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const colorMap = {
    green: {
      bg: "bg-fikir-green",
      button: "bg-fikir-green hover:bg-fikir-green-light",
      accent: "text-fikir-green",
      dot: "bg-fikir-green",
      border: "border-fikir-green/20",
      lightBg: "bg-fikir-green/5",
      impactIcon: BookOpen,
    },
    terracotta: {
      bg: "bg-fikir-terracotta",
      button: "bg-fikir-terracotta hover:bg-fikir-terracotta-light",
      accent: "text-fikir-terracotta",
      dot: "bg-fikir-terracotta",
      border: "border-fikir-terracotta/20",
      lightBg: "bg-fikir-terracotta/5",
      impactIcon: GraduationCap,
    },
  };

  const colors = colorMap[product.color];
  const ImpactIcon = colors.impactIcon;
  const lifestyleImage = product.handle === "etiopia" ? "/images/etiopia-lifestyle.jpg" : "/images/kenia-lifestyle.jpg";

  // Product gallery - lifestyle shot + 3 process/detail shots (shared between origins)
  const galleryImages = [
    { src: lifestyleImage, alt: product.imageAlt },
    { src: "/images/etiopia-granos.jpg", alt: "Granos de café Fikir" },
    { src: "/images/etiopia-tostador.jpg", alt: "Proceso de tueste artesanal" },
    { src: "/images/fikir-estanteria.jpg", alt: "Colección Fikir Coffee" },
  ];
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `Café ${product.name}`,
            description: product.description,
            image: `https://www.fikircafe.com${product.image}`,
            brand: { "@type": "Brand", name: "Fikir Coffee" },
            offers: {
              "@type": "Offer",
              price: product.price.toString(),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: `https://www.fikircafe.com/producto/${product.handle}`,
            },
          }),
        }}
      />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav className="flex items-center gap-2 font-body text-sm text-fikir-brown-light">
          <Link href="/tienda" className="hover:text-fikir-brown transition-colors">
            Tienda
          </Link>
          <span>/</span>
          <span className="text-fikir-brown font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Product image gallery */}
            <div>
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[560px]">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Urgency badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-fikir-cream/15 backdrop-blur-sm font-body text-xs font-semibold text-fikir-cream">
                    Tostado en pequeños lotes
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-fikir-gold/90 font-body text-xs font-semibold text-fikir-brown">
                    Edición limitada
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                      selectedImage === idx
                        ? "ring-2 ring-fikir-gold ring-offset-2 ring-offset-fikir-cream"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product info */}
            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                Café {product.name}
              </h1>
              <p className="mt-2 font-body text-base text-fikir-brown-light">
                {product.region}, {product.origin} &middot; {product.weight}
              </p>
              <p className="mt-1 font-body text-sm italic text-fikir-brown-light/80">
                {product.profileHint}
              </p>
              <p className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                {product.price.toFixed(2)}&euro;
              </p>

              {/* Flavor notes */}
              <div className="mt-5 flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 rounded-full bg-fikir-cream-dark font-body text-sm text-fikir-brown-light"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-5 font-body text-base leading-relaxed text-fikir-brown-light">
                {product.description}
              </p>

              {/* Product specs */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Origen</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.region}, {product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Proceso</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.process}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Puntuación SCA</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.scaScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Tueste</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.roast}</p>
                  </div>
                </div>
              </div>

              {/* Variant selector with helper text */}
              <div className="mt-8">
                <p className="font-body text-sm font-semibold text-fikir-brown mb-3">
                  Formato
                </p>
                <div className="flex gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-6 py-3 rounded-lg border-2 font-body text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedVariant === index
                          ? `border-fikir-brown bg-fikir-brown text-fikir-cream`
                          : `border-fikir-brown/20 text-fikir-brown hover:border-fikir-brown/40`
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
                {/* Helper text for selected variant */}
                <p className="mt-2 font-body text-xs text-fikir-brown-light/70 italic">
                  {product.variants[selectedVariant].helper}
                </p>
              </div>

              {/* Trust block ABOVE buy button */}
              <div className="mt-6 flex flex-col gap-2 p-4 rounded-xl bg-fikir-cream-dark/70">
                {[
                  { icon: Award, text: "Café de especialidad (SCA " + product.scaScore + ")" },
                  { icon: Truck, text: "Envío en 3-5 días · Gratis a partir de 50€" },
                  { icon: Heart, text: "100% del beneficio reinvertido en origen" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-fikir-green shrink-0" />
                    <span className="font-body text-sm text-fikir-brown-light">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Add to cart */}
              <button
                className={`mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg ${colors.button} font-body text-base font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 cursor-pointer`}
              >
                <ShoppingBag className="h-5 w-5" />
                Comprar &mdash; {product.price.toFixed(2)}&euro;
              </button>

              {/* Impact card - structured */}
              <div className={`mt-8 p-6 rounded-2xl ${colors.lightBg} border ${colors.border}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <ImpactIcon className="h-5 w-5 text-fikir-cream" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-fikir-brown">
                      Impacto de este café
                    </h3>
                    <p className={`font-body text-xs ${colors.accent} font-semibold uppercase tracking-wide`}>
                      {product.origin}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Proyecto</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactProject}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Financia</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactWhat}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Beneficia</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactWho}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Ubicación</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactLocation}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Estado</span>
                    <span className="font-body text-sm text-fikir-brown flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Activo
                    </span>
                  </div>
                </div>
              </div>

              {/* Origin story */}
              <div className="mt-6 p-6 rounded-2xl bg-fikir-white border border-fikir-brown/5">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-3">
                  La historia del origen
                </h3>
                <p className="font-body text-sm leading-relaxed text-fikir-brown-light">
                  {product.story}
                </p>
              </div>

              {/* Product FAQ */}
              <div className="mt-6">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-4">
                  Preguntas frecuentes
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      q: "¿Cómo debo preparar este café?",
                      a: "Recomendamos cafetera italiana (moka), filtro, prensa francesa o AeroPress. Usa agua a 90-96°C y una proporción de 1:15 (café:agua)."
                    },
                    {
                      q: "¿Cuánto tiempo se conserva fresco?",
                      a: "Una vez abierto, consume en las 4-6 semanas siguientes para disfrutar de todo su aroma. Guárdalo en lugar fresco y seco, alejado de la luz."
                    },
                    {
                      q: "¿Grano o molido?",
                      a: "Si tienes molinillo, el grano conserva mejor la frescura. Si no, nuestro molido es perfecto para cafetera italiana, filtro o prensa francesa."
                    },
                  ].map((faq) => (
                    <details key={faq.q} className="group">
                      <summary className="flex items-center justify-between py-3 cursor-pointer list-none font-body text-sm font-medium text-fikir-brown">
                        {faq.q}
                        <ChevronDown className="h-4 w-4 text-fikir-brown-light shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <p className="pb-3 font-body text-sm text-fikir-brown-light leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
