
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileNotLoggedInProps {
  onGoHome: () => void;
}

const ProfileNotLoggedIn: React.FC<ProfileNotLoggedInProps> = ({ onGoHome }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <Card>
          <CardContent className="text-center py-8 sm:py-12">
            <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('userMustBeLoggedIn')}</p>
            <Button onClick={onGoHome} size={isMobile ? "sm" : "default"}>
              {t('goBackHome')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileNotLoggedIn;
