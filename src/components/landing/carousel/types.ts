
import { LucideIcon } from 'lucide-react';

export interface PostPreview {
  id: number;
  type: 'question' | 'article' | 'business_idea' | 'news';
  title: string;
  content: string;
  author: string;
  expertise: string;
  votes: number;
  answers: number;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  avatarSeed: string;
}
