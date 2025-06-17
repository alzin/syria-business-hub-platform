
import React from 'react';

interface CarouselIndicatorsProps {
  totalPosts: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  totalPosts,
  currentIndex,
  onIndicatorClick
}) => {
  return (
    <>
      {/* Slide indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPosts }).map((_, index) => (
          <button
            key={index}
            onClick={() => onIndicatorClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-background/80 w-6' 
                : 'bg-background/40 hover:bg-background/60'
            }`}
          />
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-2 text-center text-xs text-background/60">
        {currentIndex + 1} / {totalPosts}
      </div>
    </>
  );
};

export default CarouselIndicators;
