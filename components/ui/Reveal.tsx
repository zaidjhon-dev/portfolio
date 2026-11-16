"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function RevealSection(props: HTMLMotionProps<"section">) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: revealEase }}
      {...props}
    />
  );
}

export function Reveal({
  as: Tag = "div",
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "footer" }) {
  const Component = Tag === "footer" ? motion.footer : motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: revealEase }}
      {...props}
    />
  );
}
