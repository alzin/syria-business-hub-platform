
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
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
            <div className="lg:col-span-1 animate-fade-in">
              <div className="flex items-center mb-4 group">
                <Globe className="w-8 h-8 mr-3 text-warning group-hover:animate-spin transition-all duration-300" />
                <span className="text-xl font-bold group-hover:text-warning transition-colors duration-300">
                  Syrian Knowledge
                </span>
              </div>
              <p className="text-background/90 mb-6 leading-relaxed">
                Connecting Syrian experts worldwide to share knowledge, answer questions, 
                and build a stronger community for Syria's future.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="icon" 
                    className={`hover:bg-background/20 text-background hover:text-warning hover:scale-110 transition-all duration-300 animate-fade-in delay-${(index + 1) * 100}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in delay-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-warning" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: HelpCircle, text: 'Ask a Question' },
                  { icon: Users, text: 'Join as Expert' },
                  { icon: MessageSquare, text: 'Browse Community' },
                  { icon: null, text: 'About Us' },
                  { icon: null, text: 'How It Works' }
                ].map((link, index) => (
                  <li key={index} className={`animate-slide-in-right delay-${(index + 1) * 100}`}>
                    <a 
                      href="#" 
                      className="text-background/90 hover:text-warning transition-all duration-300 flex items-center group hover:translate-x-1"
                    >
                      {link.icon && <link.icon className="w-4 h-4 mr-2 group-hover:animate-bounce" />}
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="animate-fade-in delay-300">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-warning" />
                Expertise Areas
              </h3>
              <ul className="space-y-3">
                {[
                  'Legal & Compliance',
                  'Technology',
                  'Investment',
                  'Marketing',
                  'Operations'
                ].map((area, index) => (
                  <li key={index} className={`animate-slide-in-right delay-${(index + 1) * 100}`}>
                    <a 
                      href="#" 
                      className="text-background/90 hover:text-warning transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {area}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="animate-fade-in delay-500">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-warning" />
                Contact & Support
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-background/90 group hover:text-warning transition-colors duration-300">
                  <Mail className="w-4 h-4 mr-2 text-warning group-hover:animate-bounce" />
                  <a href="mailto:hello@syrianknowledge.com" className="hover:underline">
                    hello@syrianknowledge.com
                  </a>
                </li>
                <li className="flex items-center text-background/90 group">
                  <Phone className="w-4 h-4 mr-2 text-warning group-hover:animate-bounce" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start text-background/90 group">
                  <MapPin className="w-4 h-4 mr-2 mt-1 text-warning flex-shrink-0 group-hover:animate-bounce" />
                  <span>Serving the global Syrian community</span>
                </li>
              </ul>
              
              <div>
                <h4 className="font-medium mb-2 text-warning">Support</h4>
                <ul className="space-y-2">
                  {[
                    'Help Center',
                    'Community Guidelines',
                    'Report Issue'
                  ].map((support, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-background/90 hover:text-warning transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                      >
                        {support}
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/90 text-sm mb-4 md:mb-0 flex items-center">
              © {currentYear} Syrian Knowledge Platform. Made with 
              <Heart className="w-4 h-4 mx-1 text-warning animate-pulse" />
              for the Syrian community.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                'Privacy Policy',
                'Terms of Service', 
                'Cookie Policy',
                'Accessibility'
              ].map((policy, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-background/90 hover:text-warning transition-all duration-300 hover:scale-105"
                >
                  {policy}
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
