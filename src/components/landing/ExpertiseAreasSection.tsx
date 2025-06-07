
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Lightbulb, Building2, ArrowRight } from 'lucide-react';

interface ExpertiseAreasSectionProps {
  onNavigateToMainPage: () => void;
}

const ExpertiseAreasSection: React.FC<ExpertiseAreasSectionProps> = ({ onNavigateToMainPage }) => {
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expertise Areas & Discussions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get expert insights and engage in discussions across various topics relevant to Syria
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {area.experts}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{area.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={onNavigateToMainPage}
                >
                  Browse Questions
                  <ArrowRight className="w-4 h-4 ml-2" />
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
