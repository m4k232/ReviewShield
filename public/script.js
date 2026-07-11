document.addEventListener('DOMContentLoaded', () => {
  // --- Translations (i18n) ---
  const translations = {
    pl: {
      loading: "Wczytywanie...",
      errorTitle: "Brak dostępu",
      errorDesc: "Ten link jest nieaktywny lub niepoprawny. Skontaktuj się z administratorem systemu.",
      demoLabel: "Wybierz wersję demonstracyjną:",
      landingHeroTitle: "Rozwiązuj problemy klientów na miejscu, zanim trafią do sieci",
      landingHeroSub: "Błyskawiczny system QR do zbierania prywatnego feedbacku i budowania lojalności gości.",
      step1Title: "Skanowanie QR",
      step1Desc: "Klient skanuje kod QR znajdujący się na stoliku, recepcji lub przy rachunku.",
      step2Title: "Prywatny kanał",
      step2Desc: "Zadowoleni klienci idą do Google Maps. Goście z uwagami otrzymują prywatny formularz, dając Ci szansę na szybką reakcję.",
      step3Title: "Błyskawiczne alerty",
      step3Desc: "Otrzymujesz negatywny feedback natychmiast wybranym kanałem (e-mail, komunikatory lub arkusze kalkulacyjne, np. Google Sheets). Rozwiązujesz problem na miejscu, zanim klient opuści lokal.",
      pricingBadge: "Złoty pakiet",
      pricingTitle: "Abonament",
      pricingPrice: "99 zł",
      pricingPeriod: " / miesiąc",
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
      rodoDisclaimer: "Podając numer telefonu, zgadzasz się na kontakt w celu rozwiązania zgłoszonego problemu. Szczegóły w <a href='/polityka-prywatnosci.html' target='_blank' rel='noopener noreferrer'>Polityce Prywatności</a>.",
      submitBtn: "Wyślij zgłoszenie",
      successTitle: "Dziękujemy!",
      successDesc: "Twój feedback został przekazany bezpośrednio do właściciela. Doceniamy Twoją szczerość i dołożymy starań, aby ulepszyć nasze usługi.",
      btnRestart: "Zakończ",
      errorFeedbackEmpty: "Treść opinii jest wymagana.",
      errorFeedbackShort: "Proszę napisać dłuższą opinię (minimum 5 znaków).",
      errorPhone: "Niepoprawny format numeru telefonu.",
      redirecting: "Przekierowywanie do Google Maps...",
      errorRateLimit: "Przekroczono limit wysłanych opinii. Spróbuj ponownie później.",
      errorAdblock: "Proszę wyłączyć AdBlocka (Blokera Reklam), aby wysłać opinię.",
      directGoogleLink: "Chcę przejść bezpośrednio do Google Maps",
      faqTitle: "Najczęstsze pytania (Q&A)",
      faqContent: `
        <div class="faq-item">
          <h4 class="faq-q">Czy system ReviewShield jest w 100% legalny?</h4>
          <p class="faq-a">Tak. System jest w pełni zgodny z dyrektywą Omnibus i wytycznymi UOKiK. Nie blokujemy opinii – goście na ekranie zgłoszenia reklamacji mają widoczny bezpośredni link umożliwiający przejście do Google Maps.</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Jak chronicie dane osobowe (RODO)?</h4>
          <p class="faq-a">Podanie telefonu jest dobrowolne. Zbieramy je wyłącznie w celu ułatwienia kontaktu menedżera z gościem. Podpisujemy z lokalami umowę powierzenia przetwarzania danych osobowych (DPA).</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Czy muszę podpisywać długoterminową umowę?</h4>
          <p class="faq-a">Nie, abonament 99 PLN/miesiąc jest rozliczany w trybie miesięcznym. Możesz zrezygnować w każdej chwili z końcem opłaconego okresu.</p>
        </div>
      `,
      regulaminTitle: "Regulamin świadczenia usług",
      regulaminContent: `
        <h4>Regulamin świadczenia usług drogą elektroniczną</h4>
        <p>Ostatnia aktualizacja: 11 lipca 2026 r.</p>
        <h4>1. Postanowienia ogólne</h4>
        <p>Niniejszy Regulamin określa zasady i warunki korzystania z platformy SaaS ReviewShield, dostępnej pod adresem internetowym revshield.pl, za pośrednictwem której świadczone są usługi drogą elektroniczną na rzecz Klientów B2B (przedsiębiorców).</p>
        <h4>2. Definicje</h4>
        <p>Usługodawca: właściciel projektu ReviewShield (kontakt: rvwshield@gmail.com). Klient: przedsiębiorca B2B korzystający z systemu.</p>
        <h4>3. Rodzaje i zakres świadczonych usług</h4>
        <p>Udostępnienie spersonalizowanego systemu zbierania opinii poprzez dedykowane kody QR, wysyłanie powiadomień w czasie rzeczywistym i dostarczanie statystyk.</p>
        <h4>4. Warunki świadczenia usług i wymagania techniczne</h4>
        <p>Do korzystania z Serwisu niezbędne są: urządzenie z dostępem do Internetu, przeglądarka internetowa z obsługą JavaScript oraz aktywna skrzynka e-mail.</p>
        <h4>5. Płatności i warunki subskrypcji</h4>
        <p>Okres próbny trwa 14 dni. Po okresie próbnym opłata wynosi 99 PLN netto miesięcznie za jeden lokal. Usługodawca wystawia faktury bez VAT na podstawie zwolnienia podmiotowego (art. 113 ust. 1 ustawy o VAT). Rezygnacja jest możliwa w dowolnym momencie mailowo.</p>
        <h4>6. Tryb postępowania reklamacyjnego</h4>
        <p>Zgłoszenia reklamacyjne prosimy składać na adres e-mail: rvwshield@gmail.com. Rozpatrujemy je w terminie do 14 dni.</p>
        <h4>7. Prawa autorskie</h4>
        <p>Wszelkie prawa do oprogramowania, kodu źródłowego, logotypu i zawartości strony revshield.pl należą do Usługodawcy.</p>
      `,
      privacyTitle: "Polityka Prywatności",
      privacyContent: `
        <h4>Polityka Prywatności serwisu ReviewShield</h4>
        <p>Ostatnia aktualizacja: 11 lipca 2026 r.</p>
        <h4>1. Administrator Danych Osobowych</h4>
        <p>W odniesieniu do strony revshield.pl administratorem jesteśmy my (rvwshield@gmail.com). W przypadku danych gości zbieranych przez kody QR w lokalach, administratorem jest dany lokal, a my działamy jako Procesor (Podmiot Przetwarzający) na podstawie umowy DPA.</p>
        <h4>2. Zakres zbieranych danych</h4>
        <p>Przetwarzamy: dobrowolnie podany numer telefonu, treść opinii, e-mail (w formularzu ofertowym) oraz dane zbierane automatycznie (adres IP, pliki cookies, Local Storage) w celach antyspamowych.</p>
        <h4>3. Cel i podstawa prawna</h4>
        <p>Dane przetwarzamy na podstawie zgody użytkownika (art. 6 ust. 1 lit. a RODO) w celu zbierania feedbacku i kontaktu, a także na podstawie prawnie uzasadnionego interesu (antyspam — art. 6 ust. 1 lit. f RODO).</p>
        <h4>4. Okres przechowywania danych</h4>
        <p>Dane gości (opinie i telefony) przechowujemy przez maksymalnie 6 miesięcy, a e-maile handlowe do czasu zakończenia rozmów lub wniesienia sprzeciwu.</p>
        <h4>5. Prawa użytkownika</h4>
        <p>Masz prawo do wglądu, poprawiania, ograniczenia i usunięcia swoich danych. Możesz również wycofać zgodę lub złożyć skargę do PUODO. Kontakt: rvwshield@gmail.com.</p>
        <h4>6. Odbiorcy danych</h4>
        <p>Dane przekazujemy wyłącznie menedżerom lokalu, którego opinia dotyczy, oraz zaufanym podprocesorom (Vercel, Telegram API) na podstawie umów powierzenia.</p>
      `
    },
    en: {
      loading: "Loading...",
      errorTitle: "Access Denied",
      errorDesc: "This link is inactive or invalid. Please contact the system administrator.",
      demoLabel: "Select a demo version:",
      landingHeroTitle: "Resolve customer issues on the spot before they hit the web",
      landingHeroSub: "An instant QR-based system for collecting private feedback and building guest loyalty.",
      step1Title: "QR Scanning",
      step1Desc: "The customer scans the QR code located on the table, reception, or with the bill.",
      step2Title: "Private Channel",
      step2Desc: "Satisfied guests go to Google Maps. Guests with concerns receive a private form, giving you a chance to react quickly.",
      step3Title: "Instant Alerts",
      step3Desc: "Receive negative feedback instantly via your preferred channel (email, messengers, or spreadsheets, e.g. Google Sheets). Solve the problem on the spot before the customer leaves.",
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
      feedbackPlaceholder: "Describe your experience... e.g. long waiting time, cold food",
      phoneLabel: "Phone number (optional)",
      rodoDisclaimer: "By providing a phone number, you consent to being contacted to resolve the reported issue. Details in the <a href='/polityka-prywatnosci.html' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>.",
      submitBtn: "Submit feedback",
      successTitle: "Thank you!",
      successDesc: "Your feedback has been sent directly to the owner. We appreciate your honesty and will strive to improve our services.",
      btnRestart: "Finish",
      errorFeedbackEmpty: "Feedback content is required.",
      errorFeedbackShort: "Please write a longer feedback (minimum 5 characters).",
      errorPhone: "Invalid phone number format.",
      redirecting: "Redirecting to Google Maps...",
      errorRateLimit: "Review submission limit exceeded. Please try again later.",
      errorAdblock: "Please disable your AdBlocker to submit feedback.",
      directGoogleLink: "I want to go directly to Google Maps",
      faqTitle: "Frequently Asked Questions (Q&A)",
      faqContent: `
        <div class="faq-item">
          <h4 class="faq-q">Is the ReviewShield system 100% legal?</h4>
          <p class="faq-a">Yes. The system is fully compliant with the Omnibus Directive and UOKiK guidelines. We do not block reviews – guests always have a visible direct link to go to Google Maps on the complaint page.</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">How do you protect personal data (GDPR)?</h4>
          <p class="faq-a">Providing a phone number is optional. We collect it only to allow the restaurant manager to contact the guest to resolve the issue. We sign a Data Processing Agreement (DPA) with venues.</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Do I have to sign a long-term contract?</h4>
          <p class="faq-a">No, the 99 PLN/month subscription is billed monthly. You can cancel at any time at the end of the paid billing period.</p>
        </div>
      `,
      regulaminTitle: "Terms of Service",
      regulaminContent: `
        <h4>Terms of Service (Electronic Services)</h4>
        <p>Last updated: July 11, 2026</p>
        <h4>1. General Provisions</h4>
        <p>These Terms outline the rules for using the ReviewShield SaaS platform at revshield.pl, providing electronic services to B2B clients (merchants).</p>
        <h4>2. Definitions</h4>
        <p>Service Provider: owner of ReviewShield (contact: rvwshield@gmail.com). Client: B2B merchant using the platform.</p>
        <h4>3. Scope of Services</h4>
        <p>Providing a personalized QR review system, real-time alerts, and statistics reports.</p>
        <h4>4. Technical Requirements</h4>
        <p>To use the Service, you need an internet connection, a web browser supporting JavaScript, and an active email address.</p>
        <h4>5. Payments and Subscription</h4>
        <p>Free trial is 14 days. Afterwards, the fee is 99 PLN net per month per location. Invoices are issued without VAT under Polish VAT exemption (Art. 113 paragraph 1 of the VAT Act). Cancel anytime via email.</p>
        <h4>6. Complaint Procedure</h4>
        <p>Complaints will be resolved within 14 days. Please submit complaints to rvwshield@gmail.com.</p>
        <h4>7. Intellectual Property</h4>
        <p>All software, source code, logos, and contents of revshield.pl belong to the Service Provider.</p>
      `,
      privacyTitle: "Privacy Policy",
      privacyContent: `
        <h4>ReviewShield Privacy Policy</h4>
        <p>Last updated: July 11, 2026</p>
        <h4>1. Data Controller</h4>
        <p>ReviewShield is the controller for website data (rvwshield@gmail.com). For guest reviews, ReviewShield acts as a Data Processor on behalf of the restaurant (DPA applies).</p>
        <h4>2. Personal Data Collected</h4>
        <p>We process phone numbers (optional), review text, e-mail (from contact forms), IP addresses, and cookies to prevent spam.</p>
        <h4>3. Purpose and Legal Basis</h4>
        <p>We process data based on user consent (Art. 6 par. 1 lit. a GDPR) to collect feedback and facilitate contact, and based on legitimate interest (spam prevention — Art. 6 par. 1 lit. f GDPR).</p>
        <h4>4. Data Retention Period</h4>
        <p>Guest data (reviews and phone numbers) are kept for up to 6 months. Sales contact emails are processed until negotiations end or objection is raised.</p>
        <h4>5. User Rights</h4>
        <p>You have the right to access, rectify, restrict, or delete your data. You can withdraw consent or lodge a complaint with PUODO. Contact: rvwshield@gmail.com.</p>
        <h4>6. Data Recipients</h4>
        <p>We share guest data only with managers of the corresponding venue, and trusted sub-processors (Vercel, Telegram API) under strict DPA contracts.</p>
      `
    },
    uk: {
      loading: "Завантаження...",
      errorTitle: "Немає доступу",
      errorDesc: "Це посилання неактивне або недійсне. Будь ласка, зв'яжіться з адміністратором.",
      demoLabel: "Виберіть демо-версію:",
      landingHeroTitle: "Вирішуйте проблеми клієнтів на місці, перш ніж вони потраплять в мережу",
      landingHeroSub: "Миттєва QR-система для збору приватного фідбеку та побудови лояльності гостей.",
      step1Title: "Сканування QR",
      step1Desc: "Клієнт сканує QR-код, що знаходиться на столі, рецепції або біля рахунку.",
      step2Title: "Приватний канал",
      step2Desc: "Задоволені гості йдуть до Google Maps. Гості із зауваженнями отримують приватну форму, даючи вам шанс на швидку реакцію.",
      step3Title: "Миттєві сповіщення",
      step3Desc: "Отримуйте негативний фідбек миттєво вибраним каналом (e-mail, месенджери або електронні таблиці, напр. Google Sheets). Вирішуйте проблему на місці, перш ніж клієнт залишить заклад.",
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
      feedbackPlaceholder: "Опишіть свій досвід... наприклад, довгий час очікування, холодна їжа",
      phoneLabel: "Номер телефону (необов'язково)",
      rodoDisclaimer: "Вказуючи номер телефону, ви погоджуєтесь на зв'язок для вирішення повідомленої проблеми. Деталі в <a href='/polityka-prywatnosci.html' target='_blank' rel='noopener noreferrer'>Політиці Конфіденційності</a>.",
      submitBtn: "Надіслати відгук",
      successTitle: "Дякуємо!",
      successDesc: "Ваш відгук передано безпосередньо власнику. Ми цінуємо вашу відвертість і докладемо зусиль, щоб покращити наші послуги.",
      btnRestart: "Завершити",
      errorFeedbackEmpty: "Текст відгуку обов'язковий.",
      errorFeedbackShort: "Будь ласка, напишіть довший відгук (мінімум 5 символів).",
      errorPhone: "Неправильний формат номеру телефону.",
      redirecting: "Перенаправлення на Google Maps...",
      errorRateLimit: "Перевищено ліміт відправки відгуків. Спробуйте пізніше.",
      errorAdblock: "Будь ласка, вимкніть AdBlock, щоб надіслати відгук.",
      directGoogleLink: "Я хочу перейти безпосередньо до Google Maps",
      faqTitle: "Часті питання (Q&A)",
      faqContent: `
        <div class="faq-item">
          <h4 class="faq-q">Чи є система ReviewShield на 100% легальною?</h4>
          <p class="faq-a">Так. Система повністю відповідає Директиві Omnibus та вимогам UOKiK. Ми не блокуємо відгуки – гості завжди бачать пряме посилання для переходу на Google Maps на сторінці скарги.</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Як ви захищаєте персональні дані (RODO)?</h4>
          <p class="faq-a">Вказання номера телефону є добровільним. Ми збираємо його лише для полегшення контакту менеджера з гостем. Ми підписуємо з закладами договір про доручення обробки персональних даних (DPA).</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Чи потрібно підписувати довгостроковий договір?</h4>
          <p class="faq-a">Ні, абонплата 99 PLN/місяць розраховується помісячно. Ви можете скасувати підписку в будь-йкий момент наприкінці оплаченого періоду.</p>
        </div>
      `,
      regulaminTitle: "Регламент надання послуг",
      regulaminContent: `
        <h4>Регламент надання послуг електронним шляхом</h4>
        <p>Останнє оновлення: 11 липня 2026 р.</p>
        <h4>1. Загальні положення</h4>
        <p>Цей Регламент визначає правила використання SaaS-платформи ReviewShield на сайті revshield.pl, що надає електронні послуги клієнтам B2B.</p>
        <h4>2. Визначення</h4>
        <p>Виконавець: власник проекту ReviewShield (контакт: rvwshield@gmail.com). Клієнт: підприємець B2B, що користується системою.</p>
        <h4>3. Обсяг послуг</h4>
        <p>Надання персоналізованої системи збору відгуків через QR-коди, сповіщення в реальному часі та аналітичні звіти.</p>
        <h4>4. Технічні вимоги</h4>
        <p>Для користування сервісом необхідні пристрій з доступом до Інтернету, веб-браузер з підтримкою JavaScript та активна електронна пошта.</p>
        <h4>5. Оплата та підписка</h4>
        <p>Абонентська плата становить 99 PLN нетто на місяць за один заклад. Клієнт має право на безкоштовний тест протягом 14 днів. Скасування підписки можливе в будь-який момент електронною поштою.</p>
        <h4>6. Процедура рекламацій</h4>
        <p>Рекламації розглядаються протягом 14 днів. Звернення надсилайте на rvwshield@gmail.com.</p>
        <h4>7. Інтелектуальна власність</h4>
        <p>Усі права на програмне забезпечення, вихідний код, логотипи та вміст сайту revshield.pl належать Виконавцю.</p>
      `,
      privacyTitle: "Політика Конфіденційності",
      privacyContent: `
        <h4>Політика Конфіденційності ReviewShield</h4>
        <p>Останнє оновлення: 11 липня 2026 р.</p>
        <h4>1. Контролер даних</h4>
        <p>ReviewShield є контролером даних для веб-сайту (rvwshield@gmail.com). Для відгуків гостей закладу ReviewShield діє як Обробник даних (Процесор) за дорученням ресторану (згідно договору DPA).</p>
        <h4>2. Обсяг даних, що збираються</h4>
        <p>Ми обробляємо номер телефону (добровільно), текст відгуку, e-mail (з форми замовлення), IP-адреси та файли cookies для боротьби зі спамом.</p>
        <h4>3. Мета та правова основа</h4>
        <p>Ми обробляємо дані на основі згоди користувача (арт. 6 абз. 1 літ. a RODO) для збору відгуків та контакту, а також на основі законного інтересу (захист від спаму — арт. 6 абз. 1 літ. f RODO).</p>
        <h4>4. Термін зберігання даних</h4>
        <p>Дані гостей (відгуки та телефони) зберігаються протягом максимум 6 місяців. Комерційні e-mail адреси обробляються до завершення переговорів або заперечення користувача.</p>
        <h4>5. Права користувача</h4>
        <p>Ви маєте право на доступ, виправлення, обмеження або видалення своїх даних. Ви можете відкликати згоду або подати скаргу до PUODO. Контакт: rvwshield@gmail.com.</p>
        <h4>6. Отримувачі даних</h4>
        <p>Ми передаємо дані виключно менеджерам відповідного закладу та довіреним підпроцесорам (Vercel, Telegram API) на основі договорів доручення обробки.</p>
      `
    },
    ru: {
      loading: "Загрузка...",
      errorTitle: "Нет доступа",
      errorDesc: "Эта ссылка неактивна или недействительна. Пожалуйста, свяжитесь с администратором.",
      demoLabel: "Выберите демо-версию:",
      landingHeroTitle: "Решайте проблемы клиентов на месте, прежде чем они попадут в сеть",
      landingHeroSub: "Мгновенная QR-система для сбора приватного фидбека и построения лояльности гостей.",
      step1Title: "Сканирование QR",
      step1Desc: "Клиент сканирует QR-код, находящийся на столе, ресепшене или около счета.",
      step2Title: "Приватный канал",
      step2Desc: "Довольные гости идут в Google Maps. Гости с замечаниями получают приватную форму, давая вам шанс на быструю реакцию.",
      step3Title: "Мгновенные уведомления",
      step3Desc: "Получайте негативный фидбек моментально удобным способом (e-mail, мессенджеры или электронные таблицы, напр. Google Sheets). Решайте проблему на месте, пока гость не ушел.",
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
      feedbackPlaceholder: "Опишите свой опыт... например, долгое время ожидания, холодная еда",
      phoneLabel: "Номер телефона (необязательно)",
      rodoDisclaimer: "Указывая номер телефона, вы соглашаетесь на связь для решения возникшей проблемы. Детали в <a href='/polityka-prywatnosci.html' target='_blank' rel='noopener noreferrer'>Политике Конфиденциальности</a>.",
      submitBtn: "Отправить отзыв",
      successTitle: "Спасибо!",
      successDesc: "Ваш отзыв передан напрямую владельцу. Мы ценим вашу откровенность и постараемся улучшить наши услуги.",
      btnRestart: "Завершить",
      errorFeedbackEmpty: "Текст отзыва обязателен.",
      errorFeedbackShort: "Пожалуйста, напишите более длинный отзыв (минимум 5 символов).",
      errorPhone: "Неправильный формат номера телефона.",
      redirecting: "Перенаправление на Google Maps...",
      errorRateLimit: "Превышен лимит отправки отзывов. Попробуйте позже.",
      errorAdblock: "Пожалуйста, отключите AdBlock для отправки отзыва.",
      directGoogleLink: "Я хочу перейти напрямую в Google Карты",
      faqTitle: "Частые вопросы (Q&A)",
      faqContent: `
        <div class="faq-item">
          <h4 class="faq-q">Законен ли сервис ReviewShield на 100%?</h4>
          <p class="faq-a">Да. Система полностью соответствует Директиве Omnibus и требованиям UOKiK. Мы не блокируем отзывы – гости всегда видят прямую ссылку для перехода на Google Maps на странице отправки жалобы.</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Как вы защищаете персональные данные (RODO)?</h4>
          <p class="faq-a">Указание номера телефона добровольно. Мы собираем его только для связи менеджера заведения с гостем для решения проблемы. Мы подписываем с заведениями договор поручения на обработку данных (DPA).</p>
        </div>
        <div class="faq-item" style="margin-top: 15px;">
          <h4 class="faq-q">Нужно ли заключать долгосрочный контракт?</h4>
          <p class="faq-a">Нет, абонентская плата 99 PLN/месяц списывается помесячно. Вы можете отменить подписку в любой момент в конце оплаченного периода.</p>
        </div>
      `,
      regulaminTitle: "Регламент предоставления услуг",
      regulaminContent: `
        <h4>Regulamin świadczenia usług drogą elektroniczną</h4>
        <p>Последнее обновление: 11 июля 2026 г.</p>
        <h4>1. Общие положения</h4>
        <p>Настоящий Регламент определяет правила использования SaaS-платформы ReviewShield на сайте revshield.pl, оказывающей электронные услуги B2B-клиентам (предпринимателям).</p>
        <h4>2. Определения</h4>
        <p>Исполнитель: владелец проекта ReviewShield (контакт: rvwshield@gmail.com). Клиент: предприниматель B2B, использующий платформу.</p>
        <h4>3. Виды и объем оказываемых услуг</h4>
        <p>Предоставление персонализированной системы сбора отзывов через QR-коды, уведомления в реальном времени и аналитические отчеты.</p>
        <h4>4. Технические требования</h4>
        <p>Для пользования сервисом необходимы устройство с доступом к Интернету, веб-браузер с поддержкой JavaScript и активная электронная почта.</p>
        <h4>5. Оплата и условия подписки</h4>
        <p>Бесплатный пробный период составляет 14 дней. После этого плата составляет 99 PLN нетто в месяц за одно заведение. Исполнитель выставляет счета без VAT на основании освобождения от налога (ст. 113 п. 1 Закона о VAT). Отмена подписки возможна в любой момент по e-mail.</p>
        <h4>6. Рассмотрение жалоб и рекламаций</h4>
        <p>Жалобы рассматриваются в течение 14 дней. Обращения направляйте по адресу: rvwshield@gmail.com.</p>
        <h4>7. Авторские права</h4>
        <p>Все права на программное обеспечение, исходный код, логотипы и содержимое сайта revshield.pl принадлежат Исполнителю.</p>
      `,
      privacyTitle: "Политика Конфиденциальности",
      privacyContent: `
        <h4>Политика Конфиденциальности ReviewShield</h4>
        <p>Последнее обновление: 11 июля 2026 г.</p>
        <h4>1. Администратор персональных данных</h4>
        <p>ReviewShield является администратором данных веб-сайта (rvwshield@gmail.com). Для отзывов гостей заведений ReviewShield действует как Обработчик данных (Процессор) по поручению ресторана (на основании договора DPA).</p>
        <h4>2. Категории собираемых данных</h4>
        <p>Мы обрабатываем номер телефона (добровольно), текст отзыва, e-mail (из контактной формы), IP-адрес и файлы cookies для защиты от спама.</p>
        <h4>3. Цели и правовые основания</h4>
        <p>Мы обрабатываем данные на основании согласия пользователя (ст. 6 п. 1 лит. a GDPR) для сбора отзывов и контакта, а также на основании законного интереса (защита от спама — ст. 6 п. 1 лит. f GDPR).</p>
        <h4>4. Сроки хранения данных</h4>
        <p>Данные гостей (отзывы и телефоны) хранятся максимум 6 месяцев. Контактные e-mail адреса обрабатываются до окончания переговоров или возражения со стороны пользователя.</p>
        <h4>5. Права пользователя</h4>
        <p>Вы имеете право на доступ, исправление, ограничение или удаление своих данных. Вы можете отозвать согласие или подать жалобу в PUODO. Контакт: rvwshield@gmail.com.</p>
        <h4>6. Получатели данных</h4>
        <p>Мы передаем данные исключительно менеджерам соответствующего заведения и доверенным субподрядчикам (Vercel, Telegram API) на основании договоров поручения.</p>
      `
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
  const linkDirectGoogle = document.getElementById('link-direct-google');

  const landingContactForm = document.getElementById('landing-contact-form');
  const landingEmail = document.getElementById('landing-email');
  const landingEmailError = document.getElementById('landing-email-error');
  const landingContactSuccess = document.getElementById('landing-contact-success');
  
  const langButtons = document.querySelectorAll('.lang-btn');
  const appWatermark = document.getElementById('app-watermark');

  // --- State Variables ---
  let clientId = '';
  let tableId = '';
  let waiterId = '';
  let clientConfig = null;
  let selectedRating = 0;

  // --- Transition Helper ---
  // Safely toggles screens using classList + hidden attribute
  function showScreen(targetScreen) {
    const screens = [screenLoading, screenError, screenRating, screenFeedback, screenSuccess, screenLanding];
    
    // Toggle active container styling for landing vs mobile survey
    if (targetScreen === screenLanding) {
      appContainer.classList.add('landing-active');
      if (appWatermark) appWatermark.classList.add('hidden');
    } else {
      appContainer.classList.remove('landing-active');
      if (appWatermark) appWatermark.classList.remove('hidden');
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

    // Update HTML content (for elements containing links or tags)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Update active accordion height if open
    const activeAccordionItem = document.querySelector('.accordion-item.active');
    if (activeAccordionItem) {
      const activeContent = activeAccordionItem.querySelector('.accordion-content');
      if (activeContent) {
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
      }
    }
    
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
    tableId = urlParams.get('table') || '';
    waiterId = urlParams.get('waiter') || '';

    if (!clientId) {
      // Show main product landing page instead of error
      showScreen(screenLanding);
      return;
    }

    try {
      // 2. Fetch client configuration from backend API (queries Firestore Database)
      const response = await fetch(`/api/client?id=${encodeURIComponent(clientId)}`);
      if (!response.ok) {
        if (response.status === 404) {
          showErrorState(
            'Nieznana firma',
            `Firma o identyfikatorze "${clientId}" nie została zarejestrowana w naszym systemie.`,
            false
          );
          return;
        }
        throw new Error('Failed to load client configuration from server');
      }
      
      const result = await response.json();
      clientConfig = result.data;

      if (!clientConfig) {
        showErrorState(
          'Nieznana firma',
          `Firma o identyfikatorze "${clientId}" nie została zarejestrowana w naszym systemie.`,
          false
        );
        return;
      }

      // 3. Load client branding into DOM
      clientName.textContent = clientConfig.name;
      if (clientConfig.logo) {
        clientLogo.src = clientConfig.logo;
        clientLogo.alt = `Logo ${clientConfig.name}`;
      }

      // Initialize Omnibus-compliance Google Maps link
      if (linkDirectGoogle && clientConfig.googleMapsUrl) {
        linkDirectGoogle.href = clientConfig.googleMapsUrl;
        linkDirectGoogle.target = "_blank";
        linkDirectGoogle.rel = "noopener noreferrer";
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
      // Add pop animation
      btn.classList.add('pop');
      setTimeout(() => btn.classList.remove('pop'), 300);

      const rating = parseInt(btn.getAttribute('data-value'), 10);
      selectedRating = rating;
      renderStars(selectedRating, 'active');

      if (rating >= 4) {
        // Trigger Confetti Animation
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF8C00']
          });
        }

        // Change Title to Loading
        const titleElement = document.getElementById('step1-title');
        const descElement = document.getElementById('step1-desc');
        if (titleElement) titleElement.textContent = translations[currentLang].thankYou;
        if (descElement) descElement.textContent = translations[currentLang].redirecting;

        // 4 or 5 stars -> Redirect after delay for animation
        setTimeout(() => {
          if (clientConfig && clientConfig.googleMapsUrl) {
            window.location.href = clientConfig.googleMapsUrl;
          } else {
            alert('Błąd przekierowania: brak skonfigurowanego linku Google Maps.');
          }
        }, 1500);
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
    
    // Re-parse query parameters in case the URL was changed without page reload
    const urlParams = new URLSearchParams(window.location.search);
    tableId = urlParams.get('table') || '';
    waiterId = urlParams.get('waiter') || '';
    
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

    // --- Rate Limiting Check ---
    const MAX_REVIEWS_PER_HOUR = 3;
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();
    let reviewTimestamps = JSON.parse(localStorage.getItem('review_timestamps') || '[]');
    
    // Filter out old timestamps
    reviewTimestamps = reviewTimestamps.filter(ts => now - ts < ONE_HOUR);
    
    if (reviewTimestamps.length >= MAX_REVIEWS_PER_HOUR) {
      messageError.textContent = translations[currentLang].errorRateLimit;
      return;
    }

    // Set UI submitting state
    const submitText = submitBtn.querySelector('.btn-text');
    const submitLoader = submitBtn.querySelector('.btn-loader');
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoader.classList.remove('hidden');

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await new Promise((resolve) => {
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.ready(() => {
            grecaptcha.execute('6LcvmUQtAAAAAC_GbgWPjPy7M6p3SNOhoIo3k1es', {action: 'submit'}).then(resolve);
          });
        } else {
          resolve(null); // Fallback if script didn't load
        }
      });

      if (!recaptchaToken) {
        throw new Error(translations[currentLang].errorAdblock || 'Proszę wyłączyć AdBlocka.');
      }

      const payload = {
        client_id: clientId,
        rating: selectedRating,
        message: messageVal,
        phone: phoneVal || '',
        table_id: tableId,
        waiter_id: waiterId,
        recaptcha_token: recaptchaToken
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

      // Save successful submission timestamp for rate limiting
      reviewTimestamps.push(now);
      localStorage.setItem('review_timestamps', JSON.stringify(reviewTimestamps));

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

      // Get reCAPTCHA token
      const recaptchaToken = await new Promise((resolve) => {
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.ready(() => {
            grecaptcha.execute('6LcvmUQtAAAAAC_GbgWPjPy7M6p3SNOhoIo3k1es', {action: 'submit'}).then(resolve);
          });
        } else {
          resolve(null);
        }
      });

      if (!recaptchaToken) {
        landingEmailError.textContent = 'Proszę wyłączyć AdBlocka, aby wysłać zgłoszenie.';
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
            phone: '',
            recaptcha_token: recaptchaToken
          })
        });
      } catch (err) {
        console.error('Lead post failed:', err);
      }
    });
  }

  // --- Accordion Logic ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });
      
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Start initialization
  init();
});
