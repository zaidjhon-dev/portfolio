"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationArrow, FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { projects } from "@/data";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

// Detailed project descriptions and feature highlights for the modal view
const projectDetails: Record<
  number,
  {
    subtitle: string;
    overview: string;
    features: string[];
    techStack: { name: string; icon: string }[];
  }
> = {
  1: {
    subtitle: "Interactive 3D Solar System Experience",
    overview:
      "DermaSure PH functions as a secure discovery portal that will verify skincare products against the FDA Philippines database, protecting consumers from counterfeit items and harmful ingredients. The platform avoids direct sales, instead linking users directly to official distributors on Shopee or Lazada to ensure authenticity.",
    features: [
      "Every product listed is carefully cross-checked against the FDA Philippines veirification portal to ensure authenticity and safety.",
      "An interactive and optimized website built for solely for beauty enthusiasts and skincare lovers",
      "Smooth and efficient animations with framer motion and tailwind css",
      "Implemented proper security protocols and authentication and access control using supabase",
    ],
    techStack: [
      { name: "Next.js", icon: "/nextjs.svg" },
      { name: "Supabase", icon: "/supabase.svg" },
      { name: "TypeScript", icon: "/ts.svg" },
      { name: "Tailwind CSS", icon: "/tail.svg" },
      { name: "Framer Motion", icon: "/fm.svg" },
    ],
  },
};

const RecentProjects = () => {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setActive(null);
  }, []);

  // Close on Escape key and handle body scroll lock
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active, handleClose]);

  // Close on outside tap / click
  useOutsideClick(modalRef, handleClose);

  const formatLink = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url.replace(/^\//, "")}`;
  };

  return (
    <section id="projects" className="py-20 scroll-mt-24 w-full">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <p className="text-white-200 text-center text-sm sm:text-base mt-3 max-w-xl mx-auto">
        Click any card to explore full project details, architectural highlights, and live demonstrations.
      </p>

      {/* ─── Expandable Modal Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[5000]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div
            key="project-modal-container"
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
              className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0b0c1e] border border-white/15 rounded-3xl overflow-hidden shadow-[0_16px_50px_0_rgba(0,0,0,0.8)] relative my-auto transform-gpu will-change-transform"
            >
              {/* Close Button */}
              <button
                aria-label="Close project modal"
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"
              >
                <IoClose className="w-5 h-5" />
              </button>

              {/* Modal Banner Showcase */}
              <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-[#13162D] flex items-center justify-center flex-shrink-0">
                <img
                  src="/bg.png"
                  alt="background pattern"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60"
                />
                <img
                  src={active.img}
                  alt={active.title}
                  loading="lazy"
                  decoding="async"
                  className="z-10 absolute bottom-0 max-h-[85%] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:thin]">
                {/* Header info & Action button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {active.title}
                    </h2>
                    <p className="text-sm font-medium text-purple">
                      {projectDetails[active.id]?.subtitle ?? active.des}
                    </p>
                  </div>

                  <a
                    href={formatLink(active.link)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple hover:bg-purple/90 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(203,172,249,0.35)] active:scale-95 flex-shrink-0"
                  >
                    <span>Check Live Site</span>
                    <FaLocationArrow className="w-3 h-3" />
                  </a>
                </div>

                {/* Extended Overview */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                    Project Overview
                  </h3>
                  <p className="text-white-200 text-sm sm:text-base leading-relaxed">
                    {projectDetails[active.id]?.overview ?? active.des}
                  </p>
                </div>

                {/* Key Features List */}
                {projectDetails[active.id]?.features && (
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                      Key Highlights &amp; Features
                    </h3>
                    <ul className="space-y-2">
                      {projectDetails[active.id].features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                        >
                          <FaCircleCheck className="w-4 h-4 text-purple mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails[active.id]?.techStack ? (
                      projectDetails[active.id].techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black-200/90 border border-white/10 text-xs font-medium text-white-100"
                        >
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            loading="lazy"
                            decoding="async"
                            className="w-4 h-4 object-contain"
                          />
                          <span>{tech.name}</span>
                        </div>
                      ))
                    ) : (
                      active.iconLists.map((icon, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-full bg-black-200 border border-white/10"
                        >
                          <img
                            src={icon}
                            alt="tech icon"
                            loading="lazy"
                            decoding="async"
                            className="w-4 h-4 object-contain"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Projects Grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mt-12 w-full">
        {projects.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setActive(item)}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6",
              "bg-[#0c0e23]/90 backdrop-blur-lg border border-white/10 hover:border-purple/50",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(203,172,249,0.18)]",
              "cursor-pointer transition-colors duration-200 overflow-hidden transform-gpu"
            )}
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple/20 via-indigo-500/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Image banner */}
              <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden bg-[#13162D] flex items-center justify-center">
                <img
                  src="/bg.png"
                  alt="background pattern"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="z-10 absolute bottom-0 max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-100/60 via-transparent to-transparent" />
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-purple transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-white-200 text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed">
                  {item.des}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer: Tech Stack & Expand CTA */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 relative z-10">
              {/* Tech Stack icon badges */}
              <div className="flex items-center">
                {item.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/20 rounded-full bg-black/90 w-8 h-8 sm:w-9 sm:h-9 flex justify-center items-center"
                    style={{
                      transform: `translateX(-${6 * index}px)`,
                    }}
                  >
                    <img
                      src={icon}
                      alt="tech icon"
                      loading="lazy"
                      decoding="async"
                      className="p-1.5 w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Click to expand pill */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-purple group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <FaLocationArrow className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
