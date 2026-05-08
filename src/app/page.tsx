import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import VisualImpactBlock from "@/components/home/VisualImpactBlock";
import TransparencySection from "@/components/home/TransparencySection";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <VisualImpactBlock />
      <TransparencySection />
      <NewsletterSection />
    </>
  );
}
