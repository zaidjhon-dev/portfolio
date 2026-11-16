"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowSquareOut, CaretLeft, CaretRight } from "@phosphor-icons/react";
import CardSwap, { Card, type CardSwapHandle } from "@/components/ui/CardSwap";
import { educationInfo, certificates, otherExperience } from "@/data";

const baseEase = [0.22, 1, 0.36, 1] as const;
const revealProps = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: baseEase },
};

export const Background = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedByInteraction, setIsLockedByInteraction] = useState(false);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 12-second lockout on manual interaction (Prev, Next, card click/drag) so user can comfortably read
  const triggerManualLockout = useCallback(() => {
    setIsLockedByInteraction(true);
    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = setTimeout(() => {
      setIsLockedByInteraction(false);
    }, 12000);
  }, []);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  const handlePrev = () => {
    triggerManualLockout();
    cardSwapRef.current?.prev();
  };

  const handleNext = () => {
    triggerManualLockout();
    cardSwapRef.current?.next();
  };

  const handleCardChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const isAutoplayActive = !isHovered && !isLockedByInteraction;
  const activeCert = certificates[activeIndex] || certificates[0];

  return (
    <section
      id="background"
      aria-labelledby="background-heading"
      className="py-16 sm:py-20 border-b border-[#E5E5E2] bg-[#F8F8F6] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14 sm:space-y-18">
        {/* Main Section Header */}
        <motion.div {...revealProps} className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-[#1D4ED8] mb-2">
            Background & credentials
          </p>
          <h2
            id="background-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] font-heading"
          >
            Education & experience
          </h2>
        </motion.div>

        {/* 1. Education — Elevated Single Anchor Card */}
        <motion.div {...revealProps} className="max-w-3xl space-y-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737370]">
            Education
          </h3>

          <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E2] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h4 className="text-lg sm:text-xl font-bold text-[#0D0D0D] font-heading">
                {educationInfo.degree}
              </h4>
              <span className="text-xs font-mono tabular-nums text-[#1D4ED8] bg-[#F2F2EF] px-2.5 py-1 rounded-md border border-[#E5E5E2] self-start sm:self-auto font-medium">
                {educationInfo.status} &middot; {educationInfo.period}
              </span>
            </div>

            <p className="text-sm font-medium text-[#525250]">
              {educationInfo.institution}
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#737370] mb-2.5">
                Relevant coursework
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {educationInfo.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 rounded-md bg-[#F2F2EF] border border-[#E5E5E2] text-xs font-medium text-[#0D0D0D]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Certifications — 2-Column Synchronized Card-Swap Deck */}
        <motion.div {...revealProps} className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737370]">
              Certifications & credentials
            </h3>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Left Column: Synchronized Narrative & Metadata */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E2] shadow-sm min-h-[360px] sm:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: baseEase }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold tracking-wide text-[#1D4ED8] px-2.5 py-1 rounded-md bg-[#F2F2EF] border border-[#E5E5E2]">
                      {activeCert.issuer}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-[#737370]">
                      {activeCert.year}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#0D0D0D] font-heading leading-snug">
                    {activeCert.title}
                  </h4>

                  <p className="text-sm text-[#525250] leading-relaxed [text-wrap:pretty]">
                    {activeCert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeCert.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-md bg-[#F2F2EF] border border-[#E5E5E2] text-xs font-medium text-[#0D0D0D]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Navigation & Verify CTA */}
              <div className="pt-6 mt-6 border-t border-[#E5E5E2] flex flex-wrap items-center justify-between gap-4">
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D0D0D] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                  aria-label={`Verify ${activeCert.title} credential on ${activeCert.issuer}`}
                >
                  <span>Verify credential</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>

                {/* Integrated Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-lg border border-[#E5E5E2] bg-[#F8F8F6] hover:bg-white text-[#525250] hover:text-[#0D0D0D] flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                    aria-label="Previous certificate"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>

                  <span className="text-xs font-mono tabular-nums text-[#737370] px-1 select-none">
                    0{activeIndex + 1} / 0{certificates.length}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-8 h-8 rounded-lg border border-[#E5E5E2] bg-[#F8F8F6] hover:bg-white text-[#525250] hover:text-[#0D0D0D] flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                    aria-label="Next certificate"
                  >
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card-Swap Deck */}
            <div className="lg:col-span-6 relative w-full h-[340px] sm:h-[380px] flex items-center justify-center overflow-hidden">
              <CardSwap
                ref={cardSwapRef}
                width={420}
                height={280}
                cardDistance={48}
                verticalDistance={42}
                depth={75}
                skewAmount={0}
                visibleCards={3}
                cardRadius={18}
                delay={6000}
                speed={1}
                bounce={0.35}
                parallax={0.5}
                hoverSpread={0.12}
                dim={0.4}
                autoplay={isAutoplayActive}
                pauseOnHover={true}
                draggable={true}
                theme="light"
                onChange={handleCardChange}
                onCardClick={triggerManualLockout}
                className="w-full h-full"
              >
                {certificates.map((cert) => (
                  <Card key={cert.id} className="cursor-grab active:cursor-grabbing">
                    <div className="box-border flex h-full flex-col gap-2 p-2.5 bg-white">
                      {/* Card Top Title Strip */}
                      <div className="flex h-8 items-center justify-between gap-2 px-1.5">
                        <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#0D0D0D] truncate">
                          {cert.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#737370] flex-shrink-0">
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Real Certificate Image Mockup */}
                      <div className="relative flex-1 overflow-hidden rounded-xl border border-[#E5E5E2] bg-[#F8F8F6]">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 420px"
                          draggable={false}
                          className="pointer-events-none absolute inset-0 block h-full w-full object-cover select-none"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </motion.div>

        {/* 3. Other Experience — Clean Timeline Layout */}
        <motion.div {...revealProps} className="max-w-3xl space-y-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737370]">
              Other experience
            </h3>
            <p className="text-xs text-[#525250] mt-1">
              Non-development professional and customer communication roles.
            </p>
          </div>

          <div className="space-y-4">
            {otherExperience.map((exp) => (
              <div
                key={exp.id}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E5E2] shadow-sm space-y-2 transition-all duration-200 hover:border-[#1D4ED8]/40 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-base sm:text-lg font-bold text-[#0D0D0D] font-heading">
                    {exp.role}
                  </h4>
                  {exp.organization && (
                    <span className="text-xs font-semibold text-[#1D4ED8]">
                      {exp.organization}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#525250] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Background;
