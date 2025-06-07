
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Globe, TrendingUp } from 'lucide-react';

const WelcomeHero = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { icon: MessageSquare, label: 'Questions', value: '1,200+' },
    { icon: Users, label: 'Experts', value: '350+' },
    { icon: Globe, label: 'Countries', value: '25+' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('welcomeTitle', 'Welcome to Syrian Entrepreneurs Hub')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {t('welcomeSubtitle', 'Connect with experts, ask questions, and grow your business in Syria and beyond')}
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('getStarted', 'Get Started')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {t('learnMore', 'Learn More')}
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
