
import React from 'react';
import { MessageSquare, MessageCircle, Clock } from 'lucide-react';

interface PostStatsProps {
  type: 'question' | 'news' | 'answer';
  answersCount?: number;
  commentsCount?: number;
  createdAt: Date;
  size?: 'sm' | 'default';
}

const PostStats: React.FC<PostStatsProps> = ({
  type,
  answersCount = 0,
  commentsCount = 0,
  createdAt,
  size = 'default'
}) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className={`flex items-center space-x-3 text-gray-500 ${textSize}`}>
      {/* Answers (only for questions) */}
      {type === 'question' && (
        <div className="flex items-center space-x-1">
          <MessageSquare className={iconSize} />
          <span>{answersCount}</span>
        </div>
      )}

      {/* Comments */}
      <div className="flex items-center space-x-1">
        <MessageCircle className={iconSize} />
        <span>{commentsCount}</span>
      </div>

      {/* Time */}
      <div className="flex items-center space-x-1">
        <Clock className={iconSize} />
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default PostStats;
