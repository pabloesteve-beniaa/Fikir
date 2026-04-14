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
    name: "Etiopia",
    origin: "Etiopia",
    region: "Yirgacheffe",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "85+",
    flavorNotes: ["Floral", "Citrico", "Bergamota"],
    roast: "Medio",
    variants: [
      { id: "etiopia-grano", name: "Grano", helper: "Maxima frescura. Ideal si tienes molinillo." },
      { id: "etiopia-molido", name: "Molido", helper: "Listo para cafetera italiana, filtro o prensa francesa." },
    ],
    description:
      "Cafe de especialidad de la region de Yirgacheffe, cuna del cafe. Notas florales delicadas con toques citricos y un final a bergamota que lo hacen unico.",
    story:
      "Yirgacheffe es considerada la cuna del cafe. Aqui, a mas de 1.800 metros de altitud, las familias caficultoras cultivan con metodos tradicionales que se transmiten de generacion en generacion. Cada grano lleva consigo siglos de tradicion.",
    impact:
      "Este cafe contribuye directamente a mejorar la vida de ninos en un orfanato en Meki, donde el fundador de Fikir convivio y trabajo durante anos. Una conexion personal y real con el origen.",
    impactProject: "Orfanato en Meki",
    impactLocation: "Meki, Etiopia",
    impactWhat: "Mejora de condiciones, material educativo y necesidades basicas",
    impactWho: "Ninos del orfanato donde el fundador vivio y trabajo",
    profileHint: "Ideal si te gustan los cafes suaves y florales",
    image: "/images/etiopia-product.jpg",
    imageAlt: "Bolsa de cafe Fikir Coffee Etiopia Yirgacheffe",
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
    scaScore: "86+",
    flavorNotes: ["Grosella negra", "Frutos rojos", "Citrico"],
    roast: "Medio",
    variants: [
      { id: "kenia-grano", name: "Grano", helper: "Maxima frescura. Ideal si tienes molinillo." },
      { id: "kenia-molido", name: "Molido", helper: "Listo para cafetera italiana, filtro o prensa francesa." },
    ],
    description:
      "Cafe de especialidad de la region de Nyeri. Un perfil vibrante con notas de grosella negra, frutos rojos y un final citrico brillante.",
    story:
      "En las faldas del Monte Kenia, a mas de 1.700 metros, los caficultores de Nyeri producen algunos de los cafes mas complejos del mundo. El suelo volcanico y el clima templado crean condiciones perfectas para un cafe excepcional.",
    impact:
      "Este cafe apoya el desarrollo de un nuevo proyecto para la infancia junto a la Fundacion Pablo Horstmann en Dokolo. Un compromiso real con las comunidades que hacen posible tu cafe.",
    impactProject: "Proyecto infantil con Fundacion Pablo Horstmann",
    impactLocation: "Dokolo, Kenia",
    impactWhat: "Desarrollo infantil, educacion y oportunidades",
    impactWho: "Ninos en la comunidad de Dokolo",
    profileHint: "Ideal si prefieres intensidad y fruta",
    image: "/images/kenia-product.jpg",
    imageAlt: "Bolsa de cafe Fikir Coffee Kenia Nyeri",
    color: "terracotta",
  },
];

export const packs = [
  {
    id: "pack-degustacion",
    handle: "pack-degustacion",
    name: "Pack Degustacion",
    description: "Descubre los dos origenes de Fikir. Incluye 1 bolsa de Etiopia + 1 bolsa de Kenia (250g cada una).",
    price: 27.99,
    currency: "EUR",
    image: "/images/pack-degustacion.jpg",
  },
  {
    id: "suscripcion-mensual",
    handle: "suscripcion",
    name: "Suscripcion Mensual",
    description: "Recibe cafe fresco cada mes en tu puerta. Elige tu origen favorito o alterna entre los dos.",
    price: 12.99,
    currency: "EUR",
    image: "/images/suscripcion.jpg",
    note: "al mes",
  },
];
