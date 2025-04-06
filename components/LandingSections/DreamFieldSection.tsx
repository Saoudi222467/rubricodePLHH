"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DreamFieldSection() {
  const ref = useRef(null);

  // Track the scroll progress over this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Use the scroll progress to control section opacity
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 1], [0, 1]);

  // Optionally, fade in completely once we pass 90% scroll in this section
  const [finalOpacity, setFinalOpacity] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothScrollYProgress.onChange((value) => {
      if (value >= 0.9) {
        setFinalOpacity(1);
        unsubscribe();
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [smoothScrollYProgress]);

  // Approximate positions to match the first image
  const blobs = [
    {
      id: 1,
      style: "top-[15%] left-[25%]",
      size: "w-4 h-4",
      text: "Garden",
    },
    {
      id: 2,
      style: "top-[15%] left-[70%]",
      size: "w-5 h-5",
      text: "Garden",
    },
    {
      id: 3,
      style: "top-[45%] left-[50%]",
      size: "w-6 h-6",
      text: "Garden",
    },
    {
      id: 4,
      style: "top-[70%] left-[20%]",
      size: "w-4 h-4",
      text: "Garden",
    },
    {
      id: 5,
      style: "top-[70%] left-[70%]",
      size: "w-4 h-4",
      text: "Garden",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden"
      style={{
        opacity: finalOpacity || sectionOpacity,
      }}
    >
      {/* Text container (adjust for spacing) */}
      <div className="absolute top-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-4xl font-bold mb-4"
        >
          This is not a <span className="text-yellow-400">Dream.</span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-4xl font-bold"
        >
          This is a <span className="text-yellow-400">Field.</span>
        </motion.h2>
      </div>

      {/* Globe image with margin-top for spacing */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative mt-16"
      >
        <img
          src="/assets/images/landing/globe.png"
          alt="Globe"
          className="w-[350px] h-[350px] object-cover"
        />

        {/* Blobs with hover tooltips */}
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className={`absolute ${blob.style} cursor-pointer`}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            {/* Gardenircle */}
            <div className={`${blob.size} bg-yellow-400 rounded-full`}></div>
            {/* Tooltip text displayed on hover */}
            <motion.div
              variants={{
                rest: { opacity: 0, y: -10 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-white whitespace-nowrap"
            >
              <p className="font-bold font-montserrat text-lg">{blob.text}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
