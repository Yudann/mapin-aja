import HeroSection from "@/components/section/HeroSection";
import FeaturesSection from "@/components/section/FeatureSection";
import RegisterSection from "@/components/section/RegisterSection";
import ProblemSection from "@/components/section/ProblemSection";
import SolutionSection from "@/components/section/SolutionSection";
import HowItWorksSection from "@/components/section/HowItWorks";
import ValueSection from "@/components/section/ValueSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ValueSection />
      <RegisterSection />
    </div>
  );
}
