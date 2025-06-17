
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileActionsProps {
  onBackClick: () => void;
  onViewPublicProfile: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  onBackClick,
  onViewPublicProfile
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'flex flex-col space-y-3' : `flex items-center justify-between ${isRTL ? 'space-x-reverse' : ''}`} mb-4 sm:mb-6`}>
      <Button
        variant="ghost"
        onClick={onBackClick}
        className="p-2 sm:p-3"
        size={isMobile ? "sm" : "default"}
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-1 sm:ml-2 rotate-180' : 'mr-1 sm:mr-2'}`} />
        <span className="text-sm sm:text-base">{t('back to posts')}</span>
      </Button>

      <Button
        variant="outline"
        onClick={onViewPublicProfile}
        size={isMobile ? "sm" : "default"}
        className={isMobile ? 'w-full' : ''}
      >
        <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <span className="text-sm sm:text-base">{t('viewPublicProfile')}</span>
      </Button>
    </div>
  );
};

export default ProfileActions;
