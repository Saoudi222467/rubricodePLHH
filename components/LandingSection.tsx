import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingSection() {
  // Use useScroll to track scroll progress
  const { scrollYProgress } = useScroll();

  // Animate each line’s scale along the Y axis from 0 → 1 as scroll goes 0 → 0.2
  const leftLineScale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const rightLineScale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Animate the blob’s opacity from 0 → 1 as scroll goes 0 → 0.2
  const blobOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="snap-start relative flex flex-col items-center justify-center h-screen w-screen">
      {/* Left line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-yellow-500 origin-top"
        style={{ scaleY: leftLineScale }}
      />

      {/* Right line */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[2px] bg-yellow-500 origin-bottom"
        style={{ scaleY: rightLineScale }}
      />

      {/* Center “blob” */}
      <motion.div
        className="absolute w-64 h-64 bg-yellow-500 rounded-full"
        style={{ opacity: blobOpacity }}
      />

      {/* Text */}
      <div className="relative text-center space-y-2">
        <h2 className="text-4xl font-bold">Remember.</h2>
        <h2 className="text-4xl font-bold">Connect.</h2>
        <h2 className="text-4xl font-bold">Heal.</h2>
        <h2 className="text-4xl font-bold">Create.</h2>
      </div>
    </section>
  );
}
