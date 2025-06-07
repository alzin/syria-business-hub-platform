
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import WelcomeHero from '@/components/WelcomeHero';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post, CategoryType } from '@/types';
import { Search, Plus, Filter } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  // Mock data for demonstration
  const mockPosts: Post[] = [
    {
      id: '1',
      type: 'question',
      title: 'How to register a startup in Syria?',
      content: 'I am planning to start a tech company in Damascus. What are the legal requirements and steps I need to follow? Any recent changes in regulations?',
      author: {
        id: '2',
        email: 'ahmad@example.com',
        name: 'Ahmad Hassan',
        expertise: 'founder',
        location: 'syria',
        accessLevel: 'registered',
        verified: true,
        joinedAt: new Date('2024-01-15'),
      },
      category: 'legal',
      tags: ['startup', 'registration', 'syria', 'legal'],
      createdAt: new Date('2024-06-06'),
      updatedAt: new Date('2024-06-06'),
      votes: 12,
      answers: [],
      comments: [],
    },
    {
      id: '2',
      type: 'news',
      title: 'New Investment Fund Launches for Syrian Startups',
      content: 'A new $10M investment fund has been announced to support Syrian entrepreneurs globally. The fund focuses on technology and sustainable business models.',
      author: {
        id: '3',
        email: 'sara@example.com',
        name: 'Sara Khalil',
        expertise: 'investor',
        location: 'international',
        accessLevel: 'verified',
        verified: true,
        joinedAt: new Date('2024-02-01'),
      },
      category: 'investment',
      tags: ['investment', 'funding', 'startups', 'global'],
      createdAt: new Date('2024-06-05'),
      updatedAt: new Date('2024-06-05'),
      votes: 25,
      answers: [],
      comments: [],
    },
    {
      id: '3',
      type: 'question',
      title: 'Best practices for remote team management?',
      content: 'As a Syrian startup founder with a distributed team across multiple countries, what tools and strategies work best for managing remote teams effectively?',
      author: {
        id: '4',
        email: 'omar@example.com',
        name: 'Omar Abdel',
        expertise: 'developer',
        location: 'international',
        accessLevel: 'registered',
        verified: false,
        joinedAt: new Date('2024-03-10'),
      },
      category: 'operations',
      tags: ['remote-work', 'management', 'tools', 'productivity'],
      createdAt: new Date('2024-06-04'),
      updatedAt: new Date('2024-06-04'),
      votes: 8,
      answers: [],
      comments: [],
    }
  ];

  const categories: { key: CategoryType | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'legal', label: t('legal') },
    { key: 'technology', label: t('technology') },
    { key: 'investment', label: t('investment') },
    { key: 'marketing', label: t('marketing') },
    { key: 'operations', label: t('operations') },
  ];

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('askQuestion')}
                  </Button>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('postNews')}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-gray-500 text-lg">
                      No posts found matching your criteria.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
