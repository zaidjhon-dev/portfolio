"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const baseEase = [0.22, 1, 0.36, 1] as const;

/**
 * ProfileCardMobile
 * Mobile & Tablet (< 1024px) Pop-Out Avatar Profile Card.
 * Design:
 * - Half-ellipse (arch) cobalt blue background, upright (no tilt), flat (no shadow)
 * - Scaled to clear the floating navbar with comfortable breathing room on small screens
 * - Avatar head exceeds the top apex of the ellipse for a clean pop-out effect
 * - Hips and shirt bottom rest cleanly inside the base of the half-ellipse
 * - Lightweight, performant Framer Motion spring entrance
 */
export const ProfileCardMobile: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center pt-2 pb-4 lg:hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        whileTap={{ scale: 0.98 }}
        className="relative mx-auto w-[215px] sm:w-[240px] h-[265px] sm:h-[300px] select-none flex items-center justify-center cursor-pointer"
      >
        {/* ── 1. The Half-Ellipse (Arch) Cobalt Blue Background (No tilt, no shadow) ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.92, y: 16 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.5, ease: baseEase },
            },
          }}
          className="absolute bottom-0 left-0 right-0 mx-auto w-[180px] sm:w-[205px] h-[190px] sm:h-[215px] rounded-t-full rounded-b-none bg-gradient-to-b from-[#2B66F5] to-[#1D4ED8]"
        />

        {/* ── 2. The Pop-Out Portrait Cutout ── */}
        {/* 
            - Head rises ~55-62px above the top apex of the half-ellipse
            - Bottom rests at bottom-0, fully contained within the half-ellipse base
            - Reduced scale ensures generous clearance beneath the floating navbar
        */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.92, y: 22 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                delay: 0.08,
                type: "spring",
                stiffness: 140,
                damping: 16,
                mass: 0.85,
              },
            },
          }}
          className="absolute bottom-0 left-0 right-0 mx-auto w-[205px] sm:w-[230px] h-[305px] sm:h-[345px] pointer-events-none z-10"
        >
          <div className="relative w-full h-full">
            <Image
              src="/profile.webp"
              alt="Jhon Renz Diaz"
              fill
              priority
              sizes="(max-width: 640px) 205px, 230px"
              className="object-contain object-bottom drop-shadow-[0_10px_18px_rgba(0,0,0,0.16)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileCardMobile;
