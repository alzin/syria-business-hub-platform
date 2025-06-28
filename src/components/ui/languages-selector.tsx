
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Common languages with their native names
const LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
];

interface LanguagesSelectorProps {
  value: string[];
  onValueChange: (languages: string[]) => void;
  placeholder?: string;
  className?: string;
  maxLanguages?: number;
}

const LanguagesSelector: React.FC<LanguagesSelectorProps> = ({
  value = [],
  onValueChange,
  placeholder = "Select languages...",
  className,
  maxLanguages = 10
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedLanguages = LANGUAGES.filter(lang => value.includes(lang.code));
  const availableLanguages = LANGUAGES.filter(lang => !value.includes(lang.code));

  const handleSelect = (languageCode: string) => {
    if (value.includes(languageCode)) {
      onValueChange(value.filter(code => code !== languageCode));
    } else if (value.length < maxLanguages) {
      onValueChange([...value, languageCode]);
    }
  };

  const removeLanguage = (languageCode: string) => {
    onValueChange(value.filter(code => code !== languageCode));
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
                  disabled={value.length >= maxLanguages}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(language.code) ? "opacity-100" : "opacity-0"
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
      
      {value.length >= maxLanguages && (
        <p className="text-xs text-gray-500 mt-1">
          Maximum {maxLanguages} languages allowed
        </p>
      )}
    </div>
  );
};

export default LanguagesSelector;
