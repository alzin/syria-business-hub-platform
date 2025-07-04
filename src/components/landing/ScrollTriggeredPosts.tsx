import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';
import PostCard from './carousel/PostCard';
import { MessageSquare, Lightbulb, Building2, Newspaper, ChevronDown } from 'lucide-react';

// Helper function to get icon based on post type
const getPostIcon = (type: string) => {
  switch (type) {
    case 'question': return MessageSquare;
    case 'article': return Lightbulb;
    case 'business_idea': return Building2;
    case 'news': return Newspaper;
    default: return MessageSquare;
  }
};

// Helper function to get colors based on post type
const getPostColors = (type: string) => {
  switch (type) {
    case 'question': return { bgColor: 'bg-blue-50', textColor: 'text-blue-700' };
    case 'article': return { bgColor: 'bg-green-50', textColor: 'text-green-700' };
    case 'business_idea': return { bgColor: 'bg-purple-50', textColor: 'text-purple-700' };
    case 'news': return { bgColor: 'bg-orange-50', textColor: 'text-orange-700' };
    default: return { bgColor: 'bg-gray-50', textColor: 'text-gray-700' };
  }
};

// Convert real Post to PostPreview format
const convertToPostPreview = (post: Post, index: number) => {
  const colors = getPostColors(post.type);
  return {
    id: index + 1,
    type: post.type,
    title: post.title,
    content: post.content,
    author: post.author.name,
    expertise: post.author.expertiseSpecialization || post.author.expertiseCategory || 'Expert',
    votes: 0,
    answers: post.answersCount || 0,
    icon: getPostIcon(post.type),
    bgColor: colors.bgColor,
    textColor: colors.textColor,
    avatarSeed: post.author.name.replace(/\s+/g, '-').toLowerCase()
  };
};

const ScrollTriggeredPosts = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(-1);
  const [containerHeight, setContainerHeight] = useState('300vh');
  const [titleOpacity, setTitleOpacity] = useState(0);
  
  // Fetch latest 3 posts
  const { data: posts, isLoading, error } = usePosts();
  const latestPosts = posts?.slice(0, 3) || [];
  const currentPosts = latestPosts.map(convertToPostPreview);

  // Calculate container height based on viewport and post count
  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const baseHeight = viewportHeight * 0.5; // Increased for better spacing
      const scrollPerPost = viewportHeight * (isMobile ? 0.8 : 1); // More scroll distance per post
      const totalHeight = baseHeight + (scrollPerPost * currentPosts.length);
      setContainerHeight(`${totalHeight}px`);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [currentPosts.length]);

  useEffect(() => {
    let ticking = false;
    
    const updateScrollProgress = () => {
      if (!containerRef.current || !stickyRef.current || currentPosts.length === 0) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Center the sticky position in viewport
      const pinStartPoint = windowHeight * 0.5;
      
      // Calculate if we should pin
      if (rect.top <= pinStartPoint && rect.bottom > windowHeight * 0.5) {
        setIsPinned(true);
        
        // Calculate progress through the pinned section
        const scrolledDistance = pinStartPoint - rect.top;
        const totalScrollDistance = container.offsetHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollDistance));
        
        setScrollProgress(progress);
        
        // Title fades in quickly at the beginning
        setTitleOpacity(Math.min(1, progress * 3));
        
        // Calculate which posts should be visible with better progression
        const effectiveProgress = progress * currentPosts.length;
        const visibleIndex = Math.min(
          Math.floor(effectiveProgress), 
          currentPosts.length - 1
        );
        setCurrentVisibleIndex(visibleIndex);
      } else if (rect.top > pinStartPoint) {
        // Before the section
        setIsPinned(false);
        setScrollProgress(0);
        setCurrentVisibleIndex(-1);
        setTitleOpacity(0);
      } else {
        // After the section
        setIsPinned(false);
        setScrollProgress(1);
        setCurrentVisibleIndex(currentPosts.length - 1);
        setTitleOpacity(1);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPosts.length]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading amazing posts...</p>
        </div>
      </div>
    );
  }

  if (error || currentPosts.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-[50vh]">
        <div className="text-gray-600 text-center p-4">
          {error ? 'Failed to load posts' : 'No posts available yet'}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div 
        ref={stickyRef}
        className={`${isPinned ? 'sticky' : 'relative'} top-1/2 -translate-y-1/2 w-full px-4 transition-all duration-300`}
        style={{
          // Ensure proper centering when sticky
          left: isPinned ? '0' : 'auto',
          right: isPinned ? '0' : 'auto',
        }}
      >
        <div className="max-w-lg mx-auto">
          {/* Animated title section with better contrast */}
          <div 
            className={`text-center mb-8 transition-all duration-700 transform`}
            style={{ 
              opacity: titleOpacity,
              transform: `translateY(${titleOpacity < 1 ? '20px' : '0px'})`
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('Latest Community Posts')}
            </h2>
            <p className="text-foreground/70 text-lg">
              {t('Discover what our experts are discussing')}
            </p>
          </div>

          {/* Posts container with enhanced styling */}
          <div className="relative h-[380px] md:h-[420px]">
            {/* Background glow effect */}
            {isPinned && (
              <div className="absolute inset-0 bg-gradient-inspire blur-3xl transform scale-125 animate-pulse opacity-10" />
            )}
            
            {currentPosts.map((post, index) => {
              // Simpler calculation for better control
              const postProgress = (scrollProgress * currentPosts.length) - index;
              const localProgress = Math.max(0, Math.min(1, postProgress));
              
              const isVisible = localProgress > 0;
              const isActive = index === currentVisibleIndex;
              const isPast = index < currentVisibleIndex;
              
              // Ensure all active posts get the same full scale
              let scale = 0.75; // Base scale
              let translateY = 100; // Start position
              let opacity = 0;
              let rotateX = 0;
              let blur = 0;
              
              if (isActive) {
                // Active post - full size and centered
                scale = 1;
                translateY = 0;
                opacity = 1;
                rotateX = 0;
                blur = 0;
              } else if (isPast) {
                // Past posts - stacked above
                scale = 0.85;
                translateY = -15 - (currentVisibleIndex - index) * 5; // Stack effect
                opacity = 0.3;
                rotateX = -8;
                blur = 2;
              } else if (isVisible) {
                // Upcoming post - partially visible
                scale = 0.75 + (0.25 * localProgress);
                translateY = 50 * (1 - localProgress);
                opacity = 0.5 * localProgress;
                rotateX = 5 * (1 - localProgress);
                blur = 0;
              }
              
              return (
                <div
                  key={`post-${post.id}`}
                  className={`absolute inset-0 transition-all ease-out`}
                  style={{
                    transitionDuration: '600ms',
                    transform: `
                      translateY(${translateY}%)
                      scale(${scale})
                      perspective(1200px)
                      rotateX(${rotateX}deg)
                    `,
                    opacity: opacity,
                    zIndex: currentPosts.length - index,
                    pointerEvents: isActive ? 'auto' : 'none',
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  }}
                >
                  <div className={`
                    rounded-2xl shadow-2xl backdrop-blur-sm 
                    border h-full overflow-hidden transform-gpu
                    transition-all duration-500
                    ${isActive ? 
                      'bg-gradient-to-br from-white via-primary/5 to-secondary/5 dark:from-gray-900 dark:via-primary/10 dark:to-secondary/10 border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 
                      'bg-card border-border'
                    }
                  `}>
                    {/* Animated gradient overlay for active posts */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-pulse opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-white/5" />
                      </>
                    )}
                    
                    {/* Apply special styling to PostCard content when active */}
                    <div className={isActive ? 'relative z-10' : ''}>
                      <PostCard post={post} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced progress indicators */}
          <div className="mt-8 flex justify-center items-center space-x-3">
            {currentPosts.map((_, index) => {
              const isActive = index === currentVisibleIndex;
              const isPast = index < currentVisibleIndex;
              
              return (
                <div
                  key={index}
                  className="relative"
                >
                  <div
                    className={`
                      h-2 transition-all duration-500 ease-out rounded-full
                      ${isPast ? 'bg-primary/70 w-6' : ''}
                      ${isActive ? 'bg-primary w-10' : ''}
                      ${!isPast && !isActive ? 'bg-gray-300 w-2' : ''}
                    `}
                  />
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground/60">
                        {index + 1}/{currentPosts.length}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Enhanced scroll hint */}
          {isPinned && currentVisibleIndex < currentPosts.length - 1 && (
            <div className="mt-10 text-center animate-fade-in">
              <div className="inline-flex flex-col items-center text-foreground/60">
                <p className="text-sm mb-2">Scroll to reveal more</p>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggeredPosts;