
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import WelcomeHero from '@/components/WelcomeHero';
import PostCard from '@/components/PostCard';
import CreatePostDialog from '@/components/CreatePostDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryType } from '@/types';
import { Search, Plus, Filter } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [showCreateNews, setShowCreateNews] = useState(false);

  const { data: posts = [], isLoading, error } = usePosts(selectedCategory, searchTerm);

  const categories: { key: CategoryType | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'legal', label: t('legal') },
    { key: 'technology', label: t('technology') },
    { key: 'investment', label: t('investment') },
    { key: 'marketing', label: t('marketing') },
    { key: 'operations', label: t('operations') },
  ];

  if (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <WelcomeHero />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t('filter')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">{t('categories')}</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.key}
                        variant={selectedCategory === category.key ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.key)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {user && (
                <div className="flex gap-2">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowCreateQuestion(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('askQuestion')}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowCreateNews(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('postNews')}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Posts Feed */}
            <div className="space-y-6">
              {isLoading ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-gray-500 text-lg">
                      {t('loading')}
                    </p>
                  </CardContent>
                </Card>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-gray-500 text-lg">
                      No posts found matching your criteria.
                    </p>
                    {user && (
                      <div className="mt-4">
                        <p className="text-gray-400 mb-4">Be the first to start the conversation!</p>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={() => setShowCreateQuestion(true)}>
                            {t('askQuestion')}
                          </Button>
                          <Button variant="outline" onClick={() => setShowCreateNews(true)}>
                            {t('postNews')}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreatePostDialog 
        open={showCreateQuestion}
        onOpenChange={setShowCreateQuestion}
        type="question"
      />
      
      <CreatePostDialog 
        open={showCreateNews}
        onOpenChange={setShowCreateNews}
        type="news"
      />
    </div>
  );
};

export default Index;
