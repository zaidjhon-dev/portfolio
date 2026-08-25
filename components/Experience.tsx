"use client";

import React from "react";
import { motion } from "framer-motion";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
  },
};

const Experience = () => {
  return (
    <section id="work" className="py-20 w-full scroll-mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="heading"
      >
        My <span className="text-purple">work experience</span>
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        {workExperience.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            className="flex"
          >
            <Button
              duration={12000 + card.id * 2000}
              borderRadius="1.75rem"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                borderRadius: `calc(1.75rem * 0.96)`,
              }}
              className="text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
            >
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center p-5 md:p-6 lg:p-7 gap-3 sm:gap-4">
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="w-14 sm:w-16 lg:w-14 xl:w-16 flex-shrink-0 object-contain"
                />
                <div className="text-center sm:text-left lg:text-center xl:text-left">
                  <h1 className="text-lg sm:text-xl font-bold leading-snug">
                    {card.title}
                  </h1>
                  <p className="text-white-100 mt-2 text-sm font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
