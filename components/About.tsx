import React from "react";
import { aboutData } from "@/data";
import { RevealSection } from "@/components/ui/Reveal";

export const About = () => {
  return (
    <RevealSection
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-20 border-b border-[#E5E5E2] bg-[#F8F8F6]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-wide text-[#1D4ED8] mb-2">
            Overview
          </p>
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] font-heading mb-6"
          >
            About
          </h2>

          <p className="text-base sm:text-lg text-[#525250] leading-relaxed mb-10 max-w-3xl [text-wrap:pretty]">
            {aboutData.narrative}
          </p>

          {/* Asymmetric layout (7:5 split) replacing generic equal 50/50 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Column (7 cols): Production stack in DermaSure PH */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E2] shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-[#1D4ED8]/40 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold tracking-wide text-[#1D4ED8]">
                    Used in DermaSure PH
                  </h3>
                  <span className="text-[11px] font-mono text-[#737370]">
                    Production stack
                  </span>
                </div>
                <p className="text-xs text-[#525250] mb-5 leading-relaxed">
                  Core technologies powering the live DermaSure PH portal from UI layer to backend database.
                </p>
                <div className="flex flex-wrap gap-2">
                  {aboutData.usedInDermaSure.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#F2F2EF] border border-[#E5E5E2] text-xs font-medium text-[#0D0D0D] transition-colors duration-200 hover:border-[#1D4ED8]/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Column (5 cols): Active Learning */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-white border border-[#E5E5E2] shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-[#1D4ED8]/40 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold tracking-wide text-[#1D4ED8]">
                    Currently learning
                  </h3>
                  <span className="text-[11px] font-mono text-[#737370]">
                    In progress
                  </span>
                </div>
                <p className="text-xs text-[#525250] mb-5 leading-relaxed">
                  Active study areas to deepen architecture and modern frontend patterns.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-[#525250]">
                  {aboutData.currentlyLearning.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#1D4ED8] select-none text-base leading-none">
                        &rsaquo;
                      </span>
                      <span className="text-[#0D0D0D] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default About;
