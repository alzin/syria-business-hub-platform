
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, DollarSign, Building2, TrendingUp } from 'lucide-react';

const WelcomeHero = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { icon: MessageSquare, label: 'Active Discussions', value: '1,200+' },
    { icon: DollarSign, label: 'Investment Ready', value: '$50M+' },
    { icon: Building2, label: 'Startups Listed', value: '250+' },
    { icon: TrendingUp, label: 'Success Rate', value: '89%' },
  ];

  return (
    <div className="bg-gradient-inspire text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-syrian-green/20 to-syrian-red/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('welcomeTitle', 'Connecting Global Investors with Syrian Innovation')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">
            {t('welcomeSubtitle', 'Discover investment opportunities, connect with entrepreneurs, and be part of Syria\'s economic renaissance')}
          </p>
          <p className="text-lg mb-8 text-yellow-200 font-medium">
            {t('platformTagline', 'Where Global Capital Meets Syrian Innovation')}
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-syrian-green hover:bg-white/90 font-semibold shadow-lg">
                <DollarSign className="w-5 h-5 mr-2" />
                {t('getStarted', 'Start Investing')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-syrian-green font-semibold">
                <Building2 className="w-5 h-5 mr-2" />
                {t('learnMore', 'List Your Startup')}
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
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
