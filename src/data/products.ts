export interface Product {
  id: string;
  handle: string;
  name: string;
  origin: string;
  region: string;
  price: number;
  currency: string;
  weight: string;
  process: string;
  scaScore: string;
  flavorNotes: string[];
  roast: string;
  variants: { id: string; name: string; helper: string }[];
  description: string;
  story: string;
  impact: string;
  impactProject: string;
  impactLocation: string;
  impactWhat: string;
  impactWho: string;
  profileHint: string;
  image: string;
  imageAlt: string;
  color: "green" | "terracotta";
}

export const products: Product[] = [
  {
    id: "etiopia-yirgacheffe",
    handle: "etiopia",
    name: "Etiopía",
    origin: "Etiopía",
    region: "Yirgacheffe",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "80+",
    flavorNotes: ["Floral", "Cítrico", "Bergamota"],
    roast: "Medio",
    variants: [
      { id: "etiopia-grano", name: "Grano", helper: "Máxima frescura. Ideal si tienes molinillo." },
      { id: "etiopia-molido", name: "Molido", helper: "Listo para cafetera italiana, filtro o prensa francesa." },
    ],
    description:
      "Café de especialidad de la región de Yirgacheffe, cuna del café. Notas florales delicadas con toques cítricos y un final a bergamota que lo hacen único.",
    story:
      "Yirgacheffe es considerada la cuna del café. Aquí, a más de 1.800 metros de altitud, las familias caficultoras cultivan con métodos tradicionales que se transmiten de generación en generación. Cada grano lleva consigo siglos de tradición.",
    impact:
      "Este café contribuye directamente a mejorar la vida de niños en un orfanato en Meki, donde nuestro fundador convivió y trabajó durante años. Una conexión personal y real con el origen.",
    impactProject: "Orfanato en Meki",
    impactLocation: "Meki, Etiopía",
    impactWhat: "Mejora de condiciones, material educativo y necesidades básicas",
    impactWho: "Niños del orfanato donde el fundador vivió y trabajó",
    profileHint: "Ideal si te gustan los cafés suaves y florales",
    image: "/images/etiopia-product.jpg",
    imageAlt: "Bolsa de café Fikir Coffee Etiopía Yirgacheffe",
    color: "green",
  },
  {
    id: "kenia-nyeri",
    handle: "kenia",
    name: "Kenia",
    origin: "Kenia",
    region: "Nyeri",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "80+",
    flavorNotes: ["Grosella negra", "Frutos rojos", "Cítrico"],
    roast: "Medio",
    variants: [
      { id: "kenia-grano", name: "Grano", helper: "Máxima frescura. Ideal si tienes molinillo." },
      { id: "kenia-molido", name: "Molido", helper: "Listo para cafetera italiana, filtro o prensa francesa." },
    ],
    description:
      "Café de especialidad de la región de Nyeri. Un perfil vibrante con notas de grosella negra, frutos rojos y un final cítrico brillante.",
    story:
      "En las faldas del Monte Kenia, a más de 1.700 metros, los caficultores de Nyeri producen algunos de los cafés más complejos del mundo. El suelo volcánico y el clima templado crean condiciones perfectas para un café excepcional.",
    impact:
      "Este café apoya el Centro de Formación Profesional de Migori (Kenia), un proyecto de educación y oportunidades para jóvenes. Un compromiso real con las comunidades que hacen posible tu café.",
    impactProject: "Centro de Formación Profesional de Migori",
    impactLocation: "Migori, Kenia",
    impactWhat: "Formación profesional, educación y oportunidades",
    impactWho: "Jóvenes en la comunidad de Migori",
    profileHint: "Ideal si prefieres intensidad y fruta",
    image: "/images/kenia-product.jpg",
    imageAlt: "Bolsa de café Fikir Coffee Kenia Nyeri",
    color: "terracotta",
  },
];

export const packs = [
  {
    id: "pack-degustacion",
    handle: "pack-degustacion",
    name: "Pack Degustación",
    description: "Descubre los dos orígenes de Fikir. Incluye 1 bolsa de Etiopía + 1 bolsa de Kenia (250g cada una).",
    price: 27.99,
    currency: "EUR",
    image: "/images/pack-degustacion.jpg",
  },
  {
    id: "suscripcion-mensual",
    handle: "suscripcion",
    name: "Suscripción Mensual",
    description: "Recibe café fresco cada mes en tu puerta. Elige tu origen favorito o alterna entre los dos.",
    price: 12.99,
    currency: "EUR",
    image: "/images/suscripcion.jpg",
    note: "al mes",
  },
];
