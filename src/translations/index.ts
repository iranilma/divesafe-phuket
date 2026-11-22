import { SupportedLanguage } from '../types';

export interface Translations {
  nav: {
    home: string;
    journeys: string;
    catalogue: string;
    destinations: string;
    whyUs: string;
    faq: string;
    contact: string;
    adminPortal: string;
    bookNow: string;
  };
  hero: {
    badge: string;
    headline: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  journeys: {
    sectionTitle: string;
    sectionSubtitle: string;
    choosePath: string;
    beginnerTab: string;
    beginnerSubtitle: string;
    certifiedTab: string;
    certifiedSubtitle: string;
    coursesTab: string;
    coursesSubtitle: string;
    
    // Journey A
    journeyATitle: string;
    journeyADesc: string;
    q1TriedDiving: string;
    q2TryOrCert: string;
    q3Participants: string;
    q4Date: string;
    q5Swimming: string;
    q6PreviousExp: string;
    
    // Journey B
    journeyBTitle: string;
    journeyBDesc: string;
    qB1Cert: string;
    qB2LoggedDives: string;
    qB3LastDive: string;
    qB4Interests: string;
    qB5Date: string;

    // Journey C
    journeyCTitle: string;
    journeyCDesc: string;
    qC1CourseBefore: string;
    qC2CurrentCert: string;
    qC3LevelWanted: string;
    qC4Date: string;
    qC5Participants: string;

    // Recommendation & Form
    recTitle: string;
    recSubtitle: string;
    reqMoreInfo: string;
    disclaimer: string;
    contactFormTitle: string;
    nameLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    hotelLabel: string;
    notesLabel: string;
    submitEnquiry: string;
    enquirySuccess: string;
    openWhatsAppBtn: string;
  };
  catalogue: {
    title: string;
    subtitle: string;
    all: string;
    beginner: string;
    certified: string;
    courses: string;
    refresher: string;
    specialty: string;
    priceFrom: string;
    requestQuote: string;
    viewDetails: string;
    enquireWhatsApp: string;
    duration: string;
    depth: string;
    prerequisites: string;
  };
  destinations: {
    title: string;
    subtitle: string;
    exploreBtn: string;
    depthRange: string;
    marineLife: string;
    tripsOffered: string;
  };
  common: {
    certifiedInstructor: string;
    tatApproved: string;
    ssiCenter: string;
    smallGroups: string;
    whatsappChat: string;
    callUs: string;
    sendEnquiry: string;
    close: string;
    back: string;
    next: string;
    step: string;
    of: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    nav: {
      home: 'Home',
      journeys: 'Find Experience',
      catalogue: 'Catalogue & Courses',
      destinations: 'Destinations',
      whyUs: 'Why DiveSafe',
      faq: 'FAQ',
      contact: 'Contact',
      adminPortal: 'Staff Portal',
      bookNow: 'Find My Dive'
    },
    hero: {
      badge: 'Official SSI Dive Center #766703 • TAT no. 34/03074',
      headline: 'Discover Your Next Underwater Adventure',
      tagline: "Whether you're taking your first breath underwater or exploring new dive sites, discover the right diving experience in Phuket with DiveSafe.",
      primaryCta: 'FIND MY DIVING EXPERIENCE',
      secondaryCta: 'EXPLORE DIVING COURSES',
      trust1: 'Small Ratio Personal Groups (Max 1:2 to 1:4)',
      trust2: 'Led by Veteran Pro Roman Zack (20+ Yrs)',
      trust3: 'Fully Licensed, Insured & Multilingual'
    },
    journeys: {
      sectionTitle: 'Tailored Diving Experiences',
      sectionSubtitle: 'Select your starting point below. Answer a few brief questions, and our system will match you with the ideal verified Phuket diving program.',
      choosePath: 'Choose your diving profile:',
      beginnerTab: "I'M A BEGINNER",
      beginnerSubtitle: 'Never dived before or limited trial experience',
      certifiedTab: "I'M A CERTIFIED DIVER",
      certifiedSubtitle: 'Hold Open Water, Advanced or Master license',
      coursesTab: 'I WANT TO LEARN TO DIVE',
      coursesSubtitle: 'Obtain lifetime international certification',
      
      journeyATitle: 'Your First Diving Adventure Starts Here',
      journeyADesc: 'Experience the weightless thrill of the ocean with zero pressure. Safe, gentle, world-class beginner dive programs.',
      q1TriedDiving: '1. Have you ever tried scuba diving before?',
      q2TryOrCert: '2. Are you interested in just trying diving, or obtaining a full certification?',
      q3Participants: '3. How many people are joining this experience?',
      q4Date: '4. What is your preferred diving date in Phuket?',
      q5Swimming: '5. Are you comfortable swimming in open water?',
      q6PreviousExp: '6. Any previous water experience (snorkeling, trial dive, pool)?',

      journeyBTitle: "Explore Phuket's Best Dive Sites",
      journeyBDesc: 'Crystal-clear island waters, historic shipwrecks, and dramatic limestone walls tailored to your certification level.',
      qB1Cert: '1. What diving certification do you hold?',
      qB2LoggedDives: '2. Approximately how many logged dives do you have?',
      qB3LastDive: '3. When was your last logged scuba dive?',
      qB4Interests: '4. What type of diving interests you most?',
      qB5Date: '5. What is your preferred diving date in Phuket?',

      journeyCTitle: 'Start Your Diving Certification Journey',
      journeyCDesc: 'Earn an internationally recognized lifetime scuba license with Phuket’s most patient and experienced dive instructors.',
      qC1CourseBefore: '1. Have you completed any diving course or theory before?',
      qC2CurrentCert: '2. Which certification level do you currently hold (if any)?',
      qC3LevelWanted: '3. Are you seeking beginner or advanced training?',
      qC4Date: '4. When would you like to start your course in Phuket?',
      qC5Participants: '5. How many students will be training together?',

      recTitle: 'Recommended For You',
      recSubtitle: 'Based on your experience, goals, and dates, here is the ideal verified DiveSafe Phuket program:',
      reqMoreInfo: 'REQUEST MORE INFORMATION & QUOTATION',
      disclaimer: 'Notice: Recommendations are preliminary and based on published DiveSafe standards. Final dive planning, medical fitness verification, and schedule availability must be confirmed by the diving operator.',
      contactFormTitle: 'Request Booking Details & Personal Quote',
      nameLabel: 'Full Name *',
      emailLabel: 'Email Address *',
      whatsappLabel: 'WhatsApp / Mobile Number (with country code) *',
      hotelLabel: 'Phuket Hotel / Accommodation (for boat transfer)',
      notesLabel: 'Additional questions or foot size (e.g. EU 42)',
      submitEnquiry: 'Submit Enquiry & Generate WhatsApp Link',
      enquirySuccess: 'Thank you! Your enquiry has been received and logged in our system.',
      openWhatsAppBtn: 'Open Conversation in WhatsApp'
    },
    catalogue: {
      title: 'Experience & Course Catalogue',
      subtitle: 'Browse all official diving day trips, certification courses, and specialties offered by DiveSafe Phuket.',
      all: 'All Offerings',
      beginner: 'Beginners & Try Dives',
      certified: 'Certified Fun Dives',
      courses: 'Diving Courses',
      refresher: 'Skills Refresher',
      specialty: 'Specialties',
      priceFrom: 'From',
      requestQuote: 'Request a quotation',
      viewDetails: 'View Details',
      enquireWhatsApp: 'Enquire on WhatsApp',
      duration: 'Duration',
      depth: 'Max Depth',
      prerequisites: 'Prerequisites'
    },
    destinations: {
      title: 'Top Phuket Dive Destinations',
      subtitle: 'Explore the marine sanctuaries, wrecks, and tropical reefs visited by DiveSafe day boats.',
      exploreBtn: 'View Trip Details',
      depthRange: 'Depth Range',
      marineLife: 'Key Marine Life',
      tripsOffered: 'Offered Trips'
    },
    common: {
      certifiedInstructor: 'SSI Dive Center & Certified Professionals',
      tatApproved: 'Tourism Authority of Thailand Lic. 34/03074',
      ssiCenter: 'SSI Center ID 766703',
      smallGroups: 'Small 1:2 to 1:4 Group Ratios Guaranteed',
      whatsappChat: 'Chat on WhatsApp',
      callUs: 'Call +66 94 001 8590',
      sendEnquiry: 'Send Enquiry',
      close: 'Close',
      back: 'Back',
      next: 'Next Question',
      step: 'Step',
      of: 'of'
    }
  },

  ru: {
    nav: {
      home: 'Главная',
      journeys: 'Подобрать дайвинг',
      catalogue: 'Каталог и курсы',
      destinations: 'Локации',
      whyUs: 'О DiveSafe',
      faq: 'Частые вопросы',
      contact: 'Контакты',
      adminPortal: 'Панель персонала',
      bookNow: 'Подобрать тур'
    },
    hero: {
      badge: 'Официальный дайв-центр SSI #766703 • Лицензия ТАТ 34/03074',
      headline: 'Откройте для себя подводный мир Пхукета',
      tagline: 'Делаете ли вы свой первый вдох под водой или исследуете глубокие рифы — выберите идеальный дайвинг на Пхукете с DiveSafe.',
      primaryCta: 'ПОДОБРАТЬ МОЙ ДАЙВИНГ',
      secondaryCta: 'СМОТРЕТЬ КУРСЫ ДАЙВИНГА',
      trust1: 'Индивидуальный подход и малые группы (макс. 1:2 – 1:4)',
      trust2: 'Руководитель Роман Зак (опыт более 20 лет)',
      trust3: 'Полная страховка, лицензия ТАТ, говорим по-русски'
    },
    journeys: {
      sectionTitle: 'Персональный подбор дайвинга',
      sectionSubtitle: 'Выберите ваш уровень ниже. Ответьте на несколько вопросов, и мы порекомендуем подходящую официальную программу DiveSafe Phuket.',
      choosePath: 'Выберите ваш профиль:',
      beginnerTab: 'Я НОВИЧОК',
      beginnerSubtitle: 'Никогда не погружался или есть небольшой пробный опыт',
      certifiedTab: 'Я СЕРТИФИЦИРОВАННЫЙ ДАЙВЕР',
      certifiedSubtitle: 'Имею сертификат Open Water, Advanced или выше',
      coursesTab: 'ХОЧУ НАУЧИТЬСЯ И ПОЛУЧИТЬ СЕРТИФИКАТ',
      coursesSubtitle: 'Международный пожизненный сертификат дайвера',
      
      journeyATitle: 'Ваше первое подводное приключение начинается здесь',
      journeyADesc: 'Попробуйте дайвинг в комфортной и безопасной обстановке с опытным русскоязычным инструктором.',
      q1TriedDiving: '1. Пробовали ли вы когда-либо погружаться с аквалангом?',
      q2TryOrCert: '2. Вы хотите просто попробовать дайвинг или сразу получить международный сертификат?',
      q3Participants: '3. Сколько человек будет участвовать?',
      q4Date: '4. Желаемая дата погружения на Пхукете?',
      q5Swimming: '5. Уверенно ли вы держитесь на воде?',
      q6PreviousExp: '6. Есть ли опыт снорклинга или пробного погружения?',

      journeyBTitle: 'Исследуйте лучшие дайв-сайты Пхукета',
      journeyBDesc: 'Кристальная вода островов Рача, затонувший паром King Cruiser и морские заповедники Пхи-Пхи.',
      qB1Cert: '1. Какой сертификат дайвера у вас есть?',
      qB2LoggedDives: '2. Сколько примерно зарегистрированных погружений в вашем логбуке?',
      qB3LastDive: '3. Когда было ваше последнее погружение?',
      qB4Interests: '4. Что вас больше всего интересует под водой?',
      qB5Date: '5. Предпочитаемая дата дайвинга на Пхукете?',

      journeyCTitle: 'Начните путь к сертификации дайвера',
      journeyCDesc: 'Пройдите обучение по международным стандартам SSI / PADI у самых терпеливых инструкторов Пхукета.',
      qC1CourseBefore: '1. Проходили ли вы ранее теоретический курс или погружения?',
      qC2CurrentCert: '2. Какой сертификат у вас имеется на данный момент?',
      qC3LevelWanted: '3. Вас интересует начальный курс (Open Water) или продвинутый (Advanced)?',
      qC4Date: '4. Когда вы планируете начать обучение?',
      qC5Participants: '5. Сколько студентов будет обучаться вместе?',

      recTitle: 'Рекомендованная программа для вас',
      recSubtitle: 'На основе ваших ответов мы подобрали оптимальную программу DiveSafe Phuket:',
      reqMoreInfo: 'ЗАПРОСИТЬ ДЕТАЛИ И РАСЧЕТ СТОИМОСТИ',
      disclaimer: 'Внимание: Рекомендация носит предварительный характер. Окончательное расписание, допуск по здоровью и бронирование подтверждаются оператором DiveSafe.',
      contactFormTitle: 'Запрос расчета и бронирования',
      nameLabel: 'Ваше имя *',
      emailLabel: 'Электронная почта *',
      whatsappLabel: 'WhatsApp / Телефон (с кодом страны) *',
      hotelLabel: 'Отель на Пхукете (для трансфера на пирс)',
      notesLabel: 'Размер обуви / ласт (например EU 42) и пожелания',
      submitEnquiry: 'Отправить заявку и сформировать сообщение WhatsApp',
      enquirySuccess: 'Спасибо! Ваша заявка принята и зарегистрирована в системе DiveSafe.',
      openWhatsAppBtn: 'Открыть диалог в WhatsApp'
    },
    catalogue: {
      title: 'Каталог программ и курсов',
      subtitle: 'Все официальные однодневные туры, курсы сертификации и дайв-сафари DiveSafe Phuket.',
      all: 'Все программы',
      beginner: 'Для новичков',
      certified: 'Для сертифицированных',
      courses: 'Курсы дайвинга',
      refresher: 'Освежение навыков (Refresher)',
      specialty: 'Спецкурсы',
      priceFrom: 'От',
      requestQuote: 'Запросить расчет',
      viewDetails: 'Подробнее',
      enquireWhatsApp: 'Узнать в WhatsApp',
      duration: 'Длительность',
      depth: 'Глубина',
      prerequisites: 'Требования'
    },
    destinations: {
      title: 'Популярные локации для дайвинга',
      subtitle: 'Заповедники, рэки и тропические рифы Андаманского моря.',
      exploreBtn: 'Подробнее о туре',
      depthRange: 'Глубины',
      marineLife: 'Морские обитатели',
      tripsOffered: 'Доступные туры'
    },
    common: {
      certifiedInstructor: 'Дайв-центр SSI и русскоязычные инструкторы',
      tatApproved: 'Лицензия тур. управления Таиланда TAT 34/03074',
      ssiCenter: 'Номер дайв-центра SSI 766703',
      smallGroups: 'Гарантия малых групп (максимум 1:2 – 1:4)',
      whatsappChat: 'Написать в WhatsApp',
      callUs: 'Звонок +66 94 001 8590',
      sendEnquiry: 'Отправить заявку',
      close: 'Закрыть',
      back: 'Назад',
      next: 'Следующий вопрос',
      step: 'Шаг',
      of: 'из'
    }
  },

  he: {
    nav: {
      home: 'בית',
      journeys: 'התאמת צלילה',
      catalogue: 'קורסים וצלילות',
      destinations: 'אתרי צלילה',
      whyUs: 'למה DiveSafe',
      faq: 'שאלות ותשובות',
      contact: 'צור קשר',
      adminPortal: 'ניהול עסק',
      bookNow: 'התאם חוויה'
    },
    hero: {
      badge: 'מועדון צלילה מורשה SSI #766703 • רישיון תיירות תאילנדי TAT 34/03074',
      headline: 'גלו את ההרפתקה התת-ימית הבאה שלכם בפוקט',
      tagline: 'בין אם זו הנשימה הראשונה שלכם מתחת למים ובין אם אתם צוללים מנוסים שחוקרים אתרים חדשים — מצאו את חווית הצלילה המדויקת עם DiveSafe.',
      primaryCta: 'מצא את הצלילה המתאימה לי',
      secondaryCta: 'צפה בקורסי צלילה',
      trust1: 'קבוצות קטנות ואישיות (יחס של 1:2 עד 1:4 צוללים למדריך)',
      trust2: 'בהנהלת רומן זק – מעל 20 שנות ניסיון בהדרכת צלילה בפוקט',
      trust3: 'הדרכה בעברית, אנגלית ורוסית • ביטוח ורישוי מלא'
    },
    journeys: {
      sectionTitle: 'התאמת צלילה אישית',
      sectionSubtitle: 'בחרו את רמת הניסיון שלכם, ענו על מספר שאלות קצרות וקבלו המלצה מותאמת אישית מתוך התוכניות הרשמיות של DiveSafe Phuket.',
      choosePath: 'בחר את הפרופיל שלך:',
      beginnerTab: 'אני מתחיל / צלילת היכרות',
      beginnerSubtitle: 'ללא ניסיון קודם או צלילת היכרות בעבר',
      certifiedTab: 'אני צולל מוסמך',
      certifiedSubtitle: 'בעל תעודת כוכב ראשון, כוכב שני או דייבמאסטר',
      coursesTab: 'רוצה לעשות קורס צלילה',
      coursesSubtitle: 'הוצאת תעודת צלילה בינלאומית לכל החיים',
      
      journeyATitle: 'הרפתקת הצלילה הראשונה שלכם מתחילה כאן',
      journeyADesc: 'חוויה בטוחה, מהנה ומודרכת בקצב שלכם עם מדריכים דוברי עברית ואנגלית באתרי השונית השלווים של פוקט.',
      q1TriedDiving: '1. האם יצא לך לצלול בעבר עם בלונים?',
      q2TryOrCert: '2. האם אתה מעוניין רק בצלילת ניסיון חד-יומית או בקורס תעודה מלא?',
      q3Participants: '3. כמה משתתפים מצטרפים לפעילות?',
      q4Date: '4. מהו התאריך המועדף עליך לצלילה בפוקט?',
      q5Swimming: '5. האם אתה שוחה ומרגיש בנוח במים עמוקים?',
      q6PreviousExp: '6. האם יש לך ניסיון קודם בשנירקול או צלילת בריכה?',

      journeyBTitle: 'גלו את אתרי הצלילה הטובים ביותר בפוקט',
      journeyBDesc: 'מימי הטורקיז של איי ראצ׳ה ופי פי, ספינת המעבורת הטרופה קינג קרוזר וקירות האלמוגים המרהיבים.',
      qB1Cert: '1. איזו דרגת הסמכה יש ברשותך?',
      qB2LoggedDives: '2. בערך כמה צלילות רשומות יש לך ביומן הצלילות?',
      qB3LastDive: '3. מתי צללת לאחרונה?',
      qB4Interests: '4. איזה סוג צלילה הכי מעניין אותך?',
      qB5Date: '5. מהו התאריך המועדף עליך לצלילה?',

      journeyCTitle: 'התחילו את מסלול ההסמכה לצלילה',
      journeyCDesc: 'הוציאו רישיון צלילה בינלאומי מוכר (SSI / PADI) עם המדריכים הסבלניים והמנוסים ביותר בפוקט.',
      qC1CourseBefore: '1. האם ביצעת קורס צלילה או למידת תיאוריה בעבר?',
      qC2CurrentCert: '2. איזו תעודת צלילה יש לך כעת (אם בכלל)?',
      qC3LevelWanted: '3. האם אתה מעוניין בקורס צולל מים פתוחים (כוכב 1) או מתקדם (כוכב 2)?',
      qC4Date: '4. מתי תרצה להתחיל את הקורס בפוקט?',
      qC5Participants: '5. כמה חניכים יצטרפו לקורס יחד?',

      recTitle: 'התוכנית המומלצת עבורך',
      recSubtitle: 'בהתאם לתשובותיך, להלן התוכנית המתאימה ביותר עבורך ב-DiveSafe Phuket:',
      reqMoreInfo: 'בקש פרטים נוספים והצעת מחיר',
      disclaimer: 'הבהרה: ההמלצה הינה ראשונית בלבד ומבוססת על המידע שנמסר. התאמה רפואית, בדיקת זמינות ואישור סופי יבוצעו ישירות מול מדריכי המועדון.',
      contactFormTitle: 'בקשת פרטים והצעת מחיר אישית',
      nameLabel: 'שם מלא *',
      emailLabel: 'כתובת אימייל *',
      whatsappLabel: 'מספר וואטסאפ / טלפון נייד (כולל קידומת) *',
      hotelLabel: 'שם המלון בפוקט (לתיאום הסעה למזח)',
      notesLabel: 'מידת נעליים/סנפירים (למשל EU 42) ובקשות מיוחדות',
      submitEnquiry: 'שלח פנייה וצור הודעת וואטסאפ',
      enquirySuccess: 'תודה רבה! פנייתך נקלטה בהצלחה במערכת DiveSafe.',
      openWhatsAppBtn: 'פתח שיחה ב-WhatsApp'
    },
    catalogue: {
      title: 'קטלוג חוויות וקורסים',
      subtitle: 'כל הפלגות הצלילה היומיות, קורסי ההסמכה וההתמחויות של מועדון DiveSafe פוקט.',
      all: 'הכל',
      beginner: 'למתחילים וצלילות היכרות',
      certified: 'לצוללים מוסמכים',
      courses: 'קורסי צלילה',
      refresher: 'צלילת רענון',
      specialty: 'התמחויות',
      priceFrom: 'החל מ-',
      requestQuote: 'בקש הצעת מחיר',
      viewDetails: 'פרטים נוספים',
      enquireWhatsApp: 'בירור בוואטסאפ',
      duration: 'משך פעילות',
      depth: 'עומק מקסימלי',
      prerequisites: 'דרישות מוקדמות'
    },
    destinations: {
      title: 'אתרי הצלילה המובילים בפוקט',
      subtitle: 'שמורות הטבע הימיות, האוניות הטרופות ושוניות האלמוגים של ים אנדמן.',
      exploreBtn: 'פרטי האתר והפלגה',
      depthRange: 'טווח עומקים',
      marineLife: 'בעלי חיים ימיים',
      tripsOffered: 'אפשרויות יציאה'
    },
    common: {
      certifiedInstructor: 'מועדון מורשה SSI והדרכה בעברית',
      tatApproved: 'רישיון משרד התיירות התאילנדי TAT 34/03074',
      ssiCenter: 'מספר מועדון SSI: 766703',
      smallGroups: 'קבוצות קטנות מובטחות (יחס 1:2 עד 1:4 בלבד)',
      whatsappChat: 'שלח הודעת וואטסאפ',
      callUs: 'חייג 094-001-8590 (66+)',
      sendEnquiry: 'שלח פנייה',
      close: 'סגור',
      back: 'חזור',
      next: 'לשאלה הבאה',
      step: 'שלב',
      of: 'מתוך'
    }
  }
};
