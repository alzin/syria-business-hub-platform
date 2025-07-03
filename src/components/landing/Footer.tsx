
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import FooterBrand from './footer/FooterBrand';
import FooterQuickLinks from './footer/FooterQuickLinks';
import FooterExpertiseAreas from './footer/FooterExpertiseAreas';
import FooterContact from './footer/FooterContact';
import FooterBottom from './footer/FooterBottom';

const Footer = () => {
  const { isRTL } = useLanguage();
  
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
            <FooterBrand socialLinks={socialLinks} />
            <FooterQuickLinks />
            <FooterExpertiseAreas />
            <FooterContact />
          </div>
        </div>

        <Separator className="bg-background/20" />

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
