import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import CookieBanner from "@/components/ui/CookieBanner";
import ConsentScripts from "@/components/ui/ConsentScripts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fikircafe.com"),
  title: {
    default: "Fikir Coffee | Café de especialidad con impacto social",
    template: "%s | Fikir Coffee",
  },
  description:
    "Café de especialidad etíope y keniano con impacto social. Cada compra financia proyectos para la infancia y la juventud en las comunidades cafetaleras de origen.",
  keywords: [
    "café de especialidad",
    "café etiopía",
    "café kenia",
    "impacto social",
    "café con propósito",
    "specialty coffee",
    "fikir coffee",
    "café sin ánimo de lucro",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fikir Coffee | Café con impacto en su origen",
    description:
      "Café de especialidad sin ánimo de lucro. Todo el beneficio se reinvierte en proyectos para la infancia y la juventud en las comunidades cafetaleras de origen.",
    type: "website",
    locale: "es_ES",
    siteName: "Fikir Coffee",
    images: [{ url: "/images/etiopia-lifestyle.jpg", width: 1200, height: 630, alt: "Fikir Coffee - Café de especialidad con impacto social" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fikir Coffee | Café con impacto en su origen",
    description: "Café de especialidad sin ánimo de lucro. Todo el beneficio se reinvierte en proyectos para la infancia.",
    images: ["/images/etiopia-lifestyle.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fikir Coffee",
              url: "https://www.fikircafe.com",
              description: "Café de especialidad etíope y keniano con impacto social",
              founder: { "@type": "Person", name: "Pablo Esteve Rozas" },
              sameAs: [],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterPopup />
        <CookieBanner />
        <ConsentScripts
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
        />
      </body>
    </html>
  );
}
