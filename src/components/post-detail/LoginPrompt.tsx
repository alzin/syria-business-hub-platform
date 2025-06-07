
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LoginPromptProps {
  postType: 'question' | 'news';
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ postType }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="text-center py-8">
        <p className="text-gray-500 mb-4">
          {postType === 'question' 
            ? 'Please log in to answer this question or add comments.'
            : 'Please log in to add comments.'
          }
        </p>
        <Button onClick={() => navigate('/')}>
          Go to Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPrompt;
