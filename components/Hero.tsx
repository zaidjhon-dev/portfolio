"use client";

import Image from "next/image";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import CardSpotlight from "./ui/CardSpotlight";
import MagicButton from "./MagicButton";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center scroll-mt-0 overflow-hidden"
    >
      {/**
       *  UI: Full-Bleed Background Layer (Grid Pattern + Animated Dual Spotlight)
       *  Spans 100% edge-to-edge of the viewport
       */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        {/* Full-width Grid background with radial spotlight mask & smooth bottom fade */}
        <div className="absolute inset-0 w-full h-full bg-black-100 bg-grid-white/[0.03] flex items-center justify-center">
          {/* Radial gradient mask for center depth */}
          <div className="absolute inset-0 bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          {/* Bottom fade into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black-100 via-black-100/70 to-transparent" />
        </div>

        {/* Animated dual-beam ambient spotlight */}
        <Spotlight />
      </div>

      {/**
       *  Hero Content Container with Responsive Portrait Space
       *  Centered within max-w-7xl with standard responsive padding
       */}
      <div className="relative z-10 w-full max-w-7xl sm:px-10 px-5 pt-24 sm:pt-28 md:pt-32 pb-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-14 my-auto">
        {/* Left Column: Intro text and Call to Action */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:max-w-none">

          {/**
           *  Headline with Text Generate Effect (Fluid typography)
           */}
          <TextGenerateEffect
            words="Learning, designing, and coding for the modern web."
            className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
          />

          {/* Subtitle / Bio */}
          <p className="text-white-200 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed my-4 max-w-xl">
            Hi! I&apos;m <span className="text-purple font-semibold">Jhon</span>, an aspiring web developer based in the Philippines passionate about crafting interactive, modern web experiences.
          </p>

          {/* Call to Action Button */}
          <div className="mt-4 sm:mt-6 w-full sm:w-auto flex justify-center lg:justify-start">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("about");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.replaceState(null, "", "#about");
                }
              }}
              className="w-full sm:w-auto block"
            >
              <MagicButton
              title="Know more about me"
              position="right"
              />
            </a>
          </div>
        </div>

        {/* ─── Right Column: Portrait Showcase with CardSpotlight ─────────────── */}
        <div className="flex-shrink-0 relative flex justify-center items-center">
          {/* Ambient glow – sits completely outside the card */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple/30 via-indigo-500/20 to-blue-500/30 opacity-50 blur-3xl pointer-events-none transition duration-500 hover:opacity-75" />

          {/* Outer wrapper: gradient border ring */}
          <div className="relative p-[2px] rounded-3xl bg-gradient-to-b from-white/20 via-purple/25 to-blue-500/15 shadow-2xl">
            <CardSpotlight
              radius={320}
              color="rgba(140, 90, 255, 0.30)"
              className="
                w-52 h-60
                sm:w-64 sm:h-72
                md:w-72 md:h-80
                lg:w-80 lg:h-[390px]
                xl:w-[450px] xl:h-[500px]
                rounded-[22px]
                bg-black-200/90
                border border-white/10
                overflow-hidden
                relative
              "
            >
              {/* Portrait image – Next.js optimized with priority for instant LCP */}
              <Image
                src="/profile.png"
                alt="Jhon – Web Developer Portrait"
                fill
                priority
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 450px"
                className="object-cover scale-[150%] object-top"
              />

              {/* Bottom gradient fade overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-100/70 via-transparent to-transparent pointer-events-none" />
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
