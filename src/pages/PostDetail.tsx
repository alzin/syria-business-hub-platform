
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import EditPostDialog from '@/components/EditPostDialog';
import PostDetailLayout from '@/components/post-detail/PostDetailLayout';
import PostDetailHeader from '@/components/post-detail/PostDetailHeader';
import PostDetailContent from '@/components/post-detail/PostDetailContent';
import PostComments from '@/components/post-detail/PostComments';
import PostAnswers from '@/components/post-detail/PostAnswers';
import LoginPrompt from '@/components/post-detail/LoginPrompt';
import { Post, Answer, Comment, User as UserType, ExpertiseType, CategoryType } from '@/types';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
        type: data.type as 'question' | 'news' | 'article' | 'business_idea',
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
        investmentNeeded: data.investment_needed,
        timeline: data.timeline,
        lookingForPartners: data.looking_for_partners,
        contactInfo: data.contact_info,
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
      window.location.href = '/';
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

  if (isLoading) {
    return <PostDetailLayout isLoading={true}>{null}</PostDetailLayout>;
  }

  if (!post) {
    return <PostDetailLayout error="Post not found">{null}</PostDetailLayout>;
  }

  const postComments = post.comments?.filter(comment => !comment.answerId) || [];
  const canEditPost = user && user.id === post.author.id;

  return (
    <PostDetailLayout>
      {/* SyrGo Tagline */}
      <div className="mb-6 text-center">
        <p className="text-lg text-gray-600 font-medium">
          SyrGo is where Syrian professionals meet Investors and Business owners — Ask, Share, Offer.
        </p>
      </div>

      {/* Main post */}
      <Card className="mb-8">
        <CardHeader>
          <PostDetailHeader
            post={post}
            canEditPost={canEditPost}
            onEdit={() => setShowEditDialog(true)}
            onDelete={() => setShowDeleteDialog(true)}
          />
        </CardHeader>
        
        <CardContent>
          <PostDetailContent
            post={post}
            answersCount={post.answers?.length || 0}
            commentsCount={postComments.length}
          />
        </CardContent>
      </Card>

      {/* Comments section */}
      <PostComments
        comments={postComments}
        postId={post.id}
        user={user}
      />

      {/* Answers section (only for questions) */}
      {post.type === 'question' && (
        <PostAnswers
          postId={post.id}
          answers={post.answers || []}
          comments={post.comments || []}
          user={user}
        />
      )}

      {/* Login prompt for non-authenticated users */}
      {!user && (
        <LoginPrompt postType={post.type} />
      )}

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
    </PostDetailLayout>
  );
};

export default PostDetail;
