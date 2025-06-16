
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <img
      src="/lovable-uploads/7fc2f410-23bb-4f4a-bdcf-caae0d25e3bd.png"
      alt="SyriGo Logo"
      className={`${className} object-contain`}
    />
  );
};

export default Logo;
