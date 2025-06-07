
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="font-medium"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
