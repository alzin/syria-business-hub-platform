
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Post } from '@/types';
import AuthorInfo from '@/components/AuthorInfo';
import PostCardHeaderBadges from './post-card/PostCardHeaderBadges';
import PostCardCreationDate from './post-card/PostCardCreationDate';
import PostCardSyriaLocationBadge from './post-card/PostCardSyriaLocationBadge';
import PostCardBusinessIdeaDetails from './post-card/PostCardBusinessIdeaDetails';
import PostCardTagsList from './post-card/PostCardTagsList';
import PostCardInteractionMetrics from './post-card/PostCardInteractionMetrics';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <PostCardHeaderBadges type={post.type} category={post.category} />
          <PostCardCreationDate createdAt={post.createdAt} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <AuthorInfo 
          author={post.author} 
          createdAt={post.createdAt}
          showDate={false} 
        />

        <PostCardSyriaLocationBadge author={post.author} />
        
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.content}
        </p>

        {post.type === 'business_idea' && (
          <PostCardBusinessIdeaDetails
            investmentNeeded={post.investmentNeeded}
            timeline={post.timeline}
            lookingForPartners={post.lookingForPartners}
          />
        )}
        
        <PostCardTagsList tags={post.tags} />
        
        <PostCardInteractionMetrics
          type={post.type}
          answersCount={post.answersCount}
          commentsCount={post.commentsCount}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
