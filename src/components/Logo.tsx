
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
      
      {/* Background Circle */}
      <circle cx="24" cy="24" r="22" fill="url(#gradient)" stroke="#1E40AF" strokeWidth="2"/>
      
      {/* Letter S */}
      <path
        d="M14 18c0-2 1.5-3.5 3.5-3.5h3c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5h-2c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5h3c2 0 3.5-1.5 3.5-3.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Letter G */}
      <path
        d="M30 18c0-2 1.5-3.5 3.5-3.5h3c2 0 3.5 1.5 3.5 3.5v8c0 2-1.5 3.5-3.5 3.5h-3c-2 0-3.5-1.5-3.5-3.5v-2h4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
