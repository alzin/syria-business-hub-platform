
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Users,
  HelpCircle,
  Globe,
  Heart
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Debug logging
  console.log('Footer RTL state:', isRTL);
  console.log('Footer RTL class example:', isRTL ? 'flex-row-reverse' : '');

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/syrvest_com/?igsh=Y3I3bXJhbWc0Zm5t&utm_source=qr#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-inspire text-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-warning/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-background/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Mission */}
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
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`animate-fade-in delay-200 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <MessageSquare className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-warning`} />
                {t('footer.quickLinks.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: HelpCircle, text: 'askQuestion' },
                  { icon: Users, text: 'joinAsExpert' },
                  { icon: MessageSquare, text: 'browseCommunity' },
                  { icon: null, text: 'aboutUs' },
                  { icon: null, text: 'howItWorks' }
                ].map((link, index) => (
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

            {/* Categories */}
            <div className={`animate-fade-in delay-300 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <Globe className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-warning`} />
                {t('footer.expertiseAreas.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'legal',
                  'technology',
                  'investment',
                  'marketing',
                  'operations'
                ].map((area, index) => (
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

            {/* Contact & Support */}
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
                  {[
                    'helpCenter',
                    'communityGuidelines',
                    'reportIssue'
                  ].map((support, index) => (
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
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-8 animate-fade-in delay-700">
          <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`text-background/90 text-sm mb-4 md:mb-0 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {t('footer.copyright', { year: currentYear })}
              <Heart className="w-4 h-4 mx-1 text-warning animate-pulse" />
              {t('footer.tagline')}
            </div>
            <div className={`flex flex-wrap gap-6 text-sm ${isRTL ? 'justify-end' : ''}`}>
              {[
                'privacyPolicy',
                'termsOfService',
                'cookiePolicy',
                'accessibility'
              ].map((policy, index) => (
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
      </div>
    </footer>
  );
};

export default Footer;
