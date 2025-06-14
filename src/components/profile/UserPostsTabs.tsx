
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import { Post, User as UserType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const renderPostsList = (posts: Post[], emptyMessage: string) => {
    if (posts.length > 0) {
      return (
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      );
    }
    
    return (
      <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
        {emptyMessage}
      </p>
    );
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">
          {t('posts')} {t('postedBy')} {userProfile.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} ${isMobile ? 'h-auto' : ''}`}>
            <TabsTrigger value="all" className={`${isMobile ? 'text-xs px-2 py-2' : 'text-sm'}`}>
              {isMobile ? t('all') : `${t('all')} (${userPosts?.length || 0})`}
            </TabsTrigger>
            <TabsTrigger value="questions" className={`${isMobile ? 'text-xs px-2 py-2' : 'text-sm'}`}>
              {isMobile ? t('questions') : `${t('questions')} (${questions.length})`}
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="news">{t('news')} ({news.length})</TabsTrigger>
                <TabsTrigger value="articles">{t('articles')} ({articles.length})</TabsTrigger>
                <TabsTrigger value="ideas">{t('ideas')} ({businessIdeas.length})</TabsTrigger>
              </>
            )}
          </TabsList>
          
          {isMobile && (
            <div className="mt-4">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="news" className="text-xs px-2 py-2">
                  {t('news')}
                </TabsTrigger>
                <TabsTrigger value="articles" className="text-xs px-2 py-2">
                  {t('articles')}
                </TabsTrigger>
                <TabsTrigger value="ideas" className="text-xs px-2 py-2">
                  {t('ideas')}
                </TabsTrigger>
              </TabsList>
            </div>
          )}
          
          <TabsContent value="all" className="mt-4 sm:mt-6">
            {renderPostsList(userPosts || [], t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="questions" className="mt-4 sm:mt-6">
            {renderPostsList(questions, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="news" className="mt-4 sm:mt-6">
            {renderPostsList(news, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="articles" className="mt-4 sm:mt-6">
            {renderPostsList(articles, t('noPostsFound'))}
          </TabsContent>
          
          <TabsContent value="ideas" className="mt-4 sm:mt-6">
            {renderPostsList(businessIdeas, t('noPostsFound'))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserPostsTabs;
