
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, Clock, Users } from 'lucide-react';
import { Post } from '@/types';

interface PostCardBusinessIdeaDetailsProps {
  investmentNeeded?: Post['investmentNeeded'];
  timeline?: Post['timeline'];
  lookingForPartners?: Post['lookingForPartners'];
}

const PostCardBusinessIdeaDetails: React.FC<PostCardBusinessIdeaDetailsProps> = ({
  investmentNeeded,
  timeline,
  lookingForPartners,
}) => {
  const { t } = useTranslation();

  if (!investmentNeeded && !timeline && !lookingForPartners) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {investmentNeeded && (
          <div className="flex items-center text-purple-700">
            <DollarSign className="w-3 h-3 mr-1" />
            <span className="font-medium">{t('Investment')}:</span>
            <span className="ml-1">{investmentNeeded}</span>
          </div>
        )}
        {timeline && (
          <div className="flex items-center text-purple-700">
            <Clock className="w-3 h-3 mr-1" />
            <span className="font-medium">{t('Timeline')}:</span>
            <span className="ml-1">{timeline}</span>
          </div>
        )}
        {lookingForPartners && (
          <div className="flex items-center text-purple-700 col-span-full">
            <Users className="w-3 h-3 mr-1" />
            <span className="font-medium">{t('Looking for partners')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCardBusinessIdeaDetails;
