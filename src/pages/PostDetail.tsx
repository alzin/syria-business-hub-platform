import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import AnswerCard from '@/components/AnswerCard';
import CommentCard from '@/components/CommentCard';
import VotingButtons from '@/components/VotingButtons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, MessageSquare, Calendar, User } from 'lucide-react';
import { Post, Answer, Comment, User as UserType, ExpertiseType, CategoryType } from '@/types';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newAnswer, setNewAnswer] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

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

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !id) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('comments')
        .insert({
          content,
          author_id: user.id,
          post_id: id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
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

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    addAnswerMutation.mutate(newAnswer);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  const handleViewUser = () => {
    if (post?.author.id) {
      navigate(`/user/${post.author.id}`);
    }
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
              <Badge variant={post.type === 'question' ? 'default' : 'secondary'}>
                {post.type === 'question' ? 'Question' : 'News'}
              </Badge>
              <Badge variant="outline">{post.category}</Badge>
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
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                onClick={handleViewUser}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <div className="flex items-center space-x-2">
                    <ExpertiseBadge expertise={post.author.expertise} verified={post.author.verified} size="sm" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
                
                <VotingButtons 
                  itemId={post.id} 
                  itemType="post" 
                  votes={post.votes}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments on post */}
        {postComments.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Comments ({postComments.length})
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {postComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add comment form */}
        {user && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              {!showCommentForm ? (
                <Button
                  variant="outline"
                  onClick={() => setShowCommentForm(true)}
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add a comment
                </Button>
              ) : (
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <Textarea
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={addCommentMutation.isPending}>
                      {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowCommentForm(false);
                        setNewComment('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Answers section */}
        {post.type === 'question' && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Answers ({sortedAnswers.length})
                </h3>
              </CardHeader>
              <CardContent>
                {sortedAnswers.length > 0 ? (
                  <div className="space-y-6">
                    {sortedAnswers.map((answer) => (
                      <AnswerCard key={answer.id} answer={answer} postId={post.id} comments={post.comments} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No answers yet. Be the first to answer this question!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Add answer form */}
            {user && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Your Answer</h3>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <Textarea
                      placeholder="Write your answer..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      rows={6}
                      required
                    />
                    <Button type="submit" disabled={addAnswerMutation.isPending}>
                      {addAnswerMutation.isPending ? 'Posting...' : 'Post Answer'}
                    </Button>
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
    </div>
  );
};

export default PostDetail;
