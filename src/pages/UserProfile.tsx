import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Calendar, MapPin, User, Mail } from 'lucide-react';
import { User as UserType, Post, ExpertiseType, CategoryType } from '@/types';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const user: UserType = {
        id: data.id,
        email: data.email,
        name: data.name,
        expertise: data.expertise as ExpertiseType,
        location: data.location as 'syria' | 'international',
        accessLevel: data.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
        verified: data.verified,
        avatar: data.avatar,
        joinedAt: new Date(data.created_at),
      };

      return user;
    },
  });

  // Fetch user's posts
  const { data: userPosts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['user-posts', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id, name, expertise, location, access_level, verified, avatar, email, created_at
          )
        `)
        .eq('author_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const posts: Post[] = data.map((post: any) => ({
        id: post.id,
        type: post.type as 'question' | 'news' | 'article' | 'business_idea',
        title: post.title,
        content: post.content,
        author: {
          id: post.profiles.id,
          email: post.profiles.email,
          name: post.profiles.name,
          expertise: post.profiles.expertise as ExpertiseType,
          location: post.profiles.location as 'syria' | 'international',
          accessLevel: post.profiles.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
          verified: post.profiles.verified,
          avatar: post.profiles.avatar,
          joinedAt: new Date(post.profiles.created_at),
        } as UserType,
        category: post.category as CategoryType,
        tags: post.tags || [],
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
        votes: post.votes,
        answers: [],
        comments: [],
        // Business idea specific fields
        investmentNeeded: post.investment_needed,
        timeline: post.timeline,
        lookingForPartners: post.looking_for_partners,
        contactInfo: post.contact_info,
      }));

      return posts;
    },
  });

  const isLoading = isLoadingProfile || isLoadingPosts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('loading')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('userNotFound')}</p>
              <Button className="mt-4" onClick={() => navigate('/')}>
                {t('goBackHome')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const questions = userPosts?.filter(post => post.type === 'question') || [];
  const news = userPosts?.filter(post => post.type === 'news') || [];
  const articles = userPosts?.filter(post => post.type === 'article') || [];
  const businessIdeas = userPosts?.filter(post => post.type === 'business_idea') || [];

  // RTL-aware spacing classes
  const horizontalSpacing = isRTL ? 'space-x-reverse' : '';
  const iconMargin = isRTL ? 'ml-2' : 'mr-2';
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <BackIcon className={`w-4 h-4 ${iconMargin}`} />
          {t('back to posts')}
        </Button>

        {/* User profile header */}
        <Card className="mb-8">
          <CardHeader>
            <div className={`flex items-start space-x-6 ${horizontalSpacing}`}>
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} className="w-24 h-24 rounded-full" />
                ) : (
                  <User className="w-12 h-12 text-gray-500" />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`flex items-center space-x-3 mb-2 ${horizontalSpacing}`}>
                  <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                  {userProfile.verified && (
                    <span className="text-blue-500 text-sm">✓ {t('verified')}</span>
                  )}
                </div>
                
                <div className={`flex items-center space-x-4 mb-4 ${horizontalSpacing}`}>
                  <ExpertiseBadge expertise={userProfile.expertise} verified={userProfile.verified} />
                  <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location === 'syria' ? 'Syria' : 'International'}</span>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{t('joined')} {userProfile.joinedAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm text-gray-600">
                  <span>{userPosts?.length || 0} {t('posts')}</span>
                  <span>{questions.length} {t('questions')}</span>
                  <span>{news.length} {t('news')}</span>
                  <span>{articles.length} {t('articles')}</span>
                  <span>{businessIdeas.length} {t('ideas')}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* User's posts */}
        <Card>
          <CardHeader>
            <CardTitle>{t('posts')} {t('postedBy')} {userProfile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">{t('all')} ({userPosts?.length || 0})</TabsTrigger>
                <TabsTrigger value="questions">{t('questions')} ({questions.length})</TabsTrigger>
                <TabsTrigger value="news">{t('news')} ({news.length})</TabsTrigger>
                <TabsTrigger value="articles">{t('articles')} ({articles.length})</TabsTrigger>
                <TabsTrigger value="ideas">{t('ideas')} ({businessIdeas.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {userPosts && userPosts.length > 0 ? (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {t('noPostsFound')}
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="questions" className="mt-6">
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    {questions.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {t('noPostsFound')}
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="news" className="mt-6">
                {news.length > 0 ? (
                  <div className="space-y-6">
                    {news.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {t('noPostsFound')}
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="articles" className="mt-6">
                {articles.length > 0 ? (
                  <div className="space-y-6">
                    {articles.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {t('noPostsFound')}
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="ideas" className="mt-6">
                {businessIdeas.length > 0 ? (
                  <div className="space-y-6">
                    {businessIdeas.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {t('noPostsFound')}
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
