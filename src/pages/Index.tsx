import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import LandingPage from '@/components/LandingPage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryType } from '@/types';

const Index = () => {
  const { t } = useTranslation();
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

  const categories: { key: CategoryType | 'all'; label:string }[] = [
    { key: 'all', label: 'All Categories' },
    { key: 'legal', label: 'Legal & Compliance' },
    { key: 'technology', label: 'Technology' },
    { key: 'investment', label: 'Investment' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'operations', label: 'Operations' },
  ];

  const contentTypes: { key: 'all' | 'question' | 'article' | 'business_idea' | 'news'; label: string; color: string }[] = [
    { key: 'all', label: t('All Content'), color: 'border-gray-300' },
    { key: 'question', label: t('Questions'), color: 'border-blue-300 text-blue-700' },
    { key: 'article', label: t('Articles'), color: 'border-green-300 text-green-700' },
    { key: 'business_idea', label: t('Business Ideas'), color: 'border-purple-300 text-purple-700' },
    { key: 'news', label: t('News'), color: 'border-orange-300 text-orange-700' },
  ];

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
      
      {/* Back to posts option - only show if there's a search term */}
      {searchTerm && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setSearchParams({ posts: 'true' });
              }}
              className="text-syrian-green hover:bg-syrian-green/10"
            >
              ← Back to Posts
            </Button>
          </div>
        </div>
      )}

      {/* Show back to home only for non-authenticated users when not searching */}
      {!searchTerm && !user && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchParams({});
                setSearchTerm('');
              }}
              className="text-syrian-green hover:bg-syrian-green/10"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content type filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t('Content Type')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((contentType) => (
              <Badge
                key={contentType.key}
                variant={selectedContentType === contentType.key ? 'default' : 'outline'}
                className={
                  selectedContentType === contentType.key
                    ? 'cursor-pointer bg-syrian-green text-white border-syrian-green hover:bg-syrian-green/90'
                    : `cursor-pointer hover:bg-syrian-green/10 ${contentType.color}`
                }
                onClick={() => setSelectedContentType(contentType.key)}
              >
                {contentType.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t('filterByCategory', 'Filter by Category')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                className={
                  selectedCategory === category.key
                    ? 'cursor-pointer bg-syrian-green text-white border-syrian-green hover:bg-syrian-green/90'
                    : 'cursor-pointer hover:bg-syrian-green/10'
                }
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Posts section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory === 'all' ? t('recentPosts', 'Recent Posts') : `${selectedCategory} Posts`}
              {searchTerm && ` - Search: "${searchTerm}"`}
            </h2>
            {posts && (
              <span className="text-sm text-gray-500">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">{t('loading')}</p>
              </CardContent>
            </Card>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No posts found for "${searchTerm}"`
                    : selectedCategory === 'all'
                    ? t('noPostsFound', 'No posts available yet.')
                    : `No posts in ${selectedCategory} category yet.`
                  }
                </p>
                {searchTerm && (
                  <Button onClick={() => handleSearchChange('')} variant="outline">
                    Clear search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
