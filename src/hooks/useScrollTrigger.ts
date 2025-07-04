import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollTriggerOptions {
  totalPosts: number;
  threshold?: number;
}

export const useScrollTrigger = ({ totalPosts, threshold = 0.3 }: UseScrollTriggerOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const startScrollY = useRef<number>(0);
  const hasStarted = useRef(false);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || totalPosts === 0) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Check if section is in viewport and user is scrolling down
    const isInViewport = rect.top <= viewportHeight * threshold && rect.bottom >= 0;
    
    console.log('Scroll Debug:', { 
      isInViewport, 
      rectTop: rect.top, 
      threshold: viewportHeight * threshold,
      hasStarted: hasStarted.current,
      isActive 
    });
    
    if (isInViewport && !hasStarted.current) {
      // Start the scroll sequence
      startScrollY.current = window.scrollY;
      hasStarted.current = true;
      setIsActive(true);
      console.log('Starting scroll sequence at:', startScrollY.current);
    }
    
    if (isInViewport && hasStarted.current) {
      // Calculate progress through posts
      const scrollDistance = window.scrollY - startScrollY.current;
      const maxScrollDistance = viewportHeight * 0.8; // Reduced sensitivity
      const newProgress = Math.max(0, Math.min(1, scrollDistance / maxScrollDistance));
      
      // Calculate current post index
      const postIndex = Math.floor(newProgress * totalPosts);
      const clampedIndex = Math.max(0, Math.min(totalPosts - 1, postIndex));
      
      console.log('Progress calculation:', { 
        scrollDistance, 
        maxScrollDistance, 
        newProgress, 
        postIndex, 
        clampedIndex 
      });
      
      setProgress(newProgress);
      setCurrentIndex(clampedIndex);

      // Complete the sequence when all posts shown
      if (newProgress >= 0.99) {
        console.log('Sequence complete, resetting');
        hasStarted.current = false;
        setIsActive(false);
        setProgress(0);
        setCurrentIndex(0);
      }
    }
    
    // Reset if scrolled away from section
    if (!isInViewport && hasStarted.current) {
      console.log('Scrolled away, resetting');
      hasStarted.current = false;
      setIsActive(false);
      setProgress(0);
      setCurrentIndex(0);
    }
  }, [totalPosts, threshold, isActive]);

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  return {
    currentIndex,
    progress,
    isActive,
    sectionRef,
  };
};