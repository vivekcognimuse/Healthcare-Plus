"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const EnhancedTextReveal = ({ text, emphasisWords, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof text !== "string") {
    throw new Error("EnhancedTextReveal: text must be a string");
  }

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 flex h-[50%] items-center px-[1rem] py-[5rem]"
        }>
        <span
          className={
            "flex flex-wrap p-5 text-3xl leading-normal sm:text-4xl lg:text-5xl"
          }>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            // Check if this word is part of an emphasized phrase
            const shouldEmphasize = emphasisWords.some((phrase) => {
              // For single words
              if (!phrase.includes(" ")) {
                return word.replace(/[.,—;:!?]$/, "") === phrase;
              }

              // For multi-word phrases, check if this word is part of the phrase
              const phraseWords = phrase.split(" ");

              // Check if the current word could be part of a phrase starting at an earlier position
              for (
                let startPos = Math.max(0, i - phraseWords.length + 1);
                startPos <= i;
                startPos++
              ) {
                const potentialPhrase = words
                  .slice(startPos, startPos + phraseWords.length)
                  .join(" ");
                if (
                  potentialPhrase === phrase ||
                  potentialPhrase.startsWith(phrase)
                ) {
                  // If this word is within the range of the phrase
                  if (i >= startPos && i < startPos + phraseWords.length) {
                    return true;
                  }
                }
              }

              return false;
            });

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                emphasized={shouldEmphasize}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range, emphasized }) => {
  // Change animation from [0, 1] to [0.2, 1] so text is slightly visible at start
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      {/* Remove the absolute positioned background element causing alignment issues */}
      <motion.span
        style={{ opacity }}
        className={emphasized ? "font-semibold text-black" : "text-black/60"}>
        {children}
      </motion.span>
    </span>
  );
};
