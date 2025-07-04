
import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePosts } from '@/hooks/usePosts';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import PostCard from '@/components/PostCard';

const HeroCarousel = () => {
  const { t } = useTranslation();
  
  // Fetch latest 3 posts regardless of language
  const { data: posts, isLoading, error } = usePosts();
  const latestPosts = posts?.slice(0, 3) || [];
  
  const { isActive, progress, currentStep, containerRef } = useScrollTrigger({
    totalSteps: latestPosts.length,
    threshold: 0.5
  });

  // Calculate which posts should be visible based on current step
  const getPostTransform = (index: number) => {
    if (!isActive) {
      // When not active, only show first post
      return {
        transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)',
        opacity: index === 0 ? 1 : 0
      };
    }
    
    // When active, reveal posts based on scroll progress
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
      className={`relative w-full transition-all duration-500 ${
        isActive 
          ? 'fixed inset-0 z-50 bg-gradient-inspire' 
          : 'max-w-lg h-auto'
      }`}
    >
      {isActive ? (
        // Full-screen scroll-triggered mode
        <div className="h-full flex flex-col justify-center items-center px-4">
          {/* Section title when active */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
              {t('Latest Posts')}
            </h2>
            <p className="text-lg text-background/90">
              {t('Discover insights from our community of Syrian experts')}
            </p>
          </div>

          {/* Posts container */}
          <div className="w-full max-w-4xl mx-auto relative">
            <div className="space-y-8">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="absolute inset-x-0 transition-all duration-700 ease-out"
                  style={{
                    ...getPostTransform(index),
                    zIndex: latestPosts.length - index
                  }}
                >
                  <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-background/20 p-6">
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

          {/* Scroll instructions */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center animate-fade-in">
            <div className="text-background/70 text-sm">
              {progress < 1 
                ? t('Scroll to explore posts') 
                : t('Continue scrolling to proceed')
              }
            </div>
          </div>
        </div>
      ) : (
        // Normal mode - show first post by default
        <div className="relative">
          <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 overflow-hidden">
            {/* First post display */}
            <div className="relative h-[320px]">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={getPostTransform(index)}
                >
                  <div className="h-full p-4">
                    <PostCard post={post} />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint overlay */}
            <div className="absolute bottom-4 right-4 bg-background/20 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-background/80 text-xs text-center">
                <div className="mb-1">{t('Scroll to explore')}</div>
                <div className="w-4 h-6 border border-background/50 rounded-full mx-auto flex justify-center">
                  <div className="w-0.5 h-2 bg-background/70 rounded-full mt-1 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Posts counter */}
            <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="text-background/80 text-xs">
                1 / {latestPosts.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
