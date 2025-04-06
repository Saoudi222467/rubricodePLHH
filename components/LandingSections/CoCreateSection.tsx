"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function CoCreateSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const [finalOpacity, setFinalOpacity] = useState(0);
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = smoothScrollYProgress.onChange((value) => {
      if (value >= 0.9) {
        setFinalOpacity(1);
        unsubscribe();
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [smoothScrollYProgress]);

  return (
    <motion.section
      ref={ref}
      id="co-create-section"
      className="relative h-screen w-full overflow-hidden font-montserrat bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
        opacity: finalOpacity || sectionOpacity,
      }}
    >
      {/* Dark overlay for better text readability (optional) */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Container for the text elements, positioned absolutely */}
      <div className="relative z-10 w-full h-full">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -200, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.5 }}
          className="absolute top-40 left-10 text-5xl font-bold text-white glowing-text w-72"
        >
          You are not here to <span className="text-landing-bright glowing-text">Follow.</span>
        </motion.div>

        {/* Right text */}
        <motion.div
          initial={{ opacity: 0, x: 300, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.8, delay: 1 }}
          className="absolute top-40 right-10 text-5xl font-bold text-white glowing-text w-96 text-right"
        >
          You are here to <span className="text-landing-bright glowing-text">co-create.</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
