"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function FictionFunction({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val);

  const contentOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const nodeOpacity0 = useTransform(smoothScrollYProgress, [0.5, 0.55], [0, 1]);
  const nodeOpacity1 = useTransform(smoothScrollYProgress, [0.55, 0.6], [0, 1]);
  const nodeOpacity2 = useTransform(smoothScrollYProgress, [0.6, 0.65], [0, 1]);
  const nodeOpacity3 = useTransform(smoothScrollYProgress, [0.65, 0.7], [0, 1]);

  const nodes = [
    {
      id: 1,
      text: "Community",
      path: "/community",
      position: isMobile ? "top-44 left-0" : "left-10 top-24",
      opacity: nodeOpacity0,
    },
    {
      id: 2,
      text: "Tokenomics",
      path: "/tokenomics",
      position: isMobile ? "top-36 right-0" : "right-10 top-16",
      opacity: nodeOpacity1,
    },
    {
      id: 3,
      text: "Governance",
      path: "/governance",
      position: isMobile ? "bottom-44 left-0" : "left-10 bottom-24",
      opacity: nodeOpacity2,
    },
    {
      id: 4,
      text: "DAO",
      path: "/dao",
      position: isMobile ? "bottom-40 right-0" : "right-28 bottom-24",
      opacity: nodeOpacity3,
    },
  ];

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-24" : "h-[200vh] snap-start"} overflow-hidden bg-black text-white`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 pt-20"}`}>
        <motion.div
          className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden"
          style={{ opacity: animated(contentOpacity, 1) }}
        >
          {/* Header */}
          <div className="relative z-20 pt-8 text-center">
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

          {/* Main Graphic and Nodes */}
          <div className="relative z-10 w-full flex justify-center items-center flex-1 mt-12">
            <div className="relative w-[85%] max-w-[1200px] h-[600px] flex justify-center items-center">
              {/* Background Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src="/assets/images/landing/fiction.png"
                  alt="Globe"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Node Texts */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute ${node.position}`}
                >
                  <motion.div
                    className="relative group"
                    style={{ opacity: animated(node.opacity, 1) }}
                  >
                    <Link
                      href={node.path}
                      className={`text-white font-bold tracking-wide relative transition-all duration-600 group-hover:text-yellow-400 ${
                        isMobile ? "text-2xl" : "text-5xl"
                      }`}
                    >
                      {node.text}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-[2px] text-yellow-400 transition-opacity duration-500">
                        {node.text}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
