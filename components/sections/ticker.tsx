"use client";
import React from "react";

const Ticker = () => {
  return (
    <div className="w-full overflow-hidden bg-[#a67c00] h-[40px] relative flex items-center">
      {/* Custom keyframes for ticker animation */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>
      {/* Ticker Content duplicated for seamless looping */}
      <div className="flex animate-ticker items-center">
        <div className="flex flex-shrink-0 whitespace-nowrap">
          <span className="px-12 text-xl text-white font-bold text-center">
            🚀 Presale is LIVE! Secure your tokens now! 🚀
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🔥 Join our exclusive presale – Limited time only! 🔥
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            ⏰ Hurry up – Don't miss out on this opportunity! ⏰
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🚀 Presale is LIVE! Secure your tokens now! 🚀
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🔥 Join our exclusive presale – Limited time only! 🔥
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            ⏰ Hurry up – Don't miss out on this opportunity! ⏰
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
