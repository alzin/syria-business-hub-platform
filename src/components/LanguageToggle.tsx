
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs uppercase font-medium">
        {language === 'en' ? 'عربي' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
