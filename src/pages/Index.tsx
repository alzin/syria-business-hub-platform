
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import LandingPage from '@/components/LandingPage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryType } from '@/types';

const Index = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPosts, setShowPosts] = useState(false);
  
  const { data: posts, isLoading, error } = usePosts(selectedCategory, searchTerm);

  const categories: { key: CategoryType | 'all'; label: string }[] = [
    { key: 'all', label: 'All Categories' },
    { key: 'legal', label: 'Legal & Compliance' },
    { key: 'technology', label: 'Technology' },
    { key: 'investment', label: 'Investment' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'operations', label: 'Operations' },
  ];

  if (error) {
    console.error('Error loading posts:', error);
  }

  // Show full landing page by default
  if (!showPosts) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={setSearchTerm} searchTerm={searchTerm} />
        <LandingPage />
        
        {/* Quick access to community section */}
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Community Discussion
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with investors and entrepreneurs in our active Q&A community
            </p>
            <Button 
              onClick={() => setShowPosts(true)}
              size="lg"
              className="bg-syrian-green hover:bg-syrian-green/90"
            >
              Browse Community Posts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchTerm} searchTerm={searchTerm} />
      
      {/* Back to landing page option */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => setShowPosts(false)}
            className="text-syrian-green hover:bg-syrian-green/10"
          >
            ← Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className="cursor-pointer hover:bg-syrian-green/10 border-syrian-green text-syrian-green data-[state=selected]:bg-syrian-green data-[state=selected]:text-white"
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
                  <Button onClick={() => setSearchTerm('')} variant="outline">
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
