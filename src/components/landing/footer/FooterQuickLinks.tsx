import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  MessageSquare,
  Users,
  HelpCircle
} from 'lucide-react';

const FooterQuickLinks = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const quickLinks = [
    { icon: HelpCircle, text: 'askQuestion' },
    { icon: Users, text: 'joinAsExpert' },
    { icon: MessageSquare, text: 'browseCommunity' },
    { icon: null, text: 'aboutUs' },
    { icon: null, text: 'howItWorks' }
  ];

  return (
    <div className={`animate-fade-in delay-200 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        <MessageSquare className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-warning`} />
        {t('footer.quickLinks.title')}
      </h3>
      <ul className="space-y-3">
        {quickLinks.map((link, index) => (
          <li key={index} className={`animate-slide-in-right delay-${(index + 1) * 100}`}>
            <a
              href="#"
              className={`text-background/90 hover:text-warning transition-all duration-300 flex items-center group ${isRTL ? 'flex-row-reverse hover:-translate-x-1 justify-end' : 'hover:translate-x-1'}`}
            >
              {link.icon && <link.icon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:animate-bounce`} />}
              {t(`footer.quickLinks.${link.text}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterQuickLinks;