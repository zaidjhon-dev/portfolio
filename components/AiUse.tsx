import React from "react";
import Image from "next/image";
import { aiSectionData } from "@/data";
import { RevealSection } from "@/components/ui/Reveal";

export const AiUse = () => {
  return (
    <RevealSection
      id="ai-practice"
      aria-labelledby="ai-practice-heading"
      className="py-12 sm:py-16 border-b border-[#E5E5E2] bg-[#F8F8F6]"
    >
      <h2 id="ai-practice-heading" className="sr-only">
        AI in development practice
      </h2>

      {/* ── Full-Width Editorial Breaker Banner ────────────────────────── */}
      {/* Edge-to-edge section breaker disrupting repetitive card layout */}
      <div className="w-full border-y border-[#E5E5E2] bg-[#F2F2EF] py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#1D4ED8] mb-4">
            Perspective & Philosophy
          </p>

          <blockquote className="relative">
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0D0D0D] leading-tight sm:leading-snug [text-wrap:balance]">
              &ldquo;{aiSectionData.quote}&rdquo;
            </p>
            <footer className="mt-6 text-xs sm:text-sm text-[#525250] font-medium flex items-center justify-center gap-2">
              <span className="text-[#1D4ED8]">&mdash;</span>
              <cite className="not-italic text-[#0D0D0D] font-semibold">
                {aiSectionData.author}
              </cite>
              <span className="text-[#8C8C88]">&middot;</span>
              <span className="text-[#525250]">
                {aiSectionData.authorRole}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── Supporting Narrative & Tooling Grid ─────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-14">
        <div className="max-w-3xl">
          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#525250] leading-relaxed mb-10 [text-wrap:pretty]">
            {aiSectionData.narrative}
          </p>

          {/* AI Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737370] mb-4">
              Actively used in development
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {aiSectionData.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E5E5E2] shadow-sm transition-all duration-200 hover:border-[#1D4ED8]/40 hover:shadow-md"
                >
                  <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center p-1 rounded-lg bg-[#F2F2EF]">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={22}
                      height={22}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0D0D0D]">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

export default AiUse;
