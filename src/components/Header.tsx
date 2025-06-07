
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/LanguageToggle';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import Logo from '@/components/Logo';
import { Search, Plus, User, LogOut, Settings, MessageSquare, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm = '' }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local search term when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If search term is empty, navigate to posts page
    if (localSearchTerm.trim() === '') {
      navigate('/?posts=true');
    } else if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // Trigger search on every character change for real-time search
    if (onSearch) {
      onSearch(value);
    }
  };

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
              <div className="flex-1 max-w-lg mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder', 'Search questions and news...')}
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 border-border focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            )}

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />

              {user ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowCreateQuestion(true)}
                    className="flex items-center space-x-1 bg-gradient-energy hover:opacity-90"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('askQuestion', 'Ask Question')}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCreateArticle(true)}
                    className="flex items-center space-x-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('postArticle', 'Post Article')}</span>
                  </Button>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/profile')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLogin(true)}
                  >
                    {t('login')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowRegister(true)}
                  >
                    {t('register')}
                  </Button>
                </div>
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
