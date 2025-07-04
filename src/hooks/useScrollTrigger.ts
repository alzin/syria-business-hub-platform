import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollTriggerOptions {
  totalPosts: number;
  threshold?: number;
}

interface ScrollTriggerState {
  isActive: boolean;
  currentIndex: number;
  progress: number;
  isPinned: boolean;
}

export const useScrollTrigger = ({ totalPosts, threshold = 0.5 }: UseScrollTriggerOptions) => {
  const [state, setState] = useState<ScrollTriggerState>({
    isActive: false,
    currentIndex: 0,
    progress: 0,
    isPinned: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const startScrollY = useRef<number>(0);
  const isScrollingThroughPosts = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || totalPosts === 0) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Check if section is in viewport
    const isInViewport = rect.top <= viewportHeight * threshold && rect.bottom >= 0;
    
    if (isInViewport && !state.isActive) {
      // Start scroll interaction
      startScrollY.current = window.scrollY;
      isScrollingThroughPosts.current = true;
      setState(prev => ({ ...prev, isActive: true, isPinned: true }));
    } else if (isInViewport && state.isActive) {
      // Calculate progress through posts
      const scrollDistance = window.scrollY - startScrollY.current;
      const maxScrollDistance = viewportHeight * 1.5; // Adjust sensitivity
      const progress = Math.max(0, Math.min(1, scrollDistance / maxScrollDistance));
      
      // Calculate current post index
      const postIndex = Math.floor(progress * totalPosts);
      const clampedIndex = Math.max(0, Math.min(totalPosts - 1, postIndex));
      
      setState(prev => ({
        ...prev,
        progress,
        currentIndex: clampedIndex,
      }));

      // Check if we've scrolled through all posts
      if (progress >= 1) {
        // Allow normal scrolling to resume
        setState(prev => ({ ...prev, isActive: false, isPinned: false }));
        isScrollingThroughPosts.current = false;
      }
    } else if (!isInViewport && state.isActive) {
      // Reset when scrolling away
      setState(prev => ({ ...prev, isActive: false, isPinned: false }));
      isScrollingThroughPosts.current = false;
    }
  }, [state.isActive, totalPosts, threshold]);

  // Throttled scroll handler for performance
  const throttledScroll = useCallback(() => {
    requestAnimationFrame(handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  // Prevent default scroll when pinned
  useEffect(() => {
    if (state.isPinned && isScrollingThroughPosts.current) {
      const preventScroll = (e: Event) => {
        if (state.progress < 1) {
          e.preventDefault();
        }
      };

      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [state.isPinned, state.progress]);

  const reset = useCallback(() => {
    setState({
      isActive: false,
      currentIndex: 0,
      progress: 0,
      isPinned: false,
    });
    isScrollingThroughPosts.current = false;
  }, []);

  return {
    ...state,
    sectionRef,
    reset,
  };
};