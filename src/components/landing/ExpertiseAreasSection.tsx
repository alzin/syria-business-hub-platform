
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Lightbulb, Building2, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExpertiseAreasSectionProps {
  onNavigateToMainPage: () => void;
}

const ExpertiseAreasSection: React.FC<ExpertiseAreasSectionProps> = ({ onNavigateToMainPage }) => {
  const isMobile = useIsMobile();

  const expertiseAreas = [
    {
      title: 'Legal & Compliance',
      description: 'Get guidance on Syrian laws, regulations, and legal procedures from practicing attorneys',
      experts: '45+ Legal Experts',
      icon: Shield
    },
    {
      title: 'Technology & Innovation',
      description: 'Discuss tech developments, startup ecosystem, and digital transformation in Syria',
      experts: '80+ Tech Professionals',
      icon: Lightbulb
    },
    {
      title: 'Business & Economy',
      description: 'Insights on Syrian market conditions, business opportunities, and economic developments',
      experts: '60+ Business Leaders',
      icon: Building2
    }
  ];

  return (
    <section className={`${isMobile ? 'py-12' : 'py-16 lg:py-20'} bg-background`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12 lg:mb-16'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-foreground mb-4`}>
            Expertise Areas & Discussions
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg lg:text-xl'} text-muted-foreground max-w-3xl mx-auto leading-relaxed`}>
            Get expert insights and engage in discussions across various topics relevant to Syria
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-3 gap-6 lg:gap-8'}`}>
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
              <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
                <div className={`flex items-center ${isMobile ? 'space-x-2 mb-3' : 'space-x-3 mb-4'}`}>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <area.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-primary`} />
                  </div>
                  <Badge variant="outline" className={`text-primary border-primary ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {area.experts}
                  </Badge>
                </div>
                <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-foreground`}>
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent className={isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}>
                <p className={`text-muted-foreground ${isMobile ? 'mb-3 text-sm' : 'mb-4'} leading-relaxed`}>{area.description}</p>
                <Button 
                  variant="outline" 
                  className={`w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground ${isMobile ? 'text-sm' : ''}`}
                  onClick={onNavigateToMainPage}
                  size={isMobile ? "sm" : "default"}
                >
                  Browse Questions
                  <ArrowRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ml-2`} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAreasSection;
