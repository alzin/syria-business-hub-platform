import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RegisterDialog from '@/components/auth/RegisterDialog';
import LoginDialog from '@/components/auth/LoginDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import {
  MessageSquare,
  Users,
  HelpCircle
} from 'lucide-react';

const FooterQuickLinks = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);

  const handleAskQuestion = () => {
    if (user) {
      setShowCreatePostDialog(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleJoinAsExpert = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowRegisterDialog(true);
    }
  };

  const handleBrowseCommunity = () => {
    navigate('/?posts=true');
  };

  const quickLinks = [
    { icon: HelpCircle, text: 'askQuestion', action: handleAskQuestion },
    { icon: Users, text: 'joinAsExpert', action: handleJoinAsExpert },
    { icon: MessageSquare, text: 'browseCommunity', action: handleBrowseCommunity },
    { icon: null, text: 'aboutUs', action: () => navigate('/?section=about') },
    { icon: null, text: 'howItWorks', action: () => navigate('/?section=how-it-works') }
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
            <button
              onClick={link.action}
              className={`text-background/90 hover:text-warning transition-all duration-300 flex items-center group ${isRTL ? 'flex-row-reverse hover:-translate-x-1 justify-end' : 'hover:translate-x-1'} cursor-pointer bg-transparent border-none p-0`}
            >
              {link.icon && <link.icon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:animate-bounce`} />}
              {t(`footer.quickLinks.${link.text}`)}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Dialogs */}
      <RegisterDialog 
        open={showRegisterDialog} 
        onOpenChange={setShowRegisterDialog}
        onSwitchToLogin={() => {
          setShowRegisterDialog(false);
          setShowLoginDialog(true);
        }}
      />
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onSwitchToRegister={() => {
          setShowLoginDialog(false);
          setShowRegisterDialog(true);
        }}
        onSwitchToPasswordReset={() => {
          setShowLoginDialog(false);
        }}
      />
      <CreatePostDialog 
        open={showCreatePostDialog} 
        onOpenChange={setShowCreatePostDialog}
        type="question"
      />
    </div>
  );
};

export default FooterQuickLinks;