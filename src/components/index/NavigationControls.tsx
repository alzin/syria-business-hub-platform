
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

interface NavigationControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: (params: Record<string, string>) => void;
  user: User | null;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ searchTerm, setSearchTerm, setSearchParams, user }) => {
  return (
    <>
      {/* Back to posts option - only show if there's a search term */}
      {searchTerm && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setSearchParams({ posts: 'true' });
              }}
              className="text-syrian-green hover:bg-syrian-green/10"
            >
              ← Back to Posts
            </Button>
          </div>
        </div>
      )}

      {/* Show back to home only for non-authenticated users when not searching */}
      {!searchTerm && !user && (
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchParams({});
                setSearchTerm('');
              }}
              className="text-syrian-green hover:bg-syrian-green/10"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationControls;
