
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AnswerCard from '@/components/AnswerCard';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Answer, Comment, User } from '@/types';

interface PostAnswersProps {
  postId: string;
  answers: Answer[];
  comments: Comment[];
  user: User | null;
}

const PostAnswers: React.FC<PostAnswersProps> = ({
  postId,
  answers,
  comments,
  user,
}) => {
  const [newAnswer, setNewAnswer] = useState('');
  const queryClient = useQueryClient();

  const addAnswerMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !postId) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('answers')
        .insert({
          content,
          author_id: user.id,
          post_id: postId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      setNewAnswer('');
      toast({
        title: "Answer posted!",
        description: "Your answer has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to post answer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    addAnswerMutation.mutate(newAnswer);
  };

  const sortedAnswers = answers ? [...answers].sort((a, b) => {
    // Sort verified answers first, then by votes, then by date
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    if (a.votes !== b.votes) return b.votes - a.votes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) : [];

  return (
    <>
      {sortedAnswers.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {sortedAnswers.length} {sortedAnswers.length === 1 ? 'Answer' : 'Answers'}
          </h3>
          <div className="space-y-6">
            {sortedAnswers.map((answer) => (
              <AnswerCard 
                key={answer.id} 
                answer={answer} 
                postId={postId}
                comments={comments || []}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add answer form */}
      {user && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Answer</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <Textarea
                placeholder="Write your answer here..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={6}
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={addAnswerMutation.isPending || !newAnswer.trim()}
                >
                  {addAnswerMutation.isPending ? 'Posting...' : 'Post Answer'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PostAnswers;
