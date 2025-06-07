
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LanguageToggle from './LanguageToggle';
import ExpertiseBadge from './ExpertiseBadge';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';

const Header = () => {
  const { t } = useTranslation();
  const { user, logout, geolocation } = useAuth();
  const { isRTL } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('platformName')}
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className={`hidden md:flex space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                {t('home')}
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                {t('questions')}
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                {t('news')}
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                {t('experts')}
              </Button>
            </nav>

            {/* Right side */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <LanguageToggle />
              
              {/* Location indicator */}
              {geolocation && (
                <div className="text-sm text-gray-600">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    geolocation.inSyria ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  {geolocation.country}
                </div>
              )}

              {user ? (
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <ExpertiseBadge 
                    expertise={user.expertise} 
                    verified={user.verified}
                    size="sm"
                  />
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    {t('logout')}
                  </Button>
                </div>
              ) : (
                <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                    {t('login')}
                  </Button>
                  <Button size="sm" onClick={() => setShowRegister(true)}>
                    {t('register')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginDialog 
        open={showLogin} 
        onOpenChange={setShowLogin}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      
      <RegisterDialog 
        open={showRegister} 
        onOpenChange={setShowRegister}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default Header;
