
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Post, CategoryType } from '@/types';

interface PostCardHeaderBadgesProps {
  type: Post['type'];
  category: CategoryType;
}

const PostCardHeaderBadges: React.FC<PostCardHeaderBadgesProps> = ({ type, category }) => {
  const { t } = useTranslation();

  const getPostTypeColor = (postType: Post['type']) => {
    switch (postType) {
      case 'question':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'news':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'article':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'business_idea':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPostTypeLabel = (postType: Post['type']) => {
    switch (postType) {
      case 'question':
        return t('question');
      case 'news':
        return t('news');
      case 'article':
        return t('Article');
      case 'business_idea':
        return t('Business Idea');
      default:
        return postType;
    }
  };

  const getCategoryColor = (cat: CategoryType) => {
    switch (cat) {
      case 'legal':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'technology':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'investment':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'marketing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'operations':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (cat: CategoryType) => {
    switch (cat) {
      case 'legal':
        return t('legal');
      case 'technology':
        return t('technology');
      case 'investment':
        return t('investment');
      case 'marketing':
        return t('marketing');
      case 'operations':
        return t('operations');
      default:
        return cat;
    }
  };

  return (
    <div className="flex gap-2">
      <Badge 
        variant="outline" 
        className={`text-xs font-medium ${getPostTypeColor(type)}`}
      >
        {getPostTypeLabel(type)}
      </Badge>
      <Badge 
        variant="outline"
        className={`text-xs ${getCategoryColor(category)}`}
      >
        {getCategoryLabel(category)}
      </Badge>
    </div>
  );
};

export default PostCardHeaderBadges;
