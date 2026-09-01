"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoGlobeOutline, IoTimeOutline, IoCheckmarkCircle } from "react-icons/io5";

interface HubLocation {
  id: string;
  name: string;
  country: string;
  tz: string;
  offsetHours: number;
  cx: number; // SVG coordinate x (0-800)
  cy: number; // SVG coordinate y (0-400)
  isPrimary?: boolean;
}

const GLOBAL_HUBS: HubLocation[] = [
  {
    id: "mnl",
    name: "Manila",
    country: "Philippines",
    tz: "PHT (UTC+8)",
    offsetHours: 8,
    cx: 630,
    cy: 215,
    isPrimary: true,
  },
  {
    id: "sfo",
    name: "San Francisco",
    country: "United States",
    tz: "PST (UTC-7)",
    offsetHours: -7,
    cx: 175,
    cy: 145,
  },
  {
    id: "nyc",
    name: "New York",
    country: "United States",
    tz: "EST (UTC-4)",
    offsetHours: -4,
    cx: 260,
    cy: 140,
  },
  {
    id: "lon",
    name: "London",
    country: "United Kingdom",
    tz: "BST (UTC+1)",
    offsetHours: 1,
    cx: 410,
    cy: 110,
  },
  {
    id: "tyo",
    name: "Tokyo",
    country: "Japan",
    tz: "JST (UTC+9)",
    offsetHours: 9,
    cx: 685,
    cy: 150,
  },
  {
    id: "syd",
    name: "Sydney",
    country: "Australia",
    tz: "AEST (UTC+10)",
    offsetHours: 10,
    cx: 710,
    cy: 315,
  },
];

// Connection arcs from Manila (630, 215) to other hubs
const ARCS = [
  { from: { x: 630, y: 215 }, to: { x: 175, y: 145 }, controlY: 60 },
  { from: { x: 630, y: 215 }, to: { x: 260, y: 140 }, controlY: 70 },
  { from: { x: 630, y: 215 }, to: { x: 410, y: 110 }, controlY: 90 },
  { from: { x: 630, y: 215 }, to: { x: 685, y: 150 }, controlY: 160 },
  { from: { x: 630, y: 215 }, to: { x: 710, y: 315 }, controlY: 280 },
];

const GridGlobe = () => {
  const [activeHub, setActiveHub] = useState<HubLocation | null>(GLOBAL_HUBS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to calculate current time in a given timezone offset
  const getHubTime = (offsetHours: number) => {
    if (!mounted) return "--:--";
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const hubDate = new Date(utc + 3600000 * offsetHours);
    return hubDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex flex-col justify-between overflow-hidden select-none">
      {/* ── Background Glow & Radial Gradients ──────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#062056]/20 via-transparent to-black-100/60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Interactive Vector World Map Container ────────────────────────── */}
      <div className="relative w-full flex-1 flex items-center justify-center pt-2 sm:pt-4">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto max-h-[240px] object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.15)]"
          aria-label="Interactive Global Timezone Map"
        >
          <defs>
            {/* Gradient for connection arcs */}
            <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbacf9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Simplified High-Tech Continent Dots ───────────────────────── */}
          {/* North America */}
          <g fill="rgba(255, 255, 255, 0.12)">
            <circle cx="160" cy="120" r="3" /><circle cx="180" cy="115" r="4" /><circle cx="200" cy="110" r="3" />
            <circle cx="170" cy="135" r="4" /><circle cx="190" cy="130" r="4" /><circle cx="210" cy="125" r="5" />
            <circle cx="230" cy="120" r="4" /><circle cx="250" cy="130" r="5" /><circle cx="270" cy="135" r="4" />
            <circle cx="180" cy="155" r="4" /><circle cx="200" cy="150" r="4" /><circle cx="220" cy="145" r="4" />
            <circle cx="240" cy="150" r="4" /><circle cx="260" cy="155" r="3" /><circle cx="220" cy="175" r="3" />
          </g>

          {/* South America */}
          <g fill="rgba(255, 255, 255, 0.1)">
            <circle cx="280" cy="220" r="4" /><circle cx="300" cy="210" r="5" /><circle cx="310" cy="230" r="4" />
            <circle cx="290" cy="245" r="4" /><circle cx="315" cy="250" r="4" /><circle cx="300" cy="270" r="3" />
            <circle cx="305" cy="290" r="3" /><circle cx="310" cy="310" r="2" />
          </g>

          {/* Europe */}
          <g fill="rgba(255, 255, 255, 0.12)">
            <circle cx="400" cy="100" r="3" /><circle cx="415" cy="95" r="4" /><circle cx="430" cy="105" r="4" />
            <circle cx="410" cy="115" r="4" /><circle cx="435" cy="120" r="4" /><circle cx="450" cy="110" r="4" />
            <circle cx="465" cy="115" r="3" />
          </g>

          {/* Africa */}
          <g fill="rgba(255, 255, 255, 0.1)">
            <circle cx="420" cy="160" r="4" /><circle cx="440" cy="155" r="5" /><circle cx="460" cy="165" r="4" />
            <circle cx="430" cy="185" r="4" /><circle cx="450" cy="190" r="4" /><circle cx="470" cy="180" r="4" />
            <circle cx="440" cy="215" r="4" /><circle cx="460" cy="220" r="3" /><circle cx="450" cy="245" r="3" />
          </g>

          {/* Asia */}
          <g fill="rgba(255, 255, 255, 0.12)">
            <circle cx="510" cy="100" r="4" /><circle cx="535" cy="95" r="4" /><circle cx="560" cy="105" r="5" />
            <circle cx="585" cy="100" r="4" /><circle cx="610" cy="110" r="4" /><circle cx="635" cy="115" r="4" />
            <circle cx="520" cy="130" r="4" /><circle cx="545" cy="125" r="5" /><circle cx="570" cy="135" r="4" />
            <circle cx="595" cy="130" r="5" /><circle cx="620" cy="140" r="4" /><circle cx="645" cy="135" r="4" />
            <circle cx="670" cy="130" r="3" /><circle cx="580" cy="165" r="4" /><circle cx="605" cy="170" r="4" />
            <circle cx="630" cy="175" r="4" /><circle cx="655" cy="165" r="4" />
          </g>

          {/* Australia / Oceania */}
          <g fill="rgba(255, 255, 255, 0.1)">
            <circle cx="675" cy="285" r="4" /><circle cx="700" cy="280" r="5" /><circle cx="725" cy="290" r="4" />
            <circle cx="685" cy="305" r="4" /><circle cx="710" cy="310" r="4" /><circle cx="730" cy="315" r="3" />
          </g>

          {/* ── Curved Connection Arcs with Pulsing Flow ──────────────────── */}
          {ARCS.map((arc, i) => {
            const pathD = `M ${arc.from.x} ${arc.from.y} Q ${(arc.from.x + arc.to.x) / 2} ${arc.controlY} ${arc.to.x} ${arc.to.y}`;
            return (
              <g key={i}>
                {/* Background static arc line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(203, 172, 249, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Animated pulse stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#arc-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-pulse-flow"
                  style={{
                    strokeDasharray: "30 150",
                    animationDuration: `${3.5 + i * 0.8}s`,
                  }}
                />
              </g>
            );
          })}

          {/* ── Interactive Hub Nodes ────────────────────────────────────── */}
          {GLOBAL_HUBS.map((hub) => {
            const isSelected = activeHub?.id === hub.id;
            return (
              <g
                key={hub.id}
                onClick={() => setActiveHub(hub)}
                onMouseEnter={() => setActiveHub(hub)}
                className="cursor-pointer group/node"
              >
                {/* Outer animated radar ring for primary hub (Manila) */}
                {hub.isPrimary && (
                  <>
                    <circle
                      cx={hub.cx}
                      cy={hub.cy}
                      fill="none"
                      stroke="#cbacf9"
                      strokeWidth="1.2"
                    >
                      <animate attributeName="r" values="8;22" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx={hub.cx}
                      cy={hub.cy}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.8"
                    >
                      <animate attributeName="r" values="6;32" dur="3.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0" dur="3.2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Selection ring */}
                {isSelected && !hub.isPrimary && (
                  <circle
                    cx={hub.cx}
                    cy={hub.cy}
                    r="12"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                )}

                {/* Core node dot */}
                <circle
                  cx={hub.cx}
                  cy={hub.cy}
                  r={hub.isPrimary ? "6" : isSelected ? "5" : "4"}
                  fill={hub.isPrimary ? "#cbacf9" : isSelected ? "#38bdf8" : "#ffffff"}
                  filter={hub.isPrimary || isSelected ? "url(#glow)" : undefined}
                  className="transition-all duration-300 group-hover/node:scale-125"
                />

                {/* Node city label */}
                <text
                  x={hub.cx}
                  y={hub.cy + (hub.cy > 250 ? -12 : 16)}
                  textAnchor="middle"
                  fill={hub.isPrimary ? "#cbacf9" : isSelected ? "#ffffff" : "rgba(255,255,255,0.6)"}
                  fontSize="10"
                  fontWeight={hub.isPrimary || isSelected ? "700" : "500"}
                  className="transition-colors duration-200 pointer-events-none select-none"
                >
                  {hub.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Bottom Status Bar & Active Hub Details ───────────────────────── */}
      <div className="relative z-10 mt-2 sm:mt-3 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 sm:px-4">
        {/* Availability Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-[10px] sm:text-xs font-medium">
          <IoCheckmarkCircle className="w-3.5 h-3.5 text-purple" />
          <span>Flexible across PST • EST • GMT • PHT</span>
        </div>

        {/* Selected Hub Details Indicator */}
        <AnimatePresence mode="wait">
          {activeHub && (
            <motion.div
              key={activeHub.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300"
            >
              <IoGlobeOutline className="w-3.5 h-3.5 text-purple" />
              <span className="font-semibold text-white">{activeHub.name}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-purple font-medium">{activeHub.tz}</span>
              <span className="text-neutral-500">•</span>
              <div className="flex items-center gap-1 text-neutral-300">
                <IoTimeOutline className="w-3 h-3 text-purple" />
                <span className="font-mono text-white">{getHubTime(activeHub.offsetHours)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS Animation for pulse stroke flow */}
      <style jsx global>{`
        @keyframes pulseFlow {
          0% {
            stroke-dashoffset: 180;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-pulse-flow {
          animation: pulseFlow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GridGlobe;