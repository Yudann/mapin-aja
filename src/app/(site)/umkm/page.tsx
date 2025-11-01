import UmkmGridSection from "@/components/section/umkm/UmkmGridSection";
import UmkmHeroSection from "@/components/section/umkm/UmkmHeroSection";

export default function UmkmPage() {
  return (
    <main className="min-h-screen">
      <UmkmHeroSection />
      <UmkmGridSection />
    </main>
  );
}

export const metadata = {
  title: "Direktori UMKM - MapinAja",
  description:
    "Temukan ribuan UMKM lokal terbaik di sekitar Anda. Kuliner, fashion, jasa, dan banyak lagi!",
};
