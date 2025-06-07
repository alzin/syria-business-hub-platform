
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    'Direct access to Syrian experts and professionals',
    'Real-time updates on Syrian news and developments',
    'Verified answers from trusted community members',
    'Multi-language support (Arabic and English)',
    'Safe space for diaspora and local discussions',
    'Educational resources about Syrian affairs'
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose SyrVest for Syrian Knowledge?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We provide a trusted platform where Syrian experts and community members 
              can share knowledge, discuss important topics, and stay connected.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground mb-6">Questions Answered</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-secondary">500+</div>
                      <div className="text-sm text-muted-foreground">News Articles</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">25+</div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
