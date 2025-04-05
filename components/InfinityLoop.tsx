import React from "react";

const InfinityLoop = () => {
  const path = `
    M 400 300 
    C 240 150, 240 450, 400 300 
    C 560 150, 560 450, 400 300
  `;

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      {/* Centered subtle backdrop glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[200px] rounded-full bg-[#7b245a] blur-[80px] opacity-25"></div>
      </div>

      <svg
        width="900"
        height="700"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static background infinity path */}
        <path
          d={path}
          stroke="#FFE066"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />

        {/* Seamless glowing animated pulse along the path */}
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

        {/* Optional second pulse for even smoother feel */}
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

        {/* Glow effect filter */}
        <defs>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default InfinityLoop;
