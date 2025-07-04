import { useEffect, useState, useRef, useCallback } from 'react';

interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  totalSteps: number;
}

interface ScrollTriggerReturn {
  isActive: boolean;
  progress: number;
  currentStep: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useScrollTrigger = ({
  threshold = 0.1,
  rootMargin = '0px',
  totalSteps
}: ScrollTriggerOptions): ScrollTriggerReturn => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const isScrollingDown = useRef(true);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isActive) return;

    e.preventDefault();
    
    const delta = e.deltaY;
    isScrollingDown.current = delta > 0;
    
    // Accumulate scroll distance
    scrollAccumulator.current += Math.abs(delta);
    
    // Calculate progress based on accumulated scroll
    // Each step requires about 200px of scroll
    const scrollPerStep = 200;
    const totalScrollNeeded = scrollPerStep * totalSteps;
    const newProgress = Math.min(scrollAccumulator.current / totalScrollNeeded, 1);
    
    setProgress(newProgress);
    
    // Calculate current step
    const step = Math.floor(newProgress * totalSteps);
    setCurrentStep(Math.min(step, totalSteps - 1));
    
    // If we've completed all steps and still scrolling down, exit
    if (newProgress >= 1 && isScrollingDown.current) {
      setIsActive(false);
      setProgress(0);
      setCurrentStep(0);
      scrollAccumulator.current = 0;
      
      // Resume normal scroll by scrolling to next section
      const container = containerRef.current;
      if (container) {
        const nextElement = container.nextElementSibling as HTMLElement;
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    
    // If scrolling up and at the beginning, exit upward
    if (newProgress <= 0 && !isScrollingDown.current) {
      setIsActive(false);
      setProgress(0);
      setCurrentStep(0);
      scrollAccumulator.current = 0;
      
      // Resume normal scroll by scrolling to previous section
      const container = containerRef.current;
      if (container) {
        const prevElement = container.previousElementSibling as HTMLElement;
        if (prevElement) {
          prevElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [isActive, totalSteps]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isActive) return;
    
    e.preventDefault();
    // Touch handling would be implemented here for mobile
    // For now, we'll keep it simple and rely on wheel events
  }, [isActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          scrollAccumulator.current = 0;
          setProgress(0);
          setCurrentStep(0);
        }
      },
      { threshold, rootMargin }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [threshold, rootMargin, isActive]);

  useEffect(() => {
    if (isActive) {
      // Prevent body scroll when section is active
      document.body.style.overflow = 'hidden';
      
      // Add event listeners
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      // Restore body scroll
      document.body.style.overflow = 'auto';
      
      // Remove event listeners
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isActive, handleWheel, handleTouchMove]);

  return {
    isActive,
    progress,
    currentStep,
    containerRef
  };
};
