
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import { Post, User as UserType } from '@/types';

interface UserPostsTabsProps {
  userProfile: UserType;
  userPosts: Post[] | undefined;
  questions: Post[];
  news: Post[];
  articles: Post[];
  businessIdeas: Post[];
}

const UserPostsTabs: React.FC<UserPostsTabsProps> = ({
  userProfile,
  userPosts,
  questions,
  news,
  articles,
  businessIdeas
}) => {
  const { t } = useTranslation();

  const renderPostsList = (posts: Post[], emptyMessage: string) => {
    if (posts.length > 0) {
      return (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      );
    }
    
    return (
      <p className="text-gray-500 text-center py-8">
        {emptyMessage}
      </p>
    );
  };

  return (
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
            {renderPostsList(userPosts || [], t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="questions" className="mt-6">
            {renderPostsList(questions, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="news" className="mt-6">
            {renderPostsList(news, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="articles" className="mt-6">
            {renderPostsList(articles, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="ideas" className="mt-6">
            {renderPostsList(businessIdeas, t('noPostsFound'))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserPostsTabs;
