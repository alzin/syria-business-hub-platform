
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const COMMON_LANGUAGES = [
  'Arabic', 'English', 'French', 'German', 'Spanish', 'Italian', 'Portuguese',
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Turkish', 'Persian', 'Hebrew',
  'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech',
  'Hungarian', 'Romanian', 'Bulgarian', 'Greek', 'Ukrainian', 'Hindi',
  'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Urdu', 'Thai',
  'Vietnamese', 'Indonesian', 'Malay', 'Tagalog', 'Swahili'
];

interface LanguagesSelectorProps {
  value: string[];
  onValueChange: (languages: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const LanguagesSelector: React.FC<LanguagesSelectorProps> = ({
  value = [],
  onValueChange,
  placeholder = "Select languages...",
  className
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSelect = (language: string) => {
    const currentLanguages = Array.isArray(value) ? value : [];
    
    if (currentLanguages.includes(language)) {
      onValueChange(currentLanguages.filter(l => l !== language));
    } else {
      onValueChange([...currentLanguages, language]);
    }
  };

  const handleRemove = (language: string) => {
    const currentLanguages = Array.isArray(value) ? value : [];
    onValueChange(currentLanguages.filter(l => l !== language));
  };

  const handleAddCustom = () => {
    if (searchValue.trim() && !value.includes(searchValue.trim())) {
      onValueChange([...value, searchValue.trim()]);
      setSearchValue('');
    }
  };

  const filteredLanguages = COMMON_LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(searchValue.toLowerCase()) &&
    !value.includes(lang)
  );

  const currentLanguages = Array.isArray(value) ? value : [];

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            {currentLanguages.length > 0 
              ? `${currentLanguages.length} language${currentLanguages.length > 1 ? 's' : ''} selected`
              : placeholder
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search languages..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">No languages found.</p>
                  {searchValue.trim() && (
                    <Button
                      size="sm"
                      onClick={handleAddCustom}
                      className="w-full"
                    >
                      Add "{searchValue.trim()}"
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandGroup>
                {filteredLanguages.map((language) => (
                  <CommandItem
                    key={language}
                    value={language}
                    onSelect={() => handleSelect(language)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentLanguages.includes(language) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {language}
                  </CommandItem>
                ))}
                {searchValue.trim() && !COMMON_LANGUAGES.some(lang => 
                  lang.toLowerCase() === searchValue.toLowerCase()
                ) && (
                  <CommandItem onSelect={handleAddCustom}>
                    Add "{searchValue.trim()}"
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected languages display */}
      {currentLanguages.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {currentLanguages.map((language) => (
            <Badge
              key={language}
              variant="secondary"
              className="text-xs"
            >
              {language}
              <button
                type="button"
                onClick={() => handleRemove(language)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
