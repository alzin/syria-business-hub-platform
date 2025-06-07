
import React from 'react';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Calendar, User } from 'lucide-react';
import { Comment } from '@/types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          {comment.author.avatar ? (
            <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-4 h-4 text-gray-500" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <p className="font-medium text-gray-900 text-sm">{comment.author.name}</p>
            <ExpertiseBadge expertise={comment.author.expertise} verified={comment.author.verified} size="sm" />
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{comment.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
