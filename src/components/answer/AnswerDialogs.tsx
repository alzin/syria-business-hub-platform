
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import EditAnswerDialog from '@/components/EditAnswerDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Answer } from '@/types';

interface AnswerDialogsProps {
  answer: Answer;
  postId: string;
  canEditAnswer: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  onEditDialogChange: (open: boolean) => void;
  onDeleteDialogChange: (open: boolean) => void;
}

const AnswerDialogs: React.FC<AnswerDialogsProps> = ({
  answer,
  postId,
  canEditAnswer,
  showEditDialog,
  showDeleteDialog,
  onEditDialogChange,
  onDeleteDialogChange,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteAnswerMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('id', answer.id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      onDeleteDialogChange(false);
      toast({
        title: "Answer deleted!",
        description: "Your answer has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete answer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      {/* Edit Dialog */}
      {canEditAnswer && (
        <EditAnswerDialog
          open={showEditDialog}
          onOpenChange={onEditDialogChange}
          answer={answer}
          postId={postId}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Answer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this answer? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAnswerMutation.mutate()}
              disabled={deleteAnswerMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteAnswerMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AnswerDialogs;
