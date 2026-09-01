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

  useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.35, delay: stagger(0.04) }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={cn(
            "inline-block mr-[0.25em]",
            idx > 3 ? "text-purple" : "text-white"
          )}
          style={{ opacity: 0, filter: "blur(4px)" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-2 sm:my-4">
        <div className="text-white leading-snug tracking-tight">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
