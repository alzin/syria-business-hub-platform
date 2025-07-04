import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Users, Globe, BookOpen } from 'lucide-react';

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: MessageSquare,
      value: '1,200+',
      label: t('Active Discussions'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      value: '250+',
      label: t('Syrian Experts'),
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Globe,
      value: '35+',
      label: t('Countries Connected'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: BookOpen,
      value: '500+',
      label: t('Knowledge Articles'),
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="relative py-16 md:py-20">
      {/* Clean white/dark background for maximum contrast */}
      <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Our Growing Community
          </h2>
          <p className="text-foreground/60 text-lg">
            Join thousands of Syrians sharing knowledge worldwide
          </p>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Gradient icon background */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Large, bold value */}
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  
                  {/* Clear label */}
                  <div className="text-base md:text-lg text-foreground/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;