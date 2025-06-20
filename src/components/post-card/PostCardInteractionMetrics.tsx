
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { Post } from '@/types';

interface PostCardInteractionMetricsProps {
  type: Post['type'];
  answersCount?: number;
  commentsCount?: number;
}

const PostCardInteractionMetrics: React.FC<PostCardInteractionMetricsProps> = ({
  type,
  answersCount,
  commentsCount,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center space-x-4">
        {type === 'question' && (
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {answersCount || 0} {t('answers')}
          </div>
        )}
        <div className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-1" />
          {commentsCount || 0} {t('comments')}
        </div>
      </div>
    </div>
  );
};

export default PostCardInteractionMetrics;
