
export interface User {
  id: string;
  email: string;
  name: string;
  expertise: ExpertiseType;
  location: 'syria' | 'international';
  accessLevel: 'visitor' | 'registered' | 'premium' | 'verified';
  avatar?: string;
  verified: boolean;
  joinedAt: Date;
}

export type ExpertiseType = 'legal' | 'investor' | 'founder' | 'developer' | 'government';

export interface Post {
  id: string;
  type: 'question' | 'news';
  title: string;
  content: string;
  author: User;
  category: CategoryType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  answers?: Answer[];
  comments?: Comment[];
  votes: number;
  answersCount?: number;
  commentsCount?: number;
}

export type CategoryType = 'legal' | 'technology' | 'investment' | 'marketing' | 'operations';

export interface Answer {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  votes: number;
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

export interface GeolocationData {
  country: string;
  countryCode: string;
  inSyria: boolean;
}
