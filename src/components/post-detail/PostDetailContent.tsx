import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, DollarSign, Clock, Users, Mail } from 'lucide-react';
import { Post } from '@/types';
import SanitizedContent from '@/components/SanitizedContent';

interface PostDetailContentProps {
  post: Post;
  answersCount: number;
  commentsCount: number;
}

const PostDetailContent: React.FC<PostDetailContentProps> = ({ post, answersCount, commentsCount }) => {
  const { t } = useTranslation();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business_idea':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'business_economic':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'technology':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'design_creative':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'marketing_sales':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'content_creation':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'languages':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'education':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'art':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'legal':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'business_idea':
        return 'Business Idea';
      case 'business_economic':
        return 'Business & Economic';
      case 'technology':
        return 'Technology';
      case 'design_creative':
        return 'Design & Creative';
      case 'marketing_sales':
        return 'Marketing & Sales';
      case 'content_creation':
        return 'Content Creation';
      case 'languages':
        return 'Languages';
      case 'education':
        return 'Education';
      case 'art':
        return 'Art';
      case 'legal':
        return 'Legal';
      default:
        return category;
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <Badge 
          variant="outline"
          className={`text-sm ${getCategoryColor(post.category)}`}
        >
          {getCategoryLabel(post.category)}
        </Badge>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        <SanitizedContent
          html={post.content}
          className="whitespace-pre-wrap text-gray-700 leading-relaxed"
        />
      </div>

      {/* Business Idea specific information */}
      {post.type === 'business_idea' && (
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">{t('Business Details')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.investmentNeeded && (
              <div className="flex items-center text-purple-700">
                <DollarSign className="w-4 h-4 mr-2" />
                <div>
                  <span className="font-medium">{t('Investment Needed')}:</span>
                  <p className="text-sm">{post.investmentNeeded}</p>
                </div>
              </div>
            )}
            {post.timeline && (
              <div className="flex items-center text-purple-700">
                <Clock className="w-4 h-4 mr-2" />
                <div>
                  <span className="font-medium">{t('Timeline')}:</span>
                  <p className="text-sm">{post.timeline}</p>
                </div>
              </div>
            )}
            {post.lookingForPartners && (
              <div className="flex items-center text-purple-700 md:col-span-2">
                <Users className="w-4 h-4 mr-2" />
                <span className="font-medium">{t('Looking for business partners')}</span>
              </div>
            )}
            {post.contactInfo && post.lookingForPartners && (
              <div className="flex items-center text-purple-700 md:col-span-2">
                <Mail className="w-4 h-4 mr-2" />
                <div>
                  <span className="font-medium">{t('Contact Information')}:</span>
                  <p className="text-sm">{post.contactInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('tags')}</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}


      {/* Stats */}
      <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
        {post.type === 'question' && (
          <div className="flex items-center text-gray-600">
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>{answersCount} {t('answers')}</span>
          </div>
        )}
        <div className="flex items-center text-gray-600">
          <MessageCircle className="w-4 h-4 mr-2" />
          <span>{commentsCount} {t('comments')}</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailContent;
