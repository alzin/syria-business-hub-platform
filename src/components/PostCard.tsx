
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Calendar, User, ArrowRight } from 'lucide-react';
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

  const handleViewUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/${post.author.id}`);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
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
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            onClick={handleViewUser}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{post.author.name}</p>
              <ExpertiseBadge expertise={post.author.expertise} verified={post.author.verified} size="sm" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{post.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.votes}</span>
            </div>
            {post.type === 'question' && (
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.answers?.length || 0}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
