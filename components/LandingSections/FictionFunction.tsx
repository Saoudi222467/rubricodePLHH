"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function FictionFunction() {
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
  const nodes = [
    {
      id: 1,
      text: "Community",
      path: "/community",
      position: "left-20 top-64",
    },
    {
      id: 2,
      text: "Tokenomics",
      path: "/tokenomics",
      position: "right-28 top-44",
    },
    {
      id: 3,
      text: "Governance",
      path: "/governance",
      position: "left-24 bottom-52",
    },
    {
      id: 4,
      text: "DAO",
      path: "/dao",
      position: "right-60 bottom-48",
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
          The world you saw is not{" "}
          <span className="text-yellow-400">Fiction.</span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-4xl font-bold"
        >
          It is <span className="text-yellow-400">Function.</span>
        </motion.h2>
      </div>

      {/* Globe image with margin-top for spacing */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative mt-16 flex items-center justify-center "
      >
        <img
          src="/assets/images/landing/fiction.png"
          alt="Globe"
          className="w-[85%]"
        />
      </motion.div>
      {/* Nodes and Paths */}
      {nodes.map((node, index) => (
        <div key={node.id} className={`absolute ${node.position}`}>
          {/* Node Text with Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 + index * 0.3 }}
            className="relative group"
          >
            <Link
              href={node.path}
              className="text-white text-5xl font-bold tracking-wide relative transition-all duration-600 group-hover:text-yellow-400"
            >
              {node.text}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-[2px] text-yellow-400 transition-opacity duration-500">
                {node.text}
              </span>
            </Link>
          </motion.div>
        </div>
      ))}
    </motion.section>
  );
}
