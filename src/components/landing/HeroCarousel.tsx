
import React, { useEffect, useState } from 'react';
import PostCard from './carousel/PostCard';
import CarouselIndicators from './carousel/CarouselIndicators';
import { usePosts } from '@/hooks/usePosts';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { Post } from '@/types';
import { MessageSquare, Lightbulb, Building2, Newspaper } from 'lucide-react';

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
    id: index + 1, // Use index as simple ID for carousel
    type: post.type,
    title: post.title,
    content: post.content,
    author: post.author.name,
    expertise: post.author.expertiseSpecialization || post.author.expertiseCategory || 'Expert',
    votes: 0, // Real votes not implemented yet
    answers: post.answersCount || 0,
    icon: getPostIcon(post.type),
    bgColor: colors.bgColor,
    textColor: colors.textColor,
    avatarSeed: post.author.name.replace(/\s+/g, '-').toLowerCase()
  };
};

const HeroCarousel = () => {
  // Fetch latest 3 posts regardless of language
  const { data: posts, isLoading, error } = usePosts();
  const latestPosts = posts?.slice(0, 3) || [];
  
  // Convert real posts to PostPreview format
  const currentPosts = latestPosts.map(convertToPostPreview);

  // Use scroll trigger hook for scroll-based post switching
  const { currentIndex, progress, isActive, sectionRef } = useScrollTrigger({
    totalPosts: currentPosts.length,
    threshold: 0.3,
  });

  if (isLoading) {
    return (
      <div className="relative w-full max-w-lg h-auto">
        <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px] flex items-center justify-center">
          <div className="animate-pulse text-background/70">Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error || currentPosts.length === 0) {
    return (
      <div className="relative w-full max-w-lg h-auto">
        <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px] flex items-center justify-center">
          <div className="text-background/70 text-center p-4">
            {error ? 'Failed to load posts' : 'No posts available yet'}
          </div>
        </div>
      </div>
    );
  }

  const currentPost = currentPosts[currentIndex];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full max-w-lg h-auto transition-all duration-300"
    >
      <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px] overflow-hidden">
        <div className="relative h-full">
          {currentPosts.map((post, index) => (
            <div
              key={`post-${post.id}`}
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                index === currentIndex 
                  ? 'translate-y-0 opacity-100' 
                  : index < currentIndex 
                    ? '-translate-y-full opacity-0' 
                    : 'translate-y-full opacity-0'
              }`}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
        
        {/* Progress indicator when scrolling */}
        {isActive && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-background/80">
            Scroll to explore posts ({currentIndex + 1}/{currentPosts.length})
          </div>
        )}
      </div>

      <CarouselIndicators
        totalPosts={currentPosts.length}
        currentIndex={currentIndex}
        onIndicatorClick={() => {}} // Disabled during scroll mode
      />
    </div>
  );
};

export default HeroCarousel;
