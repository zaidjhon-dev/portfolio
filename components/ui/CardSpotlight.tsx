"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
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
 * Mouse-tracking radial gradient spotlight with an animated dot-matrix
 * CanvasRevealEffect revealed inside the spotlight mask on hover.
 * The effect layer sits at z-0, behind all children (image, overlays, etc).
 */
const CardSpotlight = ({
  radius = 350,
  color = "#262626",
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

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn("group/spotlight relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Spotlight mask with CanvasRevealEffect – behind everything */}
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
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
            showGradient={false}
          />
        )}
      </motion.div>

      {/* Content – sits above the spotlight layer */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default CardSpotlight;
