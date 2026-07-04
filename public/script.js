document.addEventListener('DOMContentLoaded', () => {
  // --- Translations (i18n) ---
  const translations = {
    pl: {
      loading: "Wczytywanie...",
      errorTitle: "Brak dostępu",
      errorDesc: "Ten link jest nieaktywny lub niepoprawny. Skontaktuj się z administratorem systemu.",
      demoLabel: "Wybierz wersję demonstracyjną:",
      landingHeroTitle: "Zbieraj szczery feedback od klientów bez ryzyka dla publicznej reputacji",
      landingHeroSub: "Nowoczesny system QR do zarządzania opiniami, który pomoże Twojemu biznesowi rosnąć i stawać się lepszym.",
      step1Title: "Skanowanie QR",
      step1Desc: "Klient skanuje kod QR znajdujący się na stoliku, recepcji lub przy rachunku.",
      step2Title: "Inteligentny filtr",
      step2Desc: "Zadowoleni goście (4-5★) idą pisać opinię w Google. Niezadowoleni (1-3★) trafiają do prywatnego formularza.",
      step3Title: "Wzrost ocen",
      step3Desc: "Unikasz publicznych 1-gwiazdkowych ocen w Google, dostając szansę na rozwiązanie problemu klienta prywatnie.",
      pricingBadge: "Złoty pakiet",
      pricingTitle: "Abonament",
      pricingPrice: "99 zł",
      pricingPeriod: " / miesięcznie",
      pricingDesc: "Pierwsze 14 dni całkowicie za darmo. My dostarczamy spersonalizowany kod QR i wsparcie.",
      contactTitle: "Zamów darmowy test na 14 dni",
      contactDesc: "Wpisz swój e-mail, a przygotujemy dedykowany system QR pod Twoje zbiory opinii.",
      emailLabel: "Adres e-mail",
      emailPlaceholder: "Twój adres e-mail (np. kontakt@firma.pl)",
      contactSubmitBtn: "Odbierz 14 dni za darmo",
      contactSuccess: "Dziękujemy! Skontaktujemy się z Tobą w ciągu 24 godzin.",
      ratingQuestion: "Jak oceniasz naszą obsługę dzisiaj?",
      ratingSubtext: "Wybierz od 1 do 5 gwiazdek, aby kontynuować",
      btnBack: "Wróć",
      feedbackTitle: "Przykro nam!",
      feedbackDesc: "Napisz, co poszło nie tak. Twój feedback trafi bezpośrednio do właściciela.",
      feedbackLabel: "Twoja opinia",
      feedbackPlaceholder: "Opisz swoje doświadczenia... np. długi czas oczekiwania, zimne jedzenie",
      phoneLabel: "Numer telefonu (opcjonalnie)",
      submitBtn: "Wyślij zgłoszenie",
      successTitle: "Dziękujemy!",
      successDesc: "Twój feedback został przekazany bezpośrednio do właściciela. Doceniamy Twoją szczerość i dołożymy starań, aby ulepszyć nasze usługi.",
      btnRestart: "Zakończ",
      errorFeedbackEmpty: "Treść opinii jest wymagana.",
      errorFeedbackShort: "Proszę napisać dłuższą opinię (minimum 5 znaków).",
      errorPhone: "Niepoprawny format numeru telefonu."
    },
    en: {
      loading: "Loading...",
      errorTitle: "Access Denied",
      errorDesc: "This link is inactive or invalid. Please contact the system administrator.",
      demoLabel: "Select a demo version:",
      landingHeroTitle: "Collect honest customer feedback without risking your public reputation",
      landingHeroSub: "A modern QR-based review management system designed to help your business grow and improve.",
      step1Title: "QR Scanning",
      step1Desc: "The customer scans the QR code located on the table, reception, or with the bill.",
      step2Title: "Smart Filter",
      step2Desc: "Satisfied guests (4-5★) go to write a review on Google. Dissatisfied guests (1-3★) go to a private form.",
      step3Title: "Rating Growth",
      step3Desc: "You avoid public 1-star reviews on Google, getting a chance to solve the customer's problem privately.",
      pricingBadge: "Gold Package",
      pricingTitle: "Subscription",
      pricingPrice: "99 PLN",
      pricingPeriod: " / month",
      pricingDesc: "The first 14 days are completely free. We provide a personalized QR code and support.",
      contactTitle: "Order a free 14-day trial",
      contactDesc: "Enter your email, and we will prepare a dedicated QR system for your reviews.",
      emailLabel: "Email address",
      emailPlaceholder: "Your email address (e.g. contact@company.com)",
      contactSubmitBtn: "Get 14 days for free",
      contactSuccess: "Thank you! We will contact you within 24 hours.",
      ratingQuestion: "How do you rate our service today?",
      ratingSubtext: "Select from 1 to 5 stars to continue",
      btnBack: "Back",
      feedbackTitle: "We are sorry!",
      feedbackDesc: "Tell us what went wrong. Your feedback will go directly to the owner.",
      feedbackLabel: "Your feedback",
      feedbackPlaceholder: "Describe your experience... e.g., long wait time, cold food",
      phoneLabel: "Phone number (optional)",
      submitBtn: "Send feedback",
      successTitle: "Thank you!",
      successDesc: "Your feedback has been sent directly to the owner. We appreciate your honesty and will strive to improve our services.",
      btnRestart: "Finish",
      errorFeedbackEmpty: "Feedback content is required.",
      errorFeedbackShort: "Please write a longer feedback (minimum 5 characters).",
      errorPhone: "Invalid phone number format."
    },
    uk: {
      loading: "Завантаження...",
      errorTitle: "Немає доступу",
      errorDesc: "Це посилання неактивне або недійсне. Будь ласка, зв'яжіться з адміністратором.",
      demoLabel: "Виберіть демо-версію:",
      landingHeroTitle: "Збирайте чесний фідбек від клієнтів без ризику для публічної репутації",
      landingHeroSub: "Сучасна QR-система управління відгуками, яка допоможе вашому бізнесу зростати та ставати кращим.",
      step1Title: "Сканування QR",
      step1Desc: "Клієнт сканує QR-код, що знаходиться на столі, рецепції або біля рахунку.",
      step2Title: "Розумний фільтр",
      step2Desc: "Задоволені гості (4-5★) йдуть писати відгук у Google. Незадоволені (1-3★) потрапляють у приватну форму.",
      step3Title: "Зростання оцінок",
      step3Desc: "Ви уникаєте публічних 1-зіркових відгуків у Google, отримуючи шанс вирішити проблему клієнта приватно.",
      pricingBadge: "Золотий пакет",
      pricingTitle: "Абонемент",
      pricingPrice: "99 zł",
      pricingPeriod: " / місяць",
      pricingDesc: "Перші 14 днів абсолютно безкоштовно. Ми надаємо персоналізований QR-код та підтримку.",
      contactTitle: "Замовте безкоштовний тест на 14 днів",
      contactDesc: "Введіть свій e-mail, і ми підготуємо спеціальну систему QR для ваших відгуків.",
      emailLabel: "E-mail адреса",
      emailPlaceholder: "Ваша e-mail адреса (напр. contact@company.pl)",
      contactSubmitBtn: "Отримати 14 днів безкоштовно",
      contactSuccess: "Дякуємо! Ми зв'яжемося з Вами протягом 24 годин.",
      ratingQuestion: "Як ви оцінюєте наше обслуговування сьогодні?",
      ratingSubtext: "Виберіть від 1 до 5 зірок, щоб продовжити",
      btnBack: "Назад",
      feedbackTitle: "Нам шкода!",
      feedbackDesc: "Напишіть, що пішло не так. Ваш відгук потрапить безпосередньо до власника.",
      feedbackLabel: "Ваш відгук",
      feedbackPlaceholder: "Опишіть свій досвід... наприклад, довге очікування, холодна їжа",
      phoneLabel: "Номер телефону (необов'язково)",
      submitBtn: "Надіслати відгук",
      successTitle: "Дякуємо!",
      successDesc: "Ваш відгук передано безпосередньо власнику. Ми цінуємо вашу відвертість і докладемо зусиль, щоб покращити наші послуги.",
      btnRestart: "Завершити",
      errorFeedbackEmpty: "Текст відгуку обов'язковий.",
      errorFeedbackShort: "Будь ласка, напишіть довший відгук (мінімум 5 символів).",
      errorPhone: "Неправильний формат номеру телефону."
    },
    ru: {
      loading: "Загрузка...",
      errorTitle: "Нет доступа",
      errorDesc: "Эта ссылка неактивна или недействительна. Пожалуйста, свяжитесь с администратором.",
      demoLabel: "Выберите демо-версию:",
      landingHeroTitle: "Собирайте честный фидбек от клиентов без риска для публичной репутации",
      landingHeroSub: "Современная QR-система управления отзывами, которая поможет вашему бизнесу расти и становиться лучше.",
      step1Title: "Сканирование QR",
      step1Desc: "Клиент сканирует QR-код, находящийся на столе, ресепшене или около счета.",
      step2Title: "Умный фильтр",
      step2Desc: "Довольные гости (4-5★) идут писать отзыв в Google. Недовольные (1-3★) попадают в частную форму.",
      step3Title: "Рост оценок",
      step3Desc: "Вы избегаете публичных 1-звездочных отзывов в Google, получая шанс решить проблему клиента приватно.",
      pricingBadge: "Золотой пакет",
      pricingTitle: "Абонемент",
      pricingPrice: "99 zł",
      pricingPeriod: " / месяц",
      pricingDesc: "Первые 14 дней абсолютно бесплатно. Мы предоставляем персонализированный QR-код и поддержку.",
      contactTitle: "Закажите бесплатный тест на 14 дней",
      contactDesc: "Введите свой e-mail, и мы подготовим специальную систему QR для ваших отзывов.",
      emailLabel: "E-mail адрес",
      emailPlaceholder: "Ваш e-mail адрес (напр. contact@company.pl)",
      contactSubmitBtn: "Получить 14 дней бесплатно",
      contactSuccess: "Спасибо! Мы свяжемся с Вами в течение 24 часов.",
      ratingQuestion: "Как вы оцениваете наше обслуживание сегодня?",
      ratingSubtext: "Выберите от 1 до 5 звезд, чтобы продолжить",
      btnBack: "Назад",
      feedbackTitle: "Нам жаль!",
      feedbackDesc: "Напишите, что пошло не так. Ваш отзыв попадет напрямую к владельцу.",
      feedbackLabel: "Ваш отзыв",
      feedbackPlaceholder: "Опишите свой опыт... например, долгое ожидание, холодная еда",
      phoneLabel: "Номер телефону (необязательно)",
      submitBtn: "Отправить отзыв",
      successTitle: "Спасибо!",
      successDesc: "Ваш отзыв передан напрямую владельцу. Мы ценим вашу откровенность и постараемся улучшить наши услуги.",
      btnRestart: "Завершить",
      errorFeedbackEmpty: "Текст отзыва обязателен.",
      errorFeedbackShort: "Пожалуйста, напишите более длинный отзыв (минимум 5 символов).",
      errorPhone: "Неправильный формат номера телефона."
    }
  };

  let currentLang = 'pl'; // Default language

  // --- DOM Elements ---
  const appContainer = document.getElementById('app-container');
  const screenLoading = document.getElementById('screen-loading');
  const screenError = document.getElementById('screen-error');
  const screenRating = document.getElementById('screen-rating');
  const screenFeedback = document.getElementById('screen-feedback');
  const screenSuccess = document.getElementById('screen-success');
  const screenLanding = document.getElementById('screen-landing');

  const errorTitle = document.getElementById('error-title');
  const errorDesc = document.getElementById('error-desc');
  const demoSelectorContainer = document.getElementById('demo-selector-container');

  const clientLogo = document.getElementById('client-logo');
  const clientName = document.getElementById('client-name');
  
  const starButtons = document.querySelectorAll('.star-btn');
  const starsContainer = document.getElementById('stars-container');
  
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackMessage = document.getElementById('feedback-message');
  const feedbackPhone = document.getElementById('feedback-phone');
  const submitBtn = document.getElementById('submit-btn');
  const btnBackRating = document.getElementById('btn-back-rating');
  const btnRestart = document.getElementById('btn-restart');
  
  const messageError = document.getElementById('message-error');
  const phoneError = document.getElementById('phone-error');

  const landingContactForm = document.getElementById('landing-contact-form');
  const landingEmail = document.getElementById('landing-email');
  const landingEmailError = document.getElementById('landing-email-error');
  const landingContactSuccess = document.getElementById('landing-contact-success');
  
  const langButtons = document.querySelectorAll('.lang-btn');

  // --- State Variables ---
  let clientId = '';
  let clientConfig = null;
  let selectedRating = 0;

  // --- Transition Helper ---
  // Safely toggles screens using classList + hidden attribute
  function showScreen(targetScreen) {
    const screens = [screenLoading, screenError, screenRating, screenFeedback, screenSuccess, screenLanding];
    
    // Toggle active container styling for landing vs mobile survey
    if (targetScreen === screenLanding) {
      appContainer.classList.add('landing-active');
    } else {
      appContainer.classList.remove('landing-active');
    }

    screens.forEach(screen => {
      if (screen === targetScreen) {
        screen.classList.remove('hidden');
        screen.removeAttribute('hidden');
      } else {
        screen.classList.add('hidden');
        screen.setAttribute('hidden', 'true');
      }
    });
  }

  // --- i18n Functions ---
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    
    // Update active button
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update trigger UI
    const trigger = document.getElementById('lang-dropdown-trigger');
    if (trigger) {
      const activeFlag = trigger.querySelector('.active-flag');
      const activeLabel = trigger.querySelector('.active-label');
      const flagMap = { pl: '🇵🇱', en: '🇬🇧', uk: '🇺🇦', ru: '🇷🇺' };
      if (activeFlag) activeFlag.textContent = flagMap[lang] || '🇵🇱';
      if (activeLabel) activeLabel.textContent = lang.toUpperCase();
    }

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
    
    // Refresh error messages if currently displayed
    if (messageError.textContent) {
      if (feedbackMessage.value.trim().length === 0) {
        messageError.textContent = translations[lang].errorFeedbackEmpty;
      } else if (feedbackMessage.value.trim().length < 5) {
        messageError.textContent = translations[lang].errorFeedbackShort;
      }
    }
    if (phoneError.textContent) {
       phoneError.textContent = translations[lang].errorPhone;
    }
  }

  // --- Language Switcher Dropdown JS ---
  const langDropdownTrigger = document.getElementById('lang-dropdown-trigger');
  const langDropdownMenu = document.getElementById('lang-dropdown-menu');

  if (langDropdownTrigger && langDropdownMenu) {
    langDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langDropdownTrigger.getAttribute('aria-expanded') === 'true';
      langDropdownTrigger.setAttribute('aria-expanded', !isExpanded);
      langDropdownTrigger.classList.toggle('active', !isExpanded);
      langDropdownMenu.classList.toggle('hidden', isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!langDropdownTrigger.contains(e.target)) {
        langDropdownTrigger.setAttribute('aria-expanded', 'false');
        langDropdownTrigger.classList.remove('active');
        langDropdownMenu.classList.add('hidden');
      }
    });
  }

  // Setup language listeners
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      
      // Close dropdown after selection
      if (langDropdownTrigger && langDropdownMenu) {
        langDropdownTrigger.setAttribute('aria-expanded', 'false');
        langDropdownTrigger.classList.remove('active');
        langDropdownMenu.classList.add('hidden');
      }
    });
  });

  // --- Initialize App ---
  async function init() {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.startsWith('en')) setLanguage('en');
    else if (browserLang.startsWith('uk')) setLanguage('uk');
    else if (browserLang.startsWith('ru') || browserLang.startsWith('be')) setLanguage('ru');
    else setLanguage('pl');

    // 1. Parse query params
    const urlParams = new URLSearchParams(window.location.search);
    clientId = urlParams.get('client');

    if (!clientId) {
      // Show main product landing page instead of error
      showScreen(screenLanding);
      return;
    }

    try {
      // 2. Fetch clients configuration
      const response = await fetch('/clients.json');
      if (!response.ok) {
        throw new Error('Failed to load clients database');
      }
      
      const clientsData = await response.json();
      clientConfig = clientsData[clientId];

      if (!clientConfig) {
        // Client ID not found in database
        showErrorState(
          'Nieznana firma',
          `Firma o identyfikatorze "${clientId}" nie została zarejestrowana w naszym systemie.`,
          true
        );
        return;
      }

      // 3. Load client branding into DOM
      clientName.textContent = clientConfig.name;
      if (clientConfig.logo) {
        clientLogo.src = clientConfig.logo;
        clientLogo.alt = `Logo ${clientConfig.name}`;
      }

      // 4. Show Screen 1
      showScreen(screenRating);
      
    } catch (err) {
      console.error('Initialization error:', err);
      showErrorState(
        'Błąd wczytywania',
        'Nie udało się połączyć z bazą danych konfiguracji. Sprawdź połączenie z internetem i spróbuj ponownie.',
        false
      );
    }
  }

  // Helper to show errors and optional demo list
  function showErrorState(title, desc, showDemos) {
    errorTitle.textContent = title;
    errorDesc.textContent = desc;
    if (showDemos) {
      demoSelectorContainer.classList.remove('hidden');
    } else {
      demoSelectorContainer.classList.add('hidden');
    }
    showScreen(screenError);
  }

  // --- Star Interactive Events ---
  
  // Highlight stars based on value and mode (hover vs select)
  function renderStars(rating, type = 'active') {
    starButtons.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      btn.classList.remove('active', 'hovered');
      
      if (type === 'hovered' && val <= rating) {
        btn.classList.add('hovered');
      } else if (type === 'active' && val <= rating) {
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.setAttribute('aria-checked', 'false');
      }
    });
  }

  // Mouse hover over stars
  starButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      renderStars(val, 'hovered');
    });
  });

  // Mouse leave container restores active state
  starsContainer.addEventListener('mouseleave', () => {
    renderStars(selectedRating, 'active');
  });

  // Handle star selection click
  starButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = parseInt(btn.getAttribute('data-value'), 10);
      selectedRating = rating;
      renderStars(selectedRating, 'active');

      if (rating >= 4) {
        // 4 or 5 stars -> instantly redirect
        if (clientConfig && clientConfig.googleMapsUrl) {
          window.location.href = clientConfig.googleMapsUrl;
        } else {
          alert('Błąd przekierowania: brak skonfigurowanego linku Google Maps.');
        }
      } else {
        // 1, 2 or 3 stars -> show negative feedback form
        // Transition to Screen 2
        showScreen(screenFeedback);
        feedbackMessage.focus();
      }
    });
  });

  // --- Back / Restart Button ---
  btnBackRating.addEventListener('click', () => {
    // Reset rating and go back
    selectedRating = 0;
    renderStars(0, 'active');
    showScreen(screenRating);
  });

  btnRestart.addEventListener('click', () => {
    // Reset state & form
    selectedRating = 0;
    renderStars(0, 'active');
    feedbackForm.reset();
    clearErrors();
    showScreen(screenRating);
  });

  // --- Form Validation & Submission ---
  
  function clearErrors() {
    messageError.textContent = '';
    phoneError.textContent = '';
    feedbackMessage.style.borderColor = '';
    feedbackPhone.style.borderColor = '';
  }

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate message
    const messageVal = feedbackMessage.value.trim();
    if (!messageVal) {
      messageError.textContent = translations[currentLang].errorFeedbackEmpty;
      feedbackMessage.style.borderColor = 'var(--accent-red)';
      isValid = false;
    } else if (messageVal.length < 5) {
      messageError.textContent = translations[currentLang].errorFeedbackShort;
      feedbackMessage.style.borderColor = 'var(--accent-red)';
      isValid = false;
    }

    // Validate phone (optional, but if filled, test for general format)
    const phoneVal = feedbackPhone.value.trim();
    if (phoneVal) {
      // Basic phone pattern check (allows spaces, +, digits, min length 9)
      const phoneRegex = /^[+]?[0-9\s-]{9,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        phoneError.textContent = translations[currentLang].errorPhone;
        feedbackPhone.style.borderColor = 'var(--accent-red)';
        isValid = false;
      }
    }

    if (!isValid) return;

    // Set UI submitting state
    const submitText = submitBtn.querySelector('.btn-text');
    const submitLoader = submitBtn.querySelector('.btn-loader');
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoader.classList.remove('hidden');

    try {
      const payload = {
        client_id: clientId,
        rating: selectedRating,
        message: messageVal,
        phone: phoneVal || ''
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Server error');
      }

      // Transition to Screen 3 (Success)
      showScreen(screenSuccess);

    } catch (err) {
      console.error('Submission error:', err);
      // Display form error message
      messageError.textContent = `Błąd wysyłania: ${err.message || 'Nie udało się połączyć z serwerem.'}`;
      feedbackMessage.style.borderColor = 'var(--accent-red)';
    } finally {
      // Reset UI submitting state
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitLoader.classList.add('hidden');
    }
  });

  // --- Landing Contact Form Submission ---
  if (landingContactForm) {
    landingContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      landingEmailError.textContent = '';
      landingEmail.style.borderColor = '';

      const emailVal = landingEmail.value.trim();
      if (!emailVal) {
        landingEmailError.textContent = 'Adres e-mail jest wymagany.';
        landingEmail.style.borderColor = 'var(--accent-red)';
        return;
      }

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        landingEmailError.textContent = 'Niepoprawny format adresu e-mail.';
        landingEmail.style.borderColor = 'var(--accent-red)';
        return;
      }

      // High-fidelity UI flow: show success state client-side
      landingContactForm.classList.add('hidden');
      landingContactSuccess.classList.remove('hidden');

      // Post this lead to our backend to store in Google Sheet/CSV!
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: 'LANDING_PAGE_LEAD',
            rating: 5,
            message: `Zapytanie o darmowy test 14-dniowy od: ${emailVal}`,
            phone: ''
          })
        });
      } catch (err) {
        console.error('Lead post failed:', err);
      }
    });
  }

  // Start initialization
  init();
});
