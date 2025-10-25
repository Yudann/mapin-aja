import HeroSection from "@/components/section/HeroSection";
import About from "@/components/section/AboutSection";
import FeaturesSection from "@/components/section/FeatureSection";
import HowItWorksSection from "@/components/section/HowItWorks";
import UMKMShowcaseSection from "@/components/section/UMKMShowcaseSection";
import RegisterSection from "@/components/section/RegisterSection";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <About />

      <FeaturesSection />

      <HowItWorksSection />

      <UMKMShowcaseSection />

      <RegisterSection />
    </div>
  );
}
