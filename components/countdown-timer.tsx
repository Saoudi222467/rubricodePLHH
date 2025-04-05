"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate?: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set default target date if none provided (112 days, 15 hours, 30 minutes from now)
    const target = new Date("2025-03-25T00:00:00");
   

    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDS" }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center pt-0 relative">
      {/* Stars background */}
     
      
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl  font-bold text-white tracking-widest mb-4  relative z-10 text-center"
      >
        WE&apos;RE LAUNCHING ON <br></br> 25.03.25
      </motion.h2>
      
      {/* Countdown boxes */}
      <div className="flex flex-wrap justify-center gap-4 relative z-10 text-white">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-md bg-mint-white flex items-center justify-center shadow-lg">
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="text-4xl font-bold text-[#880808]"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </div>
            <span className="text-xs md:text-sm uppercase tracking-widest text-mint-white mt-4">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}