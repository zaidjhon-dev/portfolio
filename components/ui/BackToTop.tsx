"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa6";

/**
 * BackToTop
 * A small floating button that appears once the user has scrolled more than
 * one viewport height and smoothly returns them to the very top of the page.
 *
 * Performance: uses a passive scroll listener and only re-renders when the
 * visibility threshold is crossed (not on every scroll pixel).
 */
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Show after scrolling past 60% of the viewport height
        setShow(window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "#home");
  };

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className={[
            // Position: bottom-right, above any other fixed UI
            "fixed bottom-6 right-6 z-[4999]",
            // Size
            "h-11 w-11 sm:h-12 sm:w-12",
            // Visual
            "flex items-center justify-center rounded-full",
            "bg-black-200/90 border border-white/15",
            "backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
            // Arrow glow
            "text-white hover:text-purple",
            // Transition
            "transition-colors duration-200",
          ].join(" ")}
        >
          <FaChevronUp className="text-sm sm:text-base" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
