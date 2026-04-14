import HeroSection from "@/components/home/HeroSection";
import PurposeSection from "@/components/home/PurposeSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import VisualImpactBlock from "@/components/home/VisualImpactBlock";
import ImpactSection from "@/components/home/ImpactSection";
import TransparencySection from "@/components/home/TransparencySection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PurposeSection />
      <FeaturedProducts />
      <HowItWorks />
      <VisualImpactBlock />
      <ImpactSection />
      <TransparencySection />
      <NewsletterSection />
    </>
  );
}
