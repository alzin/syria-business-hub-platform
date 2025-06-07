
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/LanguageToggle';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { Search, Plus, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm = '' }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">
                {t('appName', 'Syrian Entrepreneurs Hub')}
              </h1>
            </div>

            {/* Search Bar */}
            {onSearch && (
              <div className="flex-1 max-w-lg mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder', 'Search questions and news...')}
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    className="pl-10 pr-4"
                  />
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
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('createPost', 'Create Post')}</span>
                  </Button>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-gray-500 hover:text-gray-700"
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
        <CreatePostDialog
          open={showCreatePost}
          onOpenChange={setShowCreatePost}
        />
      )}
    </>
  );
};

export default Header;
