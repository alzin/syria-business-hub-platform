
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader } from '@/components/ui/card';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Calendar, MapPin, User as UserIcon } from 'lucide-react';
import { User as UserType } from '@/types';

interface UserProfileHeaderProps {
  userProfile: UserType;
  userPostsLength: number;
  questionsLength: number;
  newsLength: number;
  articlesLength: number;
  businessIdeasLength: number;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  userProfile,
  userPostsLength,
  questionsLength,
  newsLength,
  articlesLength,
  businessIdeasLength
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const horizontalSpacing = isRTL ? 'space-x-reverse' : '';

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className={`flex items-start space-x-6 ${horizontalSpacing}`}>
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-24 h-24 rounded-full" />
            ) : (
              <UserIcon className="w-12 h-12 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1">
            <div className={`flex items-center space-x-3 mb-2 ${horizontalSpacing}`}>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              {userProfile.verified && (
                <span className="text-blue-500 text-sm">✓ {t('verified')}</span>
              )}
            </div>
            
            <div className={`flex items-center space-x-4 mb-4 ${horizontalSpacing}`}>
              <ExpertiseBadge expertise={userProfile.expertise} verified={userProfile.verified} />
              <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                <MapPin className="w-4 h-4" />
                <span>{userProfile.location === 'syria' ? 'Syria' : 'International'}</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                <Calendar className="w-4 h-4" />
                <span>{t('joined')} {userProfile.joinedAt.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm text-gray-600">
              <span>{userPostsLength} {t('posts')}</span>
              <span>{questionsLength} {t('questions')}</span>
              <span>{newsLength} {t('news')}</span>
              <span>{articlesLength} {t('articles')}</span>
              <span>{businessIdeasLength} {t('ideas')}</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserProfileHeader;
