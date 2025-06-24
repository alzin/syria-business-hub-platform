export interface User {
  id: string;
  email: string;
  name: string;
  expertise: ExpertiseType;
  expertiseCategory?: string;
  expertiseSpecialization?: string;
  location: string;
  accessLevel: 'visitor' | 'registered' | 'premium' | 'verified';
  avatar?: string;
  verified: boolean;
  joinedAt: Date;
  phoneNumber?: string;
  phoneCountryCode?: string;
}

export type ExpertiseType = 'legal' | 'investor' | 'founder' | 'government' | '';

export type ExpertiseCategoryType = 'Legal Expert' | 'Investor' | 'Founder' | 'Government';

export interface ExpertiseOption {
  category: ExpertiseCategoryType;
  specializations: string[];
}

export const EXPERTISE_OPTIONS: ExpertiseOption[] = [
  {
    category: 'Legal Expert',
    specializations: [
      'Business Plan Writing',
      'Feasibility Studies',
      'Market Research & Analysis',
      'Financial Modeling',
      'Pitch Deck Preparation',
      'Legal Consulting (Contracts, Company Formation)',
      'Tax & Accounting Advisory',
      'Project Management',
      'Business Process Reengineering',
      'Risk & Internal Audit Consulting',
      'ERP System Advisory (SAP, Oracle, Zoho)'
    ]
  },
  {
    category: 'Investor',
    specializations: [
      'Website Development (HTML, WordPress, React)',
      'Mobile App Development (Android/iOS)',
      'UX/UI Design',
      'Software Engineering',
      'QA Testing & Debugging',
      'Data Entry & Web Research',
      'Tech Support / Helpdesk',
      'AI & Machine Learning Services',
      'Cybersecurity Audits',
      'Database Management (SQL, MongoDB)',
      'System Administration',
      'Blockchain & Smart Contracts Development'
    ]
  },
  {
    category: 'Founder',
    specializations: [
      'Logo & Branding Design',
      'Social Media Design',
      'Business Cards & Stationery',
      'Infographics',
      'Presentation Design (PowerPoint, Keynote)',
      'Product Mockups',
      'Animation (2D, Whiteboard, Motion Graphics)',
      'Video Editing',
      'Interior Design & 3D Rendering',
      'Fashion Design',
      'Architectural Drafting'
    ]
  },
  {
    category: 'Government',
    specializations: [
      'Digital Marketing Strategy',
      'Social Media Management',
      'SEO & SEM Services',
      'Paid Ads Management (Meta, Google)',
      'Email Marketing Campaigns',
      'Influencer Marketing',
      'Marketing Automation (Hubspot, Zoho)',
      'Affiliate Program Setup',
      'Lead Generation',
      'Sales Funnel Optimization',
      'Public Relations & Press Releases'
    ]
  }
];

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
