
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Newspaper, Shield, Network } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: HelpCircle,
      title: 'Expert Q&A Forum',
      description: 'Ask questions and get answers from verified Syrian experts across various fields including legal, technology, business, and more.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Newspaper,
      title: 'Syrian News Hub',
      description: 'Stay updated with the latest news, developments, and insights about Syria from trusted sources and community members.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Verified Expertise',
      description: 'Connect with verified professionals including lawyers, doctors, engineers, entrepreneurs, and government representatives.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Network,
      title: 'Community Discussions',
      description: 'Engage in meaningful discussions about Syrian affairs, share experiences, and build connections with the diaspora.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted via-background to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
            How Our Platform Works
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-inspire rounded-full"></div>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            A comprehensive hub for Syrian knowledge sharing and community discussions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`text-center hover:shadow-xl hover:scale-105 transition-all duration-500 group border-0 bg-gradient-to-br from-card via-card to-muted/30 animate-fade-in delay-${(index + 1) * 100}`}
            >
              <CardContent className="p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 from-primary to-secondary"></div>
                <div className="relative z-10">
                  <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:animate-pulse group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
