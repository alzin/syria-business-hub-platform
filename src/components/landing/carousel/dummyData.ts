
import { MessageSquare, Lightbulb, Building2, Newspaper, Users } from 'lucide-react';
import { PostPreview } from './types';

export const englishPosts: PostPreview[] = [
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
  }
];

export const arabicPosts: PostPreview[] = [
  {
    id: 4,
    type: 'news',
    title: 'اتفاقيات تجارية جديدة تعزز إمكانات التصدير السورية',
    content: 'التطورات الأخيرة في العلاقات التجارية الدولية تفتح أسواقاً جديدة للمنتجات السورية...',
    author: 'مريم الأحمد',
    expertise: 'محللة اقتصادية',
    votes: 67,
    answers: 23,
    icon: Newspaper,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    avatarSeed: 'mariam-ahmad'
  },
  {
    id: 5,
    type: 'question',
    title: 'كيفية تأسيس منظمة غير حكومية في سوريا؟',
    content: 'أحتاج إرشادات حول المتطلبات القانونية وعملية التسجيل للمنظمات غير الربحية...',
    author: 'عمر السالم',
    expertise: 'ناشط في المجتمع المدني',
    votes: 19,
    answers: 6,
    icon: Users,
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    avatarSeed: 'omar-salem'
  },
  {
    id: 6,
    type: 'article',
    title: 'استراتيجيات التسويق الرقمي للشركات السورية',
    content: 'دليل عملي لبناء الحضور الرقمي والوصول إلى العملاء في العصر الرقمي...',
    author: 'لينا الخوري',
    expertise: 'أخصائية تسويق',
    votes: 31,
    answers: 9,
    icon: Lightbulb,
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    avatarSeed: 'lina-khoury'
  }
];

// Legacy export for backward compatibility
export const dummyPosts = englishPosts;
