
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Globe, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const StatsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const stats = [
    { 
      icon: MessageSquare, 
      label: t('Active Discussions'), 
      value: '1,200+', 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      delay: 'delay-100'
    },
    { 
      icon: Users, 
      label: t('Syrian Experts'), 
      value: '250+', 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      delay: 'delay-200'
    },
    { 
      icon: Globe, 
      label: t('Countries Connected'), 
      value: '35+', 
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      delay: 'delay-300'
    },
    { 
      icon: BookOpen, 
      label: t('Knowledge Articles'), 
      value: '500+', 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      delay: 'delay-500'
    },
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6'} mt-12 sm:mt-16`}>
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`bg-background/15 border-background/30 backdrop-blur-sm hover:bg-background/25 hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in ${stat.delay}`}
        >
          <CardContent className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'} text-center relative overflow-hidden`}>
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <stat.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-8 sm:h-8'} mx-auto ${isMobile ? 'mb-2' : 'mb-3'} ${stat.color} group-hover:animate-bounce transition-colors duration-300`} />
              <div className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold text-background ${isMobile ? 'mb-0.5' : 'mb-1'} group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className={`text-background/80 ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
