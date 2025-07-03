import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

const FooterBottom = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const policyLinks = [
    'privacyPolicy',
    'termsOfService',
    'cookiePolicy',
    'accessibility'
  ];

  return (
    <div className="py-8 animate-fade-in delay-700">
      <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className={`text-background/90 text-sm mb-4 md:mb-0 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
          {t('footer.copyright', { year: currentYear })}
          <Heart className="w-4 h-4 mx-1 text-warning animate-pulse" />
          {t('footer.tagline')}
        </div>
        <div className={`flex flex-wrap gap-6 text-sm ${isRTL ? 'justify-end' : ''}`}>
          {policyLinks.map((policy, index) => (
            <a
              key={index}
              href="#"
              className="text-background/90 hover:text-warning transition-all duration-300 hover:scale-105"
            >
              {t(`footer.policies.${policy}`)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;