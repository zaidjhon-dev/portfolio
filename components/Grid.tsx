"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  // Single observer on the section — fires once when ~5% enters view.
  // Driving all card animations from here prevents per-card IO timing races
  // that caused the flicker when items were already in the viewport.
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="about" className="scroll-mt-24" ref={ref}>
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
            // Pass isInView + stagger delay so the card animates exactly once,
            // driven by the parent — not by its own IntersectionObserver.
            isInView={isInView}
            animationDelay={i * 0.07}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;

