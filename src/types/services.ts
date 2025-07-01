
export interface UserService {
  id: string;
  userId: string;
  expertiseCategory?: string;
  expertiseSpecialization?: string;
  serviceTitle: string;
  serviceDescription?: string;
  pricingType: 'hourly' | 'fixed' | 'negotiable';
  priceRange?: string;
  availabilityStatus: 'available' | 'busy' | 'unavailable';
  deliveryTime?: string;
  requirements?: string;
  portfolioLinks: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceFormData {
  serviceTitle: string;
  serviceDescription: string;
  expertiseCategory: string;
  expertiseSpecialization: string;
  pricingType: 'hourly' | 'fixed' | 'negotiable';
  priceRange: string;
  availabilityStatus: 'available' | 'busy' | 'unavailable';
  deliveryTime: string;
  requirements: string;
  portfolioLinks: string[];
}
