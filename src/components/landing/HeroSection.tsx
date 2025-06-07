
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { MessageSquare, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToMainPage: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToMainPage }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleAskQuestion = () => {
    if (user) {
      setShowCreateQuestion(true);
    } else {
      setShowRegister(true);
    }
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
      <section className="relative bg-gradient-inspire text-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-background/20 text-background border-background/30 hover:bg-background/30">
                🇸🇾 Connecting Syrian Voices Worldwide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Your Gateway to
                <span className="block text-warning">Syrian Knowledge</span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-background/90 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                Connect with Syrian experts, ask questions, share news, and engage in meaningful 
                discussions about Syria's present and future
              </p>
              <p className="text-lg mb-8 text-warning font-medium">
                {t('platformTagline', 'Where Syrian Expertise Meets Global Community')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:bg-background/90 font-semibold shadow-lg px-8"
                  onClick={handleAskQuestion}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask a Question
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-background text-background hover:bg-background hover:text-primary font-semibold px-8"
                  onClick={handleJoinAsExpert}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join as Expert
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/lovable-uploads/7fc2f410-23bb-4f4a-bdcf-caae0d25e3bd.png" 
                  alt="Syrian Knowledge Platform - Connect with experts worldwide"
                  className="w-full max-w-lg h-auto rounded-lg shadow-2xl bg-background/10 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Dialogs */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSwitchToLogin={handleSwitchToLogin}
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
