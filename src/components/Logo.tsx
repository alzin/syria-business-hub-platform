
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <img
      src="/lovable-uploads/e5e95022-88cc-453d-ae9b-8b3918c2a262.png"
      alt="SyriGo Logo"
      className={className}
    />
  );
};

export default Logo;
