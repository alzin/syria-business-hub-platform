
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Users, Globe, Star } from 'lucide-react';

const WelcomeHero = () => {
  const { t } = useTranslation();
  const { user, geolocation } = useAuth();

  const features = [
    {
      icon: Rocket,
      title: "Startup Support",
      description: "Get guidance for your business journey"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with verified professionals"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Syrian entrepreneurs worldwide"
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Curated insights and advice"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {t('platformName')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('platformTagline')}
          </p>
          
          {/* Access Level Indicator */}
          {geolocation && (
            <Card className="max-w-md mx-auto mb-8">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    geolocation.inSyria ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <span className="font-medium">
                    {geolocation.inSyria ? t('syrianAccess') : t('internationalAccess')}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {t('register')}
              </Button>
              <Button variant="outline" size="lg">
                {t('login')}
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
