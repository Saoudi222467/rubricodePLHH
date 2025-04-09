"use client"

const InfinityLoopVertical = () => {
  const path = `
    M 400 300 
    C 240 150, 240 450, 400 300 
    C 560 150, 560 450, 400 300
  `

  return (
    <div className="inline-block relative transform rotate-90">
      {/* Centered subtle backdrop glow - increased size */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[350px] rounded-full bg-[#7b245a] blur-[60px] opacity-30"></div>
      </div>

      <svg
        width="600"
        height="450"
        viewBox="240 150 320 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        {/* Static background infinity path */}
        <path d={path} stroke="#FFE066" strokeWidth="2" fill="none" opacity="0.2" />

        {/* Glowing animated pulse along the path */}
        <path
          d={path}
          stroke="#FFE060"
          strokeWidth="3"
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

        {/* Optional second pulse */}
        <path
          d={path}
          stroke="#FFE060"
          strokeWidth="2"
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

        {/* Glow filter */}
        <defs>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default InfinityLoopVertical
