"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IoSchoolOutline,
  IoRibbonOutline,
  IoClose,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { FaLocationArrow, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { certificates, educationInfo, activeExplorations } from "@/data";
import { useOutsideClick } from "@/hooks/use-outside-click";

import GridGlobe from "./GridGlobe";

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
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-6 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ─── Subcomponent: Card 3 Tech Stack with GPU CSS Keyframe Floats ────────── */
const TechStackCardContent = () => {
  const leftLists = ["Tailwind CSS", "TypeScript", "React.js"];
  const rightLists = ["Laravel", "PHP", "HTML / CSS"];

  return (
    <div className="flex gap-2 sm:gap-3 lg:gap-3.5 w-full justify-center mt-3 sm:mt-4 select-none">
      {/* Left Column */}
      <div className="flex flex-col gap-2 sm:gap-2.5 flex-1">
        {leftLists.map((item, i) => (
          <div
            key={i}
            className="animate-float"
            style={{
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3.6 + i * 0.5}s`,
            }}
          >
            <span className="block py-2 px-2 sm:py-2.5 sm:px-3 text-[11px] sm:text-xs lg:text-sm font-medium rounded-lg text-center bg-[#10132E] border border-white/[0.08] text-white/90 whitespace-nowrap shadow-sm">
              {item}
            </span>
          </div>
        ))}
        <div className="py-2 px-2 sm:py-2.5 sm:px-3 rounded-lg bg-[#10132E] border border-white/[0.05] opacity-20" />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2 sm:gap-2.5 flex-1">
        <div className="py-2 px-2 sm:py-2.5 sm:px-3 rounded-lg bg-[#10132E] border border-white/[0.05] opacity-20" />
        {rightLists.map((item, i) => (
          <div
            key={i}
            className="animate-float"
            style={{
              animationDelay: `${0.8 + i * 0.4}s`,
              animationDuration: `${4.0 + i * 0.5}s`,
            }}
          >
            <span className="block py-2 px-2 sm:py-2.5 sm:px-3 text-[11px] sm:text-xs lg:text-sm font-medium rounded-lg text-center bg-[#10132E] border border-white/[0.08] text-white/90 whitespace-nowrap shadow-sm">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Subcomponent: Card 4 Education Details ────────────────────────────── */
const EducationCardContent = () => {
  return (
    <div className="flex-1 flex flex-col justify-between items-start gap-3.5 sm:gap-4 py-2 sm:py-3 z-10 w-full">
      {/* School & Period Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 w-full">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-purple font-semibold block">
            Academic Institution
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug mt-0.5">
            {educationInfo.institution}
          </h3>
        </div>
        <span className="self-start sm:self-auto px-2.5 py-1 rounded-md bg-[#10132E] border border-white/10 text-[11px] font-mono text-neutral-300">
          {educationInfo.period}
        </span>
      </div>

      {/* Core Coursework Section */}
      <div className="w-full space-y-2">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
          Core Coursework
        </span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {educationInfo.coursework.map((course, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-lg bg-[#10132E] border border-white/10 text-white/90 hover:border-purple/40 hover:text-white transition-colors select-none"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Senior Capstone Teaser */}
      <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#0b0d21] border border-purple/20 relative overflow-hidden group">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] sm:text-[11px] font-semibold text-purple uppercase tracking-wider flex items-center gap-1.5">
            <IoRibbonOutline className="w-3.5 h-3.5" />
            {educationInfo.capstone.tag}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple/10 text-purple border border-purple/20">
            Upcoming Project
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
          {educationInfo.capstone.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed">
          {educationInfo.capstone.note}
        </p>
      </div>
    </div>
  );
};

/* ─── Subcomponent: Card 5 Currently Learning / Exploring Terminal ───────── */
const TerminalExplorationsContent = () => {
  return (
    <div className="mt-3 sm:mt-4 z-10 w-full flex-1 flex flex-col justify-between">
      {/* IDE Terminal Window */}
      <div className="rounded-2xl bg-[#090b1c] border border-white/10 overflow-hidden shadow-xl flex flex-col flex-1">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0e1128] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <span className="text-purple font-semibold">TS</span>
            <span>explorations.config.ts</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Lab</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 overflow-x-auto select-none">
          <div className="text-neutral-500">
            <span className="text-neutral-600 mr-2">1</span>
            <span className="text-neutral-400">&#47;&#47; Active R&amp;D &amp; Next-Gen Tech Stack</span>
          </div>
          <div>
            <span className="text-neutral-600 mr-2">2</span>
            <span className="text-purple font-semibold">export const </span>
            <span className="text-white">currentFocus</span>
            <span className="text-purple"> = </span>
            <span className="text-white">&#123;</span>
          </div>
          {activeExplorations.map((item, idx) => (
            <div key={item.key} className="pl-4">
              <span className="text-neutral-600 mr-2">{idx + 3}</span>
              <span className="text-sky-300 font-medium">{item.key}</span>
              <span className="text-white">: </span>
              <span className="text-emerald-300">&quot;{item.tech}&quot;</span>
              <span className="text-white">, </span>
              <span className="text-neutral-500 hidden sm:inline">&#47;&#47; {item.label}</span>
            </div>
          ))}
          <div>
            <span className="text-neutral-600 mr-2">{activeExplorations.length + 3}</span>
            <span className="text-white">&#125;;</span>
          </div>
        </div>

        {/* Terminal Bottom Status Bar */}
        <div className="px-3.5 py-2 bg-[#0a0d21] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="text-purple font-bold">&gt;</span>
            <span className="truncate">Watching repository • Ready for integration</span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">TypeScript 5.x</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Subcomponent: Card 6 Certificate Showcase & Modal ─────────────────── */
const CertificateCardContent = () => {
  const [activeCert, setActiveCert] = useState<(typeof certificates)[number] | null>(null);
  const [certIndex, setCertIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseCert = useCallback(() => {
    setActiveCert(null);
  }, []);

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

  const current = certificates[certIndex];

  return (
    <>
      {/* ─── Expandable Certificate Modal (Harmonious Theme) ─────────────── */}
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
            className="fixed inset-0 grid place-items-center z-[5001] p-3 sm:p-6 overflow-y-auto"
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
              className="w-full max-w-lg max-h-[88vh] flex flex-col bg-[#0b0c1e] border border-white/15 rounded-3xl overflow-y-auto [scrollbar-width:thin] shadow-[0_16px_50px_0_rgba(0,0,0,0.8)] relative my-auto p-5 sm:p-8 transform-gpu"
            >
              {/* Close Button */}
              <button
                aria-label="Close certificate modal"
                onClick={handleCloseCert}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <IoClose className="w-5 h-5" />
              </button>

              {/* Certificate Image Banner */}
              {activeCert.image && (
                <div className="relative w-full h-40 sm:h-56 rounded-2xl overflow-hidden bg-[#13162D] border border-white/10 flex items-center justify-center flex-shrink-0 mb-4">
                  <Image
                    src="/bg.png"
                    alt="background pattern"
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    className="object-cover opacity-30"
                  />
                  <div className="z-10 relative w-full h-full p-3">
                    <Image
                      src={activeCert.image}
                      alt={activeCert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Modal Header */}
              <div className="flex items-start gap-3 sm:gap-3.5 pr-8">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-purple/15 border border-purple/30 text-purple flex-shrink-0">
                  <IoRibbonOutline className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-purple font-semibold">
                    {activeCert.issuer} • {activeCert.date}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                    {activeCert.title}
                  </h3>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4 sm:mt-5 space-y-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium">
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

              {/* Description */}
              <div className="mt-4 sm:mt-5 space-y-1.5 pb-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium">
                  Certificate Overview
                </span>
                <p className="text-white-200 text-xs sm:text-sm leading-relaxed">
                  {activeCert.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">Statement of Accomplishment</span>
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple hover:bg-purple/90 text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(203,172,249,0.35)] active:scale-95 min-h-[44px]"
                >
                  <span>Verify Credential</span>
                  <FaArrowUpRightFromSquare className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── In-Card Certificate Showcase Preview with Tabbed Peek View ─── */}
      <div className="mt-3 sm:mt-4 z-10 w-full flex-1 flex flex-col justify-between">
        {/* Tabbed / Multi-Card Peek View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080a1c] border border-white/10 mb-3 w-full">
          {certificates.map((cert, idx) => {
            const isSelected = certIndex === idx;
            return (
              <button
                key={cert.id}
                onClick={() => setCertIndex(idx)}
                className={cn(
                  "relative flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center truncate",
                  isSelected
                    ? "text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCertTab"
                    className="absolute inset-0 rounded-lg bg-purple/20 border border-purple/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cert.issuer}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Certificate Interactive Peek Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0c0e23]/95 border border-white/10 hover:border-purple/40 transition-all flex flex-col justify-between flex-1">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-purple uppercase tracking-wider block">
                  {current.issuer} • {current.date}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                  {current.title}
                </h4>
              </div>
              <div className="p-1.5 rounded-lg bg-purple/15 text-purple border border-purple/30 flex-shrink-0">
                <IoRibbonOutline className="w-4 h-4" />
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 leading-relaxed">
              {current.description}
            </p>

            {/* Skills preview tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {current.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#10132E] border border-white/10 text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row: Direct Credential Badging + Overview Modal Trigger */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 gap-2">
            <button
              onClick={() => setActiveCert(current)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <span>View Details</span>
              <FaLocationArrow className="w-2.5 h-2.5 text-purple" />
            </button>

            {/* Direct Credential Badging */}
            <a
              href={current.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${current.title} credential directly`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple/15 hover:bg-purple/25 text-purple hover:text-white border border-purple/30 text-[11px] font-semibold transition-all active:scale-95"
            >
              <span>Verify</span>
              <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Main BentoGridItem ─────────────────────────────────────────────────── */
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
  isInView?: boolean;
  animationDelay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: animationDelay }}
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:border-white/[0.2] hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 transform-gpu",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Background Images and Overlays */}
      <div className="h-full relative flex flex-col justify-between">
        {/* Main Background Image */}
        {img && (
          <div className="w-full h-full absolute inset-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={typeof title === "string" ? title : "grid image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  imgClassName,
                  id === 1
                    ? "object-cover object-top scale-105 sm:scale-110 transition-transform duration-500 opacity-80"
                    : "object-cover object-center"
                )}
              />
            </div>
            {id === 1 && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#04071d] via-[#04071d]/70 to-black/30 pointer-events-none" />
            )}
          </div>
        )}

        {/* Decorative Spare Image */}
        {spareImg && (
          <div
            className={cn(
              "absolute right-0 -bottom-5 pointer-events-none",
              id === 5 ? "w-full opacity-80" : ""
            )}
          >
            <div className="relative w-full h-32 sm:h-48">
              <Image
                src={spareImg}
                alt="decorative spare image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Content Container */}
        <div
          className={cn(
            titleClassName,
            "relative md:h-full min-h-36 sm:min-h-40 flex flex-col px-4 sm:px-6 p-4 sm:p-6 lg:p-8 z-10",
            id === 1 ? "justify-end" : id === 4 ? "justify-start" : "justify-between"
          )}
        >
          {/* Card 4: Education — centered layout */}
          {id === 4 ? (
            <div className="flex flex-col h-full">
              <div className="relative z-20">
                {description && (
                  <div className="font-sans font-extralight text-xs sm:text-sm text-[#C1C2D3] z-10">
                    {description}
                  </div>
                )}
                <div className="font-heading text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold z-10 tracking-tight leading-snug mt-1">
                  {title}
                </div>
              </div>
              <EducationCardContent />
            </div>
          ) : (
            <>
              <div className={cn("relative z-20", id === 1 && "mt-auto")}>
                {/* Subtitle / Category label */}
                {description && (
                  <div className="font-sans font-extralight text-xs sm:text-sm lg:text-base text-[#C1C2D3] z-10">
                    {description}
                  </div>
                )}

                {/* Main Title */}
                <div
                  className={cn(
                    "font-heading text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold z-10 tracking-tight leading-snug mt-1",
                    (id === 1 || id === 2) && "text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]",
                    id === 5 && "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                  )}
                >
                  {title}
                </div>
              </div>

              {/* Conditional Subcomponents by ID */}
              {id === 2 && <GridGlobe />}
              {id === 3 && <TechStackCardContent />}
              {id === 5 && <TerminalExplorationsContent />}
              {id === 6 && <CertificateCardContent />}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
