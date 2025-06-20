
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // App name and branding
      appName: 'SyrVest',
      platformTagline: 'Where Syrian Expertise Meets Global Community',
      
      // Footer
      footer: {
        brandName: 'Syrian Knowledge',
        mission: 'Connecting Syrian experts worldwide to share knowledge, answer questions, and build a stronger community for Syria\'s future.',
        social: {
          facebook: 'Facebook',
          twitter: 'Twitter',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        quickLinks: {
          title: 'Quick Links',
          askQuestion: 'Ask a Question',
          joinAsExpert: 'Join as Expert',
          browseCommunity: 'Browse Community',
          aboutUs: 'About Us',
          howItWorks: 'How It Works'
        },
        expertiseAreas: {
          title: 'Expertise Areas',
          legal: 'Legal & Compliance',
          technology: 'Technology',
          investment: 'Investment',
          marketing: 'Marketing',
          operations: 'Operations'
        },
        contactSupport: {
          title: 'Contact & Support',
          phone: '+1 (555) 123-4567',
          location: 'Serving the global Syrian community'
        },
        support: {
          title: 'Support',
          helpCenter: 'Help Center',
          communityGuidelines: 'Community Guidelines',
          reportIssue: 'Report Issue'
        },
        copyright: '© {{year}} Syrian Knowledge Platform. Made with',
        tagline: 'for the Syrian community.',
        policies: {
          privacyPolicy: 'Privacy Policy',
          termsOfService: 'Terms of Service',
          cookiePolicy: 'Cookie Policy',
          accessibility: 'Accessibility'
        }
      },
      
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
      fullName: 'Full Name',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me',
      
      // Actions
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      saving: 'Saving...',
      edit: 'Edit',
      'edit profile': 'Edit Profile',
      delete: 'Delete',
      reply: 'Reply',
      vote: 'Vote',
      share: 'Share',
      report: 'Report',
      'back to posts': 'Back to Posts',
      'goBackHome': 'Go Back Home',
      
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
      joined: 'Joined',
      userPosts: 'Posts',
      answers: 'Answers',
      verified: 'Verified',
      
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
      userMustBeLoggedIn: 'You must be logged in to view this page',
      userNotFound: 'User not found',
      
      // Landing Page
      welcomeTitle: 'Connecting Syrian Voices Worldwide',
      welcomeSubtitle: 'Connect with Syrian experts, ask questions, share news, and engage in meaningful discussions about Syria',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      
      // Landing Page - Stats Section
      'Active Discussions': 'Active Discussions',
      'Syrian Experts': 'Syrian Experts',
      'Countries Connected': 'Countries Connected',
      'Knowledge Articles': 'Knowledge Articles',
      
      // Landing Page - Expertise Areas
      'Expertise Areas & Discussions': 'Expertise Areas & Discussions',
      'Get expert insights and engage in discussions across various topics relevant to Syria': 'Get expert insights and engage in discussions across various topics relevant to Syria',
      'Legal Experts': 'Legal Experts',
      'Tech Professionals': 'Tech Professionals',
      'Business Leaders': 'Business Leaders',
      'Get guidance on Syrian laws, regulations, and legal procedures from practicing attorneys': 'Get guidance on Syrian laws, regulations, and legal procedures from practicing attorneys',
      'Discuss tech developments, startup ecosystem, and digital transformation in Syria': 'Discuss tech developments, startup ecosystem, and digital transformation in Syria',
      'Insights on Syrian market conditions, business opportunities, and economic developments': 'Insights on Syrian market conditions, business opportunities, and economic developments',
      'Browse Questions': 'Browse Questions',
      
      // Landing Page - Features Section
      'How Our Platform Works': 'How Our Platform Works',
      'A comprehensive hub for Syrian knowledge sharing and community discussions': 'A comprehensive hub for Syrian knowledge sharing and community discussions',
      'Expert Q&A Forum': 'Expert Q&A Forum',
      'Ask questions and get answers from verified Syrian experts across various fields including legal, technology, business, and more.': 'Ask questions and get answers from verified Syrian experts across various fields including legal, technology, business, and more.',
      'Syrian News Hub': 'Syrian News Hub',
      'Stay updated with the latest news, developments, and insights about Syria from trusted sources and community members.': 'Stay updated with the latest news, developments, and insights about Syria from trusted sources and community members.',
      'Verified Expertise': 'Verified Expertise',
      'Connect with verified professionals including lawyers, doctors, engineers, entrepreneurs, and government representatives.': 'Connect with verified professionals including lawyers, doctors, engineers, entrepreneurs, and government representatives.',
      'Community Discussions': 'Community Discussions',
      'Engage in meaningful discussions about Syrian affairs, share experiences, and build connections with the diaspora.': 'Engage in meaningful discussions about Syrian affairs, share experiences, and build connections with the diaspora.',
      
      // Landing Page - Benefits Section
      'Why Choose Syrian Knowledge?': 'Why Choose Syrian Knowledge?',
      'We provide a trusted platform where Syrian experts and community members can share knowledge, discuss important topics, and stay connected.': 'We provide a trusted platform where Syrian experts and community members can share knowledge, discuss important topics, and stay connected.',
      'Direct access to Syrian experts and professionals': 'Direct access to Syrian experts and professionals',
      'Real-time updates on Syrian news and developments': 'Real-time updates on Syrian news and developments',
      'Verified answers from trusted community members': 'Verified answers from trusted community members',
      'Multi-language support (Arabic and English)': 'Multi-language support (Arabic and English)',
      'Safe space for diaspora and local discussions': 'Safe space for diaspora and local discussions',
      'Educational resources about Syrian affairs': 'Educational resources about Syrian affairs',
      'Growing Fast': 'Growing Fast',
      'Join our thriving community': 'Join our thriving community',
      'Questions Answered': 'Questions Answered',
      'News Articles': 'News Articles',
      'Countries': 'Countries',
      
      // Landing Page - CTA Section
      'Ready to Connect with Syrian Experts?': 'Ready to Connect with Syrian Experts?',
      'Join thousands of Syrians and friends of Syria who are sharing knowledge and building community': 'Join thousands of Syrians and friends of Syria who are sharing knowledge and building community',
      'Ask Your First Question': 'Ask Your First Question',
      'Browse Community': 'Browse Community',
      'Verified Experts': 'Verified Experts',
      
      // Landing Page - Community Section
      'Join the Community Discussion': 'Join the Community Discussion',
      'Connect with investors and entrepreneurs in our active Q&A community': 'Connect with investors and entrepreneurs in our active Q&A community',
      'Browse Community Posts': 'Browse Community Posts',
      'Expert Members': 'Expert Members',
      
      // Landing Page - Hero Section
      'Connecting Syrian Voices Worldwide': 'Connecting Syrian Voices Worldwide',
      'Your Gateway to': 'Your Gateway to',
      'Syrian Knowledge': 'Syrian Knowledge',
      'Ask a Question': 'Ask a Question',
      'Join as Expert': 'Join as Expert',
      
      // Profile Updates
      profileUpdated: 'Profile Updated',
      profileUpdatedDesc: 'Your profile has been successfully updated',
      failedToUpdate: 'Failed to update {{item}}',
      
      // Errors
      invalidEmail: 'Please enter a valid email address',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      requiredField: 'This field is required',
      
      // Additional translations
      postedBy: 'by',
      viewPublicProfile: 'View Public Profile',
      createPost: 'Create Post',

      questionPlaceholder: 'How can I register a company in Syria as an expat?',
      questionContentPlaceholder: 'I\'m living abroad and planning to start a business in Damascus next year. What legal steps, permits, and fees should I be aware of?',
      addTagPlaceholder: 'Add relevant tags, e.g., legal, business, registration',

      // Create Post Dialog Translations
      'Create New Post': 'Create New Post',
      'What would you like to create?': 'What would you like to create?',
      'Choose the type of content you want to share with the community': 'Choose the type of content you want to share with the community',
      'Write an Article': 'Write an Article',
      'Propose Business Idea': 'Propose Business Idea',
      'Share News': 'Share News',
      'Share insights, guides, and expertise': 'Share insights, guides, and expertise',
      'Share your business concept and find collaborators': 'Share your business concept and find collaborators',
      'Post updates and news relevant to the community': 'Post updates and news relevant to the community',
      'Find Partners': 'Find Partners',
      'Investment Info': 'Investment Info',
      'Timeline': 'Timeline',

      // Post Creation Actions
      'Write Article': 'Write Article',
      'Publish Article': 'Publish Article',
      'Post Business Idea': 'Post Business Idea',
      'POST QUESTION': 'POST QUESTION',
      posting: 'Posting...',
      postNews: 'Post News',

      // Success Messages
      'Article Published': 'Article Published',
      'Your article has been published successfully': 'Your article has been published successfully',
      'Business Idea Posted': 'Business Idea Posted',
      'Your business idea has been shared with the community': 'Your business idea has been shared with the community',
      questionPosted: 'Question Posted',
      questionPostedDesc: 'Your question has been posted successfully',
      newsPosted: 'News Posted',
      newsPostedDesc: 'Your news has been posted successfully',

      // Error Messages
      'Failed to publish article': 'Failed to publish article',
      'Failed to post business idea': 'Failed to post business idea',
      'Failed to create post': 'Failed to create post',
      failedToPostQuestion: 'Failed to post question',
      failedToPostNews: 'Failed to post news',
      missingInformation: 'Missing Information',
      fillAllFields: 'Please fill in all required fields',

      // Additional UI Labels
      all: 'All',
      articles: 'Articles',
      ideas: 'Ideas',
      'Get expert advice and community insights': 'Get expert advice and community insights'
    }
  },
  ar: {
    translation: {
      // App name and branding
      appName: 'سير فيست',
      platformTagline: 'حيث تلتقي الخبرة السورية بالمجتمع العالمي',
      
      // Footer
      footer: {
        brandName: 'المعرفة السورية',
        mission: 'ربط الخبراء السوريين حول العالم لتبادل المعرفة، والإجابة على الأسئلة، وبناء مجتمع أقوى لمستقبل سوريا.',
        social: {
          facebook: 'فيسبوك',
          twitter: 'تويتر',
          instagram: 'انستغرام',
          linkedin: 'لينكد إن'
        },
        quickLinks: {
          title: 'روابط سريعة',
          askQuestion: 'اطرح سؤالاً',
          joinAsExpert: 'انضم كخبير',
          browseCommunity: 'تصفح المجتمع',
          aboutUs: 'من نحن',
          howItWorks: 'كيف يعمل'
        },
        expertiseAreas: {
          title: 'مجالات الخبرة',
          legal: 'القانونية والامتثال',
          technology: 'التكنولوجيا',
          investment: 'الاستثمار',
          marketing: 'التسويق',
          operations: 'العمليات'
        },
        contactSupport: {
          title: 'الاتصال والدعم',
          phone: '+1 (555) 123-4567',
          location: 'نخدم المجتمع السوري العالمي'
        },
        support: {
          title: 'الدعم',
          helpCenter: 'مركز المساعدة',
          communityGuidelines: 'إرشادات المجتمع',
          reportIssue: 'الإبلاغ عن مشكلة'
        },
        copyright: '© {{year}} منصة المعرفة السورية. صنع بـ',
        tagline: 'للمجتمع السوري.',
        policies: {
          privacyPolicy: 'سياسة الخصوصية',
          termsOfService: 'شروط الخدمة',
          cookiePolicy: 'سياسة ملفات تعريف الارتباط',
          accessibility: 'إمكانية الوصول'
        }
      },
      
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
      fullName: 'الاسم الكامل',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
      
      // Actions
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      saving: 'جاري الحفظ...',
      edit: 'تعديل',
      'edit profile': 'تعديل الملف الشخصي',
      delete: 'حذف',
      reply: 'رد',
      vote: 'تصويت',
      share: 'مشاركة',
      report: 'إبلاغ',
      'back to posts': 'العودة للمنشورات',
      'goBackHome': 'العودة للرئيسية',
      
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
      joined: 'انضم في',
      userPosts: 'المنشورات',
      answers: 'الإجابات',
      verified: 'موثق',
      
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
      userMustBeLoggedIn: 'يجب أن تكون مسجل الدخول لعرض هذه الصفحة',
      userNotFound: 'المستخدم غير موجود',
      
      // Landing Page
      welcomeTitle: 'ربط الأصوات السورية عالمياً',
      welcomeSubtitle: 'تواصل مع الخبراء السوريين، اطرح الأسئلة، شارك الأخبار، وشارك في نقاشات مهمة حول سوريا',
      getStarted: 'ابدأ الآن',
      learnMore: 'اعرف المزيد',
      
      // Landing Page - Stats Section
      'Active Discussions': 'النقاشات النشطة',
      'Syrian Experts': 'الخبراء السوريون',
      'Countries Connected': 'البلدان المتصلة',
      'Knowledge Articles': 'مقالات المعرفة',
      
      // Landing Page - Expertise Areas
      'Expertise Areas & Discussions': 'مجالات الخبرة والنقاشات',
      'Get expert insights and engage in discussions across various topics relevant to Syria': 'احصل على رؤى الخبراء وشارك في النقاشات حول مواضيع متنوعة تتعلق بسوريا',
      'Legal Experts': 'خبراء قانونيون',
      'Tech Professionals': 'مهنيو التكنولوجيا',
      'Business Leaders': 'قادة الأعمال',
      'Get guidance on Syrian laws, regulations, and legal procedures from practicing attorneys': 'احصل على إرشادات حول القوانين السورية واللوائح والإجراءات القانونية من محامين ممارسين',
      'Discuss tech developments, startup ecosystem, and digital transformation in Syria': 'ناقش التطورات التقنية ونظام الشركات الناشئة والتحول الرقمي في سوريا',
      'Insights on Syrian market conditions, business opportunities, and economic developments': 'رؤى حول ظروف السوق السورية والفرص التجارية والتطورات الاقتصادية',
      'Browse Questions': 'تصفح الأسئلة',
      
      // Landing Page - Features Section
      'How Our Platform Works': 'كيف تعمل منصتنا',
      'A comprehensive hub for Syrian knowledge sharing and community discussions': 'مركز شامل لتبادل المعرفة السورية ونقاشات المجتمع',
      'Expert Q&A Forum': 'منتدى أسئلة وأجوبة الخبراء',
      'Ask questions and get answers from verified Syrian experts across various fields including legal, technology, business, and more.': 'اطرح الأسئلة واحصل على إجابات من خبراء سوريين موثقين في مجالات مختلفة تشمل القانون والتكنولوجيا والأعمال وأكثر.',
      'Syrian News Hub': 'مركز الأخبار السورية',
      'Stay updated with the latest news, developments, and insights about Syria from trusted sources and community members.': 'ابق محدثاً بآخر الأخبار والتطورات والرؤى حول سوريا من مصادر موثوقة وأعضاء المجتمع.',
      'Verified Expertise': 'الخبرة الموثقة',
      'Connect with verified professionals including lawyers, doctors, engineers, entrepreneurs, and government representatives.': 'تواصل مع محترفين موثقين يشملون محامين وأطباء ومهندسين ورجال أعمال وممثلين حكوميين.',
      'Community Discussions': 'نقاشات المجتمع',
      'Engage in meaningful discussions about Syrian affairs, share experiences, and build connections with the diaspora.': 'شارك في نقاشات مهمة حول الشؤون السورية، شارك التجارب، وابن علاقات مع الشتات.',
      
      // Landing Page - Benefits Section
      'Why Choose Syrian Knowledge?': 'لماذا تختار المعرفة السورية؟',
      'We provide a trusted platform where Syrian experts and community members can share knowledge, discuss important topics, and stay connected.': 'نوفر منصة موثوقة حيث يمكن للخبراء السوريين وأعضاء المجتمع تبادل المعرفة ومناقشة المواضيع المهمة والبقاء متصلين.',
      'Direct access to Syrian experts and professionals': 'وصول مباشر للخبراء والمهنيين السوريين',
      'Real-time updates on Syrian news and developments': 'تحديثات فورية حول الأخبار والتطورات السورية',
      'Verified answers from trusted community members': 'إجابات موثقة من أعضاء المجتمع الموثوقين',
      'Multi-language support (Arabic and English)': 'دعم متعدد اللغات (العربية والإنجليزية)',
      'Safe space for diaspora and local discussions': 'مساحة آمنة لنقاشات الشتات والمحليين',
      'Educational resources about Syrian affairs': 'موارد تعليمية حول الشؤون السورية',
      'Growing Fast': 'نمو سريع',
      'Join our thriving community': 'انضم لمجتمعنا المزدهر',
      'Questions Answered': 'الأسئلة المجاب عليها',
      'News Articles': 'المقالات الإخبارية',
      'Countries': 'البلدان',
      
      // Landing Page - CTA Section
      'Ready to Connect with Syrian Experts?': 'مستعد للتواصل مع الخبراء السوريين؟',
      'Join thousands of Syrians and friends of Syria who are sharing knowledge and building community': 'انضم لآلاف السوريين وأصدقاء سوريا الذين يتبادلون المعرفة ويبنون المجتمع',
      'Ask Your First Question': 'اطرح سؤالك الأول',
      'Browse Community': 'تصفح المجتمع',
      'Verified Experts': 'خبراء موثقون',
      
      // Landing Page - Community Section
      'Join the Community Discussion': 'انضم لنقاش المجتمع',
      'Connect with investors and entrepreneurs in our active Q&A community': 'تواصل مع المستثمرين ورجال الأعمال في مجتمع الأسئلة والأجوبة النشط',
      'Browse Community Posts': 'تصفح منشورات المجتمع',
      'Expert Members': 'الأعضاء الخبراء',
      
      // Landing Page - Hero Section
      'Connecting Syrian Voices Worldwide': 'ربط الأصوات السورية عالمياً',
      'Your Gateway to': 'بوابتك إلى',
      'Syrian Knowledge': 'المعرفة السورية',
      'Ask a Question': 'اطرح سؤالاً',
      'Join as Expert': 'انضم كخبير',
      
      // Profile Updates
      profileUpdated: 'تم تحديث الملف الشخصي',
      profileUpdatedDesc: 'تم تحديث ملفك الشخصي بنجاح',
      failedToUpdate: 'فشل في تحديث {{item}}',
      
      // Errors
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      requiredField: 'هذا الحقل مطلوب',
      
      // Additional translations
      postedBy: 'بواسطة',
      viewPublicProfile: 'عرض الملف العام',
      createPost: 'إنشاء منشور',

      questionPlaceholder: 'كيف يمكنني تسجيل شركة في سوريا كمغترب؟',
      questionContentPlaceholder: 'أعيش في الخارج وأخطط لبدء عمل تجاري في دمشق العام المقبل. ما هي الخطوات القانونية والتراخيص والرسوم التي يجب أن أكون على علم بها؟',
      addTagPlaceholder: 'أضف علامات ذات صلة، مثل: قانوني، أعمال، تسجيل',

      // Create Post Dialog Translations
      'Create New Post': 'إنشاء منشور جديد',
      'What would you like to create?': 'ماذا تريد إنشاء؟',
      'Choose the type of content you want to share with the community': 'اختر نوع المحتوى الذي تريد مشاركته مع المجتمع',
      'Write an Article': 'اكتب مقالاً',
      'Propose Business Idea': 'اقترح فكرة تجارية',
      'Share News': 'شارك الأخبار',
      'Share insights, guides, and expertise': 'شارك الرؤى والأدلة والخبرات',
      'Share your business concept and find collaborators': 'شارك مفهومك التجاري وابحث عن متعاونين',
      'Post updates and news relevant to the community': 'انشر التحديثات والأخبار ذات الصلة بالمجتمع',
      'Find Partners': 'ابحث عن شركاء',
      'Investment Info': 'معلومات الاستثمار',
      'Timeline': 'الجدول الزمني',

      // Post Creation Actions
      'Write Article': 'اكتب مقالاً',
      'Publish Article': 'انشر المقال',
      'Post Business Idea': 'انشر فكرة تجارية',
      'POST QUESTION': 'انشر السؤال',
      posting: 'جاري النشر...',
      postNews: 'انشر الأخبار',

      // Success Messages
      'Article Published': 'تم نشر المقال',
      'Your article has been published successfully': 'تم نشر مقالك بنجاح',
      'Business Idea Posted': 'تم نشر الفكرة التجارية',
      'Your business idea has been shared with the community': 'تم مشاركة فكرتك التجارية مع المجتمع',
      questionPosted: 'تم نشر السؤال',
      questionPostedDesc: 'تم نشر سؤالك بنجاح',
      newsPosted: 'تم نشر الأخبار',
      newsPostedDesc: 'تم نشر أخبارك بنجاح',

      // Error Messages
      'Failed to publish article': 'فشل في نشر المقال',
      'Failed to post business idea': 'فشل في نشر الفكرة التجارية',
      'Failed to create post': 'فشل في إنشاء المنشور',
      failedToPostQuestion: 'فشل في نشر السؤال',
      failedToPostNews: 'فشل في نشر الأخبار',
      missingInformation: 'معلومات مفقودة',
      fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',

      // Additional UI Labels
      all: 'الكل',
      articles: 'المقالات',
      ideas: 'الأفكار',
      'Get expert advice and community insights': 'احصل على مشورة الخبراء ورؤى المجتمع'
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
