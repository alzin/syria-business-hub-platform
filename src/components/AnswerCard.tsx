
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import CommentCard from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ThumbsUp, ThumbsDown, MessageSquare, Calendar, User, CheckCircle } from 'lucide-react';
import { Answer, Comment } from '@/types';

interface AnswerCardProps {
  answer: Answer;
  postId: string;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, postId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('comments')
        .insert({
          content,
          author_id: user.id,
          post_id: postId,
          answer_id: answer.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      setNewComment('');
      setShowCommentForm(false);
      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to post comment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  // Get comments for this answer (this would come from the parent component in a real implementation)
  const answerComments: Comment[] = []; // This should be passed as a prop

  return (
    <Card className={`${answer.verified ? 'border-green-200 bg-green-50' : ''}`}>
      <CardContent className="pt-6">
        {answer.verified && (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Verified Answer</span>
          </div>
        )}

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
        </div>

        {/* Author info and actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {answer.author.avatar ? (
                <img src={answer.author.avatar} alt={answer.author.name} className="w-10 h-10 rounded-full" />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{answer.author.name}</p>
              <div className="flex items-center space-x-2">
                <ExpertiseBadge expertise={answer.author.expertise} verified={answer.author.verified} size="sm" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{answer.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {answer.votes}
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="w-4 h-4" />
              </Button>
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommentForm(!showCommentForm)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Comment
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Comments on this answer */}
        {answerComments.length > 0 && (
          <div className="mt-6 pl-6 border-l-2 border-gray-200">
            <div className="space-y-4">
              {answerComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}

        {/* Add comment form */}
        {showCommentForm && user && (
          <div className="mt-6 pl-6 border-l-2 border-gray-200">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="flex space-x-2">
                <Button type="submit" size="sm" disabled={addCommentMutation.isPending}>
                  {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCommentForm(false);
                    setNewComment('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
