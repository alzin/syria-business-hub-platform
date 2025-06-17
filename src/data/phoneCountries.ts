
export interface PhoneCountry {
  name: string;
  code: string;
  dialCode: string;
  format?: string;
}

export const phoneCountries: PhoneCountry[] = [
  { name: "Afghanistan", code: "AF", dialCode: "+93" },
  { name: "Albania", code: "AL", dialCode: "+355" },
  { name: "Algeria", code: "DZ", dialCode: "+213" },
  { name: "Argentina", code: "AR", dialCode: "+54" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Austria", code: "AT", dialCode: "+43" },
  { name: "Belgium", code: "BE", dialCode: "+32" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "Denmark", code: "DK", dialCode: "+45" },
  { name: "Egypt", code: "EG", dialCode: "+20" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Iraq", code: "IQ", dialCode: "+964" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "Jordan", code: "JO", dialCode: "+962" },
  { name: "Lebanon", code: "LB", dialCode: "+961" },
  { name: "Netherlands", code: "NL", dialCode: "+31" },
  { name: "Norway", code: "NO", dialCode: "+47" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Sweden", code: "SE", dialCode: "+46" },
  { name: "Switzerland", code: "CH", dialCode: "+41" },
  { name: "Syria", code: "SY", dialCode: "+963" },
  { name: "Turkey", code: "TR", dialCode: "+90" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "United States", code: "US", dialCode: "+1" },
];

export const getCountryByName = (countryName: string): PhoneCountry | undefined => {
  return phoneCountries.find(country => country.name === countryName);
};

export const formatPhoneNumber = (phoneNumber: string, countryCode: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Basic formatting for common patterns
  if (countryCode === '+1' && digits.length >= 10) {
    // US/Canada format: (555) 123-4567
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (countryCode === '+44' && digits.length >= 10) {
    // UK format: 020 7123 4567
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  } else if (countryCode === '+49' && digits.length >= 10) {
    // Germany format: 030 12345678
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }
  
  // Default formatting: add spaces every 3-4 digits
  if (digits.length >= 6) {
    return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
  } else if (digits.length >= 3) {
    return digits.replace(/(\d{3})(\d+)/, '$1 $2');
  }
  
  return digits;
};
