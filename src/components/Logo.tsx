
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <span className="text-xl font-bold text-foreground">SyrVest</span>
    </div>
  );
};

export default Logo;
