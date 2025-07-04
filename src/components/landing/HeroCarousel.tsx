
import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import PostCard from '@/components/PostCard';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroCarousel = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  // Fetch latest 3 posts regardless of language
  const { data: posts, isLoading, error } = usePosts();
  const latestPosts = posts?.slice(0, 3) || [];
  
  const { isActive, progress, currentStep, containerRef } = useScrollTrigger({
    totalSteps: latestPosts.length,
    threshold: 0.3
  });

  // Calculate which posts should be visible based on current step
  const getPostTransform = (index: number) => {
    const postProgress = Math.max(0, Math.min(1, (progress * latestPosts.length) - index));
    const translateY = (1 - postProgress) * 100;
    const opacity = Math.max(0, Math.min(1, postProgress * 2));
    
    return {
      transform: `translateY(${translateY}%)`,
      opacity
    };
  };

  if (isLoading) {
    return (
      <div className="relative w-full max-w-lg h-auto">
        <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px] flex items-center justify-center">
          <div className="animate-pulse text-background/70">{t('Loading posts...')}</div>
        </div>
      </div>
    );
  }

  if (error || latestPosts.length === 0) {
    return (
      <div className="relative w-full max-w-lg h-auto">
        <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px] flex items-center justify-center">
          <div className="text-background/70 text-center p-4">
            {error ? t('Failed to load posts') : t('No posts available yet')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-lg h-auto ${isActive ? 'fixed inset-0 z-50 max-w-4xl' : ''}`}
    >
      {isActive ? (
        // Scroll-triggered mode
        <div className="h-full flex flex-col justify-center items-center px-4">
          {/* Posts container */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-8">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="transition-all duration-700 ease-out"
                  style={getPostTransform(index)}
                >
                  <div className="transform hover:scale-105 transition-transform duration-300 rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20">
                    <PostCard post={post} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
            {latestPosts.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-background scale-110' 
                    : 'bg-background/30'
                }`}
              />
            ))}
          </div>

          {/* Exit instructions */}
          {progress > 0.8 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center animate-fade-in">
              <div className="text-background/70 text-sm">
                {t('Continue scrolling to proceed')}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Normal carousel mode (when not active)
        <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px]">
          <div className="h-full p-6 flex flex-col justify-between">
            <div className="text-center">
              <h3 className="text-xl font-bold text-background mb-2">
                {t('Latest Posts')}
              </h3>
              <p className="text-background/80 text-sm">
                {t('Scroll to explore posts')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-background/60 text-sm mb-2">
                {latestPosts.length} {t('posts available')}
              </div>
              <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center mx-auto">
                <div className="w-1 h-3 bg-background/70 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
