
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle representing unity and global reach */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#syrianGreen)"
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      />
      
      {/* Central star representing hope and aspiration - inspired by Syrian flag */}
      <path
        d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z"
        fill="url(#syrianRed)"
      />
      
      {/* Smaller stars representing community and network */}
      <path
        d="M25 25 L27 30 L32 30 L28 33 L30 38 L25 35 L20 38 L22 33 L18 30 L23 30 Z"
        fill="url(#syrianGreen)"
        opacity="0.8"
      />
      <path
        d="M75 25 L77 30 L82 30 L78 33 L80 38 L75 35 L70 38 L72 33 L68 30 L73 30 Z"
        fill="url(#syrianGreen)"
        opacity="0.8"
      />
      <path
        d="M25 75 L27 80 L32 80 L28 83 L30 88 L25 85 L20 88 L22 83 L18 80 L23 80 Z"
        fill="url(#syrianGreen)"
        opacity="0.8"
      />
      <path
        d="M75 75 L77 80 L82 80 L78 83 L80 88 L75 85 L70 88 L72 83 L68 80 L73 80 Z"
        fill="url(#syrianGreen)"
        opacity="0.8"
      />
      
      {/* Connection lines representing networking and collaboration */}
      <line x1="32" y1="32" x2="43" y2="43" stroke="url(#syrianGreen)" strokeWidth="2" opacity="0.6" />
      <line x1="68" y1="32" x2="57" y2="43" stroke="url(#syrianGreen)" strokeWidth="2" opacity="0.6" />
      <line x1="32" y1="68" x2="43" y2="57" stroke="url(#syrianGreen)" strokeWidth="2" opacity="0.6" />
      <line x1="68" y1="68" x2="57" y2="57" stroke="url(#syrianGreen)" strokeWidth="2" opacity="0.6" />
      
      <defs>
        <linearGradient id="syrianGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d7d32" />
          <stop offset="100%" stopColor="#388e3c" />
        </linearGradient>
        <linearGradient id="syrianRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d32f2f" />
          <stop offset="100%" stopColor="#f44336" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
