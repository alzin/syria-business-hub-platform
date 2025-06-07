
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CommentCard from '@/components/CommentCard';
import CommentForm from '@/components/CommentForm';
import { MessageSquare } from 'lucide-react';
import { Comment, User } from '@/types';

interface PostCommentsProps {
  comments: Comment[];
  postId: string;
  user: User | null;
}

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  postId,
  user,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  if (!user && comments.length === 0) {
    return null;
  }

  return (
    <>
      {/* Comments section */}
      {comments.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      {/* Add comment form */}
      {user && (
        <div className="mb-8">
          {showCommentForm ? (
            <CommentForm
              postId={postId}
              onCancel={() => setShowCommentForm(false)}
              placeholder="Add a comment to this post..."
            />
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowCommentForm(true)}
              className="w-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Comment
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default PostComments;
