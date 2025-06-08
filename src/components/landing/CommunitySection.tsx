
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

const CommunitySection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToCommunity = () => {
    navigate('/?posts=true');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t border-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="w-8 h-8 mr-3 text-primary animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('Join the Community Discussion')}
            </h2>
            <Users className="w-8 h-8 ml-3 text-secondary animate-pulse" />
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-right delay-200">
            {t('Connect with investors and entrepreneurs in our active Q&A community')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-400">
            <Button 
              onClick={handleNavigateToCommunity}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 font-semibold px-8 text-base transition-all duration-300 group shadow-lg"
            >
              <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              {t('Browse Community Posts')}
            </Button>
            
            <div className="flex items-center space-x-6 text-muted-foreground text-sm">
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>1,200+ {t('Active Discussions')}</span>
              </div>
              <div className="flex items-center space-x-2 animate-pulse delay-300">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>250+ {t('Expert Members')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
