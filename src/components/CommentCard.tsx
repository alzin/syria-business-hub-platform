
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorInfo from '@/components/AuthorInfo';
import { Card, CardContent } from '@/components/ui/card';
import { Comment } from '@/types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const navigate = useNavigate();

  const handleViewUser = () => {
    navigate(`/user/${comment.author.id}`);
  };

  return (
    <Card className="border-l-2 border-l-gray-200 bg-gray-50/50">
      <CardContent className="pt-4 pb-3">
        <div className="mb-3">
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <AuthorInfo 
            author={comment.author} 
            size="sm" 
            onClick={handleViewUser}
          />
          
          <div className="text-xs text-gray-500">
            {comment.createdAt.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
