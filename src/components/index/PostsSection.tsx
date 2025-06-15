
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Post, CategoryType } from '@/types';
import PostCard from '@/components/PostCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PostsSectionProps {
  isLoading: boolean;
  posts: Post[];
  selectedCategory: CategoryType | 'all';
  searchTerm: string;
  handleSearchChange: (term: string) => void;
}

const PostsSection: React.FC<PostsSectionProps> = ({
  isLoading,
  posts,
  selectedCategory,
  searchTerm,
  handleSearchChange,
}) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default PostsSection;
