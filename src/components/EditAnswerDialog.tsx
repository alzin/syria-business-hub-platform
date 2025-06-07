
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Answer } from '@/types';

interface EditAnswerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  answer: Answer;
  postId: string;
}

const EditAnswerDialog: React.FC<EditAnswerDialogProps> = ({
  open,
  onOpenChange,
  answer,
  postId,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(answer.content);

  const updateAnswerMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('answers')
        .update({ content })
        .eq('id', answer.id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      onOpenChange(false);
      toast({
        title: "Answer updated!",
        description: "Your answer has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update answer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    updateAnswerMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Answer</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
            placeholder="Edit your answer..."
          />
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateAnswerMutation.isPending || !content.trim()}
            >
              {updateAnswerMutation.isPending ? 'Updating...' : 'Update Answer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnswerDialog;
