
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // App name and branding
      appName: 'SyrVest',
      platformTagline: 'Where Syrian Expertise Meets Global Community',
      
      // Navigation
      home: 'Home',
      posts: 'Posts',
      questions: 'Questions',
      news: 'News',
      profile: 'Profile',
      settings: 'Settings',
      
      // Authentication
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      
      // Actions
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      reply: 'Reply',
      vote: 'Vote',
      share: 'Share',
      report: 'Report',
      
      // Posts and Questions
      askQuestion: 'Ask Question',
      postArticle: 'Post Article',
      title: 'Title',
      content: 'Content',
      category: 'Category',
      tags: 'Tags',
      
      // Categories
      legal: 'Legal & Compliance',
      technology: 'Technology',
      investment: 'Investment',
      marketing: 'Marketing',
      operations: 'Operations',
      
      // Search
      search: 'Search',
      searchPlaceholder: 'Search questions and news...',
      noResults: 'No results found',
      
      // Common UI
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      
      // Voting
      upvote: 'Upvote',
      downvote: 'Downvote',
      votes: 'votes',
      
      // Comments
      comments: 'Comments',
      addComment: 'Add Comment',
      
      // User Profile
      expertise: 'Expertise',
      location: 'Location',
      joinedDate: 'Joined',
      posts: 'Posts',
      answers: 'Answers',
      
      // Filters
      filterByCategory: 'Filter by Category',
      allCategories: 'All Categories',
      recent: 'Recent',
      popular: 'Popular',
      unanswered: 'Unanswered',
      
      // Messages
      welcomeMessage: 'Welcome to SyrVest',
      noPostsFound: 'No posts found',
      recentPosts: 'Recent Posts',
      
      // Landing Page
      welcomeTitle: 'Connecting Syrian Voices Worldwide',
      welcomeSubtitle: 'Connect with Syrian experts, ask questions, share news, and engage in meaningful discussions about Syria',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      
      // Errors
      invalidEmail: 'Please enter a valid email address',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      requiredField: 'This field is required',
    }
  },
  ar: {
    translation: {
      // App name and branding
      appName: 'سير فيست',
      platformTagline: 'حيث تلتقي الخبرة السورية بالمجتمع العالمي',
      
      // Navigation
      home: 'الرئيسية',
      posts: 'المنشورات',
      questions: 'الأسئلة',
      news: 'الأخبار',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      
      // Authentication
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم الكامل',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
      
      // Actions
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      reply: 'رد',
      vote: 'تصويت',
      share: 'مشاركة',
      report: 'إبلاغ',
      
      // Posts and Questions
      askQuestion: 'اطرح سؤالاً',
      postArticle: 'انشر مقالاً',
      title: 'العنوان',
      content: 'المحتوى',
      category: 'الفئة',
      tags: 'العلامات',
      
      // Categories
      legal: 'القانونية والامتثال',
      technology: 'التكنولوجيا',
      investment: 'الاستثمار',
      marketing: 'التسويق',
      operations: 'العمليات',
      
      // Search
      search: 'بحث',
      searchPlaceholder: 'ابحث في الأسئلة والأخبار...',
      noResults: 'لا توجد نتائج',
      
      // Common UI
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      warning: 'تحذير',
      info: 'معلومات',
      
      // Voting
      upvote: 'تصويت إيجابي',
      downvote: 'تصويت سلبي',
      votes: 'أصوات',
      
      // Comments
      comments: 'التعليقات',
      addComment: 'أضف تعليقاً',
      
      // User Profile
      expertise: 'الخبرة',
      location: 'الموقع',
      joinedDate: 'تاريخ الانضمام',
      posts: 'المنشورات',
      answers: 'الإجابات',
      
      // Filters
      filterByCategory: 'تصفية حسب الفئة',
      allCategories: 'جميع الفئات',
      recent: 'الأحدث',
      popular: 'الأكثر شعبية',
      unanswered: 'غير مجاب عليها',
      
      // Messages
      welcomeMessage: 'مرحباً بك في سير فيست',
      noPostsFound: 'لم يتم العثور على منشورات',
      recentPosts: 'المنشورات الأخيرة',
      
      // Landing Page
      welcomeTitle: 'ربط الأصوات السورية عالمياً',
      welcomeSubtitle: 'تواصل مع الخبراء السوريين، اطرح الأسئلة، شارك الأخبار، وشارك في نقاشات مهمة حول سوريا',
      getStarted: 'ابدأ الآن',
      learnMore: 'اعرف المزيد',
      
      // Errors
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      requiredField: 'هذا الحقل مطلوب',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
