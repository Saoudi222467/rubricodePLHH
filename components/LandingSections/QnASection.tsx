"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function QnASectionWithHeading() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { amount: 0.5 });

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { amount: 0.5 });

  const qas = [
    {
      q: "I love my farm – it's been in my family for generations. But I'm reaching my limits. Is there really a way to preserve it without giving it up?",
      a: "Yes – that's why we exist. We believe a farm can be more than a business. It can become a sanctuary. A place of belonging and renewal. Whether you want to stay, contribute, or say goodbye with dignity – your story is the beginning.",
    },
    {
      q: "If I sell the farm, does that mean I lose my home?",
      a: "Not at all. Selling doesn't mean letting go of your roots. A lifelong right to remain is possible – for you and your loved ones. We believe in rootedness, in dignity – not in separation.",
    },
    {
      q: "I want to stay – but I can't do it all alone anymore. Is there a way to stay involved and get help?",
      a: "Absolutely. In fact, this is one of our core values. You can live and work on your farm – and receive fair compensation. You stay who you are: a farmer with soul. We bring the support you need. Together.",
    },
    {
      q: 'Is my farm "big enough" or "special enough" to apply?',
      a: "We don't believe in measuring worth by size. What we look for is vision. Soul. Connection. Small family farms, mixed use, vineyards, woodlands – it's all possible. Let's find out together what's possible – the form helps us understand.",
    },
    {
      q: "What's in it for me – financially?",
      a: "Depending on your path, you'll receive a fair price, secure income, or both. Plus: a solid foundation and a supportive community. No more fear. No more isolation. Only stability. Togetherness. And a future.",
    },
    {
      q: "What happens once I'm interested?",
      a: "You'll be invited to share your story. Tell us about your family, your land, your hopes, your now. The more we understand, the more we can see if your farm wants to become a place of life again.",
    },
    {
      q: "Can my farm remain a place that nurtures life – even if I pass it on?",
      a: "Yes. That is the heartbeat of this movement. Your farm can live on – touching lives, healing land, creating legacy long after you.",
    },
  ];

  // Sort QAs by content length (question + answer length)
  const sortedQAs = [...qas].sort((a, b) => {
    const lengthA = a.q.length + a.a.length;
    const lengthB = b.q.length + b.a.length;
    return lengthA - lengthB;
  });

  const renderBlob = (
    <motion.div
      className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
      animate={{ opacity: 1, scale: [1, 1.1, 1] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <div
        className="w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #ffd90066)",
          filter: "blur(120px)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );

  const renderGrid = () => (
    <div className="relative z-10000 max-w-7xl mx-auto pb-20 pt-8 px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
        {sortedQAs.slice(0, 4).map(({ q, a }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
            className="w-full h-[400px] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}
          >
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-semibold text-[#FFE066] text-xl mb-4">{q}</h3>
              <div className="h-px bg-gradient-to-r from-transparent via-[#FFE066]/30 to-transparent my-4" />
              <p className="text-sm text-white/80 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 justify-items-center">
        {sortedQAs.slice(4).map(({ q, a }, idx) => (
          <motion.div
            key={idx + 4}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
            className="w-full h-[350px] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}
          >
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-semibold text-[#FFE066] text-xl mb-4">{q}</h3>
              <div className="h-px bg-gradient-to-r from-transparent via-[#FFE066]/30 to-transparent my-4" />
              <p className="text-sm text-white/80 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Heading Section */}
      <div ref={headingRef} className="h-[100vh]" />
      <AnimatePresence>
        {headingInView && (
          <motion.section
            className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h2
              className="
                text-transparent 
                bg-clip-text 
                bg-gradient-to-r from-green-400 via-yellow-300 to-pink-400 
                text-5xl md:text-7xl 
                font-extrabold 
                uppercase 
                tracking-wide 
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]
                leading-tight
                text-center
                max-w-4xl
                mx-auto
                px-4
              "
            >
              Questions &amp; Answers
              <br />A Heartfelt Conversation
            </h2>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Q&A Section */}
      <div ref={contentRef} className="h-[100vh]" />
      <AnimatePresence>
        {contentInView && (
          <motion.section
            className="fixed inset-0 w-full h-screen overflow-y-auto pt-28 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderBlob}
            {renderGrid()}

            
          </motion.section>

          
        )}
      </AnimatePresence>
       
    </div>
  );
}
