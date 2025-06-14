
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircleQuestion, 
  Newspaper, 
  FileText, 
  Lightbulb,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';

interface CreatePostTypeSelectorProps {
  onSelectType: (type: 'question' | 'news' | 'article' | 'business_idea') => void;
  onCancel: () => void;
}

const CreatePostTypeSelector: React.FC<CreatePostTypeSelectorProps> = ({ onSelectType, onCancel }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const postTypes = [
    {
      type: 'question' as const,
      icon: MessageCircleQuestion,
      title: t('Ask a Question'),
      description: t('Get expert advice and community insights'),
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      type: 'article' as const,
      icon: FileText,
      title: t('Write an Article'),
      description: t('Share insights, guides, and expertise'),
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      type: 'business_idea' as const,
      icon: Lightbulb,
      title: t('Propose Business Idea'),
      description: t('Share your business concept and find collaborators'),
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      features: [
        { icon: Users, label: t('Find Partners') },
        { icon: DollarSign, label: t('Investment Info') },
        { icon: Clock, label: t('Timeline') }
      ]
    },
    {
      type: 'news' as const,
      icon: Newspaper,
      title: t('Share News'),
      description: t('Post updates and news relevant to the community'),
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('What would you like to create?')}
        </h2>
        <p className="text-gray-600">
          {t('Choose the type of content you want to share with the community')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {postTypes.map((postType) => {
          const Icon = postType.icon;
          return (
            <Card 
              key={postType.type}
              className={`cursor-pointer transition-all duration-200 ${postType.color}`}
              onClick={() => onSelectType(postType.type)}
            >
              <CardHeader className="pb-3">
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg bg-white/50`}>
                    <Icon className={`w-6 h-6 ${postType.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{postType.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {postType.description}
                </CardDescription>
              </CardHeader>
              
              {postType.features && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {postType.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <Badge key={index} variant="secondary" className={`text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <FeatureIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          {feature.label}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};

export default CreatePostTypeSelector;
