
import React from 'react';
import { MessageSquare, Calendar, TrendingUp } from 'lucide-react';

interface PostStatsProps {
  type: 'question' | 'news';
  answersCount?: number;
  commentsCount: number;
  votes: number;
  createdAt: Date;
}

const PostStats: React.FC<PostStatsProps> = ({ 
  type, 
  answersCount = 0, 
  commentsCount, 
  votes, 
  createdAt 
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <div className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span>{createdAt.toLocaleDateString()}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <TrendingUp className="w-4 h-4" />
        <span>{votes} votes</span>
      </div>
      
      {type === 'question' && (
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4" />
          <span>{answersCount} answers</span>
        </div>
      )}
      
      <div className="flex items-center space-x-1">
        <MessageSquare className="w-4 h-4" />
        <span>{commentsCount} comments</span>
      </div>
    </div>
  );
};

export default PostStats;
