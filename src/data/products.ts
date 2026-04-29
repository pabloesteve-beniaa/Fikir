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
  variants: { id: string; name: string }[];
  description: string;
  story: string;
  impact: string;
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
    scaScore: "85+",
    flavorNotes: ["Floral", "Citrico", "Bergamota"],
    roast: "Medio",
    variants: [
      { id: "etiopia-grano", name: "Grano" },
      { id: "etiopia-molido", name: "Molido" },
    ],
    description:
      "Cafe de especialidad de la region de Yirgacheffe, cuna del cafe. Notas florales delicadas con toques citricos y un final a bergamota que lo hacen unico.",
    story:
      "Yirgacheffe es considerada la cuna del cafe. Aqui, a mas de 1.800 metros de altitud, las familias caficultoras cultivan con metodos tradicionales que se transmiten de generacion en generacion. Cada grano lleva consigo siglos de tradicion.",
    impact:
      "Cada bolsa de Etiopia financia proyectos de educacion en las comunidades caficultoras de Yirgacheffe. Hasta ahora, hemos contribuido a la construccion de aulas y material escolar para mas de 200 ninos.",
    image: "/images/etiopia-product.png",
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
      { id: "kenia-grano", name: "Grano" },
      { id: "kenia-molido", name: "Molido" },
    ],
    description:
      "Cafe de especialidad de la region de Nyeri. Un perfil vibrante con notas de grosella negra, frutos rojos y un final citrico brillante.",
    story:
      "En las faldas del Monte Kenia, a mas de 1.700 metros, los caficultores de Nyeri producen algunos de los cafes mas complejos del mundo. El suelo volcanico y el clima templado crean condiciones perfectas para un cafe excepcional.",
    impact:
      "Cada bolsa de Kenia apoya programas de acceso a agua potable en las comunidades rurales de Nyeri. Trabajamos directamente con cooperativas locales para garantizar que el beneficio llega a quien mas lo necesita.",
    image: "/images/kenia-product.png",
    imageAlt: "Bolsa de cafe Fikir Coffee Kenia Nyeri",
    color: "terracotta",
  },
  {
    id: "uganda-mbale",
    handle: "uganda",
    name: "Uganda",
    origin: "Uganda",
    region: "Mbale",
    price: 13.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "80+",
    flavorNotes: ["Chocolate", "Nuez", "Caramelo"],
    roast: "Medio",
    variants: [
      { id: "uganda-grano", name: "Grano" },
      { id: "uganda-molido", name: "Molido" },
    ],
    description:
      "Cafe de especialidad de la region de Mbale, en las faldas del Monte Elgon. Un perfil redondo con notas de chocolate negro, nuez tostada y un final suave a caramelo.",
    story:
      "En las laderas del Monte Elgon, los caficultores de Mbale cultivan arabica a mas de 1.500 metros de altitud, en parcelas familiares que combinan cafe con cultivos alimentarios. Una tradicion que combina patrimonio cafetero y biodiversidad.",
    impact:
      "Cada bolsa de Uganda apoya iniciativas de desarrollo agricola sostenible y formacion para las familias productoras de Mbale, fortaleciendo la economia local y la resiliencia de las comunidades.",
    image: "/images/uganda-product.png",
    imageAlt: "Bolsa de cafe Fikir Coffee Uganda Mbale",
    color: "green",
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
    image: "/images/pack-degustacion.png",
  },
  {
    id: "suscripcion-mensual",
    handle: "suscripcion",
    name: "Suscripcion Mensual",
    description: "Recibe cafe fresco cada mes en tu puerta. Elige tu origen favorito o alterna entre los dos.",
    price: 12.99,
    currency: "EUR",
    image: "/images/suscripcion.png",
    note: "al mes",
  },
];
