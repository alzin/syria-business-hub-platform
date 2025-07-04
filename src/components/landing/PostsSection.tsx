import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollTriggeredPosts from './ScrollTriggeredPosts';
import { usePosts } from '@/hooks/usePosts';
import { useLanguage } from '@/contexts/LanguageContext';

const PostsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { data: posts, isLoading, error } = usePosts();

  // Get the first 4 posts for the scroll interaction
  const postsToShow = posts?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('Loading posts...')}</p>
        </div>
      </section>
    );
  }

  if (error || postsToShow.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t('No Posts Available')}
          </h2>
          <p className="text-muted-foreground">
            {error ? t('Failed to load posts') : t('No posts have been created yet')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <ScrollTriggeredPosts posts={postsToShow} />
    </section>
  );
};

export default PostsSection;