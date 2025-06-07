
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Globe, BookOpen } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: MessageSquare, label: 'Active Discussions', value: '1,200+', color: 'text-professional-blue' },
    { icon: Users, label: 'Syrian Experts', value: '250+', color: 'text-professional-purple' },
    { icon: Globe, label: 'Countries Connected', value: '35+', color: 'text-professional-green' },
    { icon: BookOpen, label: 'Knowledge Articles', value: '500+', color: 'text-professional-orange' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-background/10 border-background/20 backdrop-blur-sm hover:bg-background/20 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-background">{stat.value}</div>
            <div className="text-background/80 text-sm">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
