
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import { CategoryType } from '@/types';
import ContentTypeFilters from '@/components/index/ContentTypeFilters';
import CategoryFilters from '@/components/index/CategoryFilters';
import PostsSection from '@/components/index/PostsSection';
import NavigationControls from '@/components/index/NavigationControls';

const Index = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedContentType, setSelectedContentType] = useState<'all' | 'question' | 'article' | 'business_idea' | 'news'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Authenticated users should always see posts, plus check for URL params or search
  const shouldShowPosts = user || searchParams.get('posts') === 'true' || searchTerm.length > 0;
  
  const { data: allPosts, isLoading, error } = usePosts(selectedCategory, searchTerm);

  // Filter posts by content type
  const posts = React.useMemo(() => {
    if (!allPosts) return [];
    if (selectedContentType === 'all') return allPosts;
    return allPosts.filter(post => post.type === selectedContentType);
  }, [allPosts, selectedContentType]);

  // Handle search term changes with real-time navigation
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      setSearchParams({ posts: 'true', search: term });
    } else if (searchParams.get('search')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('search');
      // Keep posts=true for authenticated users
      if (!user && !newParams.get('posts')) {
        newParams.delete('posts');
      } else if (user) {
        newParams.set('posts', 'true');
      }
      setSearchParams(newParams);
    }
  };

  // Initialize search term from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
    
    // Ensure authenticated users always have posts=true in URL
    if (user && !searchParams.get('posts') && !searchFromUrl) {
      setSearchParams({ posts: 'true' });
    }
  }, [searchParams, user, setSearchParams]);

  if (error) {
    console.error('Error loading posts:', error);
  }

  // Show landing page only for non-authenticated users who haven't requested posts
  if (!shouldShowPosts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearchChange} searchTerm={searchTerm} />
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearchChange} searchTerm={searchTerm} />
      
      <NavigationControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchParams={setSearchParams}
        user={user}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SyrGo Tagline */}
        <div className="mb-8 text-center">
          <p className="text-xl text-primary font-semibold">
            SyrGo is where Syrian professionals meet Investors and Business owners — <span className="underline decoration-2 underline-offset-2 text-accent font-bold">Ask, Share, Offer</span>.
          </p>
        </div>

        <ContentTypeFilters
          selectedContentType={selectedContentType}
          setSelectedContentType={setSelectedContentType}
        />

        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <PostsSection
          isLoading={isLoading}
          posts={posts}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Index;
