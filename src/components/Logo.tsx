
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle representing global reach */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />
      
      {/* Inner star representing aspiration and success */}
      <path
        d="M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z"
        fill="url(#gradient2)"
      />
      
      {/* Small connecting dots representing network */}
      <circle cx="30" cy="30" r="3" fill="url(#gradient1)" />
      <circle cx="70" cy="30" r="3" fill="url(#gradient1)" />
      <circle cx="30" cy="70" r="3" fill="url(#gradient1)" />
      <circle cx="70" cy="70" r="3" fill="url(#gradient1)" />
      
      {/* Connection lines */}
      <line x1="33" y1="33" x2="47" y2="47" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
      <line x1="67" y1="33" x2="53" y2="47" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
      <line x1="33" y1="67" x2="47" y2="53" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
      <line x1="67" y1="67" x2="53" y2="53" stroke="url(#gradient1)" strokeWidth="2" opacity="0.6" />
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
