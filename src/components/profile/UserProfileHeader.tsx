
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
      <CardHeader className="p-4 sm:p-6">
        <div className={`flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 ${horizontalSpacing}`}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
            ) : (
              <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left w-full">
            <div className={`flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 ${horizontalSpacing}`}>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              {userProfile.verified && (
                <span className="text-blue-500 text-sm">✓ {t('verified')}</span>
              )}
            </div>
            
            <div className={`flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 ${horizontalSpacing}`}>
              <ExpertiseBadge expertise={userProfile.expertise} verified={userProfile.verified} />
              <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                <MapPin className="w-4 h-4" />
                <span>{userProfile.location}</span>
              </div>
              <div className={`flex items-center space-x-1 text-sm text-gray-500 ${horizontalSpacing}`}>
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{t('joined')} {userProfile.joinedAt.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="text-center sm:text-left">
                <span className="font-medium">{userPostsLength}</span>
                <span className="block sm:inline sm:ml-1">{t('posts')}</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-medium">{questionsLength}</span>
                <span className="block sm:inline sm:ml-1">{t('questions')}</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-medium">{newsLength}</span>
                <span className="block sm:inline sm:ml-1">{t('news')}</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-medium">{articlesLength}</span>
                <span className="block sm:inline sm:ml-1">{t('articles')}</span>
              </div>
              <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                <span className="font-medium">{businessIdeasLength}</span>
                <span className="block sm:inline sm:ml-1">{t('ideas')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserProfileHeader;
