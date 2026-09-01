"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight radius in px */
  radius?: number;
  /** Spotlight colour – any valid CSS colour */
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * CardSpotlight
 * Mouse-tracking radial gradient spotlight with an animated CSS dot-matrix
 * revealed inside the spotlight mask on hover.
 * 100% hardware-accelerated with 0 WebGL overhead.
 */
const CardSpotlight = ({
  radius = 350,
  color = "rgba(140, 90, 255, 0.30)",
  className,
  children,
  ...props
}: CardSpotlightProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group/spotlight relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Spotlight mask with animated CSS dot matrix grid */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-40 animate-pulse" />
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default CardSpotlight;
