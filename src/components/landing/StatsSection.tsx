
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Globe, BookOpen } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { 
      icon: MessageSquare, 
      label: 'Active Discussions', 
      value: '1,200+', 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      delay: 'delay-100'
    },
    { 
      icon: Users, 
      label: 'Syrian Experts', 
      value: '250+', 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      delay: 'delay-200'
    },
    { 
      icon: Globe, 
      label: 'Countries Connected', 
      value: '35+', 
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      delay: 'delay-300'
    },
    { 
      icon: BookOpen, 
      label: 'Knowledge Articles', 
      value: '500+', 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      delay: 'delay-500'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`bg-background/15 border-background/30 backdrop-blur-sm hover:bg-background/25 hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in ${stat.delay}`}
        >
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:animate-bounce transition-colors duration-300`} />
              <div className="text-2xl font-bold text-background mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-background/80 text-sm font-medium">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
