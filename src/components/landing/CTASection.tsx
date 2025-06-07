
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { HelpCircle, Newspaper } from 'lucide-react';

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
      <section className="py-20 bg-gradient-inspire text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect with Syrian Experts?
          </h2>
          <p className="text-xl mb-8 text-background/90">
            Join thousands of Syrians and friends of Syria who are sharing knowledge and building community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90 font-semibold px-8"
              onClick={handleAskQuestion}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              <span>Ask Your First Question</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-background text-background hover:bg-background hover:text-primary font-semibold px-8"
              onClick={onNavigateToMainPage}
            >
              <Newspaper className="w-5 h-5 mr-2" />
              <span>Browse Community</span>
            </Button>
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
