import React from "react";

const InfinityLoopSmall = () => {
  const path = `
    M 400 300 
    C 240 150, 240 450, 400 300 
    C 560 150, 560 450, 400 300
  `;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative">


        <svg
          width="240"
          height="200"
          viewBox="280 200 240 200"
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
            strokeWidth="3"
            fill="none"
            pathLength="1"
            strokeDasharray="0.08 0.92"
            strokeDashoffset="0"
            filter="url(#glowFilterSmall)"
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
            filter="url(#glowFilterSmall)"
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
              id="glowFilterSmall"
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

export default InfinityLoopSmall; 