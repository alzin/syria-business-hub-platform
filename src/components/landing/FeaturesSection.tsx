
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Newspaper, Shield, Network } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: HelpCircle,
      title: 'Expert Q&A Forum',
      description: 'Ask questions and get answers from verified Syrian experts across various fields including legal, technology, business, and more.'
    },
    {
      icon: Newspaper,
      title: 'Syrian News Hub',
      description: 'Stay updated with the latest news, developments, and insights about Syria from trusted sources and community members.'
    },
    {
      icon: Shield,
      title: 'Verified Expertise',
      description: 'Connect with verified professionals including lawyers, doctors, engineers, entrepreneurs, and government representatives.'
    },
    {
      icon: Network,
      title: 'Community Discussions',
      description: 'Engage in meaningful discussions about Syrian affairs, share experiences, and build connections with the diaspora.'
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Our Platform Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive hub for Syrian knowledge sharing and community discussions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="p-3 bg-gradient-inspire rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
