
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Globe, 
  TrendingUp, 
  Building2, 
  Lightbulb, 
  DollarSign,
  Target,
  Shield,
  Network,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { icon: DollarSign, label: 'Investment Opportunities', value: '500+', color: 'text-green-600' },
    { icon: Building2, label: 'Startups Connected', value: '250+', color: 'text-blue-600' },
    { icon: Globe, label: 'Countries Represented', value: '35+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '89%', color: 'text-orange-600' },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'Investment Q&A Forum',
      description: 'Connect with investors and entrepreneurs to discuss opportunities, ask questions, and share insights about the Syrian market.'
    },
    {
      icon: Network,
      title: 'Startup Networking',
      description: 'Build meaningful connections between Syrian entrepreneurs and international investors looking for emerging market opportunities.'
    },
    {
      icon: Shield,
      title: 'Verified Expertise',
      description: 'Access verified legal experts, investment advisors, and successful entrepreneurs who understand the Syrian business landscape.'
    },
    {
      icon: Target,
      title: 'Market Intelligence',
      description: 'Stay updated with the latest news, regulations, and opportunities in Syria\'s growing technology and business sectors.'
    }
  ];

  const investmentTypes = [
    {
      title: 'Tech Startups',
      description: 'Innovative technology companies leveraging Syria\'s talented developer community',
      opportunities: '120+ Active',
      icon: Lightbulb
    },
    {
      title: 'Digital Products',
      description: 'Software solutions, mobile apps, and digital services with global potential',
      opportunities: '85+ Projects',
      icon: Globe
    },
    {
      title: 'Manufacturing',
      description: 'Traditional industries modernizing with technology and seeking growth capital',
      opportunities: '60+ Companies',
      icon: Building2
    }
  ];

  const benefits = [
    'Direct access to Syrian entrepreneurs and business opportunities',
    'Legal guidance for international investment in Syria',
    'Market insights from local experts and successful investors',
    'Networking with verified business professionals',
    'Due diligence support and risk assessment',
    'Cultural bridge between international and local business practices'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-inspire text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-syrian-green/20 to-syrian-red/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🇸🇾 Connecting Syria with Global Investment
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Unlock Syria's
              <span className="block text-yellow-300">Investment Potential</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-4xl mx-auto leading-relaxed">
              The premier platform connecting international investors with Syrian entrepreneurs, 
              startups, and digital innovation opportunities
            </p>
            <p className="text-lg mb-8 text-yellow-200 font-medium">
              {t('platformTagline', 'Where Global Capital Meets Syrian Innovation')}
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-white text-syrian-green hover:bg-gray-100 font-semibold shadow-lg px-8">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Start Investing
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-syrian-green font-semibold px-8">
                  <Building2 className="w-5 h-5 mr-2" />
                  List Your Startup
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment Opportunities in Syria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover high-potential investment opportunities across various sectors in Syria's emerging economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investmentTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-syrian-green">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-syrian-green/10 rounded-lg">
                      <type.icon className="w-6 h-6 text-syrian-green" />
                    </div>
                    <Badge variant="outline" className="text-syrian-green border-syrian-green">
                      {type.opportunities}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <Button variant="outline" className="w-full border-syrian-green text-syrian-green hover:bg-syrian-green hover:text-white">
                    Explore Opportunities
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Connect Investors & Entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides the tools and community you need to make informed investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="p-3 bg-gradient-inspire rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose SyriaTech Rise for Your Investment Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We bridge the gap between international capital and Syrian innovation, 
                providing transparency, expertise, and community support every step of the way.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-syrian-green/5 to-syrian-red/5 border-syrian-green/20">
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-syrian-green mb-2">$50M+</div>
                    <div className="text-gray-600 mb-6">Total Investment Facilitated</div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-syrian-red">150+</div>
                        <div className="text-sm text-gray-600">Successful Deals</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-syrian-red">25+</div>
                        <div className="text-sm text-gray-600">Countries</div>
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
      <section className="py-20 bg-gradient-inspire text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Syria's Next Big Opportunity?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of investors and entrepreneurs who are already building the future of Syrian business
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-syrian-green hover:bg-gray-100 font-semibold px-8">
                <Users className="w-5 h-5 mr-2" />
                Join as Investor
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-syrian-green font-semibold px-8">
                <Lightbulb className="w-5 h-5 mr-2" />
                Join as Entrepreneur
              </Button>
            </div>
          ) : (
            <Button size="lg" className="bg-white text-syrian-green hover:bg-gray-100 font-semibold px-8">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Networking
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
