
import React, { useEffect, useState } from 'react';
import PostCard from './carousel/PostCard';
import CarouselIndicators from './carousel/CarouselIndicators';
import { dummyPosts } from './carousel/dummyData';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyPosts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentPost = dummyPosts[currentIndex];

  return (
    <div className="relative w-full max-w-lg h-auto">
      <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px]">
        <div className="h-full">
          <PostCard post={currentPost} key={currentPost.id} />
        </div>
      </div>

      <CarouselIndicators
        totalPosts={dummyPosts.length}
        currentIndex={currentIndex}
        onIndicatorClick={setCurrentIndex}
      />
    </div>
  );
};

export default HeroCarousel;
