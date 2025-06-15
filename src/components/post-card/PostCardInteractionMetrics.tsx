
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { Post } from '@/types';
import VotingButtons from '@/components/VotingButtons';

interface PostCardInteractionMetricsProps {
  type: Post['type'];
  votes: number;
  answersCount?: number;
  commentsCount?: number;
  postId: string;
  authorId: string;
}

const PostCardInteractionMetrics: React.FC<PostCardInteractionMetricsProps> = ({
  type,
  votes,
  answersCount,
  commentsCount,
  postId,
  authorId,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <VotingButtons
            itemId={postId}
            itemType="post"
            votes={votes}
            authorId={authorId}
            size="sm"
          />
          <span className="ml-1">{votes}</span>
        </div>
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
