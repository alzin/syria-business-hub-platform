
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Comment } from '@/types';

interface EditCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: Comment;
}

const EditCommentDialog: React.FC<EditCommentDialogProps> = ({
  open,
  onOpenChange,
  comment,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(comment.content);

  const updateCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('userMustBeLoggedIn'));

      const { error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', comment.id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', comment.postId] });
      onOpenChange(false);
      toast({
        title: t('commentUpdated'),
        description: t('commentUpdatedDesc'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('failedToUpdate', { item: t('comments').toLowerCase() }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    updateCommentMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('editComment')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
            placeholder={t('editCommentPlaceholder')}
          />
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={updateCommentMutation.isPending || !content.trim()}
            >
              {updateCommentMutation.isPending ? t('updating') : t('updateComment')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentDialog;
