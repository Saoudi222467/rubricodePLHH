import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type ScrollSectionProps = {
  children: (scrollYProgress: MotionValue<number>) => React.ReactNode;
};

export function ScrollSection({ children }: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Adjust these offsets to control when 0 and 1 occur.
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {children(scrollYProgress)}
    </section>
  );
}
