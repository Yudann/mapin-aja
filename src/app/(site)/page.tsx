import HeroSection from "@/components/section/HeroSection";
import AboutSection from "@/components/section/AboutSection";
import FeaturesSection from "@/components/section/FeatureSection";
import RegisterSection from "@/components/section/RegisterSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <RegisterSection />
    </div>
  );
}
