
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#backgroundGradient)"
        stroke="url(#borderGradient)"
        strokeWidth="2"
      />
      
      {/* Central mountain/pyramid representing growth and aspiration */}
      <path
        d="M35 65 L50 25 L65 65 Z"
        fill="url(#mountainGradient)"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Rising sun behind mountain */}
      <circle
        cx="50"
        cy="40"
        r="12"
        fill="url(#sunGradient)"
        opacity="0.9"
      />
      
      {/* Sun rays */}
      <g stroke="url(#rayGradient)" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="15" opacity="0.8" />
        <line x1="62" y1="28" x2="65" y2="25" opacity="0.8" />
        <line x1="72" y1="40" x2="77" y2="40" opacity="0.8" />
        <line x1="62" y1="52" x2="65" y2="55" opacity="0.8" />
        <line x1="38" y1="52" x2="35" y2="55" opacity="0.8" />
        <line x1="28" y1="40" x2="23" y2="40" opacity="0.8" />
        <line x1="38" y1="28" x2="35" y2="25" opacity="0.8" />
      </g>
      
      {/* Connection nodes representing network */}
      <circle cx="25" cy="75" r="3" fill="url(#nodeGradient)" />
      <circle cx="75" cy="75" r="3" fill="url(#nodeGradient)" />
      <circle cx="50" cy="80" r="3" fill="url(#nodeGradient)" />
      
      {/* Connection lines */}
      <line x1="25" y1="75" x2="50" y2="80" stroke="url(#connectionGradient)" strokeWidth="1.5" opacity="0.6" />
      <line x1="75" y1="75" x2="50" y2="80" stroke="url(#connectionGradient)" strokeWidth="1.5" opacity="0.6" />
      
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d7d32" />
          <stop offset="100%" stopColor="#d32f2f" />
        </linearGradient>
        
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d7d32" />
          <stop offset="50%" stopColor="#388e3c" />
          <stop offset="100%" stopColor="#1b5e20" />
        </linearGradient>
        
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="50%" stopColor="#ffb74d" />
          <stop offset="100%" stopColor="#d32f2f" />
        </linearGradient>
        
        <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb74d" />
          <stop offset="100%" stopColor="#d32f2f" />
        </linearGradient>
        
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d32f2f" />
          <stop offset="100%" stopColor="#b71c1c" />
        </linearGradient>
        
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d7d32" />
          <stop offset="100%" stopColor="#388e3c" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
