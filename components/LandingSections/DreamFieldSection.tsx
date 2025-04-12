"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DreamFieldSection() {
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
  // - Fade in from 0% to 5% scroll,
  // - Remain fully visible between 5% and 95%,
  // - Fade out from 95% to 100%.
  const contentOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  // Globe image appears first: fade from 5%-15% and scale from 0.8 to 1.
  const imageOpacity = useTransform(smoothScrollYProgress, [0.05, 0.15], [0, 1]);
  const imageScale = useTransform(smoothScrollYProgress, [0.05, 0.15], [0.8, 1]);

  // First text appears next (upper text): fade in and slide from y = -50 to 0
  // from 20% to 30% scroll.
  const text1Opacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const text1Y = useTransform(smoothScrollYProgress, [0.2, 0.3], [-50, 0]);

  // Second text appears after (lower text): fade in and slide from y = 50 to 0
  // from 30% to 40% scroll.
  const text2Opacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);
  const text2Y = useTransform(smoothScrollYProgress, [0.3, 0.4], [50, 0]);

  // Blob data remains unchanged.
  const blobs = [
    { id: 1, style: "top-[15%] left-[25%]", size: "w-4 h-4", text: "Garden" },
    { id: 2, style: "top-[15%] left-[70%]", size: "w-5 h-5", text: "Garden" },
    { id: 3, style: "top-[45%] left-[50%]", size: "w-6 h-6", text: "Garden" },
    { id: 4, style: "top-[70%] left-[20%]", size: "w-4 h-4", text: "Garden" },
    { id: 5, style: "top-[70%] left-[70%]", size: "w-4 h-4", text: "Garden" },
  ];

  return (
    // Outer section with 200vh height provides the scroll space for pin/unpin.
    <section ref={ref} className="relative h-[200vh] w-full overflow-hidden">
      {/* Fixed container with pt-20 moves content down so header doesn't cover it */}
      <div className="fixed inset-0 pt-20">
        <motion.div
          className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          style={{ opacity: contentOpacity }}
        >
          {/* Text container: two lines appearing sequentially. */}
          <div className="absolute top-8 text-center">
            <motion.h2
              style={{ opacity: text1Opacity, y: text1Y }}
              className="text-4xl font-bold mb-4"
            >
              This is not a <span className="text-yellow-400">Dream.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: text2Opacity, y: text2Y }}
              className="text-4xl font-bold"
            >
              This is a <span className="text-[#539241]">Field.</span>
            </motion.h2>
          </div>

          {/* Globe image container with blobs; the image appears first. */}
          <motion.div
            style={{ opacity: imageOpacity, scale: imageScale }}
            className="relative mt-16 flex items-center justify-center"
          >
            <img
              src="/assets/images/landing/globe.png"
              alt="Globe"
              className="w-[350px] h-[350px] object-cover"
            />
            {/* Blobs with hover tooltips remain unchanged */}
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
