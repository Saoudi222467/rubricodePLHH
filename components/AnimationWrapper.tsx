// AnimationWrapper.tsx
"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type AnimationWrapperProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string; // Added id property
};


export default function AnimationWrapper({ children, className = "", style = {} }: AnimationWrapperProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Create a smooth scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  // Fade out the section at the end of its scroll range – adjust thresholds as desired
  const fadeOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);

  return (
    <motion.section ref={ref} className={className} style={{ opacity: fadeOpacity, ...style }}>
      {children}
    </motion.section>
  );
}
