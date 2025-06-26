import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // App name and branding
      platformTagline: 'Where Syrian Expertise Meets Global Community',
      
      // Expertise Categories
      'Legal Expert': 'Legal Expert',
      'Investor': 'Investor',
      'Founder': 'Founder',
      'Government': 'Government',
      'Business & Consulting': 'Business & Consulting',
      'Technology & Development': 'Technology & Development',
      'Design & Creative': 'Design & Creative',
      'Marketing & Sales': 'Marketing & Sales',
      'Writing & Content Creation': 'Writing & Content Creation',
      'Translation & Languages': 'Translation & Languages',
      'Education & Coaching': 'Education & Coaching',
      'Administrative & Virtual Assistance': 'Administrative & Virtual Assistance',
      'Arts, Culture & Media': 'Arts, Culture & Media',
      'Specialized & Niche Services': 'Specialized & Niche Services',

      // Legal Expert Specializations
      'Company Registration & Business Setup': 'Company Registration & Business Setup',
      'Contract Drafting & Review': 'Contract Drafting & Review',
      'Intellectual Property (IP) & Trademark Registration': 'Intellectual Property (IP) & Trademark Registration',
      'Legal Research & Compliance Advisory': 'Legal Research & Compliance Advisory',
      'Court Documentation & Litigation Support': 'Court Documentation & Litigation Support',
      'Real Estate & Property Law': 'Real Estate & Property Law',
      'NGO & Nonprofit Legal Support': 'NGO & Nonprofit Legal Support',
      'Family Law Consultation': 'Family Law Consultation',
      'Immigration & Visa Advisory': 'Immigration & Visa Advisory',
      'Customs & Trade Law Advisory': 'Customs & Trade Law Advisory',

      // Business & Consulting Specializations
      'Business Plan Writing': 'Business Plan Writing',
      'Feasibility Studies': 'Feasibility Studies',
      'Market Research & Analysis': 'Market Research & Analysis',
      'Financial Modeling': 'Financial Modeling',
      'Pitch Deck Preparation': 'Pitch Deck Preparation',
      'Legal Consulting (Contracts, Company Formation)': 'Legal Consulting (Contracts, Company Formation)',
      'Tax & Accounting Advisory': 'Tax & Accounting Advisory',
      'Project Management': 'Project Management',
      'Business Process Reengineering': 'Business Process Reengineering',
      'Risk & Internal Audit Consulting': 'Risk & Internal Audit Consulting',
      'ERP System Advisory (SAP, Oracle, Zoho)': 'ERP System Advisory (SAP, Oracle, Zoho)',

      // Technology & Development Specializations
      'Website Development (HTML, WordPress, React)': 'Website Development (HTML, WordPress, React)',
      'Mobile App Development (Android/iOS)': 'Mobile App Development (Android/iOS)',
      'UX/UI Design': 'UX/UI Design',
      'Software Engineering': 'Software Engineering',
      'QA Testing & Debugging': 'QA Testing & Debugging',
      'Data Entry & Web Research': 'Data Entry & Web Research',
      'Tech Support / Helpdesk': 'Tech Support / Helpdesk',
      'AI & Machine Learning Services': 'AI & Machine Learning Services',
      'Cybersecurity Audits': 'Cybersecurity Audits',
      'Database Management (SQL, MongoDB)': 'Database Management (SQL, MongoDB)',
      'System Administration': 'System Administration',
      'Blockchain & Smart Contracts Development': 'Blockchain & Smart Contracts Development',

      // Design & Creative Specializations
      'Logo & Branding Design': 'Logo & Branding Design',
      'Social Media Design': 'Social Media Design',
      'Business Cards & Stationery': 'Business Cards & Stationery',
      'Infographics': 'Infographics',
      'Presentation Design (PowerPoint, Keynote)': 'Presentation Design (PowerPoint, Keynote)',
      'Product Mockups': 'Product Mockups',
      'Animation (2D, Whiteboard, Motion Graphics)': 'Animation (2D, Whiteboard, Motion Graphics)',
      'Video Editing': 'Video Editing',
      'Interior Design & 3D Rendering': 'Interior Design & 3D Rendering',
      'Fashion Design': 'Fashion Design',
      'Architectural Drafting': 'Architectural Drafting',

      // Marketing & Sales Specializations
      'Digital Marketing Strategy': 'Digital Marketing Strategy',
      'Social Media Management': 'Social Media Management',
      'SEO & SEM Services': 'SEO & SEM Services',
      'Paid Ads Management (Meta, Google)': 'Paid Ads Management (Meta, Google)',
      'Email Marketing Campaigns': 'Email Marketing Campaigns',
      'Influencer Marketing': 'Influencer Marketing',
      'Marketing Automation (Hubspot, Zoho)': 'Marketing Automation (Hubspot, Zoho)',
      'Affiliate Program Setup': 'Affiliate Program Setup',
      'Lead Generation': 'Lead Generation',
      'Sales Funnel Optimization': 'Sales Funnel Optimization',
      'Public Relations & Press Releases': 'Public Relations & Press Releases',

      // Writing & Content Creation Specializations
      'Article & Blog Writing': 'Article & Blog Writing',
      'Copywriting (Web, Ads, Landing Pages)': 'Copywriting (Web, Ads, Landing Pages)',
      'Script Writing (YouTube, Ads, Reels)': 'Script Writing (YouTube, Ads, Reels)',
      'Technical Writing': 'Technical Writing',
      'Resume & Cover Letter Writing': 'Resume & Cover Letter Writing',
      'Grant Writing': 'Grant Writing',
      'Editing & Proofreading': 'Editing & Proofreading',
      'Academic Writing': 'Academic Writing',
      'LinkedIn Profile Optimization': 'LinkedIn Profile Optimization',
      'Subtitling & Captioning': 'Subtitling & Captioning',

      // Translation & Languages Specializations
      'Translation': 'Translation',
      'Legal & Technical Translation': 'Legal & Technical Translation',
      'Interpretation (Remote or Live)': 'Interpretation (Remote or Live)',
      'Voice-over in Arabic, English, French': 'Voice-over in Arabic, English, French',
      'Language Tutoring (Arabic, French, German, English)': 'Language Tutoring (Arabic, French, German, English)',
      'Localization for Apps & Websites': 'Localization for Apps & Websites',
      'Transcription Services (Audio/Video)': 'Transcription Services (Audio/Video)',

      // Education & Coaching Specializations
      'Private Tutoring (Math, Science, English…)': 'Private Tutoring (Math, Science, English…)',
      'Online Course Creation': 'Online Course Creation',
      'Study Abroad Consulting': 'Study Abroad Consulting',
      'IELTS / TOEFL Coaching': 'IELTS / TOEFL Coaching',
      'CV & Interview Prep': 'CV & Interview Prep',
      'Career Coaching': 'Career Coaching',
      'Life Coaching': 'Life Coaching',
      'University Application Support': 'University Application Support',
      'Educational Content Development': 'Educational Content Development',

      // Administrative & Virtual Assistance Specializations
      'Virtual Assistant Services': 'Virtual Assistant Services',
      'Customer Support (Email, Chat)': 'Customer Support (Email, Chat)',
      'Calendar & Task Management': 'Calendar & Task Management',
      'Travel Planning & Booking': 'Travel Planning & Booking',
      'CRM Data Entry': 'CRM Data Entry',
      'Event Planning': 'Event Planning',
      'Data Collection / Market Surveys': 'Data Collection / Market Surveys',
      'Procurement Assistance': 'Procurement Assistance',
      'Research Assistant Services': 'Research Assistant Services',

      // Arts, Culture & Media Specializations
      'Music Composition': 'Music Composition',
      'Audio Mixing & Mastering': 'Audio Mixing & Mastering',
      'Podcast Editing': 'Podcast Editing',
      'Voice Acting (Arabic, English, French)': 'Voice Acting (Arabic, English, French)',
      'Photography & Photo Editing': 'Photography & Photo Editing',
      'Script Narration': 'Script Narration',
      'Cultural Consultation': 'Cultural Consultation',
      'Arabic Calligraphy / Design': 'Arabic Calligraphy / Design',
      'Heritage Storytelling (for NGOs or campaigns)': 'Heritage Storytelling (for NGOs or campaigns)',

      // Specialized & Niche Services Specializations
      'Real Estate Documentation': 'Real Estate Documentation',
      'Medical Translation / Medical Support': 'Medical Translation / Medical Support',
      'NGO Proposal Writing': 'NGO Proposal Writing',
      'Migration Support Services': 'Migration Support Services',
      'Humanitarian Aid Consulting': 'Humanitarian Aid Consulting',
      'UX Research in Arabic Markets': 'UX Research in Arabic Markets',
      'Digital Payment Integration': 'Digital Payment Integration',
      'GIS Mapping Services': 'GIS Mapping Services',
      'Import/Export Trade Consulting': 'Import/Export Trade Consulting',
      'Supply Chain Support': 'Supply Chain Support',
      'Recruitment & HR Outsourcing': 'Recruitment & HR Outsourcing',
      'Architecture Portfolio Building': 'Architecture Portfolio Building',

      // Registration Form Labels
      'Main Category': 'Main Category',
      'Specific Domain': 'Specific Domain',
      'Select your main expertise category': 'Select your main expertise category',
      'Select your specific domain': 'Select your specific domain',

      // Footer
      footer: {
        brandName: 'SyrVest',
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
        copyright: '© {{year}} SyrVest Platform. Made with',
        tagline: 'for the Syrian community.',
        policies: {
          privacyPolicy: 'Privacy Policy',
          termsOfService: 'Terms of Service',
          cookiePolicy: 'Cookie Policy',
          accessibility: 'Accessibility'
        }
      },
      
      // Navigation
      posts: 'Posts',
      questions: 'Questions',
      news: 'News',
      profile: 'Profile',
      
      // Authentication
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      
      // Actions
      cancel: 'Cancel',
      save: 'Save',
      saving: 'Saving...',
      edit: 'Edit',
      'edit profile': 'Edit Profile',
      delete: 'Delete',
      'back to posts': 'Back to Posts',
      'goBackHome': 'Go Back Home',
      
      // Posts and Questions
      askQuestion: 'Ask Question',
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
      
      // Common UI
      loading: 'Loading...',
      error: 'Error',
      
      // Voting
      upvote: 'Upvote',
      
      // Comments
      comments: 'Comments',
      
      // User Profile
      joined: 'Joined',
      answers: 'Answers',
      verified: 'Verified',
      
      // Messages
      noPostsFound: 'No posts found',
      recentPosts: 'Recent Posts',
      userMustBeLoggedIn: 'You must be logged in to view this page',
      userNotFound: 'User not found',
      
      // Landing Page
      welcomeSubtitle: 'Syria investment platform " SyrVest"  is a trusted bridge between Syrian professionals and global business needs.',
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
      'Your Gateway to': 'Your Gateway to',
      'Syrian Knowledge': 'Syrian Business Opportunities',
      'Ask a Question': 'Ask a Question',
      'Join as Expert': 'Join as Expert',
      
      // Profile Updates
      profileUpdated: 'Profile Updated',
      profileUpdatedDesc: 'Your profile has been successfully updated',
      failedToUpdate: 'Failed to update {{item}}',
      
      // Errors
      
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
      
      // Expertise Categories
      'Legal Expert': 'خبير قانوني',
      'Investor': 'مستثمر',
      'Founder': 'مؤسس',
      'Government': 'حكومي',
      'Business & Consulting': 'الأعمال والاستشارات',
      'Technology & Development': 'التكنولوجيا والتطوير',
      'Design & Creative': 'التصميم والإبداع',
      'Marketing & Sales': 'التسويق والمبيعات',
      'Writing & Content Creation': 'الكتابة وإنشاء المحتوى',
      'Translation & Languages': 'الترجمة واللغات',
      'Education & Coaching': 'التعليم والتدريب',
      'Administrative & Virtual Assistance': 'المساعدة الإدارية والافتراضية',
      'Arts, Culture & Media': 'الفنون والثقافة والإعلام',
      'Specialized & Niche Services': 'الخدمات المتخصصة والمتخصصة',

      // Legal Expert Specializations
      'Company Registration & Business Setup': 'تسجيل الشركات وتأسيس الأعمال',
      'Contract Drafting & Review': 'صياغة ومراجعة العقود',
      'Intellectual Property (IP) & Trademark Registration': 'الملكية الفكرية وتسجيل العلامات التجارية',
      'Legal Research & Compliance Advisory': 'البحث القانوني والاستشارات التنظيمية',
      'Court Documentation & Litigation Support': 'وثائق المحكمة ودعم التقاضي',
      'Real Estate & Property Law': 'قانون العقارات والممتلكات',
      'NGO & Nonprofit Legal Support': 'الدعم القانوني للمنظمات غير الحكومية وغير الربحية',
      'Family Law Consultation': 'استشارات قانون الأسرة',
      'Immigration & Visa Advisory': 'استشارات الهجرة والتأشيرات',
      'Customs & Trade Law Advisory': 'استشارات قانون الجمارك والتجارة',

      // Business & Consulting Specializations
      'Business Plan Writing': 'كتابة خطط الأعمال',
      'Feasibility Studies': 'دراسات الجدوى',
      'Market Research & Analysis': 'بحوث وتحليل السوق',
      'Financial Modeling': 'النمذجة المالية',
      'Pitch Deck Preparation': 'إعداد عروض الاستثمار',
      'Legal Consulting (Contracts, Company Formation)': 'الاستشارات القانونية (العقود، تكوين الشركات)',
      'Tax & Accounting Advisory': 'استشارات الضرائب والمحاسبة',
      'Project Management': 'إدارة المشاريع',
      'Business Process Reengineering': 'إعادة هندسة العمليات التجارية',
      'Risk & Internal Audit Consulting': 'استشارات المخاطر والتدقيق الداخلي',
      'ERP System Advisory (SAP, Oracle, Zoho)': 'استشارات أنظمة تخطيط موارد المؤسسات (SAP، Oracle، Zoho)',

      // Technology & Development Specializations
      'Website Development (HTML, WordPress, React)': 'تطوير المواقع الإلكترونية (HTML، WordPress، React)',
      'Mobile App Development (Android/iOS)': 'تطوير تطبيقات الجوال (Android/iOS)',
      'UX/UI Design': 'تصميم تجربة المستخدم وواجهة المستخدم',
      'Software Engineering': 'هندسة البرمجيات',
      'QA Testing & Debugging': 'اختبار ضمان الجودة وإصلاح الأخطاء',
      'Data Entry & Web Research': 'إدخال البيانات والبحث عبر الإنترنت',
      'Tech Support / Helpdesk': 'الدعم التقني / مكتب المساعدة',
      'AI & Machine Learning Services': 'خدمات الذكاء الاصطناعي والتعلم الآلي',
      'Cybersecurity Audits': 'تدقيق الأمن السيبراني',
      'Database Management (SQL, MongoDB)': 'إدارة قواعد البيانات (SQL، MongoDB)',
      'System Administration': 'إدارة الأنظمة',
      'Blockchain & Smart Contracts Development': 'تطوير البلوك تشين والعقود الذكية',

      // Design & Creative Specializations
      'Logo & Branding Design': 'تصميم الشعارات والهوية التجارية',
      'Social Media Design': 'تصميم وسائل التواصل الاجتماعي',
      'Business Cards & Stationery': 'تصميم بطاقات العمل والقرطاسية',
      'Infographics': 'الرسوم البيانية التوضيحية',
      'Presentation Design (PowerPoint, Keynote)': 'تصميم العروض التقديمية (PowerPoint، Keynote)',
      'Product Mockups': 'نماذج المنتجات الأولية',
      'Animation (2D, Whiteboard, Motion Graphics)': 'الرسوم المتحركة (2D، السبورة البيضاء، الرسوم المتحركة)',
      'Video Editing': 'تحرير الفيديو',
      'Interior Design & 3D Rendering': 'التصميم الداخلي والعرض ثلاثي الأبعاد',
      'Fashion Design': 'تصميم الأزياء',
      'Architectural Drafting': 'الرسم المعماري',

      // Marketing & Sales Specializations
      'Digital Marketing Strategy': 'استراتيجية التسويق الرقمي',
      'Social Media Management': 'إدارة وسائل التواصل الاجتماعي',
      'SEO & SEM Services': 'خدمات تحسين محركات البحث والتسويق عبر محركات البحث',
      'Paid Ads Management (Meta, Google)': 'إدارة الإعلانات المدفوعة (Meta، Google)',
      'Email Marketing Campaigns': 'حملات التسويق عبر البريد الإلكتروني',
      'Influencer Marketing': 'التسويق عبر المؤثرين',
      'Marketing Automation (Hubspot, Zoho)': 'أتمتة التسويق (Hubspot، Zoho)',
      'Affiliate Program Setup': 'إعداد برامج الشراكة',
      'Lead Generation': 'توليد العملاء المحتملين',
      'Sales Funnel Optimization': 'تحسين قمع المبيعات',
      'Public Relations & Press Releases': 'العلاقات العامة والبيانات الصحفية',

      // Writing & Content Creation Specializations
      'Article & Blog Writing': 'كتابة المقالات والمدونات',
      'Copywriting (Web, Ads, Landing Pages)': 'كتابة النصوص الإعلانية (المواقع، الإعلانات، صفحات الهبوط)',
      'Script Writing (YouTube, Ads, Reels)': 'كتابة النصوص (YouTube، الإعلانات، Reels)',
      'Technical Writing': 'الكتابة التقنية',
      'Resume & Cover Letter Writing': 'كتابة السيرة الذاتية ورسالة التغطية',
      'Grant Writing': 'كتابة طلبات المنح',
      'Editing & Proofreading': 'التحرير والتدقيق اللغوي',
      'Academic Writing': 'الكتابة الأكاديمية',
      'LinkedIn Profile Optimization': 'تحسين ملف LinkedIn الشخصي',
      'Subtitling & Captioning': 'إضافة الترجمة والتسميات التوضيحية',

      // Translation & Languages Specializations
      'Translation': 'الترجمة',
      'Legal & Technical Translation': 'الترجمة القانونية والتقنية',
      'Interpretation (Remote or Live)': 'الترجمة الفورية (عن بُعد أو مباشرة)',
      'Voice-over in Arabic, English, French': 'التعليق الصوتي بالعربية والإنجليزية والفرنسية',
      'Language Tutoring (Arabic, French, German, English)': 'تدريس اللغات (العربية، الفرنسية، الألمانية، الإنجليزية)',
      'Localization for Apps & Websites': 'التوطين للتطبيقات والمواقع الإلكترونية',
      'Transcription Services (Audio/Video)': 'خدمات النسخ (الصوت/الفيديو)',

      // Education & Coaching Specializations
      'Private Tutoring (Math, Science, English…)': 'التدريس الخصوصي (الرياضيات، العلوم، الإنجليزية...)',
      'Online Course Creation': 'إنشاء الدورات التدريبية عبر الإنترنت',
      'Study Abroad Consulting': 'استشارات الدراسة في الخارج',
      'IELTS / TOEFL Coaching': 'تدريب IELTS / TOEFL',
      'CV & Interview Prep': 'إعداد السيرة الذاتية والمقابلات',
      'Career Coaching': 'التدريب المهني',
      'Life Coaching': 'التدريب على الحياة',
      'University Application Support': 'دعم طلبات الجامعة',
      'Educational Content Development': 'تطوير المحتوى التعليمي',

      // Administrative & Virtual Assistance Specializations
      'Virtual Assistant Services': 'خدمات المساعد الافتراضي',
      'Customer Support (Email, Chat)': 'دعم العملاء (البريد الإلكتروني، الدردشة)',
      'Calendar & Task Management': 'إدارة التقويم والمهام',
      'Travel Planning & Booking': 'تخطيط وحجز السفر',
      'CRM Data Entry': 'إدخال بيانات إدارة علاقات العملاء',
      'Event Planning': 'تخطيط الفعاليات',
      'Data Collection / Market Surveys': 'جمع البيانات / استطلاعات السوق',
      'Procurement Assistance': 'مساعدة في المشتريات',
      'Research Assistant Services': 'خدمات مساعد البحث',

      // Arts, Culture & Media Specializations
      'Music Composition': 'تأليف الموسيقى',
      'Audio Mixing & Mastering': 'خلط وإتقان الصوت',
      'Podcast Editing': 'تحرير البودكاست',
      'Voice Acting (Arabic, English, French)': 'التمثيل الصوتي (العربية، الإنجليزية، الفرنسية)',
      'Photography & Photo Editing': 'التصوير الفوتوغرافي وتحرير الصور',
      'Script Narration': 'سرد النصوص',
      'Cultural Consultation': 'الاستشارات الثقافية',
      'Arabic Calligraphy / Design': 'الخط العربي / التصميم',
      'Heritage Storytelling (for NGOs or campaigns)': 'سرد التراث (للمنظمات غير الحكومية أو الحملات)',

      // Specialized & Niche Services Specializations
      'Real Estate Documentation': 'وثائق العقارات',
      'Medical Translation / Medical Support': 'الترجمة الطبية / الدعم الطبي',
      'NGO Proposal Writing': 'كتابة مقترحات المنظمات غير الحكومية',
      'Migration Support Services': 'خدمات دعم الهجرة',
      'Humanitarian Aid Consulting': 'استشارات المساعدات الإنسانية',
      'UX Research in Arabic Markets': 'بحوث تجربة المستخدم في الأسواق العربية',
      'Digital Payment Integration': 'تكامل المدفوعات الرقمية',
      'GIS Mapping Services': 'خدمات رسم الخرائط الجغرافية',
      'Import/Export Trade Consulting': 'استشارات تجارة الاستيراد والتصدير',
      'Supply Chain Support': 'دعم سلسلة التوريد',
      'Recruitment & HR Outsourcing': 'التوظيف والاستعانة بمصادر خارجية للموارد البشرية',
      'Architecture Portfolio Building': 'بناء محفظة الهندسة المعمارية',

      // Registration Form Labels
      'Main Category': 'الفئة الرئيسية',
      'Specific Domain': 'المجال المحدد',
      'Select your main expertise category': 'اختر فئة خبرتك الرئيسية',
      'Select your specific domain': 'اختر مجالك المحدد',

      // Footer
      footer: {
        brandName: 'سيرفيست',
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
        copyright: '© {{year}} منصة سيرفيست. صنع بـ',
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
      fullName: 'الاسم الكامل',
      
      // Actions
      cancel: 'إلغاء',
      save: 'حفظ',
      saving: 'جاري الحفظ...',
      edit: 'تعديل',
      'edit profile': 'تعديل الملف الشخصي',
      delete: 'حذف',
      'back to posts': 'العودة للمنشورات',
      'goBackHome': 'العودة للرئيسية',
      
      // Posts and Questions
      askQuestion: 'اطرح سؤالاً',
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
      
      // Common UI
      loading: 'جاري التحميل...',
      error: 'خطأ',
      
      // Voting
      upvote: 'تصويت إيجابي',
      
      // Comments
      comments: 'التعليقات',
      
      // User Profile
      joined: 'انضم في',
      answers: 'الإجابات',
      verified: 'موثق',
      
      // Messages
      noPostsFound: 'لم يتم العثور على منشورات',
      recentPosts: 'المنشورات الأخيرة',
      userMustBeLoggedIn: 'يجب أن تكون مسجل الدخول لعرض هذه الصفحة',
      userNotFound: 'المستخدم غير موجود',
      
      // Landing Page
      welcomeTitle: 'ربط الأصوات السورية عالمياً',
      welcomeSubtitle: 'منصة الاستثمار السورية "سيرفيست" هي جسر الثقة بين المهنيين السوريين واحتياجات الأعمال العالمية',
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
      'Your Gateway to': 'بوابتك إلى',
      'Syrian Knowledge': 'فرص الأعمال السورية',
      'Ask a Question': 'اطرح سؤالاً',
      'Join as Expert': 'انضم كخبير',
      
      // Profile Updates
      profileUpdated: 'تم تحديث الملف الشخصي',
      profileUpdatedDesc: 'تم تحديث ملفك الشخصي بنجاح',
      failedToUpdate: 'فشل في تحديث {{item}}',
      
      // Errors
      
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
