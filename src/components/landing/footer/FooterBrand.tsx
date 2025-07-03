import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe
} from 'lucide-react';

interface FooterBrandProps {
  socialLinks: Array<{
    icon: React.ComponentType<any>;
    href: string;
    label: string;
  }>;
}

const FooterBrand: React.FC<FooterBrandProps> = ({ socialLinks }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className={`lg:col-span-1 animate-fade-in ${isRTL ? 'text-right' : ''}`}>
      <div className={`flex items-center mb-4 group ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        <Globe className={`w-8 h-8 ${isRTL ? 'ml-3' : 'mr-3'} text-warning group-hover:animate-spin transition-all duration-300`} />
        <span className="text-xl font-bold group-hover:text-warning transition-colors duration-300">
          {t('footer.brandName')}
        </span>
      </div>
      <p className="text-background/90 mb-6 leading-relaxed">
        {t('footer.mission')}
      </p>
      <div className={`flex ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse justify-end w-full' : 'space-x-4'}`}>
        {socialLinks.map((social, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`hover:bg-background/20 text-background hover:text-warning hover:scale-110 transition-all duration-300 animate-fade-in delay-${(index + 1) * 100}`}
            aria-label={t(`footer.social.${social.label.toLowerCase()}`)}
            asChild
          >
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              <social.icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FooterBrand;