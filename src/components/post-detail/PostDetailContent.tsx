
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, DollarSign, Clock, Users, Mail } from 'lucide-react';
import { Post } from '@/types';
import SanitizedContent from '@/components/SanitizedContent';
import { getCategoryColor, getCategoryLabelKey } from '@/constants/categories';

interface PostDetailContentProps {
  post: Post;
  answersCount: number;
  commentsCount: number;
}

const PostDetailContent: React.FC<PostDetailContentProps> = ({ post, answersCount, commentsCount }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <Badge 
          variant="outline"
          className={`text-sm ${getCategoryColor(post.category)}`}
        >
          {t(getCategoryLabelKey(post.category))}
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
