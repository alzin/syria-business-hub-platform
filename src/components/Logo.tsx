
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/2f0133c9-555d-44be-9097-ad800f1e701e.png" 
        alt="SyrVest Logo" 
        className={className}
      />
    </div>
  );
};

export default Logo;
