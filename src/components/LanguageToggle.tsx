
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-1"
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs uppercase">
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
