
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/types';
import ExpertiseBadge from './ExpertiseBadge';
import { MessageCircle, ThumbsUp } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useTranslation();

  const categoryColors = {
    legal: 'bg-blue-100 text-blue-800',
    technology: 'bg-green-100 text-green-800',
    investment: 'bg-purple-100 text-purple-800',
    marketing: 'bg-orange-100 text-orange-800',
    operations: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {post.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                <ExpertiseBadge 
                  expertise={post.author.expertise} 
                  verified={post.author.verified}
                  size="sm"
                />
              </div>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`${categoryColors[post.category]} font-medium`}
          >
            {t(post.category)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {post.content}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.votes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.answers?.length || 0} {t('answers')}</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {post.type === 'question' ? '❓ Question' : '📰 News'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
