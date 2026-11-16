import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProject from "@/components/FeaturedProject";
import AiUse from "@/components/AiUse";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="relative bg-[#F8F8F6] text-[#0D0D0D] min-h-screen flex flex-col selection:bg-[#1D4ED8]/15 selection:text-[#1D4ED8] w-full max-w-full">
      {/* Subtle tactile warm paper noise grain texture overlay per redesign skill */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.025] mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      <main id="main-content" className="flex-1 w-full">
        <Hero />
        <About />
        <FeaturedProject />
        <AiUse />
        <Background />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
