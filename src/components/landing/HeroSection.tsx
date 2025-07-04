import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import PasswordResetDialog from '@/components/auth/PasswordResetDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import ScrollTriggeredPosts from '@/components/landing/ScrollTriggeredPosts';
import { MessageSquare, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onNavigateToMainPage: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToMainPage }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowPasswordReset(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowPasswordReset(false);
    setShowLogin(true);
  };

  const handleSwitchToPasswordReset = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowPasswordReset(true);
  };

  const handleJoinAsExpert = () => {
    if (user) {
      onNavigateToMainPage();
    } else {
      setShowRegister(true);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-inspire text-background">
        {/* First viewport - Hero content with background */}
        <div className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image Container - Properly sized and positioned */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/lovable-uploads/background.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/80"></div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-warning/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-10 w-24 h-24 bg-background/20 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              {/* Text Content - Centered */}
              <div className={`text-center animate-fade-in`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight text-background">
                  {t('Your Gateway to')}
                  <span className="block text-warning relative mt-2">
                    <span className="relative z-10">{t('Syrian Knowledge')}</span>
                    <div className="absolute inset-0 bg-warning/20 blur-lg transform scale-110 animate-pulse"></div>
                  </span>
                </h1>
                
                <p className={`text-lg sm:text-xl md:text-2xl mb-4 text-background/90 max-w-3xl mx-auto leading-relaxed animate-slide-in-right px-4`}>
                  {t('welcomeSubtitle')}
                </p>
                
                <p className="text-base sm:text-lg mb-8 text-warning font-medium flex items-center justify-center animate-fade-in delay-300">
                  <Sparkles className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} animate-spin`} />
                  {t('platformTagline')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 animate-fade-in delay-500">
                  <Button 
                    size="lg" 
                    className="bg-background text-primary hover:bg-background/90 hover:scale-105 font-semibold shadow-2xl px-6 sm:px-8 text-base transition-all duration-300 group"
                    onClick={handleJoinAsExpert}
                  >
                    <Users className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} group-hover:animate-pulse`} />
                    {t('Join as Expert')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator - Bottom of hero */}
          <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-background/50 rounded-full p-1">
              <div className="w-2 h-3 bg-background/70 rounded-full animate-pulse mx-auto mt-1"></div>
            </div>
          </div>
        </div>

        {/* Second viewport - Scroll-triggered posts */}
        <div className="relative bg-background min-h-screen flex items-center justify-center py-10 md:py-20">
          {/* Very subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-accent/[0.02]" />
          
          {/* Optional subtle pattern */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.3' opacity='0.2'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
          
          <ScrollTriggeredPosts />
        </div>
      </section>

      {/* Authentication Dialogs */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToPasswordReset={handleSwitchToPasswordReset}
      />

      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <PasswordResetDialog
        open={showPasswordReset}
        onOpenChange={setShowPasswordReset}
        onBackToLogin={handleSwitchToLogin}
      />

      {/* Create Question Dialog */}
      {user && (
        <CreatePostDialog
          open={showCreateQuestion}
          onOpenChange={setShowCreateQuestion}
          type="question"
        />
      )}
    </>
  );
};

export default HeroSection;