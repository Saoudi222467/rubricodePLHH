"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function FictionFunction() {
  const ref = useRef(null);

  // Track the scroll progress over this section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress.
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Overall content opacity:
  // Fade in from 0%-5%, fully visible from 5%-95%, fade out from 95%-100%.
  const contentOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  // Node opacity transforms for sequential appearance.
  const nodeOpacity0 = useTransform(smoothScrollYProgress, [0.5, 0.55], [0, 1]);
  const nodeOpacity1 = useTransform(smoothScrollYProgress, [0.55, 0.6], [0, 1]);
  const nodeOpacity2 = useTransform(smoothScrollYProgress, [0.6, 0.65], [0, 1]);
  const nodeOpacity3 = useTransform(smoothScrollYProgress, [0.65, 0.7], [0, 1]);

  // Array of nodes arranged in left, right, left, right order.
  const nodes = [
    {
      id: 1,
      text: "Community",
      path: "/community",
      position: "left-20 top-64",
      opacity: nodeOpacity0,
    },
    {
      id: 2,
      text: "Tokenomics",
      path: "/tokenomics",
      position: "right-28 top-44",
      opacity: nodeOpacity1,
    },
    {
      id: 3,
      text: "Governance",
      path: "/governance",
      position: "left-24 bottom-52",
      opacity: nodeOpacity2,
    },
    {
      id: 4,
      text: "DAO",
      path: "/dao",
      position: "right-60 bottom-48",
      opacity: nodeOpacity3,
    },
  ];

  return (
    // Outer section with height 200vh provides scroll space for pinning/unpinning.
    <section ref={ref} className="relative h-[200vh] w-full overflow-hidden">
      {/* Fixed container with pt-20 moves the content down so the header doesn’t cover it */}
      <div className="fixed inset-0 pt-20">
        <motion.div
          className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden"
          style={{ opacity: contentOpacity }}
        >
          {/* Text container (unchanged) */}
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

          {/* Globe image container (unchanged) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative mt-16 flex items-center justify-center"
          >
            <img
              src="/assets/images/landing/fiction.png"
              alt="Globe"
              className="w-[85%]"
            />
          </motion.div>

          {/* Nodes: appear sequentially with the opacity transforms */}
          {nodes.map((node) => (
            <div key={node.id} className={`absolute ${node.position}`}>
              <motion.div
                className="relative group"
                style={{ opacity: node.opacity }}
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
        </motion.div>
      </div>
    </section>
  );
}
