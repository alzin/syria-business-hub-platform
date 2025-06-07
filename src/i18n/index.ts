
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
      questionPlaceholder: "What is your question?",
      newsPlaceholder: "News title",
      articlePlaceholder: "Article title",
      questionContentPlaceholder: "Describe your question in detail...",
      newsContentPlaceholder: "Write your news article...",
      articleContentPlaceholder: "Write your article content...",
      addTagPlaceholder: "Add a tag and press Enter",
      
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
      questionPosted: "Question posted!",
      questionPostedDesc: "Your question has been posted successfully.",
      newsPosted: "News posted!",
      newsPostedDesc: "Your news has been posted successfully.",
      profileUpdated: "Profile updated",
      profileUpdatedDesc: "Your profile has been updated successfully.",
      
      // Error messages
      failedToUpdate: "Failed to update {{item}}",
      failedToDelete: "Failed to delete {{item}}",
      postNotFound: "Post not found",
      goBackHome: "Go back home",
      userMustBeLoggedIn: "User must be logged in",
      missingInformation: "Missing information",
      fillAllFields: "Please fill in all required fields.",
      failedToPostQuestion: "Failed to post question",
      failedToPostNews: "Failed to post news",

      // User Profile
      editProfile: "Edit Profile",
      accountInformation: "Account Information",
      accountActions: "Account Actions",
      accessLevel: "Access Level",
      accountStatus: "Account Status",
      signOut: "Sign Out",
      signOutDesc: "Sign out of your account",
      viewPublicProfile: "View Public Profile",
      viewPublicProfileDesc: "See how your profile appears to others",
      viewProfile: "View Profile",
      backToHome: "Back to home",
      verified: "Verified",
      unverified: "Unverified",
      joined: "Joined",
      posts: "posts",
      questionsLower: "questions",
      newsLower: "news articles",
      userNotFound: "User not found",
      saving: "Saving...",
      name: "Name",
      fullName: "Full Name",
      location: "Location",
      bio: "Bio",
      expertise: "Expertise",
      selectExpertise: "Select your expertise",

      // Create Post Dialog
      title: "Title",
      content: "Content",
      category: "Category",
      selectCategory: "Select a category",
      addTag: "Add",
      postQuestion: "Post Question",
      posting: "Posting...",

      // Dashboard/Home
      welcomeMessage: "Welcome to the Syrian Business Hub",
      recentPosts: "Recent Posts",
      filterByCategory: "Filter by category",
      filterByType: "Filter by type",
      allPosts: "All Posts",
      allCategories: "All Categories",
      allTypes: "All Types",
      noPostsFound: "No posts found",
      noPostsFoundDesc: "Try adjusting your filters or create the first post!",

      // Post Components
      postedBy: "Posted by",
      answeredBy: "Answered by",
      commentedBy: "Commented by",
      timeAgo: "{{time}} ago",
      addAnswer: "Add Answer",
      addComment: "Add Comment",
      writeAnswer: "Write your answer...",
      writeComment: "Write your comment...",
      postAnswer: "Post Answer",
      postComment: "Post Comment",
      showComments: "Show Comments",
      hideComments: "Hide Comments",
      sortByVotes: "Sort by votes",
      sortByDate: "Sort by date",
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
      questionPlaceholder: "ما هو سؤالك؟",
      newsPlaceholder: "عنوان الخبر",
      articlePlaceholder: "عنوان المقال",
      questionContentPlaceholder: "اوصف سؤالك بالتفصيل...",
      newsContentPlaceholder: "اكتب مقالك الإخباري...",
      articleContentPlaceholder: "اكتب محتوى مقالك...",
      addTagPlaceholder: "أضف علامة واضغط Enter",
      
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
      questionPosted: "تم نشر السؤال!",
      questionPostedDesc: "تم نشر سؤالك بنجاح.",
      newsPosted: "تم نشر الخبر!",
      newsPostedDesc: "تم نشر خبرك بنجاح.",
      profileUpdated: "تم تحديث الملف الشخصي",
      profileUpdatedDesc: "تم تحديث ملفك الشخصي بنجاح.",
      
      // Error messages
      failedToUpdate: "فشل في تحديث {{item}}",
      failedToDelete: "فشل في حذف {{item}}",
      postNotFound: "المنشور غير موجود",
      goBackHome: "العودة للرئيسية",
      userMustBeLoggedIn: "يجب تسجيل الدخول أولاً",
      missingInformation: "معلومات مفقودة",
      fillAllFields: "يرجى ملء جميع الحقول المطلوبة.",
      failedToPostQuestion: "فشل في نشر السؤال",
      failedToPostNews: "فشل في نشر الخبر",

      // User Profile
      editProfile: "تعديل الملف الشخصي",
      accountInformation: "معلومات الحساب",
      accountActions: "إجراءات الحساب",
      accessLevel: "مستوى الوصول",
      accountStatus: "حالة الحساب",
      signOut: "تسجيل الخروج",
      signOutDesc: "تسجيل الخروج من حسابك",
      viewPublicProfile: "عرض الملف العام",
      viewPublicProfileDesc: "شاهد كيف يظهر ملفك للآخرين",
      viewProfile: "عرض الملف",
      backToHome: "العودة للرئيسية",
      verified: "موثق",
      unverified: "غير موثق",
      joined: "انضم في",
      posts: "منشورات",
      questionsLower: "أسئلة",
      newsLower: "مقالات إخبارية",
      userNotFound: "المستخدم غير موجود",
      saving: "جاري الحفظ...",
      name: "الاسم",
      fullName: "الاسم الكامل",
      location: "الموقع",
      bio: "النبذة التعريفية",
      expertise: "الخبرة",
      selectExpertise: "اختر خبرتك",

      // Create Post Dialog
      title: "العنوان",
      content: "المحتوى",
      category: "الفئة",
      selectCategory: "اختر فئة",
      addTag: "إضافة",
      postQuestion: "نشر السؤال",
      posting: "جاري النشر...",

      // Dashboard/Home
      welcomeMessage: "مرحباً بك في مركز الأعمال السوري",
      recentPosts: "المنشورات الحديثة",
      filterByCategory: "تصفية حسب الفئة",
      filterByType: "تصفية حسب النوع",
      allPosts: "جميع المنشورات",
      allCategories: "جميع الفئات",
      allTypes: "جميع الأنواع",
      noPostsFound: "لم يتم العثور على منشورات",
      noPostsFoundDesc: "جرب تعديل المرشحات أو أنشئ أول منشور!",

      // Post Components
      postedBy: "نشر بواسطة",
      answeredBy: "أجاب بواسطة",
      commentedBy: "علق بواسطة",
      timeAgo: "منذ {{time}}",
      addAnswer: "إضافة إجابة",
      addComment: "إضافة تعليق",
      writeAnswer: "اكتب إجابتك...",
      writeComment: "اكتب تعليقك...",
      postAnswer: "نشر الإجابة",
      postComment: "نشر التعليق",
      showComments: "عرض التعليقات",
      hideComments: "إخفاء التعليقات",
      sortByVotes: "ترتيب حسب الأصوات",
      sortByDate: "ترتيب حسب التاريخ",
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
