import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const FooterExpertiseAreas = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const expertiseAreas = [
    'legal',
    'technology',
    'investment',
    'marketing',
    'operations'
  ];

  return (
    <div className={`animate-fade-in delay-300 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        <Globe className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-warning`} />
        {t('footer.expertiseAreas.title')}
      </h3>
      <ul className="space-y-3">
        {expertiseAreas.map((area, index) => (
          <li key={index} className={`animate-slide-in-right delay-${(index + 1) * 100}`}>
            <a
              href="#"
              className={`text-background/90 hover:text-warning transition-all duration-300 ${isRTL ? 'hover:-translate-x-1 text-right block w-full' : 'hover:translate-x-1 inline-block'}`}
            >
              {t(`footer.expertiseAreas.${area}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterExpertiseAreas;