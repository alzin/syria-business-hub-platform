
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AuthorInfo from '@/components/AuthorInfo';
import EditCommentDialog from '@/components/EditCommentDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { MoreVertical } from 'lucide-react';
import { Comment } from '@/types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleViewUser = () => {
    navigate(`/user/${comment.author.id}`);
  };

  const canEditComment = user && user.id === comment.author.id;

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('userMustBeLoggedIn'));

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', comment.id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', comment.postId] });
      setShowDeleteDialog(false);
      toast({
        title: t('commentDeleted'),
        description: t('commentDeletedDesc'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('failedToDelete', { item: t('comments').toLowerCase() }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
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
            
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500">
                {comment.createdAt.toLocaleDateString()}
              </div>
              
              {canEditComment && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                      {t('edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600"
                    >
                      {t('delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {canEditComment && (
        <EditCommentDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          comment={comment}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteComment')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmation', { item: t('comments').toLowerCase() })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCommentMutation.mutate()}
              disabled={deleteCommentMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteCommentMutation.isPending ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CommentCard;
