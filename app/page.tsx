"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import BackToTop from "@/components/ui/BackToTop";

const Home = () => {
  return (
    <main
      className="relative bg-black-100 flex flex-col items-center min-h-screen mx-auto overflow-x-clip"
    >
      {/* Floating navigation */}
      <FloatingNav navItems={navItems} />

      {/* Back-to-top arrow */}
      <BackToTop />

      {/* Full-width Hero section (background & spotlight spans edge-to-edge) */}
      <Hero />

      {/* Main contained sections */}
      <div className="max-w-7xl w-full sm:px-10 px-5">
        <Grid />
        <RecentProjects />
        <Experience />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
