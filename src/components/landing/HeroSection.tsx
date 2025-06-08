
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { MessageSquare, Users, Sparkles, Globe } from 'lucide-react';

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
      <section className="relative bg-gradient-inspire text-background overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-warning/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-background/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <Badge className="mb-6 bg-warning/20 text-warning border-warning/40 hover:bg-warning/30 transition-all duration-300 animate-bounce">
                <Globe className="w-4 h-4 mr-2" />
                Connecting Syrian Voices Worldwide
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
                Your Gateway to
                <span className="block text-warning relative">
                  <span className="relative z-10">Syrian Knowledge</span>
                  <div className="absolute inset-0 bg-warning/20 blur-lg transform scale-110 animate-pulse"></div>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-4 text-background/90 max-w-4xl mx-auto lg:mx-0 leading-relaxed animate-slide-in-right">
                Connect with Syrian experts, ask questions, share news, and engage in meaningful 
                discussions about Syria's present and future
              </p>
              
              <p className="text-lg mb-8 text-warning font-medium flex items-center justify-center lg:justify-start animate-fade-in delay-300">
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                {t('platformTagline', 'Where Syrian Expertise Meets Global Community')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in delay-500">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:bg-background/90 hover:scale-105 font-semibold shadow-2xl px-8 text-base transition-all duration-300 group"
                  onClick={handleAskQuestion}
                >
                  <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Ask a Question
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-background text-background bg-transparent hover:bg-background hover:text-primary hover:scale-105 font-semibold px-8 text-base transition-all duration-300 group"
                  onClick={handleJoinAsExpert}
                >
                  <Users className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Join as Expert
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right delay-300">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-warning via-background/30 to-secondary rounded-2xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <img 
                  src="/lovable-uploads/7fc2f410-23bb-4f4a-bdcf-caae0d25e3bd.png" 
                  alt="Syrian Knowledge Platform - Connect with experts worldwide"
                  className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-500 border border-background/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-warning/20 rounded-2xl group-hover:from-primary/40 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-background/50 rounded-full p-1">
            <div className="w-2 h-3 bg-background/70 rounded-full animate-pulse"></div>
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
