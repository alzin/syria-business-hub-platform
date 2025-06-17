
import { useState, useEffect } from 'react';
import { GeolocationData } from '@/types';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);

  useEffect(() => {
    const detectGeolocation = async () => {
      // Only detect geolocation once and cache the result
      if (geolocation) return;

      try {
        console.log('Detecting geolocation...');
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const geoData: GeolocationData = {
          country: data.country_name,
          countryCode: data.country_code,
          inSyria: data.country_code === 'SY'
        };
        setGeolocation(geoData);
        console.log('Geolocation detected:', geoData);
      } catch (error) {
        console.error('Failed to detect geolocation:', error);
        setGeolocation({
          country: 'Unknown',
          countryCode: 'UN',
          inSyria: false
        });
      }
    };

    detectGeolocation();
  }, [geolocation]);

  return geolocation;
};
