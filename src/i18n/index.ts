
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      questions: "Q&A Forum",
      news: "Syrian News",
      experts: "Syrian Experts",
      profile: "Profile",
      admin: "Admin",
      
      // Authentication
      login: "Login",
      register: "Register",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Name",
      forgotPassword: "Forgot Password?",
      
      // Platform
      platformName: "SyrVest",
      platformTagline: "Where Syrian Expertise Meets Global Community",
      appName: "SyrVest",
      welcomeTitle: "Connecting Syrian Voices Worldwide",
      welcomeSubtitle: "Connect with Syrian experts, ask questions, share news, and engage in meaningful discussions about Syria",
      getStarted: "Ask a Question",
      learnMore: "Join as Expert",
      
      // Questions and Posts
      askQuestion: "Ask Question",
      postArticle: "Post Article",
      answer: "Answer",
      answers: "Answers",
      comment: "Comment",
      comments: "Comments",
      question: "Question",
      questions: "Questions",
      article: "Article",
      articles: "Articles",
      vote: "Vote",
      votes: "Votes",
      upvote: "Upvote",
      downvote: "Downvote",
      share: "Share",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      
      // Categories
      legal: "Legal",
      technology: "Technology",
      investment: "Investment",
      marketing: "Marketing",
      operations: "Operations",
      
      // Search
      search: "Search",
      searchPlaceholder: "Search questions and news...",
      filterByCategory: "Filter by Category",
      
      // Posts
      recentPosts: "Recent Posts",
      noPostsFound: "No posts available yet.",
      postedBy: "Posted by",
      timeAgo: "ago",
      readMore: "Read more",
      
      // User Profile
      userProfile: "User Profile",
      expertise: "Expertise",
      reputation: "Reputation",
      joinedDate: "Joined",
      questionsAsked: "Questions Asked",
      answersGiven: "Answers Given",
      articlesPosted: "Articles Posted",
      
      // Voting
      helpful: "Helpful",
      notHelpful: "Not helpful",
      
      // Comments
      addComment: "Add a comment",
      writeComment: "Write your comment...",
      replyToComment: "Reply to comment",
      
      // Verification
      verified: "Verified",
      expert: "Expert",
      
      // Form Labels
      title: "Title",
      content: "Content",
      category: "Category",
      tags: "Tags",
      submit: "Submit",
      
      // Common
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      close: "Close",
      open: "Open",
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      
      // Time
      justNow: "Just now",
      minuteAgo: "minute ago",
      minutesAgo: "minutes ago",
      hourAgo: "hour ago",
      hoursAgo: "hours ago",
      dayAgo: "day ago",
      daysAgo: "days ago",
      weekAgo: "week ago",
      weeksAgo: "weeks ago",
      monthAgo: "month ago",
      monthsAgo: "months ago",
      yearAgo: "year ago",
      yearsAgo: "years ago",
      
      // Placeholder content
      questionPlaceholder: "What would you like to know about Syrian affairs?",
      articlePlaceholder: "Share your insights about Syrian developments...",
      
      // Expertise areas
      legalCompliance: "Legal & Compliance",
      technologyInnovation: "Technology & Innovation",
      businessEconomy: "Business & Economy",
      healthcareMedicine: "Healthcare & Medicine",
      educationResearch: "Education & Research",
      mediaJournalism: "Media & Journalism",
      government: "Government & Policy",
      nonProfit: "Non-Profit & NGO",
      
      // Status messages
      loginRequired: "Please log in to continue",
      registrationSuccess: "Registration successful! Please log in.",
      loginSuccess: "Welcome back!",
      logoutSuccess: "Successfully logged out",
      postCreated: "Your post has been created successfully",
      answerSubmitted: "Your answer has been submitted",
      commentAdded: "Comment added successfully",
      voteRecorded: "Your vote has been recorded",
      
      // Error messages
      loginError: "Invalid email or password",
      registrationError: "Registration failed. Please try again.",
      networkError: "Network error. Please check your connection.",
      serverError: "Server error. Please try again later.",
      validationError: "Please check your input and try again",
      
      // News categories
      politics: "Politics",
      economy: "Economy",
      society: "Society",
      culture: "Culture",
      international: "International",
      humanitarian: "Humanitarian",
      reconstruction: "Reconstruction",
      diaspora: "Diaspora"
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      questions: "منتدى الأسئلة",
      news: "الأخبار السورية",
      experts: "الخبراء السوريون",
      profile: "الملف الشخصي",
      admin: "الإدارة",
      
      // Authentication
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      name: "الاسم",
      forgotPassword: "نسيت كلمة المرور؟",
      
      // Platform
      platformName: "سير فيست",
      platformTagline: "حيث تلتقي الخبرة السورية بالمجتمع العالمي",
      appName: "سير فيست",
      welcomeTitle: "ربط الأصوات السورية حول العالم",
      welcomeSubtitle: "تواصل مع الخبراء السوريين، اطرح الأسئلة، شارك الأخبار، وشارك في نقاشات مهمة حول سوريا",
      getStarted: "اطرح سؤال",
      learnMore: "انضم كخبير",
      
      // Questions and Posts
      askQuestion: "اطرح سؤال",
      postArticle: "انشر مقال",
      answer: "إجابة",
      answers: "إجابات",
      comment: "تعليق",
      comments: "تعليقات",
      question: "سؤال",
      questions: "أسئلة",
      article: "مقال",
      articles: "مقالات",
      vote: "تصويت",
      votes: "تصويتات",
      upvote: "تصويت إيجابي",
      downvote: "تصويت سلبي",
      share: "مشاركة",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      
      // Categories
      legal: "قانوني",
      technology: "تقنية",
      investment: "استثمار",
      marketing: "تسويق",
      operations: "عمليات",
      
      // Search
      search: "بحث",
      searchPlaceholder: "ابحث في الأسئلة والأخبار...",
      filterByCategory: "تصفية حسب الفئة",
      
      // Posts
      recentPosts: "المنشورات الحديثة",
      noPostsFound: "لا توجد منشورات متاحة بعد.",
      postedBy: "نشر بواسطة",
      timeAgo: "منذ",
      readMore: "اقرأ المزيد",
      
      // User Profile
      userProfile: "الملف الشخصي للمستخدم",
      expertise: "الخبرة",
      reputation: "السمعة",
      joinedDate: "تاريخ الانضمام",
      questionsAsked: "الأسئلة المطروحة",
      answersGiven: "الإجابات المقدمة",
      articlesPosted: "المقالات المنشورة",
      
      // Voting
      helpful: "مفيد",
      notHelpful: "غير مفيد",
      
      // Comments
      addComment: "أضف تعليق",
      writeComment: "اكتب تعليقك...",
      replyToComment: "رد على التعليق",
      
      // Verification
      verified: "موثق",
      expert: "خبير",
      
      // Form Labels
      title: "العنوان",
      content: "المحتوى",
      category: "الفئة",
      tags: "العلامات",
      submit: "إرسال",
      
      // Common
      loading: "جارٍ التحميل...",
      error: "خطأ",
      success: "نجح",
      warning: "تحذير",
      info: "معلومات",
      close: "إغلاق",
      open: "فتح",
      yes: "نعم",
      no: "لا",
      confirm: "تأكيد",
      
      // Time
      justNow: "الآن",
      minuteAgo: "منذ دقيقة",
      minutesAgo: "منذ دقائق",
      hourAgo: "منذ ساعة",
      hoursAgo: "منذ ساعات",
      dayAgo: "منذ يوم",
      daysAgo: "منذ أيام",
      weekAgo: "منذ أسبوع",
      weeksAgo: "منذ أسابيع",
      monthAgo: "منذ شهر",
      monthsAgo: "منذ أشهر",
      yearAgo: "منذ سنة",
      yearsAgo: "منذ سنوات",
      
      // Placeholder content
      questionPlaceholder: "ما الذي تريد معرفته عن الشؤون السورية؟",
      articlePlaceholder: "شارك رؤيتك حول التطورات السورية...",
      
      // Expertise areas
      legalCompliance: "قانوني وامتثال",
      technologyInnovation: "تقنية وابتكار",
      businessEconomy: "أعمال واقتصاد",
      healthcareMedicine: "رعاية صحية وطب",
      educationResearch: "تعليم وبحث",
      mediaJournalism: "إعلام وصحافة",
      government: "حكومة وسياسة",
      nonProfit: "منظمات غير ربحية",
      
      // Status messages
      loginRequired: "يرجى تسجيل الدخول للمتابعة",
      registrationSuccess: "تم التسجيل بنجاح! يرجى تسجيل الدخول.",
      loginSuccess: "مرحباً بعودتك!",
      logoutSuccess: "تم تسجيل الخروج بنجاح",
      postCreated: "تم إنشاء منشورك بنجاح",
      answerSubmitted: "تم إرسال إجابتك",
      commentAdded: "تم إضافة التعليق بنجاح",
      voteRecorded: "تم تسجيل تصويتك",
      
      // Error messages
      loginError: "بريد إلكتروني أو كلمة مرور غير صحيحة",
      registrationError: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
      networkError: "خطأ في الشبكة. يرجى فحص اتصالك.",
      serverError: "خطأ في الخادم. يرجى المحاولة لاحقاً.",
      validationError: "يرجى فحص إدخالك والمحاولة مرة أخرى",
      
      // News categories
      politics: "سياسة",
      economy: "اقتصاد",
      society: "مجتمع",
      culture: "ثقافة",
      international: "دولي",
      humanitarian: "إنساني",
      reconstruction: "إعمار",
      diaspora: "المهجر"
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
