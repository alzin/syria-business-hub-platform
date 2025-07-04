import React from 'react';
import { useTranslation } from 'react-i18next';
import { Post } from '@/types';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import PostCard from '@/components/PostCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScrollTriggeredPostsProps {
  posts: Post[];
}

const ScrollTriggeredPosts: React.FC<ScrollTriggeredPostsProps> = ({ posts }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { isActive, progress, currentStep, containerRef } = useScrollTrigger({
    totalSteps: posts.length,
    threshold: 0.3
  });

  // Calculate which posts should be visible based on current step
  const getPostTransform = (index: number) => {
    const postProgress = Math.max(0, Math.min(1, (progress * posts.length) - index));
    const translateY = (1 - postProgress) * 100;
    const opacity = Math.max(0, Math.min(1, postProgress * 2));
    
    return {
      transform: `translateY(${translateY}%)`,
      opacity
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen ${isActive ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('Latest Posts')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('Discover insights from our community of Syrian experts')}
          </p>
          
          {/* Progress indicator */}
          {isActive && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                {posts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-primary scale-110' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Posts container */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="transition-all duration-700 ease-out"
                style={getPostTransform(index)}
              >
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <PostCard post={post} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        {!isActive && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in delay-500">
            <div className="text-muted-foreground text-sm mb-2">
              {t('Scroll to explore posts')}
            </div>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        )}
        
        {/* Exit instructions */}
        {isActive && progress > 0.8 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in">
            <div className="text-muted-foreground text-sm">
              {t('Continue scrolling to proceed')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollTriggeredPosts;