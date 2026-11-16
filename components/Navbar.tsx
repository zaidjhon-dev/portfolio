"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { navItems } from "@/data";
import { cn } from "@/lib/utils";

const baseEase = [0.22, 1, 0.36, 1] as const;

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // ScrollSpy via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "project", "background", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll lock & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const targetId = link.replace("#", "");

      if (targetId === "home" || link === "#" || link === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "#home");
        setActiveSection("#home");
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", link);
          setActiveSection(link);
        }
      }
    },
    []
  );

  return (
    <>
      {/* ── Floating navigation bar ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 w-full max-w-full">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-[#E5E5E2] shadow-sm shadow-black/[0.04]">
          {/* Brand Wordmark */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            aria-label="ZAID.DEV home"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-md px-1 py-1"
          >
            <Image
              src="/logo-primary.svg"
              alt="ZAID.DEV"
              width={78}
              height={26}
              className="h-6 sm:h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={cn(
                    "relative py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-md px-1 select-none",
                    isActive
                      ? "text-[#0D0D0D] font-semibold"
                      : "text-[#525250] hover:text-[#0D0D0D]"
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveIndicator"
                      className="absolute -bottom-1 left-1 right-1 h-[2px] bg-[#1D4ED8] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              ref={toggleBtnRef}
              type="button"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-11 h-11 flex flex-col justify-center items-center gap-1.5 rounded-lg text-[#0D0D0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] touch-manipulation"
            >
              <motion.span
                animate={
                  menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: baseEase }}
                className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2, ease: baseEase }}
                className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: baseEase }}
                className="block w-5 h-[2px] bg-[#0D0D0D] rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-height mobile menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: baseEase }}
            className="fixed inset-0 z-[60] bg-[#F8F8F6]/98 backdrop-blur-2xl flex flex-col md:hidden"
          >
            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between px-5 sm:px-8 pt-5 pb-4 border-b border-[#E5E5E2]">
              <Image
                src="/logo-primary.svg"
                alt="ZAID.DEV"
                width={78}
                height={26}
                className="h-6 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-[#0D0D0D] hover:text-[#1D4ED8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
              >
                <X size={22} weight="bold" />
              </button>
            </div>

            {/* Centered links with staggered entry */}
            <nav
              className="flex-1 flex flex-col items-center justify-center gap-8"
              aria-label="Mobile navigation"
            >
              {navItems.map((item, i) => {
                const isActive = activeSection === item.link;
                return (
                  <motion.div
                    key={item.link}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.06,
                      duration: 0.4,
                      ease: baseEase,
                    }}
                  >
                    <Link
                      href={item.link}
                      onClick={(e) => handleNavClick(e, item.link)}
                      className={cn(
                        "text-2xl font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-md px-2 py-1",
                        isActive
                          ? "text-[#1D4ED8]"
                          : "text-[#525250] hover:text-[#0D0D0D]"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
