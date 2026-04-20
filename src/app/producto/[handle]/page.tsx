import type { Metadata } from "next";
import ProductDetail from "./ProductDetail";

const titleByHandle: Record<string, string> = {
  "etiopia": "Café Etiopía Yirgacheffe SCA 85+ · Fikir Coffee",
  "kenia": "Café Kenia Nyeri SCA 86+ · Fikir Coffee",
  "pack-degustacion": "Pack Degustación Etiopía + Kenia · Fikir Coffee",
  "suscripcion": "Suscripción Mensual de Café · Fikir Coffee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const title = titleByHandle[handle];
  if (!title) {
    return { title: "Producto" };
  }
  return {
    title: { absolute: title },
    alternates: { canonical: `/producto/${handle}` },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  return <ProductDetail handle={handle} />;
}
