"use client";
import React from "react";

const FooterTicker = () => {
  const messages = [
    "🌾 PLHH_Coin empowers farmers – Your stake in the future of agriculture.",
    "🐄 Your PLHH_Coin = Your contribution to animals, nature & farming families.",
    "🌱 Together we grow the Garden of Eden – Coin by coin.",
    "🚜 PLHH_Coin – Become a co-owner of regenerative farmland.",
    "💚 The PLHH_Community protects farmland and gives the Earth a future.",
    "🐝 Save bees, soil & farms – every PLHH_Coin makes a difference.",
    "🌍 Invest in Earth's healing – PLHH_Coin is your power for change.",
    "🌸 Land over concrete – With PLHH_Coin we preserve living ecosystems.",
    "🤝 Together we build a future – for ALL of us, for the animals & for nature.",
    "✨ PLHH_Coin – More than an investment. A movement of love and humanity."
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full overflow-hidden bg-[#a67c00] h-[40px] relative flex items-center z-50">
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
          {messages.map((message, index) => (
            <span 
              key={index} 
              className="px-12 text-xl text-white font-bold text-center"
            >
              {message}
            </span>
          ))}
          {messages.map((message, index) => (
            <span 
              key={`duplicate-${index}`} 
              className="px-12 text-xl text-white font-bold text-center"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterTicker; 