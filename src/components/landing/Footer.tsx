
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
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-inspire text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Mission */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 mr-3 text-warning" />
                <span className="text-xl font-bold">Syrian Knowledge</span>
              </div>
              <p className="text-background/90 mb-6 leading-relaxed">
                Connecting Syrian experts worldwide to share knowledge, answer questions, 
                and build a stronger community for Syria's future.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:bg-background/20 text-background">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-background/20 text-background">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-background/20 text-background">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-background/20 text-background">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Join as Expert
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Browse Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Expertise Areas</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    Legal & Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    Investment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/90 hover:text-warning transition-colors">
                    Operations
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-background/90">
                  <Mail className="w-4 h-4 mr-2 text-warning" />
                  <a href="mailto:hello@syrianknowledge.com" className="hover:text-warning transition-colors">
                    hello@syrianknowledge.com
                  </a>
                </li>
                <li className="flex items-center text-background/90">
                  <Phone className="w-4 h-4 mr-2 text-warning" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start text-background/90">
                  <MapPin className="w-4 h-4 mr-2 mt-1 text-warning flex-shrink-0" />
                  <span>Serving the global Syrian community</span>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-background/90 hover:text-warning transition-colors text-sm">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-background/90 hover:text-warning transition-colors text-sm">
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-background/90 hover:text-warning transition-colors text-sm">
                      Report Issue
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/90 text-sm mb-4 md:mb-0">
              © {currentYear} Syrian Knowledge Platform. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-background/90 hover:text-warning transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/90 hover:text-warning transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/90 hover:text-warning transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-background/90 hover:text-warning transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
