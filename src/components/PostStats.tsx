
import React from 'react';
import { MessageSquare, MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { useVoting } from '@/hooks/useVoting';
import { useQueryClient } from '@tanstack/react-query';

interface PostStatsProps {
  type: 'question' | 'news';
  answersCount?: number;
  commentsCount?: number;
  votes: number;
  createdAt: Date;
  size?: 'sm' | 'default';
  itemId?: string;
  itemType?: 'post' | 'answer';
}

const PostStats: React.FC<PostStatsProps> = ({
  type,
  answersCount = 0,
  commentsCount = 0,
  votes,
  createdAt,
  size = 'default',
  itemId,
  itemType = 'post'
}) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const queryClient = useQueryClient();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Get fresh vote count from query cache if available
  const getFreshVoteCount = () => {
    if (!itemId) return votes;
    
    if (itemType === 'post') {
      const postData = queryClient.getQueryData(['post', itemId]);
      if (postData && typeof postData === 'object' && 'votes' in postData) {
        return postData.votes as number;
      }
      
      const postsData = queryClient.getQueryData(['posts']);
      if (Array.isArray(postsData)) {
        const post = postsData.find((p: any) => p.id === itemId);
        if (post && 'votes' in post) {
          return post.votes as number;
        }
      }
    } else if (itemType === 'answer') {
      const postData = queryClient.getQueryData(['post', itemId?.split('_')[0]]);
      if (postData && typeof postData === 'object' && 'answers' in postData) {
        const answers = postData.answers as any[];
        const answer = answers?.find((a: any) => a.id === itemId);
        if (answer && 'votes' in answer) {
          return answer.votes as number;
        }
      }
    }
    
    return votes;
  };

  const displayVotes = getFreshVoteCount();

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

      {/* Likes/Votes */}
      <div className="flex items-center space-x-1">
        <ThumbsUp className={iconSize} />
        <span>{displayVotes}</span>
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
