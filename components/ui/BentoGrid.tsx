"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IoSchoolOutline,
  IoRibbonOutline,
  IoClose,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
import { certificates } from "@/data";
import { useOutsideClick } from "@/hooks/use-outside-click";

const GridGlobe = dynamic(() => import("./GridGlobe"), {
  ssr: false,
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  isInView = false,
  animationDelay = 0,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  /** Passed from Grid: whether the section container is in view (once). */
  isInView?: boolean;
  /** Stagger offset in seconds for this card's entrance animation. */
  animationDelay?: number;
}) => {
  const leftLists = ["Tailwind CSS", "Typescript", "React.js"];
  const rightLists = ["Laravel", "PHP","Html/Css"];

  // Certificate carousel & modal states for id === 6
  const [activeCert, setActiveCert] = useState<(typeof certificates)[number] | null>(null);
  const [certIndex, setCertIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseCert = useCallback(() => {
    setActiveCert(null);
  }, []);

  // Keyboard navigation & scroll lock for certificate modal
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseCert();
      }
    };

    if (activeCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeCert, handleCloseCert]);

  useOutsideClick(modalRef, handleCloseCert);

  const nextCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <>
      {/* ─── Expandable Certificate Modal (for id === 6) ────────────────── */}
      <AnimatePresence initial={false}>
        {activeCert && (
          <motion.div
            key="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {activeCert && (
          <div
            key="cert-modal-container"
            className="fixed inset-0 grid place-items-center z-[5001] p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 380,
                mass: 0.7,
              }}
              className="w-full max-w-lg max-h-[88vh] flex flex-col bg-[#0b0c1e] border border-white/15 rounded-3xl overflow-y-auto [scrollbar-width:thin] shadow-[0_16px_50px_0_rgba(0,0,0,0.8)] relative my-auto p-6 sm:p-8 transform-gpu will-change-transform"
            >
              {/* Close Button */}
              <button
                aria-label="Close certificate modal"
                onClick={handleCloseCert}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none"
              >
                <IoClose className="w-5 h-5" />
              </button>

              {/* Certificate Image Banner */}
              {activeCert.image && (
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#13162D] border border-white/10 flex items-center justify-center flex-shrink-0 mb-4">
                  <img
                    src="/bg.png"
                    alt="background pattern"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <img
                    src={activeCert.image}
                    alt={activeCert.title}
                    loading="lazy"
                    decoding="async"
                    className="z-10 absolute inset-0 w-full h-full object-contain p-3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Modal Header */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="p-3 rounded-2xl bg-purple/15 border border-purple/30 text-purple flex-shrink-0">
                  <IoRibbonOutline className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-purple font-semibold">
                    {activeCert.issuer} • {activeCert.date}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 leading-snug">
                    {activeCert.title}
                  </h3>
                </div>
              </div>

              {/* Skills / Covered Topics */}
              <div className="mt-5 space-y-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Skills &amp; Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#10132E] border border-white/10 text-white-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description Area */}
              <div className="mt-5 space-y-1.5 pb-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Certificate Overview
                </span>
                <p className="text-white-200 text-sm leading-relaxed">
                  {activeCert.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple hover:bg-purple/90 text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(203,172,249,0.35)] active:scale-95"
                >
                  <span>Verify Credential</span>
                  <FaLocationArrow className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Bento Grid Item Card ────────────────────────────────────────── */}
      <motion.div
        // Animation driven by parent Grid's single useInView — not by a
        // per-card IntersectionObserver. This eliminates the timing race
        // that caused the flicker when the section entered the viewport.
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: animationDelay }}
        className={cn(
          "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:border-white/[0.2] hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 transform-gpu",
          id === 2 && "min-h-[300px] sm:min-h-[340px] md:min-h-[350px] lg:min-h-[360px]",
          className
        )}
        style={{
          background: "rgb(4,7,29)",
          backgroundColor:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
          willChange: "opacity, transform",
        }}
      >
        {/* Background Images and Overlays */}
        <div className="h-full relative flex flex-col justify-between">
          {/* Main Background Image Container */}
          <div className="w-full h-full absolute inset-0 overflow-hidden">
            {img && (
              <img
                src={img}
                alt={typeof title === "string" ? title : "grid image"}
                loading="lazy"
                decoding="async"
                className={cn(
                  imgClassName,
                  id === 1
                    ? "object-cover object-top scale-110 md:scale-115 transition-transform duration-500 opacity-80"
                    : "object-cover object-center"
                )}
              />
            )}
            {/* Dark gradient overlay specifically for id=1 so white text is crystal-clear */}
            {id === 1 && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#04071d] via-[#04071d]/65 to-black/35 pointer-events-none" />
            )}
          </div>

          {/* Decorative Spare Image */}
          <div
            className={`absolute right-0 -bottom-5 ${
              id === 5 ? "w-full opacity-80" : ""
            }`}
          >
            {spareImg && (
              <img
                src={spareImg}
                alt="decorative spare image"
                loading="lazy"
                decoding="async"
                className="object-cover object-center w-full h-full"
              />
            )}
          </div>

          {/* Content Container */}
          <div
            className={cn(
              titleClassName,
              "relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10",
              id === 1 ? "justify-end" : "justify-between"
            )}
          >
            <div className={cn("relative z-20", id === 1 && "mt-auto")}>
              {/* Subtitle / Category label */}
              <div className="font-sans font-extralight md:max-w-48 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
                {description}
              </div>

              {/* Main Title */}
              <div
                className={`font-heading text-lg lg:text-3xl max-w-96 font-bold z-10 tracking-tight leading-snug ${
                  id === 1 || id === 2 ? "text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]" : ""
                }`}
              >
                {title}
              </div>
            </div>

            {/* id === 2: Interactive 3D Globe */}
            {id === 2 && <GridGlobe />}

            {/* id === 3: Tech stack columns — animated, relative, always visible */}
            {id === 3 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                }}
                className="flex gap-2 md:gap-3 lg:gap-4 w-full justify-center mt-3"
              >
                {/* Left column */}
                <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-3 flex-1">
                  {leftLists.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -18 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
                      }}
                    >
                      <motion.span
                        initial={{ y: 0 }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 3.5 + i * 0.6,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: [0.45, 0, 0.55, 1],
                          delay: i * 0.5,
                        }}
                        style={{ willChange: "transform" }}
                        className="block py-2 px-2.5 md:py-2.5 md:px-3 lg:py-3 lg:px-4 text-[10px] sm:text-xs lg:text-sm font-medium rounded-lg text-center bg-[#10132E] border border-white/[0.07] text-white/90 whitespace-nowrap shadow-sm cursor-default select-none"
                      >
                        {item}
                      </motion.span>
                    </motion.div>
                  ))}
                  {/* Spacer pill */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } },
                    }}
                    className="py-2 px-2.5 md:py-2.5 md:px-3 lg:py-3 lg:px-4 rounded-lg bg-[#10132E] border border-white/[0.06] opacity-25"
                  />
                </div>

                {/* Right column — offset with a leading empty pill */}
                <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-3 flex-1">
                  {/* Leading spacer */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } },
                    }}
                    className="py-2 px-2.5 md:py-2.5 md:px-3 lg:py-3 lg:px-4 rounded-lg bg-[#10132E] border border-white/[0.06] opacity-25"
                  />
                  {rightLists.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: 18 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
                      }}
                    >
                      <motion.span
                        initial={{ y: 0 }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4.0 + i * 0.6,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: [0.45, 0, 0.55, 1],
                          delay: 0.8 + i * 0.5,
                        }}
                        style={{ willChange: "transform" }}
                        className="block py-2 px-2.5 md:py-2.5 md:px-3 lg:py-3 lg:px-4 text-[10px] sm:text-xs lg:text-sm font-medium rounded-lg text-center bg-[#10132E] border border-white/[0.07] text-white/90 whitespace-nowrap shadow-sm cursor-default select-none"
                      >
                        {item}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* id === 4: Education Card Details (Timeline / Institution pill) */}
            {id === 4 && (
              <div className="mt-3 flex flex-col gap-2 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/10 border border-purple/25 w-fit">
                  <IoSchoolOutline className="w-4 h-4 text-purple" />
                  <span className="text-xs text-purple font-medium">
                    2022 – 2026 • Asian College of Science and Technology
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  Specialized in software development, web architecture, and modern computer systems.
                </p>
              </div>
            )}

            {/* id === 6: Certificate Showcase (Carousel & Click-to-Expand) */}
            {id === 6 && (
              <div className="mt-4 z-10 w-full">
                {/* Certificate Showcase Card */}
                <div
                  onClick={() => setActiveCert(certificates[certIndex])}
                  className="group/cert relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0c0e23]/95 border border-white/10 hover:border-purple/50 shadow-lg cursor-pointer transition-all duration-300 active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple/15 text-purple border border-purple/30">
                        <IoRibbonOutline className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-semibold text-purple uppercase tracking-wider block">
                          {certificates[certIndex].issuer} • {certificates[certIndex].date}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover/cert:text-purple transition-colors line-clamp-1">
                          {certificates[certIndex].title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-purple font-medium flex-shrink-0">
                      <span>Expand</span>
                      <FaLocationArrow className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Skills tags preview */}
                  <div className="flex items-center gap-1.5 mt-2.5 overflow-hidden">
                    {certificates[certIndex].skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#10132E] border border-white/10 text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificates[certIndex].skills.length > 3 && (
                      <span className="text-[10px] text-neutral-400">
                        +{certificates[certIndex].skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Carousel Controls & Pagination Dots */}
                <div className="flex items-center justify-between mt-2.5 px-1">
                  <div className="flex items-center gap-1.5">
                    {certificates.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to certificate ${idx + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCertIndex(idx);
                        }}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          certIndex === idx
                            ? "w-4 bg-purple"
                            : "w-1.5 bg-white/20 hover:bg-white/40"
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Previous certificate"
                      onClick={prevCert}
                      className="p-1 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
                    >
                      <IoChevronBackOutline className="w-3.5 h-3.5" />
                    </button>
                    <button
                      aria-label="Next certificate"
                      onClick={nextCert}
                      className="p-1 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
                    >
                      <IoChevronForwardOutline className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
