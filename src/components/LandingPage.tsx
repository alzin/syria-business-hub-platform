
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import CreatePostDialog from '@/components/CreatePostDialog';
import { 
  MessageSquare, 
  Users, 
  Globe, 
  TrendingUp, 
  Building2, 
  Lightbulb, 
  BookOpen,
  HelpCircle,
  Newspaper,
  Shield,
  Network,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const stats = [
    { icon: MessageSquare, label: 'Active Discussions', value: '1,200+', color: 'text-professional-blue' },
    { icon: Users, label: 'Syrian Experts', value: '250+', color: 'text-professional-purple' },
    { icon: Globe, label: 'Countries Connected', value: '35+', color: 'text-professional-green' },
    { icon: BookOpen, label: 'Knowledge Articles', value: '500+', color: 'text-professional-orange' },
  ];

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

  const benefits = [
    'Direct access to Syrian experts and professionals',
    'Real-time updates on Syrian news and developments',
    'Verified answers from trusted community members',
    'Multi-language support (Arabic and English)',
    'Safe space for diaspora and local discussions',
    'Educational resources about Syrian affairs'
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        {/* Hero Section */}
        <section className="relative bg-gradient-inspire text-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-background/20 text-background border-background/30 hover:bg-background/30">
                  🇸🇾 Connecting Syrian Voices Worldwide
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Your Gateway to
                  <span className="block text-warning">Syrian Knowledge</span>
                </h1>
                <p className="text-xl md:text-2xl mb-4 text-background/90 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                  Connect with Syrian experts, ask questions, share news, and engage in meaningful 
                  discussions about Syria's present and future
                </p>
                <p className="text-lg mb-8 text-warning font-medium">
                  {t('platformTagline', 'Where Syrian Expertise Meets Global Community')}
                </p>
                
                {!user && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                    <Button 
                      size="lg" 
                      className="bg-background text-primary hover:bg-background/90 font-semibold shadow-lg px-8"
                      onClick={() => setShowRegister(true)}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Ask a Question
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-background text-background hover:bg-background hover:text-primary font-semibold px-8"
                      onClick={() => setShowRegister(true)}
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Join as Expert
                    </Button>
                  </div>
                )}
              </div>

              {/* Hero Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/7fc2f410-23bb-4f4a-bdcf-caae0d25e3bd.png" 
                    alt="Syrian Knowledge Platform - Connect with experts worldwide"
                    className="w-full max-w-lg h-auto rounded-lg shadow-2xl bg-background/10 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Stats */}
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
          </div>
        </section>

        {/* Expertise Areas Section */}
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
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Browse Questions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
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

        {/* Benefits Section */}
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-inspire text-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Connect with Syrian Experts?
            </h2>
            <p className="text-xl mb-8 text-background/90">
              Join thousands of Syrians and friends of Syria who are sharing knowledge and building community
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:bg-background/90 font-semibold px-8"
                  onClick={() => setShowRegister(true)}
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Ask Your First Question
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-background text-background hover:bg-background hover:text-primary font-semibold px-8"
                  onClick={() => setShowLogin(true)}
                >
                  <Newspaper className="w-5 h-5 mr-2" />
                  Share News & Insights
                </Button>
              </div>
            ) : (
              <Button 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 font-semibold px-8"
                onClick={() => setShowCreateQuestion(true)}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Discussing
              </Button>
            )}
          </div>
        </section>
      </div>

      {/* Authentication Dialogs */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* Create Question Dialog */}
      {user && (
        <CreatePostDialog
          open={showCreateQuestion}
          onOpenChange={setShowCreateQuestion}
          type="question"
        />
      )}
    </>
  );
};

export default LandingPage;
