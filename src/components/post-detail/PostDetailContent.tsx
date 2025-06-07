
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import AuthorInfo from '@/components/AuthorInfo';
import PostStats from '@/components/PostStats';
import VotingButtons from '@/components/VotingButtons';
import { Post } from '@/types';

interface PostDetailContentProps {
  post: Post;
  answersCount: number;
  commentsCount: number;
}

const PostDetailContent: React.FC<PostDetailContentProps> = ({
  post,
  answersCount,
  commentsCount,
}) => {
  const queryClient = useQueryClient();

  // Get fresh vote count from query cache
  const getFreshVoteCount = () => {
    const postData = queryClient.getQueryData(['post', post.id]);
    if (postData && typeof postData === 'object' && 'votes' in postData) {
      return postData.votes as number;
    }
    return post.votes;
  };

  const currentVotes = getFreshVoteCount();

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">{post.title}</h1>
      
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
            answersCount={answersCount}
            commentsCount={commentsCount}
            votes={currentVotes}
            createdAt={post.createdAt}
          />
          
          <VotingButtons 
            itemId={post.id} 
            itemType="post" 
            votes={currentVotes}
            authorId={post.author.id}
          />
        </div>
      </div>
    </>
  );
};

export default PostDetailContent;
