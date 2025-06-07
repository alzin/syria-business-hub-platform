
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CommentCard from '@/components/CommentCard';
import CommentForm from '@/components/CommentForm';
import { MessageSquare } from 'lucide-react';
import { Comment } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface AnswerCommentsProps {
  answerId: string;
  postId: string;
  comments: Comment[];
}

const AnswerComments: React.FC<AnswerCommentsProps> = ({
  answerId,
  postId,
  comments,
}) => {
  const { user } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const answerComments = comments.filter(comment => comment.answerId === answerId);

  return (
    <>
      {/* Comments section */}
      {answerComments.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            Comments ({answerComments.length})
          </h4>
          <div className="space-y-3">
            {answerComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      {/* Add comment */}
      {user && (
        <div className="mt-4 pt-4 border-t">
          {!showCommentForm ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentForm(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Add comment
            </Button>
          ) : (
            <CommentForm
              postId={postId}
              answerId={answerId}
              onCancel={() => setShowCommentForm(false)}
              placeholder="Comment on this answer..."
            />
          )}
        </div>
      )}
    </>
  );
};

export default AnswerComments;
