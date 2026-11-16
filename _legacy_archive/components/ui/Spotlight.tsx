"use client";
import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
};

export const Spotlight = ({
  className,
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(270, 100%, 85%, .18) 0, hsla(270, 100%, 65%, .06) 50%, hsla(270, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 65%, .04) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(280, 100%, 85%, .10) 0, hsla(280, 100%, 55%, .03) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
}: SpotlightProps = {}) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-hidden opacity-100 transition-opacity duration-1000", className)}
    >
      {/* Left Spotlight Beam */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none animate-float-slow transform-gpu"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </div>

      {/* Right Spotlight Beam */}
      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none animate-float transform-gpu"
        style={{ animationDirection: "reverse", animationDuration: "7s" }}
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </div>
    </div>
  );
};
