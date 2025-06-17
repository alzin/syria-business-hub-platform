
import { MessageSquare, Lightbulb, Building2, Newspaper, Users } from 'lucide-react';
import { PostPreview } from './types';

export const dummyPosts: PostPreview[] = [
  {
    id: 1,
    type: 'question',
    title: 'What are the current investment opportunities in Damascus?',
    content: 'Looking for insights on the business climate and potential investment sectors in Syria...',
    author: 'Ahmad Al-Rashid',
    expertise: 'Business Consultant',
    votes: 24,
    answers: 8,
    icon: MessageSquare,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    avatarSeed: 'ahmad-rashid'
  },
  {
    id: 2,
    type: 'article',
    title: 'Understanding Syrian Labor Law: A Complete Guide',
    content: 'Comprehensive overview of employment regulations and worker rights in Syria for businesses...',
    author: 'Sarah Johnson',
    expertise: 'Legal Expert',
    votes: 45,
    answers: 12,
    icon: Lightbulb,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    avatarSeed: 'sarah-johnson'
  },
  {
    id: 3,
    type: 'business_idea',
    title: 'Tech Startup: Educational Platform for Syrian Students',
    content: 'Innovative e-learning platform connecting Syrian students with global educational resources...',
    author: 'Raj Patel',
    expertise: 'Tech Entrepreneur',
    votes: 38,
    answers: 15,
    icon: Building2,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    avatarSeed: 'raj-patel'
  },
  {
    id: 4,
    type: 'news',
    title: 'New Trade Agreements Boost Syrian Export Potential',
    content: 'Recent developments in international trade relations opening new markets for Syrian products...',
    author: 'Maria González',
    expertise: 'Economic Analyst',
    votes: 67,
    answers: 23,
    icon: Newspaper,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    avatarSeed: 'maria-gonzalez'
  },
  {
    id: 5,
    type: 'question',
    title: 'How to establish a NGO in Syria?',
    content: 'Need guidance on legal requirements and registration process for non-profit organizations...',
    author: 'James Chen',
    expertise: 'Civil Society Activist',
    votes: 19,
    answers: 6,
    icon: Users,
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    avatarSeed: 'james-chen'
  },
  {
    id: 6,
    type: 'article',
    title: 'Digital Marketing Strategies for Syrian Businesses',
    content: 'Practical guide to building online presence and reaching customers in the digital age...',
    author: 'Elena Volkov',
    expertise: 'Marketing Specialist',
    votes: 31,
    answers: 9,
    icon: Lightbulb,
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    avatarSeed: 'elena-volkov'
  }
];
