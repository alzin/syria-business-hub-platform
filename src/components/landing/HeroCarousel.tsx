
import React, { useEffect, useState } from 'react';
import PostCard from './carousel/PostCard';
import CarouselIndicators from './carousel/CarouselIndicators';
import { usePosts } from '@/hooks/usePosts';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fetch latest 3 posts regardless of language
  const { data: posts, isLoading, error } = usePosts();
  const latestPosts = posts?.slice(0, 3) || [];
  
  // Convert real posts to PostPreview format
  const currentPosts = latestPosts.map(convertToPostPreview);

  useEffect(() => {
    if (currentPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentPosts.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [currentPosts.length]);

  // Reset index when posts change
  useEffect(() => {
    setCurrentIndex(0);
  }, [posts]);

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
    <div className="relative w-full max-w-lg h-auto">
      <div className="relative rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20 h-[320px]">
        <div className="h-full">
          <PostCard post={currentPost} key={`post-${currentPost.id}`} />
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
