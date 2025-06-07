
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { HelpCircle, Newspaper, Sparkles, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onNavigateToMainPage: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigateToMainPage }) => {
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

  return (
    <>
      <section className="py-20 bg-gradient-inspire text-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-warning/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-background/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/30 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 mr-3 text-warning animate-spin" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Connect with Syrian Experts?
              </h2>
              <Sparkles className="w-8 h-8 ml-3 text-warning animate-spin" />
            </div>
            
            <p className="text-xl mb-8 text-background/90 max-w-3xl mx-auto leading-relaxed animate-slide-in-right delay-200">
              Join thousands of Syrians and friends of Syria who are sharing knowledge and building community
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
              <Button 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 hover:scale-105 font-semibold px-8 text-base transition-all duration-300 group shadow-2xl"
                onClick={handleAskQuestion}
              >
                <HelpCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Ask Your First Question
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-background text-background bg-transparent hover:bg-background hover:text-primary hover:scale-105 font-semibold px-8 text-base transition-all duration-300 group"
                onClick={onNavigateToMainPage}
              >
                <Newspaper className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Browse Community
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-background/80 animate-fade-in delay-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">250+ Verified Experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-background rounded-full animate-pulse delay-300"></div>
                <span className="text-sm font-medium">10K+ Questions Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse delay-500"></div>
                <span className="text-sm font-medium">35+ Countries Connected</span>
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

export default CTASection;
