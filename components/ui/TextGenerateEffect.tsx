"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words = "",
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words ? words.split(" ") : [];

  // Fix: empty deps [] so the animation fires exactly once on mount.
  // scope.current is a mutable ref value and must NOT be a useEffect
  // dependency — it causes re-triggering conflicts and flickering.
  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        { opacity: 1 },
        { duration: 2, delay: stagger(0.2) }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={`${idx > 3 ? "text-purple" : "text-white"} opacity-0`}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="text-white leading-snug tracking-tight">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
