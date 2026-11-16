"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { heroData } from "@/data";
import ProfileCardMobile from "@/components/ui/ProfileCardMobile";

const baseEase = [0.22, 1, 0.36, 1] as const;

// Dynamically import Three.js Lanyard badge with SSR disabled (desktop only >= 1024px)
const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
});

const Hero = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative w-full min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] pt-16 sm:pt-20 lg:pt-36 pb-16 sm:pb-20 border-b border-[#E5E5E2] overflow-hidden flex flex-col lg:flex-row lg:items-center bg-[#F8F8F6]"
    >
      {/* ── Desktop Only (>= 1024px): 3D Lanyard Full-Bleed Interactive Canvas ── */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        {isDesktop && (
          <Lanyard
            frontImage="/profile.webp"
            backImage="/profile.webp"
            cardColor="#FFFFFF"
            strapColor="#181818"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.25}
            size={0.68}
            anchor="right"
            strapLength={0.42}
            strapWidth={0.65}
            metal="silver"
            gravity={1.2}
            damping={0.52}
            elasticity={0.38}
            breeze={0.2}
            interactive={true}
            intro={true}
            className="w-full h-full"
          />
        )}
      </div>

      {/* ── Foreground Content Layer (pointer-events-none allows full desktop canvas interactivity) ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full pointer-events-none">
        {/* Mobile / Tablet (< 1024px): Instant Pop-Out Avatar Profile Card */}
        <div className="pointer-events-auto">
          <ProfileCardMobile />
        </div>

        <div className="max-w-2xl text-left pointer-events-auto">
          {/* Eyebrow & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: baseEase }}
            className="space-y-3"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#1D4ED8] inline-block">
              {heroData.name}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading leading-tight bg-gradient-to-r from-[#000000] to-[#525250] bg-clip-text text-transparent [text-wrap:balance]">
              {heroData.headline}
            </h1>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: baseEase }}
            className="text-base sm:text-lg text-[#525250] leading-relaxed mt-5 mb-8 max-w-xl [text-wrap:pretty]"
          >
            {heroData.description}
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: baseEase }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href={heroData.primaryAction.link}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("project");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.replaceState(null, "", "#project");
                }
              }}
              className="btn-primary-blue gap-2"
            >
              <span>{heroData.primaryAction.label}</span>
              <ArrowRight size={14} weight="bold" />
            </a>

            <a
              href={heroData.secondaryAction.link}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.replaceState(null, "", "#contact");
                }
              }}
              className="btn-secondary-light"
            >
              {heroData.secondaryAction.label}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
