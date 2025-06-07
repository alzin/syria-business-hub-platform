
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AuthorInfo from '@/components/AuthorInfo';
import VotingButtons from '@/components/VotingButtons';
import CommentCard from '@/components/CommentCard';
import CommentForm from '@/components/CommentForm';
import EditAnswerDialog from '@/components/EditAnswerDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
import { MessageSquare, CheckCircle, MoreVertical } from 'lucide-react';
import { Answer, Comment } from '@/types';

interface AnswerCardProps {
  answer: Answer;
  postId: string;
  comments?: Comment[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, postId, comments = [] }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleViewUser = () => {
    navigate(`/user/${answer.author.id}`);
  };

  const canEditAnswer = user && user.id === answer.author.id;
  const answerComments = comments.filter(comment => comment.answerId === answer.id);

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
      setShowDeleteDialog(false);
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
      <Card className="border-l-4 border-l-blue-200">
        <CardContent className="pt-6">
          {/* Answer header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              {answer.verified && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Answer
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <VotingButtons 
                itemId={answer.id} 
                itemType="answer" 
                votes={answer.votes}
                authorId={answer.author.id}
              />
              
              {canEditAnswer && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Answer content */}
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
          </div>

          {/* Author info and stats */}
          <div className="flex items-center justify-between pt-4 border-t">
            <AuthorInfo 
              author={answer.author} 
              size="sm" 
              onClick={handleViewUser}
            />
            
            <div className="text-sm text-gray-500">
              {answer.createdAt.toLocaleDateString()}
            </div>
          </div>

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
                  answerId={answer.id}
                  onCancel={() => setShowCommentForm(false)}
                  placeholder="Comment on this answer..."
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {canEditAnswer && (
        <EditAnswerDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          answer={answer}
          postId={postId}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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

export default AnswerCard;
