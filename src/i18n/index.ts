
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
      appName: "Syrian Entrepreneurs Hub",
      
      // Posts
      askQuestion: "Ask Question",
      postNews: "Share News",
      postArticle: "Post Article",
      categories: "Categories",
      tags: "Tags",
      answers: "Answers",
      comments: "Comments",
      votes: "Votes",
      views: "Views",
      
      // Post types
      question: "Question",
      article: "Article",
      
      // Actions
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
      back: "Back",
      backToPosts: "Back to posts",
      
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
      
      // Dialog and form content
      editAnswer: "Edit Answer",
      editComment: "Edit Comment",
      editPost: "Edit Post",
      deleteAnswer: "Delete Answer",
      deleteComment: "Delete Comment",
      deletePost: "Delete Post",
      deleteConfirmation: "Are you sure you want to delete this {{item}}? This action cannot be undone.",
      updating: "Updating...",
      deleting: "Deleting...",
      updateAnswer: "Update Answer",
      updateComment: "Update Comment",
      updatePost: "Update Post",
      
      // Placeholders
      searchPlaceholder: "Search questions and news...",
      editAnswerPlaceholder: "Edit your answer...",
      editCommentPlaceholder: "Edit your comment...",
      
      // Success messages
      answerUpdated: "Answer updated!",
      answerUpdatedDesc: "Your answer has been updated successfully.",
      commentUpdated: "Comment updated!",
      commentUpdatedDesc: "Your comment has been updated successfully.",
      postUpdated: "Post updated!",
      postUpdatedDesc: "Your post has been updated successfully.",
      answerDeleted: "Answer deleted!",
      answerDeletedDesc: "Your answer has been deleted successfully.",
      commentDeleted: "Comment deleted!",
      commentDeletedDesc: "Your comment has been deleted successfully.",
      postDeleted: "Post deleted!",
      postDeletedDesc: "Your post has been deleted successfully.",
      
      // Error messages
      failedToUpdate: "Failed to update {{item}}",
      failedToDelete: "Failed to delete {{item}}",
      postNotFound: "Post not found",
      goBackHome: "Go back home",
      userMustBeLoggedIn: "User must be logged in",
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
      appName: "مركز رواد الأعمال السوريين",
      
      // Posts
      askQuestion: "اطرح سؤالاً",
      postNews: "شارك خبراً",
      postArticle: "انشر مقالاً",
      categories: "الفئات",
      tags: "العلامات",
      answers: "الإجابات",
      comments: "التعليقات",
      votes: "الأصوات",
      views: "المشاهدات",
      
      // Post types
      question: "سؤال",
      article: "مقال",
      
      // Actions
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      loading: "جاري التحميل...",
      back: "رجوع",
      backToPosts: "العودة للمنشورات",
      
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
      
      // Dialog and form content
      editAnswer: "تعديل الإجابة",
      editComment: "تعديل التعليق",
      editPost: "تعديل المنشور",
      deleteAnswer: "حذف الإجابة",
      deleteComment: "حذف التعليق",
      deletePost: "حذف المنشور",
      deleteConfirmation: "هل أنت متأكد من حذف هذا {{item}}؟ لا يمكن التراجع عن هذا الإجراء.",
      updating: "جاري التحديث...",
      deleting: "جاري الحذف...",
      updateAnswer: "تحديث الإجابة",
      updateComment: "تحديث التعليق",
      updatePost: "تحديث المنشور",
      
      // Placeholders
      searchPlaceholder: "ابحث في الأسئلة والأخبار...",
      editAnswerPlaceholder: "عدل إجابتك...",
      editCommentPlaceholder: "عدل تعليقك...",
      
      // Success messages
      answerUpdated: "تم تحديث الإجابة!",
      answerUpdatedDesc: "تم تحديث إجابتك بنجاح.",
      commentUpdated: "تم تحديث التعليق!",
      commentUpdatedDesc: "تم تحديث تعليقك بنجاح.",
      postUpdated: "تم تحديث المنشور!",
      postUpdatedDesc: "تم تحديث منشورك بنجاح.",
      answerDeleted: "تم حذف الإجابة!",
      answerDeletedDesc: "تم حذف إجابتك بنجاح.",
      commentDeleted: "تم حذف التعليق!",
      commentDeletedDesc: "تم حذف تعليقك بنجاح.",
      postDeleted: "تم حذف المنشور!",
      postDeletedDesc: "تم حذف منشورك بنجاح.",
      
      // Error messages
      failedToUpdate: "فشل في تحديث {{item}}",
      failedToDelete: "فشل في حذف {{item}}",
      postNotFound: "المنشور غير موجود",
      goBackHome: "العودة للرئيسية",
      userMustBeLoggedIn: "يجب تسجيل الدخول أولاً",
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
