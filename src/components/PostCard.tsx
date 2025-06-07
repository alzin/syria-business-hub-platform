
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthorInfo from '@/components/AuthorInfo';
import VotingButtons from '@/components/VotingButtons';
import PostStats from '@/components/PostStats';
import PostActions from '@/components/PostActions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate(`/post/${post.id}`);
  };

  const handleViewUser = () => {
    navigate(`/user/${post.author.id}`);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Use the actual counts from the post data
  const answersCount = post.answersCount || post.answers?.length || 0;
  const commentsCount = post.commentsCount || post.comments?.length || 0;

  return (
    <PostActions post={post}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewPost}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={post.type === 'question' ? 'default' : 'secondary'}>
                {post.type === 'question' ? t('question') : t('news')}
              </Badge>
              <Badge variant="outline">{t(post.category)}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewPost(); }}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <p className="text-gray-700 text-sm line-clamp-3">
              {truncateContent(post.content)}
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Author and stats */}
          <div className="flex items-center justify-between pt-4 border-t">
            <AuthorInfo 
              author={post.author} 
              size="sm" 
              onClick={handleViewUser}
            />
            
            <div className="flex items-center space-x-4 text-sm">
              <PostStats
                type={post.type}
                answersCount={answersCount}
                commentsCount={commentsCount}
                votes={post.votes}
                createdAt={post.createdAt}
              />
              
              <div onClick={(e) => e.stopPropagation()}>
                <VotingButtons 
                  itemId={post.id} 
                  itemType="post" 
                  votes={post.votes} 
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
