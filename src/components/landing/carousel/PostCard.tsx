
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star } from 'lucide-react';
import { PostPreview } from './types';

interface PostCardProps {
  post: PostPreview;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useTranslation();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return t('Question');
      case 'article':
        return t('Article');
      case 'business_idea':
        return t('Business Idea');
      case 'news':
        return t('News');
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'article':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'business_idea':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'news':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const IconComponent = post.icon;
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;

  return (
    <Card className={`${post.bgColor} border-0 shadow-none h-full animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge className={getTypeBadgeColor(post.type)}>
            <IconComponent className="w-3 h-3 mr-1" />
            {getTypeLabel(post.type)}
          </Badge>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
              {post.votes}
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              {post.answers}
            </div>
          </div>
        </div>
        <CardTitle className={`text-base font-semibold ${post.textColor} leading-tight`}>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {post.content}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <img 
            src={avatarUrl}
            alt={`${post.author} avatar`}
            className="w-6 h-6 rounded-full mr-2 border border-gray-200"
            onError={(e) => {
              // Fallback to a simple colored circle if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex items-center justify-center hidden">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
          <div>
            <div className="font-medium text-gray-700">{post.author}</div>
            <div>{post.expertise}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
