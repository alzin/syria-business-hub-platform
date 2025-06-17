
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Lightbulb, Building2, Newspaper, Users, Star } from 'lucide-react';

interface PostPreview {
  id: number;
  type: 'question' | 'article' | 'business_idea' | 'news';
  title: string;
  content: string;
  author: string;
  expertise: string;
  votes: number;
  answers: number;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
}

const HeroCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const dummyPosts: PostPreview[] = [
    {
      id: 1,
      type: 'question',
      title: 'What are the current investment opportunities in Damascus?',
      content: 'Looking for insights on the business climate and potential investment sectors in Syria...',
      author: 'Ahmad Al-Rashid',
      expertise: 'Business Consultant',
      votes: 24,
      answers: 8,
      icon: MessageSquare,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 2,
      type: 'article',
      title: 'Understanding Syrian Labor Law: A Complete Guide',
      content: 'Comprehensive overview of employment regulations and worker rights in Syria for businesses...',
      author: 'Layla Mahmoud',
      expertise: 'Legal Expert',
      votes: 45,
      answers: 12,
      icon: Lightbulb,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 3,
      type: 'business_idea',
      title: 'Tech Startup: Educational Platform for Syrian Students',
      content: 'Innovative e-learning platform connecting Syrian students with global educational resources...',
      author: 'Omar Khoury',
      expertise: 'Tech Entrepreneur',
      votes: 38,
      answers: 15,
      icon: Building2,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      id: 4,
      type: 'news',
      title: 'New Trade Agreements Boost Syrian Export Potential',
      content: 'Recent developments in international trade relations opening new markets for Syrian products...',
      author: 'Fatima Al-Zahra',
      expertise: 'Economic Analyst',
      votes: 67,
      answers: 23,
      icon: Newspaper,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      id: 5,
      type: 'question',
      title: 'How to establish a NGO in Syria?',
      content: 'Need guidance on legal requirements and registration process for non-profit organizations...',
      author: 'Nour Hassan',
      expertise: 'Civil Society Activist',
      votes: 19,
      answers: 6,
      icon: Users,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    },
    {
      id: 6,
      type: 'article',
      title: 'Digital Marketing Strategies for Syrian Businesses',
      content: 'Practical guide to building online presence and reaching customers in the digital age...',
      author: 'Rami Saleh',
      expertise: 'Marketing Specialist',
      votes: 31,
      answers: 9,
      icon: Lightbulb,
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyPosts.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [dummyPosts.length]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return t('Question');
      case 'article':
        return t('Article');
      case 'business_idea':
        return t('Business Idea');
      case 'news':
        return t('News');
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'article':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'business_idea':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'news':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative w-full max-w-lg h-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-background/10 backdrop-blur-sm border border-background/20">
        <div 
          className="flex flex-col transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {dummyPosts.map((post, index) => {
            const IconComponent = post.icon;
            return (
              <div key={post.id} className="w-full flex-shrink-0 min-h-[280px]">
                <Card className={`${post.bgColor} border-0 shadow-none h-full`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTypeBadgeColor(post.type)}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {getTypeLabel(post.type)}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                          {post.votes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {post.answers}
                        </div>
                      </div>
                    </div>
                    <CardTitle className={`text-base font-semibold ${post.textColor} leading-tight`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">{post.author}</div>
                        <div>{post.expertise}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {dummyPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-background/80 w-6' 
                : 'bg-background/40 hover:bg-background/60'
            }`}
          />
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-2 text-center text-xs text-background/60">
        {currentIndex + 1} / {dummyPosts.length}
      </div>
    </div>
  );
};

export default HeroCarousel;
