import React from "react";

const InfinityLoop = () => {
  const path = `
    M 400 300 
    C 240 150, 240 450, 400 300 
    C 560 150, 560 450, 400 300
  `;

  return (
    <div className=" w-full flex justify-center items-center">
      <div className="relative">
        {/* Subtle backdrop glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-[#7b245a] blur-[80px] opacity-25"></div>
        </div>

        <svg
          width="640"
          height="600"
          viewBox="240 150 320 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={path}
            stroke="#FFE066"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          <path
            d={path}
            stroke="#FFE060"
            strokeWidth="2"
            fill="none"
            pathLength="1"
            strokeDasharray="0.08 0.92"
            strokeDashoffset="0"
            filter="url(#glowFilter)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-1"
              dur="2s"
              keyTimes="0;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </path>
          <path
            d={path}
            stroke="#FFE060"
            strokeWidth="1"
            fill="none"
            pathLength="1"
            strokeDasharray="0.08 0.92"
            strokeDashoffset="0.5"
            filter="url(#glowFilter)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-1"
              dur="2s"
              keyTimes="0;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </path>

          <defs>
            <filter
              id="glowFilter"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default InfinityLoop;
