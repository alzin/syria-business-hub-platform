
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import AuthorInfo from '@/components/AuthorInfo';
import VotingButtons from '@/components/VotingButtons';
import PostStats from '@/components/PostStats';
import PostActions from '@/components/PostActions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const handleViewPost = () => {
    navigate(`/post/${post.id}`);
  };

  const handleViewUser = () => {
    navigate(`/user/${post.author.id}`);
  };

  const truncateContent = (content: string, maxLength: number = isMobile ? 120 : 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Get fresh vote count from query cache
  const getFreshVoteCount = () => {
    const postData = queryClient.getQueryData(['post', post.id]);
    if (postData && typeof postData === 'object' && 'votes' in postData) {
      return postData.votes as number;
    }
    
    const postsData = queryClient.getQueryData(['posts']);
    if (Array.isArray(postsData)) {
      const cachedPost = postsData.find((p: any) => p.id === post.id);
      if (cachedPost && 'votes' in cachedPost) {
        return cachedPost.votes as number;
      }
    }
    
    return post.votes;
  };

  // Use the actual counts from the post data
  const answersCount = post.answersCount || post.answers?.length || 0;
  const commentsCount = post.commentsCount || post.comments?.length || 0;
  const currentVotes = getFreshVoteCount();

  return (
    <PostActions post={post}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewPost}>
        <CardHeader className={isMobile ? 'p-3' : 'p-4 sm:p-6'}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
              <Badge 
                variant={post.type === 'question' ? 'default' : 'secondary'}
                className={isMobile ? 'text-xs px-1.5 py-0.5' : 'text-sm'}
              >
                {post.type === 'question' ? t('question') : t('news')}
              </Badge>
              <Badge 
                variant="outline" 
                className={isMobile ? 'text-xs px-1.5 py-0.5' : 'text-sm'}
              >
                {t(post.category)}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewPost(); }}>
              <ArrowRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            </Button>
          </div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-gray-900 line-clamp-2 leading-tight`}>
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className={isMobile ? 'p-3 pt-0' : 'p-4 sm:p-6 pt-0'}>
          <div className={isMobile ? 'mb-3' : 'mb-4'}>
            <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-sm'} line-clamp-3 leading-relaxed`}>
              {truncateContent(post.content)}
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={`flex flex-wrap gap-1 ${isMobile ? 'mb-3' : 'mb-4'}`}>
              {post.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > (isMobile ? 2 : 3) && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - (isMobile ? 2 : 3)} more
                </Badge>
              )}
            </div>
          )}

          {/* Author and stats */}
          <div className={`flex items-center justify-between pt-3 border-t ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <AuthorInfo 
              author={post.author} 
              size="sm" 
              onClick={handleViewUser}
            />
            
            <div className={`flex items-center ${isMobile ? 'space-x-3 text-xs' : 'space-x-4 text-sm'} ${isMobile ? 'w-full justify-between' : ''}`}>
              <PostStats
                type={post.type}
                answersCount={answersCount}
                commentsCount={commentsCount}
                votes={currentVotes}
                createdAt={post.createdAt}
              />
              
              <div onClick={(e) => e.stopPropagation()}>
                <VotingButtons 
                  itemId={post.id} 
                  itemType="post" 
                  votes={currentVotes} 
                  authorId={post.author.id}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PostActions>
  );
};

export default PostCard;
