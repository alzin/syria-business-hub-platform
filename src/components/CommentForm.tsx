
import React, { useState } from 'react';
import { useComments } from '@/hooks/useComments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface CommentFormProps {
  postId: string;
  answerId?: string;
  onCancel?: () => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  answerId, 
  onCancel, 
  placeholder = "Write a comment..." 
}) => {
  const [comment, setComment] = useState('');
  const { addComment } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment.mutate({
      content: comment,
      postId,
      answerId,
    });

    setComment('');
    if (onCancel) onCancel();
  };

  return (
    <Card className="bg-blue-50/50 border-blue-200">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder={placeholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            required
            className="resize-none"
          />
          
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={addComment.isPending || !comment.trim()}
            >
              {addComment.isPending ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
