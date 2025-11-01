import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import SmoothScroll from "@/components/layout/ScrollSmooth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <SmoothScroll>{children}</SmoothScroll>
      <Footer />
    </div>
  );
}
