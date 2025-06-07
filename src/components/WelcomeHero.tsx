
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
    <div className="bg-gradient-inspire text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-inspire-blue/20 to-inspire-purple/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('welcomeTitle', 'Empowering Syrian Entrepreneurs Worldwide')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">
            {t('welcomeSubtitle', 'Connect, collaborate, and build the future together - from Syria to the world')}
          </p>
          <p className="text-lg mb-8 text-inspire-orange font-medium">
            {t('platformTagline', 'Where Syrian Dreams Take Flight')}
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-inspire-blue hover:bg-white/90 font-semibold shadow-lg">
                {t('getStarted', 'Start Your Journey')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-inspire-blue font-semibold">
                {t('learnMore', 'Discover More')}
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-inspire-orange" />
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
