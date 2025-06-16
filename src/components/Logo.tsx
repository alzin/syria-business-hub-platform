
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <img
      src="/lovable-uploads/92e24b75-c99f-4bf3-a69f-7ab285f3ba4f.png"
      alt="SyriGo Logo"
      className={className}
    />
  );
};

export default Logo;
