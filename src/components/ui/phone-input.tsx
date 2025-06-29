
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { phoneCountries, getCountryByName, formatPhoneNumber, type PhoneCountry } from '@/data/phoneCountries';

interface PhoneInputProps {
  value: string;
  onValueChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  selectedCountry: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onValueChange,
  countryCode,
  onCountryCodeChange,
  selectedCountry,
  placeholder = "Enter phone number",
  disabled = false,
  className,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry | undefined>();

  useEffect(() => {
    const country = getCountryByName(selectedCountry);
    if (country && country.dialCode !== countryCode) {
      setPhoneCountry(country);
      onCountryCodeChange(country.dialCode);
    }
  }, [selectedCountry, countryCode, onCountryCodeChange]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove the country code if user types it
    const cleanValue = inputValue.replace(countryCode, '').trim();
    const formattedValue = formatPhoneNumber(cleanValue, countryCode);
    onValueChange(formattedValue);
  };

  const handleCountrySelect = (country: PhoneCountry) => {
    setPhoneCountry(country);
    onCountryCodeChange(country.dialCode);
    setOpen(false);
  };

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-24 justify-between rounded-r-none border-r-0"
            disabled={disabled}
          >
            <span className="text-sm">{countryCode}</span>
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search countries..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {phoneCountries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        countryCode === country.dialCode ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex-1">{country.name}</span>
                    <span className="text-gray-500">{country.dialCode}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={handlePhoneChange}
        disabled={disabled}
        required={required}
        className="rounded-l-none"
      />
    </div>
  );
};
