export interface User {
  id: string;
  email: string;
  name: string;
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

export type ExpertiseCategoryType = 
  | 'Legal Expert' 
  | 'Investor' 
  | 'Founder' 
  | 'Government'
  | 'Business & Consulting'
  | 'Technology & Development'
  | 'Design & Creative'
  | 'Marketing & Sales'
  | 'Writing & Content Creation'
  | 'Translation & Languages'
  | 'Education & Coaching'
  | 'Administrative & Virtual Assistance'
  | 'Arts, Culture & Media'
  | 'Specialized & Niche Services';

export interface ExpertiseOption {
  category: ExpertiseCategoryType;
  specializations: string[];
  requiresSpecialization: boolean;
}

export const EXPERTISE_OPTIONS: ExpertiseOption[] = [
  {
    category: 'Legal Expert',
    specializations: [],
    requiresSpecialization: false
  },
  {
    category: 'Investor',
    specializations: [],
    requiresSpecialization: false
  },
  {
    category: 'Founder',
    specializations: [],
    requiresSpecialization: false
  },
  {
    category: 'Government',
    specializations: [],
    requiresSpecialization: false
  },
  {
    category: 'Business & Consulting',
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
    ],
    requiresSpecialization: true
  },
  {
    category: 'Technology & Development',
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
    ],
    requiresSpecialization: true
  },
  {
    category: 'Design & Creative',
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
    ],
    requiresSpecialization: true
  },
  {
    category: 'Marketing & Sales',
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
    ],
    requiresSpecialization: true
  },
  {
    category: 'Writing & Content Creation',
    specializations: [
      'Article & Blog Writing',
      'Copywriting (Web, Ads, Landing Pages)',
      'Script Writing (YouTube, Ads, Reels)',
      'Technical Writing',
      'Resume & Cover Letter Writing',
      'Grant Writing',
      'Editing & Proofreading',
      'Academic Writing',
      'LinkedIn Profile Optimization',
      'Subtitling & Captioning'
    ],
    requiresSpecialization: true
  },
  {
    category: 'Translation & Languages',
    specializations: [
      'Arabic-English Translation',
      'Kurdish-English Translation',
      'Turkish-Arabic Translation',
      'Legal & Technical Translation',
      'Interpretation (Remote or Live)',
      'Voice-over in Arabic, English, French',
      'Language Tutoring (Arabic, French, German, English)',
      'Localization for Apps & Websites',
      'Transcription Services (Audio/Video)'
    ],
    requiresSpecialization: true
  },
  {
    category: 'Education & Coaching',
    specializations: [
      'Private Tutoring (Math, Science, English…)',
      'Online Course Creation',
      'Study Abroad Consulting',
      'IELTS / TOEFL Coaching',
      'CV & Interview Prep',
      'Career Coaching',
      'Life Coaching',
      'University Application Support',
      'Educational Content Development'
    ],
    requiresSpecialization: true
  },
  {
    category: 'Administrative & Virtual Assistance',
    specializations: [
      'Virtual Assistant Services',
      'Customer Support (Email, Chat)',
      'Calendar & Task Management',
      'Travel Planning & Booking',
      'CRM Data Entry',
      'Event Planning',
      'Data Collection / Market Surveys',
      'Procurement Assistance',
      'Research Assistant Services'
    ],
    requiresSpecialization: true
  },
  {
    category: 'Arts, Culture & Media',
    specializations: [
      'Music Composition',
      'Audio Mixing & Mastering',
      'Podcast Editing',
      'Voice Acting (Arabic, English, French)',
      'Photography & Photo Editing',
      'Script Narration',
      'Cultural Consultation',
      'Arabic Calligraphy / Design',
      'Heritage Storytelling (for NGOs or campaigns)'
    ],
    requiresSpecialization: true
  },
  {
    category: 'Specialized & Niche Services',
    specializations: [
      'Real Estate Documentation',
      'Medical Translation / Medical Support',
      'NGO Proposal Writing',
      'Migration Support Services',
      'Humanitarian Aid Consulting',
      'UX Research in Arabic Markets',
      'Digital Payment Integration',
      'GIS Mapping Services',
      'Import/Export Trade Consulting',
      'Supply Chain Support',
      'Recruitment & HR Outsourcing',
      'Architecture Portfolio Building'
    ],
    requiresSpecialization: true
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
