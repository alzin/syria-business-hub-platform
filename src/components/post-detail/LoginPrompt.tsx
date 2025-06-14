
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LoginPromptProps {
  postType: 'question' | 'news' | 'article' | 'business_idea';
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ postType }) => {
  const navigate = useNavigate();

  const getPromptMessage = () => {
    switch (postType) {
      case 'question':
        return 'Please log in to answer this question or add comments.';
      case 'article':
        return 'Please log in to add comments on this article.';
      case 'business_idea':
        return 'Please log in to comment on this business idea.';
      case 'news':
      default:
        return 'Please log in to add comments.';
    }
  };

  return (
    <Card>
      <CardContent className="text-center py-8">
        <p className="text-gray-500 mb-4">
          {getPromptMessage()}
        </p>
        <Button onClick={() => navigate('/')}>
          Go to Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPrompt;
