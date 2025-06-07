
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      questions: "Questions",
      news: "News",
      experts: "Experts",
      profile: "Profile",
      admin: "Admin",
      
      // Authentication
      login: "Login",
      register: "Register",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot Password?",
      
      // Platform
      platformName: "Syrian Business Hub",
      platformTagline: "Empowering Syrian Entrepreneurs Worldwide",
      
      // Posts
      askQuestion: "Ask a Question",
      postNews: "Share News",
      categories: "Categories",
      tags: "Tags",
      answers: "Answers",
      comments: "Comments",
      
      // Expertise
      legalExpert: "Legal Expert",
      investor: "Investor", 
      startupFounder: "Startup Founder",
      developer: "Developer",
      governmentRep: "Government Rep",
      
      // Categories
      legal: "Legal",
      technology: "Technology",
      investment: "Investment",
      marketing: "Marketing",
      operations: "Operations",
      
      // Access Control
      upgradeRequired: "Upgrade Required",
      syrianAccess: "Free access for users in Syria",
      internationalAccess: "Subscribe to interact",
      
      // Common
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      questions: "الأسئلة",
      news: "الأخبار", 
      experts: "الخبراء",
      profile: "الملف الشخصي",
      admin: "الإدارة",
      
      // Authentication
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      
      // Platform
      platformName: "مركز الأعمال السوري",
      platformTagline: "تمكين رواد الأعمال السوريين حول العالم",
      
      // Posts
      askQuestion: "اطرح سؤالاً",
      postNews: "شارك خبراً",
      categories: "الفئات",
      tags: "العلامات",
      answers: "الإجابات",
      comments: "التعليقات",
      
      // Expertise
      legalExpert: "خبير قانوني",
      investor: "مستثمر",
      startupFounder: "مؤسس شركة ناشئة",
      developer: "مطور",
      governmentRep: "ممثل حكومي",
      
      // Categories
      legal: "قانوني",
      technology: "تكنولوجيا",
      investment: "استثمار",
      marketing: "تسويق",
      operations: "عمليات",
      
      // Access Control
      upgradeRequired: "يتطلب ترقية",
      syrianAccess: "وصول مجاني للمستخدمين في سوريا",
      internationalAccess: "اشترك للتفاعل",
      
      // Common
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      loading: "جاري التحميل...",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
