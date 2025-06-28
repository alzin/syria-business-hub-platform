
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { LANGUAGES } from '@/utils/languageUtils';

interface LanguagesSelectorProps {
  value: string[];
  onValueChange: (languages: string[]) => void;
  placeholder?: string;
  className?: string;
  maxLanguages?: number;
}

const LanguagesSelector: React.FC<LanguagesSelectorProps> = ({
  value = [], // Default to empty array to prevent undefined issues
  onValueChange,
  placeholder = "Select languages...",
  className,
  maxLanguages = 10
}) => {
  const [open, setOpen] = React.useState(false);

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const selectedLanguages = LANGUAGES.filter(lang => safeValue.includes(lang.code));
  const availableLanguages = LANGUAGES.filter(lang => !safeValue.includes(lang.code));

  const handleSelect = (languageCode: string) => {
    if (safeValue.includes(languageCode)) {
      onValueChange(safeValue.filter(code => code !== languageCode));
    } else if (safeValue.length < maxLanguages) {
      onValueChange([...safeValue, languageCode]);
    }
  };

  const removeLanguage = (languageCode: string) => {
    onValueChange(safeValue.filter(code => code !== languageCode));
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedLanguages.length === 0 ? placeholder : `${selectedLanguages.length} language${selectedLanguages.length > 1 ? 's' : ''} selected`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search languages..." />
            <CommandEmpty>No languages found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {availableLanguages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.name}
                  onSelect={() => handleSelect(language.code)}
                  disabled={safeValue.length >= maxLanguages}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      safeValue.includes(language.code) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1">{language.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{language.nativeName}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected languages badges */}
      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedLanguages.map((language) => (
            <Badge
              key={language.code}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <span className="text-xs">{language.name}</span>
              <button
                onClick={() => removeLanguage(language.code)}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                type="button"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      {safeValue.length >= maxLanguages && (
        <p className="text-xs text-gray-500 mt-1">
          Maximum {maxLanguages} languages allowed
        </p>
      )}
    </div>
  );
};

export default LanguagesSelector;
