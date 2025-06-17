
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        viewBox="0 0 48 48"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="syrigoLogoTitle"
      >
        <title id="syrigoLogoTitle">SyriGo Logo</title>
        
        {/* Modern hexagonal background */}
        <path
          d="M24 4L36 12V28L24 36L12 28V12L24 4Z"
          fill="url(#hexGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Inner geometric pattern */}
        <g transform="translate(24, 24)">
          {/* Stylized arrow pointing up-right (representing growth/progress) */}
          <path
            d="M-6,-2 L6,-2 L6,-6 L10,0 L6,6 L6,2 L-6,2 L-6,-2 Z"
            fill="white"
            className="drop-shadow-sm"
          />
          
          {/* Small accent dot */}
          <circle
            cx="-8"
            cy="-8"
            r="1.5"
            fill="rgba(255,255,255,0.8)"
          />
        </g>
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      
      <span className="text-xl font-bold text-foreground">SyriGo</span>
    </div>
  );
};

export default Logo;
