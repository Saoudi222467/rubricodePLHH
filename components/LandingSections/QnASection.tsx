"use client";
import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function QnASectionWithHeading() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { amount: 0.5 });

  const wrapper1Ref = useRef<HTMLDivElement>(null);
  const wrapper1InView = useInView(wrapper1Ref, { amount: 0.5 });

  const wrapper2Ref = useRef<HTMLDivElement>(null);
  const wrapper2InView = useInView(wrapper2Ref, { amount: 0.5 });

  const qas = [
    {
      q: "I love my farm – it’s been in my family for generations. But I’m reaching my limits. Is there really a way to preserve it without giving it up?",
      a: "Yes – that’s why we exist. We believe a farm can be more than a business. It can become a sanctuary. A place of belonging and renewal. Whether you want to stay, contribute, or say goodbye with dignity – your story is the beginning.",
    },
    {
      q: "If I sell the farm, does that mean I lose my home?",
      a: "Not at all. Selling doesn’t mean letting go of your roots. A lifelong right to remain is possible – for you and your loved ones. We believe in rootedness, in dignity – not in separation.",
    },
    {
      q: "I want to stay – but I can’t do it all alone anymore. Is there a way to stay involved and get help?",
      a: "Absolutely. In fact, this is one of our core values. You can live and work on your farm – and receive fair compensation. You stay who you are: a farmer with soul. We bring the support you need. Together.",
    },
    {
      q: 'Is my farm "big enough" or "special enough" to apply?',
      a: "We don't believe in measuring worth by size. What we look for is vision. Soul. Connection. Small family farms, mixed use, vineyards, woodlands – it’s all possible. Let’s find out together what's possible – the form helps us understand.",
    },
    {
      q: "What’s in it for me – financially?",
      a: "Depending on your path, you’ll receive a fair price, secure income, or both. Plus: a solid foundation and a supportive community. No more fear. No more isolation. Only stability. Togetherness. And a future.",
    },
    {
      q: "What happens once I’m interested?",
      a: "You’ll be invited to share your story. Tell us about your family, your land, your hopes, your now. The more we understand, the more we can see if your farm wants to become a place of life again.",
    },
    {
      q: "Can my farm remain a place that nurtures life – even if I pass it on?",
      a: "Yes. That is the heartbeat of this movement. Your farm can live on – touching lives, healing land, creating legacy long after you.",
    },
  ];

  const firstHalf = qas.slice(0, 4);
  const secondHalf = qas.slice(4);

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
          background: "radial-gradient(circle, #ffd900dd)",
          filter: "blur(120px)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );

  const renderGrid = (items: typeof qas) => (
    <div className="relative z-10 max-w-6xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 px-6">
      {items.map(({ q, a }, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 bg-gray-900 bg-opacity-70 p-6 rounded-lg"
        >
          <h3 className="text-white text-2xl font-semibold">Q: {q}</h3>
          <p className="text-gray-200 text-lg leading-relaxed">A: {a}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden ">
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
              "
            >
              Questions &amp; Answers
              <br />A Heartfelt Conversation
            </h2>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Spacer + first Q&A */}
      <div ref={wrapper1Ref} className="h-[100vh]" />
      <AnimatePresence>
        {wrapper1InView && (
          <motion.section
            className="fixed inset-0 w-full h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderBlob}
            {renderGrid(firstHalf)}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Spacer + second Q&A */}
      <div ref={wrapper2Ref} className="h-[100vh]" />
      <AnimatePresence>
        {wrapper2InView && (
          <motion.section
            className="fixed inset-0 w-full h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderBlob}
            {renderGrid(secondHalf)}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
