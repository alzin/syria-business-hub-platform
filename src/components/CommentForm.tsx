
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useComments } from '@/hooks/useComments';

interface CommentFormProps {
  postId: string;
  answerId?: string;
  onCancel: () => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  answerId, 
  onCancel, 
  placeholder = "Write your comment..." 
}) => {
  const [content, setContent] = useState('');
  const { addComment } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    addComment.mutate(
      { content, postId, answerId },
      {
        onSuccess: () => {
          setContent('');
          onCancel();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />
      <div className="flex space-x-2">
        <Button type="submit" disabled={addComment.isPending || !content.trim()}>
          {addComment.isPending ? 'Posting...' : 'Post Comment'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
