import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import AnswerCard from '@/components/AnswerCard';
import CommentCard from '@/components/CommentCard';
import CommentForm from '@/components/CommentForm';
import VotingButtons from '@/components/VotingButtons';
import AuthorInfo from '@/components/AuthorInfo';
import PostStats from '@/components/PostStats';
import EditPostDialog from '@/components/EditPostDialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { ArrowLeft, MessageSquare, MoreVertical } from 'lucide-react';
import { Post, Answer, Comment, User as UserType, ExpertiseType, CategoryType } from '@/types';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newAnswer, setNewAnswer] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch post with answers and comments
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id, name, expertise, location, access_level, verified, avatar, email, created_at
          ),
          answers (
            *,
            profiles:author_id (
              id, name, expertise, location, access_level, verified, avatar, email, created_at
            )
          ),
          comments (
            *,
            profiles:author_id (
              id, name, expertise, location, access_level, verified, avatar, email, created_at
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Transform the data
      const transformedPost: Post = {
        id: data.id,
        type: data.type as 'question' | 'news',
        title: data.title,
        content: data.content,
        author: {
          id: data.profiles.id,
          email: data.profiles.email,
          name: data.profiles.name,
          expertise: data.profiles.expertise as ExpertiseType,
          location: data.profiles.location as 'syria' | 'international',
          accessLevel: data.profiles.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
          verified: data.profiles.verified,
          avatar: data.profiles.avatar,
          joinedAt: new Date(data.profiles.created_at),
        } as UserType,
        category: data.category as CategoryType,
        tags: data.tags || [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        votes: data.votes,
        answers: data.answers.map((answer: any) => ({
          id: answer.id,
          content: answer.content,
          author: {
            id: answer.profiles.id,
            email: answer.profiles.email,
            name: answer.profiles.name,
            expertise: answer.profiles.expertise as ExpertiseType,
            location: answer.profiles.location as 'syria' | 'international',
            accessLevel: answer.profiles.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
            verified: answer.verified,
            avatar: answer.profiles.avatar,
            joinedAt: new Date(answer.profiles.created_at),
          } as UserType,
          postId: answer.post_id,
          createdAt: new Date(answer.created_at),
          votes: answer.votes,
          verified: answer.verified,
        })) as Answer[],
        comments: data.comments.map((comment: any) => ({
          id: comment.id,
          content: comment.content,
          author: {
            id: comment.profiles.id,
            email: comment.profiles.email,
            name: comment.profiles.name,
            expertise: comment.profiles.expertise as ExpertiseType,
            location: comment.profiles.location as 'syria' | 'international',
            accessLevel: comment.profiles.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
            verified: comment.profiles.verified,
            avatar: comment.profiles.avatar,
            joinedAt: new Date(comment.profiles.created_at),
          } as UserType,
          postId: comment.post_id,
          answerId: comment.answer_id,
          createdAt: new Date(comment.created_at),
        })) as Comment[],
      };

      return transformedPost;
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (!user || !id) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      navigate('/');
      toast({
        title: "Post deleted!",
        description: "Your post has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addAnswerMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !id) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('answers')
        .insert({
          content,
          author_id: user.id,
          post_id: id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('loading')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Post not found</p>
              <Button className="mt-4" onClick={() => navigate('/')}>
                Go back home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const postComments = post.comments?.filter(comment => !comment.answerId) || [];
  const sortedAnswers = post.answers ? [...post.answers].sort((a, b) => {
    // Sort verified answers first, then by votes, then by date
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    if (a.votes !== b.votes) return b.votes - a.votes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) : [];

  const canEditPost = user && user.id === post.author.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Button>

        {/* Main post */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant={post.type === 'question' ? 'default' : 'secondary'}>
                  {post.type === 'question' ? 'Question' : 'News'}
                </Badge>
                <Badge variant="outline">{post.category}</Badge>
              </div>
              
              {canEditPost && (
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
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{post.title}</h1>
          </CardHeader>
          
          <CardContent>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Author info and voting */}
            <div className="flex items-center justify-between pt-4 border-t">
              <AuthorInfo author={post.author} />
              
              <div className="flex items-center space-x-4">
                <PostStats
                  type={post.type}
                  answersCount={sortedAnswers.length}
                  commentsCount={postComments.length}
                  votes={post.votes}
                  createdAt={post.createdAt}
                />
                
                <VotingButtons 
                  itemId={post.id} 
                  itemType="post" 
                  votes={post.votes}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments section */}
        {postComments.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {postComments.map((comment) => (
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
                postId={post.id}
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

        {/* Answers section (only for questions) */}
        {post.type === 'question' && (
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
                      postId={post.id}
                      comments={post.comments || []}
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
        )}

        {!user && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {post.type === 'question' 
                  ? 'Please log in to answer this question or add comments.'
                  : 'Please log in to add comments.'
                }
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      {canEditPost && (
        <EditPostDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          post={post}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {post.type}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePostMutation.mutate()}
              disabled={deletePostMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletePostMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostDetail;
