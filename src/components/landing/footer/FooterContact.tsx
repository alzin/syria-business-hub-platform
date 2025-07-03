import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const FooterContact = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const supportLinks = [
    'helpCenter',
    'communityGuidelines',
    'reportIssue'
  ];

  return (
    <div className={`animate-fade-in delay-500 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        <Mail className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-warning`} />
        {t('footer.contactSupport.title')}
      </h3>
      <ul className="space-y-3 mb-6">
        <li className={`flex items-center text-background/90 group hover:text-warning transition-colors duration-300 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
          <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-warning group-hover:animate-bounce`} />
          <a href="mailto:info@syrvest.com" className="hover:underline">
            info@syrvest.com
          </a>
        </li>
        <li className={`flex items-center text-background/90 group ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
          <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-warning group-hover:animate-bounce`} />
          <span>{t('footer.contactSupport.phone')}</span>
        </li>
        <li className={`flex items-start text-background/90 group ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
          <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} mt-1 text-warning flex-shrink-0 group-hover:animate-bounce`} />
          <span>{t('footer.contactSupport.location')}</span>
        </li>
      </ul>
      
      <div className={isRTL ? 'text-right' : ''}>
        <h4 className="font-medium mb-2 text-warning">{t('footer.support.title')}</h4>
        <ul className="space-y-2">
          {supportLinks.map((support, index) => (
            <li key={index}>
              <a
                href="#"
                className={`text-background/90 hover:text-warning transition-all duration-300 text-sm ${isRTL ? 'hover:-translate-x-1 text-right block w-full' : 'hover:translate-x-1 inline-block'}`}
              >
                {t(`footer.support.${support}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterContact;