export interface User {
  id: string;
  email: string;
  name: string;
  expertise: ExpertiseType;
  location: string;
  accessLevel: 'visitor' | 'registered' | 'premium' | 'verified';
  avatar?: string;
  verified: boolean;
  joinedAt: Date;
  phoneNumber?: string;
  phoneCountryCode?: string;
  specialization?: string;
  industrySector?: string;
}

export type ExpertiseType = 
  | 'founder' 
  | 'legal' 
  | 'developer' 
  | 'investor' 
  | 'government'
  | 'marketing'
  | 'consultant'
  | 'researcher'
  | 'academic'
  | 'healthcare'
  | 'engineer'
  | 'designer'
  | 'sales'
  | 'operations'
  | 'finance'
  | 'hr'
  | 'student';

export interface Post {
  id: string;
  type: 'question' | 'news' | 'article' | 'business_idea';
  title: string;
  content: string;
  author: User;
  category: CategoryType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  answers?: Answer[];
  comments?: Comment[];
  answersCount?: number;
  commentsCount?: number;
  // Business idea specific fields
  investmentNeeded?: string;
  timeline?: string;
  lookingForPartners?: boolean;
  contactInfo?: string;
}

export type CategoryType = 'legal' | 'technology' | 'investment' | 'marketing' | 'operations';

export interface Answer {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  verified: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  answerId?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'comment' | 'answer';
  title: string;
  message: string;
  postId: string;
  relatedId?: string;
  read: boolean;
  createdAt: Date;
}

export interface GeolocationData {
  country: string;
  countryCode: string;
  inSyria: boolean;
}
