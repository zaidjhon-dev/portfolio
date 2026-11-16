"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretUp } from "@phosphor-icons/react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  // IntersectionObserver on #home per redesign skill
  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Display button once hero section is no longer intersecting
        setShow(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
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
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-40 h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-white/90 border border-[#E5E5E2] backdrop-blur-md shadow-lg shadow-black/[0.06] text-[#0D0D0D] hover:text-[#1D4ED8] hover:border-[#1D4ED8]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
        >
          <CaretUp size={16} weight="bold" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
