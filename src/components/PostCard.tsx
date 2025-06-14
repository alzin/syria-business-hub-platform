
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ThumbsUp, Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/types';
import AuthorInfo from '@/components/AuthorInfo';
import ExpertiseBadge from '@/components/ExpertiseBadge';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'news':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'article':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'business_idea':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return t('question');
      case 'news':
        return t('news');
      case 'article':
        return t('Article');
      case 'business_idea':
        return t('Business Idea');
      default:
        return type;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'technology':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'investment':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'marketing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'operations':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'legal':
        return t('legal');
      case 'technology':
        return t('technology');
      case 'investment':
        return t('investment');
      case 'marketing':
        return t('marketing');
      case 'operations':
        return t('operations');
      default:
        return category;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs font-medium ${getPostTypeColor(post.type)}`}
            >
              {getPostTypeLabel(post.type)}
            </Badge>
            <Badge 
              variant="outline"
              className={`text-xs ${getCategoryColor(post.category)}`}
            >
              {getCategoryLabel(post.category)}
            </Badge>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <AuthorInfo 
            author={post.author} 
            createdAt={post.createdAt}
            showDate={false}
          />
          <div className="flex items-center space-x-1">
            <ExpertiseBadge expertise={post.author.expertise} />
            {post.author.location === 'syria' && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                <MapPin className="w-3 h-3 mr-1" />
                {t('syria')}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Business Idea specific information */}
        {post.type === 'business_idea' && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {post.investmentNeeded && (
                <div className="flex items-center text-purple-700">
                  <DollarSign className="w-3 h-3 mr-1" />
                  <span className="font-medium">{t('Investment')}:</span>
                  <span className="ml-1">{post.investmentNeeded}</span>
                </div>
              )}
              {post.timeline && (
                <div className="flex items-center text-purple-700">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="font-medium">{t('Timeline')}:</span>
                  <span className="ml-1">{post.timeline}</span>
                </div>
              )}
              {post.lookingForPartners && (
                <div className="flex items-center text-purple-700 col-span-full">
                  <Users className="w-3 h-3 mr-1" />
                  <span className="font-medium">{t('Looking for partners')}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Post stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {post.votes}
            </div>
            {post.type === 'question' && (
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.answersCount || 0} {t('answers')}
              </div>
            )}
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.commentsCount || 0} {t('comments')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
