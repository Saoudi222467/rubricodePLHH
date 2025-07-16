"use client";
import React from "react";

const Ticker = () => {
  return (
    <div className="fixed top-0 left-0 w-full overflow-hidden bg-[#a67c00] h-[40px] flex items-center z-50">
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
          animation: ticker 50s linear infinite;
        }
      `}</style>
      {/* Ticker Content duplicated for seamless looping */}
      <div className="flex animate-ticker items-center">
        <div className="flex flex-shrink-0 whitespace-nowrap">
          <span className="px-12 text-xl text-white font-bold text-center">
            🌾 PLHH_Coin empowers farmers – Your stake in the future of agriculture.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🐄 Your PLHH_Coin = Your contribution to animals, nature & farming families.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌱 Together we grow the Garden of Eden – Coin by coin.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🚜 PLHH_Coin – Become a co-owner of regenerative farmland.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            💚 The PLHH_Community protects farmland and gives the Earth a future.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🐝 Save bees, soil & farms – every PLHH_Coin makes a difference.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌍 Invest in Earth's healing – PLHH_Coin is your power for change.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌸 Land over concrete – With PLHH_Coin we preserve living ecosystems.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🤝 Together we build a future – for ALL of us, for the animals & for nature.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            ✨ PLHH_Coin – More than an investment. A movement of love and humanity.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌾 PLHH_Coin empowers farmers – Your stake in the future of agriculture.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🐄 Your PLHH_Coin = Your contribution to animals, nature & farming families.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌱 Together we grow the Garden of Eden – Coin by coin.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🚜 PLHH_Coin – Become a co-owner of regenerative farmland.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            💚 The PLHH_Community protects farmland and gives the Earth a future.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🐝 Save bees, soil & farms – every PLHH_Coin makes a difference.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌍 Invest in Earth's healing – PLHH_Coin is your power for change.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🌸 Land over concrete – With PLHH_Coin we preserve living ecosystems.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            🤝 Together we build a future – for ALL of us, for the animals & for nature.
          </span>
          <span className="px-12 text-xl text-white font-bold text-center">
            ✨ PLHH_Coin – More than an investment. A movement of love and humanity.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
