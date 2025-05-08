// research.js - Cleaned up version

let db;
const DB_NAME = 'researchSubmissionsDB';
const STORE_NAME = 'submissions';
const DB_VERSION = 1;

let currentLanguage = 'en'; // Default language

const translations = {
  en: {
    pageTitleResearch: "Portfolio | Research",
    researchHeaderTitle: "Research Topics",
    researchHeaderSubtitle: "Explore the following research topics and write your own paper to contribute to the growing knowledge base in web technologies and internet usage, with a special focus on the Middle East and Lebanon.",
    switchToArabicBtnText: "Switch to Arabic",
    switchToEnglishBtnText: "Switch to English",
    topic1Title: "Internet Infrastructure",
    topic1Desc: "Explore the physical and logical components that make up the global internet infrastructure, examining how data travels across networks and the technologies that enable connectivity worldwide.",
    topic1KeyAreas: "Key Research Areas:",
    topic1Area1: "Undersea cable networks and their critical role in global connectivity",
    topic1Area2: "Internet exchange points (IXPs) and their impact on regional internet performance",
    topic1Area3: "Content delivery networks (CDNs) and edge computing infrastructure",
    topic1Area4: "The evolution of network protocols (IPv4 to IPv6 transition)",
    topic1Area5: "Infrastructure resilience and redundancy measures",
    topic1Area6: "Environmental impact of internet infrastructure and sustainable solutions",
    topic1Resources: "Helpful Resources:",
    topic1Resource1: "Submarine Cable Map",
    topic1Resource2: "IXP Explainer",
    topic1Resource3: "ITU Statistics",
    topic1Resource4: "PeeringDB",
    topic2Title: "History of the Web",
    topic2Desc: "Trace the evolution of the World Wide Web from its origins to the present day, examining key technological breakthroughs, pivotal moments, and the people who shaped its development.",
    topic2KeyAreas: "Key Research Areas:",
    topic2Area1: "The creation of HTML, HTTP, and URLs by Tim Berners-Lee",
    topic2Area2: "The browser wars of the 1990s and their impact on web standards",
    topic2Area3: "Web 1.0 to Web 3.0: changing paradigms in user interaction",
    topic2Area4: "The rise of social media platforms and their transformation of the web",
    topic2Area5: "Mobile web development and responsive design evolution",
    topic2Area6: "Regional variations in web adoption and development (with focus on Middle East)",
    topic2Resources: "Helpful Resources:",
    topic2Resource1: "CERN: Birth of the Web",
    topic2Resource2: "W3C History",
    topic2Resource3: "Wayback Machine",
    topic2Resource4: "First Web Browser Simulator",
    topic3Title: "Internet Statistics – Middle East and Lebanon",
    topic3Desc: "Analyze internet usage patterns, connectivity statistics, and digital transformation across the Middle East with a special focus on Lebanon, examining growth trends, challenges, and opportunities.",
    topic3KeyAreas: "Key Research Areas:",
    topic3Area1: "Internet penetration rates and growth across Middle Eastern countries",
    topic3Area2: "Lebanon's internet infrastructure challenges and development",
    topic3Area3: "Mobile vs. fixed broadband adoption in the region",
    topic3Area4: "Impact of political and economic factors on internet accessibility",
    topic3Area5: "E-commerce and digital economy trends in Lebanon and the Middle East",
    topic3Area6: "Social media usage patterns and platform preferences",
    topic3Area7: "Digital divide issues within Lebanon and regional disparities",
    topic3Resources: "Helpful Resources:",
    topic3Resource1: "Middle East Internet Stats",
    topic3Resource2: "Lebanon Telecom Authority",
    topic3Resource3: "Digital Reports",
    topic3Resource4: "Statista Data",
    guidelinesTitle: "Research Paper Guidelines",
    guideline1: "<strong>Choose a specific aspect</strong> of one of the research topics above that interests you.",
    guideline2: "<strong>Formulate a clear research question</strong> that your paper will address.",
    guideline3: "<strong>Conduct thorough research</strong> using a combination of academic sources, industry reports, and reliable online resources.",
    guideline4: "<strong>Structure your paper</strong> with an introduction, literature review, methodology, findings, discussion, and conclusion.",
    guideline5: "<strong>Ensure proper citations</strong> using APA or IEEE format throughout your paper.",
    guideline6: "<strong>Include relevant visuals</strong> such as charts, graphs, or diagrams to support your findings.",
    guideline7: "<strong>Aim for a paper length</strong> of 2,500-3,500 words (excluding references).",
    guideline8: "<strong>Submit your paper</strong> using the form below in PDF format.",
    submissionCtaTitle: "Ready to Submit Your Research?",
    submissionCtaDesc: "Use the form below to submit your completed research paper. Outstanding papers may be featured on our website.",
    formLabelName: "Your Name",
    formLabelEmail: "Email Address",
    formLabelTopic: "Research Topic",
    formTopicOptionDefault: "Select a topic",
    formTopicOptionInfra: "Internet Infrastructure",
    formTopicOptionHistory: "History of the Web",
    formTopicOptionStats: "Internet Statistics – Middle East and Lebanon",
    formLabelPaperTitle: "Paper Title",
    formLabelAbstract: "Abstract (200-300 words)",
    formLabelUpload: "Upload Paper (PDF)",
    formChooseFileBtnText: "Choose File",
    formNoFileChosen: "No file chosen",
    formSubmitBtnText: "Submit Paper",
    notificationPaperSubmitted: "Paper submitted successfully! We will review it and get back to you soon.",
    notificationErrorSaving: "Error saving submission locally.",
    notificationDbError: "Error: Local database not available.",
    notificationTransactionError: "Transaction error while saving.",
    notificationUnexpectedError: "An unexpected error occurred."
  },
  ar: {
    pageTitleResearch: "بورتفوليو | أبحاث",
    researchHeaderTitle: "مواضيع البحث",
    researchHeaderSubtitle: "اكتشف مواضيع البحث التالية واكتب ورقتك البحثية الخاصة للمساهمة في قاعدة المعرفة المتنامية في تقنيات الويب واستخدام الإنترنت، مع التركيز بشكل خاص على الشرق الأوسط ولبنان.",
    switchToArabicBtnText: "التحويل إلى العربية",
    switchToEnglishBtnText: "Switch to English",
    topic1Title: "البنية التحتية للإنترنت",
    topic1Desc: "اكتشف المكونات المادية والمنطقية التي تشكل البنية التحتية العالمية للإنترنت، ودراسة كيفية انتقال البيانات عبر الشبكات والتقنيات التي تتيح الاتصال في جميع أنحاء العالم.",
    topic1KeyAreas: "مجالات البحث الرئيسية:",
    topic1Area1: "شبكات الكابلات البحرية ودورها الحاسم في الاتصال العالمي",
    topic1Area2: "نقاط تبادل الإنترنت (IXPs) وتأثيرها على أداء الإنترنت الإقليمي",
    topic1Area3: "شبكات توصيل المحتوى (CDNs) والبنية التحتية للحوسبة الطرفية",
    topic1Area4: "تطور بروتوكولات الشبكة (الانتقال من IPv4 إلى IPv6)",
    topic1Area5: "مرونة البنية التحتية وتدابير التكرار",
    topic1Area6: "التأثير البيئي للبنية التحتية للإنترنت والحلول المستدامة",
    topic1Resources: "مصادر مفيدة:",
    topic1Resource1: "خريطة الكابلات البحرية",
    topic1Resource2: "شرح نقاط تبادل الإنترنت",
    topic1Resource3: "إحصائيات الاتحاد الدولي للاتصالات",
    topic1Resource4: "قاعدة بيانات PeeringDB",
    topic2Title: "تاريخ الويب",
    topic2Desc: "تتبع تطور شبكة الويب العالمية منذ نشأتها وحتى يومنا هذا، مع دراسة الاختراقات التكنولوجية الرئيسية واللحظات المحورية والأشخاص الذين شكلوا تطورها.",
    topic2KeyAreas: "مجالات البحث الرئيسية:",
    topic2Area1: "إنشاء HTML و HTTP و URLs بواسطة تيم بيرنرز لي",
    topic2Area2: "حروب المتصفحات في التسعينيات وتأثيرها على معايير الويب",
    topic2Area3: "الويب 1.0 إلى الويب 3.0: تغيير النماذج في تفاعل المستخدم",
    topic2Area4: "صعود منصات التواصل الاجتماعي وتحويلها للويب",
    topic2Area5: "تطوير الويب المحمول وتطور التصميم المتجاوب",
    topic2Area6: "الاختلافات الإقليمية في اعتماد وتطوير الويب (مع التركيز على الشرق الأوسط)",
    topic2Resources: "مصادر مفيدة:",
    topic2Resource1: "CERN: ولادة الويب",
    topic2Resource2: "تاريخ W3C",
    topic2Resource3: "آلة Wayback",
    topic2Resource4: "محاكي أول متصفح ويب",
    topic3Title: "إحصائيات الإنترنت – الشرق الأوسط ولبنان",
    topic3Desc: "حلل أنماط استخدام الإنترنت وإحصائيات الاتصال والتحول الرقمي عبر الشرق الأوسط مع التركيز بشكل خاص على لبنان، ودراسة اتجاهات النمو والتحديات والفرص.",
    topic3KeyAreas: "مجالات البحث الرئيسية:",
    topic3Area1: "معدلات انتشار الإنترنت ونموها عبر دول الشرق الأوسط",
    topic3Area2: "تحديات وتطوير البنية التحتية للإنترنت في لبنان",
    topic3Area3: "اعتماد النطاق العريض المتنقل مقابل الثابت في المنطقة",
    topic3Area4: "تأثير العوامل السياسية والاقتصادية على إمكانية الوصول إلى الإنترنت",
    topic3Area5: "اتجاهات التجارة الإلكترونية والاقتصاد الرقمي في لبنان والشرق الأوسط",
    topic3Area6: "أنماط استخدام وسائل التواصل الاجتماعي وتفضيلات المنصات",
    topic3Area7: "قضايا الفجوة الرقمية داخل لبنان والتفاوتات الإقليمية",
    topic3Resources: "مصادر مفيدة:",
    topic3Resource1: "إحصائيات الإنترنت في الشرق الأوسط",
    topic3Resource2: "هيئة تنظيم الاتصالات في لبنان",
    topic3Resource3: "التقارير الرقمية",
    topic3Resource4: "بيانات Statista",
    guidelinesTitle: "إرشادات الورقة البحثية",
    guideline1: "<strong>اختر جانبًا محددًا</strong> من أحد مواضيع البحث المذكورة أعلاه التي تهمك.",
    guideline2: "<strong>صغ سؤال بحث واضحًا</strong> ستتناوله ورقتك البحثية.",
    guideline3: "<strong>قم بإجراء بحث شامل</strong> باستخدام مزيج من المصادر الأكاديمية وتقارير الصناعة والمصادر الموثوقة عبر الإنترنت.",
    guideline4: "<strong>نظم ورقتك البحثية</strong> بمقدمة ومراجعة أدبيات ومنهجية ونتائج ومناقشة وخاتمة.",
    guideline5: "<strong>تأكد من الاستشهادات الصحيحة</strong> باستخدام تنسيق APA أو IEEE في جميع أنحاء ورقتك البحثية.",
    guideline6: "<strong>قم بتضمين مرئيات ذات صلة</strong> مثل المخططات أو الرسوم البيانية لدعم نتائجك.",
    guideline7: "<strong>استهدف طول ورقة بحثية</strong> يتراوح بين 2500 و 3500 كلمة (باستثناء المراجع).",
    guideline8: "<strong>قدم ورقتك البحثية</strong> باستخدام النموذج أدناه بتنسيق PDF.",
    submissionCtaTitle: "هل أنت مستعد لتقديم بحثك؟",
    submissionCtaDesc: "استخدم النموذج أدناه لتقديم ورقتك البحثية المكتملة. قد يتم عرض الأوراق البحثية المتميزة على موقعنا.",
    formLabelName: "اسمك",
    formLabelEmail: "البريد الإلكتروني",
    formLabelTopic: "موضوع البحث",
    formTopicOptionDefault: "اختر موضوعًا",
    formTopicOptionInfra: "البنية التحتية للإنترنت",
    formTopicOptionHistory: "تاريخ الويب",
    formTopicOptionStats: "إحصائيات الإنترنت – الشرق الأوسط ولبنان",
    formLabelPaperTitle: "عنوان البحث",
    formLabelAbstract: "الملخص (200-300 كلمة)",
    formLabelUpload: "تحميل البحث (PDF)",
    formChooseFileBtnText: "اختر ملف",
    formNoFileChosen: "لم يتم اختيار ملف",
    formSubmitBtnText: "إرسال البحث",
    notificationPaperSubmitted: "تم إرسال البحث بنجاح! سنراجعه ونرد عليك قريبًا.",
    notificationErrorSaving: "خطأ في حفظ الإرسال محليًا.",
    notificationDbError: "خطأ: قاعدة البيانات المحلية غير متوفرة.",
    notificationTransactionError: "خطأ في المعاملة أثناء الحفظ.",
    notificationUnexpectedError: "حدث خطأ غير متوقع."
  }
};

function initDB() {
  return new Promise((resolve, reject) => {
    if (db) {
       resolve(db);
       return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => {
      console.error("[Research] IndexedDB error: ", event.target.errorCode);
      reject("Database error: " + event.target.errorCode);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      console.log("[Research] IndexedDB upgrade needed.");
      try {
          const tempDb = event.target.result;
          if (!tempDb.objectStoreNames.contains(STORE_NAME)) {
              const objectStore = tempDb.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
              objectStore.createIndex('name', 'name', { unique: false });
              objectStore.createIndex('email', 'email', { unique: false });
              objectStore.createIndex('topic', 'topic', { unique: false });
              objectStore.createIndex('title', 'title', { unique: false });
              objectStore.createIndex('submissionDate', 'submissionDate', { unique: false });
          }
      } catch (e) {
          console.error("[Research] Error during DB upgrade:", e);
          reject(e);
      }
    };
  });
}

function applyTranslationsResearch() {
    const lang = currentLanguage;
    const langTranslations = translations[lang];

    if (!langTranslations) {
        console.error(`[Research] Language "${lang}" not found in translations object.`);
        return;
    }

    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (!key || element.id === 'langToggleBtn') return; // Skip if no key or if it's the toggle button

        const translatedText = langTranslations[key];

        if (translatedText !== undefined) {
            try {
                // Apply translation based on element type
                if ((element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) || element.tagName === 'BUTTON') {
                     element.textContent = translatedText;
                     if(element.value !== undefined && element.type !== 'submit' && element.type !== 'button') {
                        element.value = translatedText;
                     }
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.placeholder !== undefined) {
                        element.placeholder = translatedText;
                    }
                } else if (element.tagName === 'TITLE') {
                     document.title = translatedText;
                } else if (element.tagName === 'OPTION' && element.value === "") {
                     element.textContent = translatedText;
                }
                else {
                  element.innerHTML = translatedText; // Use innerHTML for elements that might contain tags like <strong>
                }
            } catch (e) {
                console.error(`[Research] Error applying translation for key "${key}" to element:`, element, e);
            }
        } else {
            // Only log warning if translation is truly missing for the current language
            console.warn(`[Research] Translation key "${key}" not found for language "${lang}".`);
        }
    });

    // Update the language toggle button text
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        // Determine which key to use for the button's text based on the CURRENT language
        const btnTextKey = lang === 'en' ? 'switchToArabicBtnText' : 'switchToEnglishBtnText';
        const btnText = langTranslations[btnTextKey]; // Get text from current language's translations
        if (btnText) {
            langToggleBtn.textContent = btnText;
        } else {
            console.warn(`[Research] Button text key "${btnTextKey}" not found for language "${lang}".`);
            // Fallback text if keys are missing
            langToggleBtn.textContent = lang === 'en' ? 'Switch to Arabic' : 'Switch to English';
        }
    }
}

function toggleLanguage() {
  // Toggle the language
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';

  // Update HTML attributes
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

  // Apply text changes
  applyTranslationsResearch();

  // Save preference
  try {
      localStorage.setItem('preferredLanguage', currentLanguage);
  } catch (e) {
      console.error('[Research] Error saving preferred language to localStorage:', e);
  }
  
  // Update file input label text
  updateFileInputLabel();
}

// Helper function specifically for file input label
function updateFileInputLabel(fileName = null) {
    const fileNameDisplay = document.getElementById('fileName');
    if (fileNameDisplay) {
        const noFileKey = 'formNoFileChosen';
        // Get translations for the *current* language, fallback to 'en' if needed
        const currentTranslations = translations[currentLanguage] || translations['en'];
        fileNameDisplay.textContent = fileName ? fileName : (currentTranslations[noFileKey] || 'No file chosen');
        if (!fileName) {
            fileNameDisplay.setAttribute('data-translate-key', noFileKey);
        } else {
            fileNameDisplay.removeAttribute('data-translate-key');
        }
    }
}

function setupResearchFormListener() {
  const researchForm = document.getElementById('researchForm');
  if (!researchForm) {
    console.error("[Research] Research form ('researchForm') not found.");
    return;
  }

  const paperInput = document.getElementById('paper');
  const fileNameDisplay = document.getElementById('fileName');

  if (paperInput && fileNameDisplay) {
    paperInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      updateFileInputLabel(file ? file.name : null); // Use helper to update label
    });
  } else {
    console.warn("[Research] Paper input ('paper') or file name display ('fileName') element not found.");
  }

  researchForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const topicSelect = document.getElementById('topic');
    const titleInput = document.getElementById('title');
    const abstractTextarea = document.getElementById('abstract');
    const paperFileInput = document.getElementById('paper');
    const submitBtn = document.getElementById('submitPaperBtn');

    if (!nameInput || !emailInput || !topicSelect || !titleInput || !abstractTextarea || !paperFileInput || !submitBtn) {
        console.error("[Research] One or more required form elements are missing.");
        showNotification("Form error. Please ensure all fields are present.");
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const topic = topicSelect.value;
    const title = titleInput.value.trim();
    const abstract = abstractTextarea.value.trim();
    const paperFile = paperFileInput.files[0];
    const paperFileName = paperFile ? paperFile.name : null;

    // Validation
    if (!name || !email || !topic || !title || !abstract || !paperFile) {
        showNotification(translations[currentLanguage]?.guideline8 || 'Please fill all fields and upload a PDF file.');
        return;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) { 
         showNotification(translations[currentLanguage]?.formInvalidEmail || 'Please enter a valid email address.');
         return;
    }
    if (paperFile.type !== 'application/pdf') {
        showNotification(translations[currentLanguage]?.guideline8 || 'Please upload a valid PDF file.');
        return;
    }

    const newSubmission = { name, email, topic, title, abstract, paperFileName, submissionDate: new Date() };

    const originalBtnTextKey = submitBtn.getAttribute('data-translate-key');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
      if (!db) {
        await initDB();
        if (!db) {
            throw new Error(translations[currentLanguage]?.notificationDbError || 'Error: Local database not available.');
        }
      }
      
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.add(newSubmission);

      request.onsuccess = () => {
        showNotification(translations[currentLanguage]?.notificationPaperSubmitted || 'Paper submitted successfully!');
        researchForm.reset();
        updateFileInputLabel(); // Reset file name display
      };
      request.onerror = (event) => {
        console.error("[Research] IndexedDB add request error:", event.target.error);
        showNotification(translations[currentLanguage]?.notificationErrorSaving || 'Error saving submission locally.');
      };
      transaction.onerror = (event) => { // Transaction errors are important too
         console.error("[Research] IndexedDB transaction error:", event.target.error);
         showNotification(translations[currentLanguage]?.notificationTransactionError || 'Transaction error while saving.');
      };
    } catch (error) {
        console.error("[Research] Error during submission process:", error);
        showNotification(error.message || translations[currentLanguage]?.notificationUnexpectedError || 'An unexpected error occurred.');
    } finally {
      submitBtn.disabled = false;
      // Restore button text using the current language
      const currentSubmitText = translations[currentLanguage]?.[originalBtnTextKey] || 'Submit Paper'; 
      submitBtn.innerHTML = currentSubmitText;
    }
  });
}

function showNotification(message) {
  document.querySelectorAll('.user-notification-research').forEach(n => n.remove());
  let notification = document.createElement('div');
  notification.className = 'user-notification-research';
  Object.assign(notification.style, {
    position: 'fixed', bottom: '20px', right: '20px',
    backgroundColor: 'var(--primary-color)', color: 'white', padding: '15px',
    borderRadius: 'var(--border-radius-md)', zIndex: '1001', boxShadow: 'var(--shadow-md)',
    transform: 'translateY(100px)', opacity: '0', transition: 'all 0.3s ease-in-out'
  });
   if (document.documentElement.dir === 'rtl') {
       notification.style.right = 'auto';
       notification.style.left = '20px';
   }
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  setTimeout(() => {
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
  }, 3500);
}

// Initialize Everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Determine initial language
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        currentLanguage = savedLang;
    }
    
    // Set initial HTML attributes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    // Apply initial translations
    try {
        applyTranslationsResearch();
    } catch (e) {
        console.error("[Research] Error applying initial translations:", e);
    }

    // Set up the language toggle button listener
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    } else {
        // This warning is crucial if the button isn't found
        console.warn("[Research] Language toggle button ('langToggleBtn') NOT FOUND in the HTML.");
    }

    // Initialize IndexedDB and then set up the form listener
    initDB().then(() => {
        setupResearchFormListener();
    }).catch(error => {
        console.error("[Research] Failed to initialize database on DOMContentLoaded:", error);
        showNotification("Could not initialize local database features.");
    });
});