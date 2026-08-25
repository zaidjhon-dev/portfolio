"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress, scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Show / hide navbar on scroll ─────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;
    const direction = current - (scrollYProgress.getPrevious() ?? 0);

    if (scrollY.get() < 60) {
      setVisible(true);
    } else if (direction < 0) {
      setVisible(true);
    } else {
      setVisible(false);
      setMenuOpen(false);
    }
  });

  // ─── Active section tracker (ScrollSpy) ──────────────────────────────────
  useEffect(() => {
    const sectionIds = [
      "home",
      ...navItems.map((item) => item.link.replace("#", "")),
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = `#${entry.target.id}`;
            setActiveSection(hash);
            window.history.replaceState(null, "", hash);
          }
        });
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // ─── Close mobile menu on Escape key press ──────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // ─── Smooth-scroll navigation handler ────────────────────────────────────
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
          const rect = el.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          window.history.replaceState(null, "", link);
          setActiveSection(link);
        }
      }
    },
    []
  );

  return (
    <>
      {/* ── Mobile Backdrop Overlay (dismisses on tap outside nav links) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[4990] bg-black/50 backdrop-blur-[2px] nav:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Desktop pill navbar (sm and above) ─────────────────────────── */}
      <motion.nav
        key="desktop-nav"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -80, x: "-50%" }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0, x: "-50%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed z-[5000] top-5 left-1/2",
          "hidden nav:flex items-center gap-1.5 lg:gap-2",
          "px-4 py-2 rounded-full",
          "bg-black-200/80 backdrop-blur-xl border border-white/10",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
          className
        )}
        style={{ backdropFilter: "blur(16px) saturate(180%)" }}
      >
        {/* Brand Primary Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="ZAID.DEV - Back to top"
          className="relative flex items-center pr-1.5 pl-0.5 py-0.5 group/logo rounded-full transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60 flex-shrink-0"
        >
          <img
            src="/logo-primary.svg"
            alt="ZAID.DEV"
            className="h-7 w-auto object-contain transition-opacity duration-200 group-hover/logo:opacity-90"
          />
        </Link>

        {/* Subtle vertical divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-0.5 flex-shrink-0" aria-hidden="true" />

        {/* Navigation Items */}
        {navItems.map((navItem, idx) => {
          const isActive = activeSection === navItem.link;
          return (
            <Link
              key={`nav-${idx}`}
              href={navItem.link}
              onClick={(e) => handleNavClick(e, navItem.link)}
              aria-label={navItem.name}
              className={cn(
                "relative px-3.5 lg:px-4 py-2 rounded-full flex-shrink-0",
                "text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60",
                isActive
                  ? "text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{navItem.name}</span>
            </Link>
          );
        })}
      </motion.nav>

      {/* ── Mobile top-left brand logo (below md) ─────────────────────────── */}
      <motion.div
        key="mobile-logo"
        initial={{ opacity: 0, y: -80 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[5000] top-4 left-4 nav:hidden"
      >
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="ZAID.DEV - Back to top"
          className={cn(
            "flex items-center px-3 py-2 rounded-full",
            "bg-black-200/90 backdrop-blur-xl border border-white/10",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
            "active:scale-95 transition-transform duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"
          )}
          style={{ backdropFilter: "blur(16px) saturate(180%)" }}
        >
          <img
            src="/logo-primary.svg"
            alt="ZAID.DEV"
            className="h-5 w-auto object-contain"
          />
        </Link>
      </motion.div>

      {/* ── Mobile hamburger (below md) ─────────────────────────────────── */}
      <motion.div
        key="mobile-nav"
        initial={{ opacity: 0, y: -80 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[5000] top-4 right-4 nav:hidden"
      >
        {/* Hamburger trigger pill */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={cn(
            "flex items-center gap-2.5 px-3.5 py-2 rounded-full",
            "bg-black-200/90 backdrop-blur-xl border border-white/10",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
            "text-white text-sm font-medium touch-manipulation",
            "active:scale-95 transition-transform duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"
          )}
          style={{ backdropFilter: "blur(16px) saturate(180%)" }}
        >
          {/* Animated hamburger / X icon */}
          <span className="relative w-4 h-3.5 flex flex-col justify-between items-center">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block h-0.5 w-full bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-full bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block h-0.5 w-full bg-white rounded-full origin-center"
            />
          </span>
          {/* Active section label */}
          <span className="text-neutral-300 text-xs font-medium tracking-wide">
            {navItems.find((i) => i.link === activeSection)?.name ?? "Menu"}
          </span>
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-dropdown"
              initial={{ opacity: 0, scale: 0.88, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
                mass: 0.8,
              }}
              className={cn(
                "absolute top-[calc(100%+0.6rem)] right-0 origin-top-right z-[5000]",
                "w-52 max-w-[calc(100vw-2rem)] py-2 rounded-2xl",
                "bg-black-200/95 backdrop-blur-2xl border border-white/15",
                "shadow-[0_12px_40px_0_rgba(0,0,0,0.7)]",
                "flex flex-col gap-1 overflow-hidden"
              )}
              style={{ backdropFilter: "blur(24px) saturate(200%)" }}
            >
              {/* Dropdown Header Brand */}
              <div className="px-3.5 py-2 mb-1 border-b border-white/10 flex items-center justify-between">
                <img
                  src="/logo-primary.svg"
                  alt="ZAID.DEV"
                  className="h-5 w-auto object-contain"
                />
              </div>

              {navItems.map((navItem, idx) => {
                const isActive = activeSection === navItem.link;
                return (
                  <Link
                    key={`mob-nav-${idx}`}
                    href={navItem.link}
                    onClick={(e) => handleNavClick(e, navItem.link)}
                    className={cn(
                      "relative mx-1.5 px-3.5 py-3 rounded-xl",
                      "text-sm font-medium transition-colors duration-200",
                      "flex items-center gap-3 touch-manipulation min-h-[44px]",
                      "active:scale-[0.98]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60",
                      isActive
                        ? "text-white font-semibold"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeMobilePill"
                        className="absolute inset-0 rounded-xl bg-purple/20 border border-purple/40 shadow-[0_0_15px_rgba(203,172,249,0.25)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {navItem.icon && (
                      <span className="relative z-10 text-base">{navItem.icon}</span>
                    )}
                    <span className="relative z-10">{navItem.name}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
