
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm = '' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (localSearchTerm.trim() === '') {
      navigate('/?posts=true');
    } else if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleInputClick = () => {
    navigate('/?posts=true');
  };

  return (
    <div className="flex-1 max-w-lg mx-8">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder', 'Search questions and news...')}
          value={localSearchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          className="pl-10 pr-4 border-border focus:ring-primary cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SearchBar;
