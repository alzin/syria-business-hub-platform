
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import Logo from '@/components/Logo';
import SearchBar from '@/components/header/SearchBar';
import UserActions from '@/components/header/UserActions';
import AuthButtons from '@/components/header/AuthButtons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm = '' }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <Logo className="w-8 h-8" />
              <h1 className="text-xl font-bold bg-gradient-inspire bg-clip-text text-transparent">
                {t('appName', 'SyrVest')}
              </h1>
            </div>

            {/* Search Bar */}
            {onSearch && (
              <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
            )}

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />

              {user ? (
                <UserActions 
                  onCreateQuestion={() => setShowCreateQuestion(true)}
                  onCreateArticle={() => setShowCreateArticle(true)}
                />
              ) : (
                <AuthButtons 
                  onLogin={() => setShowLogin(true)}
                  onRegister={() => setShowRegister(true)}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dialogs */}
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

      {user && (
        <>
          <CreatePostDialog
            open={showCreateQuestion}
            onOpenChange={setShowCreateQuestion}
            type="question"
          />

          <CreatePostDialog
            open={showCreateArticle}
            onOpenChange={setShowCreateArticle}
            type="news"
          />
        </>
      )}
    </>
  );
};

export default Header;
