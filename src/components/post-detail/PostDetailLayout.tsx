
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PostDetailLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string;
}

const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({
  children,
  isLoading,
  error,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <Card>
            <CardContent className={`text-center ${isMobile ? 'py-8' : 'py-12'}`}>
              <p className="text-gray-500">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <Card>
            <CardContent className={`text-center ${isMobile ? 'py-8' : 'py-12'}`}>
              <p className="text-gray-500 mb-4">{error}</p>
              <Button onClick={() => navigate('/')}>
                Go back home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className={`${isMobile ? 'mb-4' : 'mb-6'}`}
          size={isMobile ? "sm" : "default"}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Button>

        {children}
      </div>
    </div>
  );
};

export default PostDetailLayout;
