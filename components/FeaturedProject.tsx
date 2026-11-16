"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowSquareOut,
  X,
  Check,
  ShieldCheck,
  Database,
  ShoppingBag,
} from "@phosphor-icons/react";
import { featuredProject } from "@/data";

const baseEase = [0.22, 1, 0.36, 1] as const;

export const FeaturedProject = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Focus trap, scroll lock, Escape key for dialog
  useEffect(() => {
    if (!dialogOpen) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseDialog();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements =
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogOpen, handleCloseDialog]);

  return (
    <motion.section
      id="project"
      aria-labelledby="featured-project-heading"
      className="py-16 sm:py-20 border-b border-[#E5E5E2] bg-[#F8F8F6]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: baseEase }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold tracking-wide text-[#1D4ED8] mb-2">
            Featured project
          </p>
          <h2
            id="featured-project-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] font-heading"
          >
            DermaSure PH
          </h2>
        </div>

        {/* Project Card: Editorial Split with Browser Window Chrome */}
        <div className="rounded-xl bg-white border border-[#E5E5E2] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Screenshot Column with Browser Window Mockup Frame */}
            <div className="lg:col-span-7 bg-[#F2F2EF]/60 p-5 sm:p-7 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E5E5E2]">
              {/* Browser Chrome Header */}
              <div className="w-full rounded-t-lg bg-white border border-[#E5E5E2] border-b-0 px-3.5 py-2.5 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E2]" />
                </div>
                <div className="flex-1 max-w-[220px] mx-auto text-center px-2 py-0.5 rounded bg-[#F2F2EF] text-[10px] font-mono text-[#525250] truncate border border-[#E5E5E2]">
                  dermasure-ph.vercel.app
                </div>
              </div>

              {/* Viewport Screenshot */}
              <div className="relative w-full aspect-[16/10] rounded-b-lg overflow-hidden border border-[#E5E5E2] bg-[#F8F8F6] shadow-sm">
                <Image
                  src={featuredProject.image}
                  alt="DermaSure PH desktop user interface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover object-top"
                />
              </div>

              {/* Key Highlights Micro-strip */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E5E5E2] text-[11px] text-[#525250]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#1D4ED8] flex-shrink-0" />
                  <span className="truncate">FDA Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag size={15} className="text-[#1D4ED8] flex-shrink-0" />
                  <span className="truncate">Store Links</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database size={15} className="text-[#1D4ED8] flex-shrink-0" />
                  <span className="truncate">Supabase Data</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#F2F2EF] border border-[#E5E5E2] text-[11px] font-mono text-[#1D4ED8] font-medium">
                    {featuredProject.status}
                  </span>
                  <span className="text-xs text-[#8C8C88]">&bull;</span>
                  <span className="text-xs text-[#525250]">
                    {featuredProject.role}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#525250] leading-relaxed [text-wrap:pretty]">
                  {featuredProject.summary}
                </p>

                {/* Tech Stack */}
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#737370] mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2.5 py-1 rounded-md bg-[#F2F2EF] border border-[#E5E5E2] text-xs font-medium text-[#0D0D0D]"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E5E2]">
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-blue gap-2"
                >
                  <span>Visit live site</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>

                <button
                  ref={triggerRef}
                  type="button"
                  onClick={handleOpenDialog}
                  aria-haspopup="dialog"
                  className="btn-secondary-light"
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Accessible Details Dialog ────────────────────────────────────── */}
      <AnimatePresence>
        {dialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: baseEase }}
              onClick={handleCloseDialog}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: baseEase }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-[#E5E5E2] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E5E2]">
                <div>
                  <span className="text-xs font-semibold tracking-wide text-[#1D4ED8]">
                    Project architecture & context
                  </span>
                  <h3
                    id="project-dialog-title"
                    className="text-xl sm:text-2xl font-bold text-[#0D0D0D] font-heading mt-1"
                  >
                    DermaSure PH
                  </h3>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close details"
                  onClick={handleCloseDialog}
                  className="p-2 rounded-lg text-[#525250] hover:text-[#0D0D0D] hover:bg-[#F2F2EF] border border-transparent hover:border-[#E5E5E2] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-6 text-sm text-[#525250] leading-relaxed">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0D] mb-2">
                    Overview
                  </h4>
                  <p>{featuredProject.dialogDetails.overview}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0D] mb-2">
                    Implementation highlights
                  </h4>
                  <ul className="space-y-2">
                    {featuredProject.dialogDetails.highlights.map(
                      (highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check
                            size={14}
                            weight="bold"
                            className="text-[#1D4ED8] mt-1 flex-shrink-0"
                          />
                          <span className="text-[#0D0D0D]">{highlight}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F2F2EF] border border-[#E5E5E2] text-xs text-[#525250] leading-relaxed">
                  {featuredProject.dialogDetails.clarifications}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E2] mt-auto">
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="btn-secondary-light"
                >
                  Close details
                </button>

                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-blue gap-2"
                >
                  <span>Visit live site</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default FeaturedProject;
