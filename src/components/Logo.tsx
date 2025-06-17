
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="syrigoLogoTitle"
    >
      <title id="syrigoLogoTitle">SyriGo Logo</title>
      
      {/* Modern circular background with subtle gradient */}
      <circle 
        cx="24" 
        cy="24" 
        r="20" 
        fill="url(#modernGradient)" 
        className="drop-shadow-sm"
      />
      
      {/* Stylized "SG" monogram */}
      <g transform="translate(24, 24)">
        {/* Letter S - modern curved design */}
        <path
          d="M-8,-6 C-8,-8 -6,-10 -4,-10 L-1,-10 C1,-10 3,-8 3,-6 C3,-4 1,-2 -1,-2 L-4,-2 C-6,-2 -8,0 -8,2 C-8,4 -6,6 -4,6 L-1,6 C1,6 3,4 3,2"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          className="drop-shadow-sm"
        />
        
        {/* Letter G - clean geometric design */}
        <path
          d="M5,-6 C5,-8 7,-10 9,-10 L12,-10 C14,-10 16,-8 16,-6 L16,2 C16,4 14,6 12,6 L9,6 C7,6 5,4 5,2 L5,-1 L12,-1"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          className="drop-shadow-sm"
        />
      </g>
      
      {/* Modern gradient definition */}
      <defs>
        <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
