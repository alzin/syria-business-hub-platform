
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Users, Globe } from 'lucide-react';

const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    t('Direct access to Syrian experts and professionals'),
    t('Real-time updates on Syrian news and developments'),
    t('Verified answers from trusted community members'),
    t('Multi-language support (Arabic and English)'),
    t('Safe space for diaspora and local discussions'),
    t('Educational resources about Syrian affairs')
  ];

  const stats = [
    { icon: Users, value: '10K+', label: t('Questions Answered'), color: 'text-blue-500' },
    { icon: Globe, value: '500+', label: t('News Articles'), color: 'text-green-500' },
    { icon: TrendingUp, value: '25+', label: t('Countries'), color: 'text-purple-500' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 relative">
              {t('Why Choose Syrian Knowledge?')}
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-inspire rounded-full"></div>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('We provide a trusted platform where Syrian experts and community members can share knowledge, discuss important topics, and stay connected.')}
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 group animate-slide-in-right delay-${(index + 1) * 100}`}
                >
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-foreground group-hover:text-primary transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in delay-300">
            <Card className="p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20 hover:shadow-2xl transition-all duration-500 group">
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-inspire bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {t('Growing Fast')}
                  </div>
                  <div className="text-muted-foreground font-medium">{t('Join our thriving community')}</div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className={`text-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 group/stat animate-fade-in delay-${(index + 1) * 200}`}>
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className={`w-6 h-6 mr-2 ${stat.color} group-hover/stat:animate-bounce`} />
                        <div className="text-2xl font-bold text-foreground group-hover/stat:scale-110 transition-transform duration-300">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Floating animation elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-inspire rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
