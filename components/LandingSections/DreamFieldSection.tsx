"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DreamFieldSection({ isMobile }: { isMobile: boolean }) {
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
  const imageOpacity = useTransform(smoothScrollYProgress, [0.05, 0.15], [0, 1]);
  const imageScale = useTransform(smoothScrollYProgress, [0.05, 0.15], [0.8, 1]);

  const text1Opacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const text1Y = useTransform(smoothScrollYProgress, [0.2, 0.3], [-50, 0]);

  const text2Opacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);
  const text2Y = useTransform(smoothScrollYProgress, [0.3, 0.4], [50, 0]);

  const blobs = [
    { id: 1, style: "top-[15%] left-[25%]", size: "w-4 h-4", text: "Garden" },
    { id: 2, style: "top-[15%] left-[70%]", size: "w-5 h-5", text: "Garden" },
    { id: 3, style: "top-[45%] left-[50%]", size: "w-6 h-6", text: "Garden" },
    { id: 4, style: "top-[70%] left-[20%]", size: "w-4 h-4", text: "Garden" },
    { id: 5, style: "top-[70%] left-[70%]", size: "w-4 h-4", text: "Garden" },
  ];

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-24" : "h-[200vh] snap-start"} overflow-hidden bg-black text-white`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 pt-20"}`}>
        <motion.div
          className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden"
          style={{ opacity: animated(contentOpacity, 1) }}
        >
          <div className="absolute top-8 text-center">
            <motion.h2
              style={{ opacity: animated(text1Opacity, 1), y: animated(text1Y, 0) }}
              className="text-4xl font-bold mb-4"
            >
              This is not a <span className="text-yellow-400">Dream.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text2Opacity, 1), y: animated(text2Y, 0) }}
              className="text-4xl font-bold"
            >
              This is a <span className="text-[#539241]">Field.</span>
            </motion.h2>
          </div>

          <motion.div
            style={{ opacity: animated(imageOpacity, 1), scale: animated(imageScale, 1) }}
            className="relative mt-16 flex items-center justify-center"
          >
            <img
              src="/assets/images/landing/globe.png"
              alt="Globe"
              className="w-[350px] h-[350px] object-cover"
            />
            {blobs.map((blob) => (
              <motion.div
                key={blob.id}
                className={`absolute ${blob.style} cursor-pointer`}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <div className={`${blob.size} bg-yellow-400 rounded-full`} />
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
        </motion.div>
      </div>
    </section>
  );
}
