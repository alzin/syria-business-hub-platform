
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PostCard from './carousel/PostCard';
import CarouselIndicators from './carousel/CarouselIndicators';
import { englishPosts, arabicPosts } from './carousel/dummyData';

const HeroCarousel = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get posts based on current language
  const currentPosts = language === 'ar' ? arabicPosts : englishPosts;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentPosts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPosts.length]);

  // Reset index when language changes to avoid out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [language]);

  const currentPost = currentPosts[currentIndex];

  return (
    <div className="relative w-full max-w-lg h-auto">
      <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px]">
        <div className="h-full">
          <PostCard post={currentPost} key={`${language}-${currentPost.id}`} />
        </div>
      </div>

      <CarouselIndicators
        totalPosts={currentPosts.length}
        currentIndex={currentIndex}
        onIndicatorClick={setCurrentIndex}
      />
    </div>
  );
};

export default HeroCarousel;
