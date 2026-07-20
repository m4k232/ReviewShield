# 🛡️ ReviewShield — Полная Архитектурная Схема (Architecture Diagram)

**Версия:** 2.0 (Июль 2026)  
**Проект:** ReviewShield (`revshield.pl`)

---

## 📐 Визуальная Схема (Mermaid Diagram)

```mermaid
flowchart TD
    subgraph GUEST["📱 1. ГОСТЬ В РЕСТОРАНЕ"]
        A["Сканирует QR-код за столиком"] --> B["Переходит по ссылке:\nrevshield.pl/?client=amar_beirut&table=5"]
    end

    subgraph FRONTEND["🎨 2. FRONTEND (Vercel Edge / HTML + JS)"]
        B --> C{"Есть ли ?client в URL?"}
        
        C -- "НЕТ" --> LANDING["Показывает Главный Лендинг revshield.pl\n(Офер, Тариф 99 PLN, Форма 14 дней теста)"]
        
        C -- "ДА" --> FETCH_CONFIG["script.js делает GET запрос:\n/api/client?id=amar_beirut"]
        FETCH_CONFIG --> RENDER_BRAND["Отрисовывает экран 1:\nЛоготип + Название заведения"]
        
        RENDER_BRAND --> STAR_CLICK{"Гость выбирает оценку"}
        
        STAR_CLICK -- "4 или 5 звезд (Зеленый путик)" --> CONFETTI["Анимация Конфетти 🎉"]
        CONFETTI --> REDIRECT["Мгновенный редирект на Google Maps заведения"]
        
        STAR_CLICK -- "1, 2 или 3 звезды (Красный путик)" --> FORM["Показывает Экран 2:\nПриватная форма жалобы"]
        FORM --> OMNIBUS["Прямая ссылка на Google Maps\n(Требование Omnibus / UOKiK)"]
        FORM --> SUBMIT["Гость жмет 'Wyślij zgłoszenie'"]
        SUBMIT --> RECAPTCHA["Получает токен от Google reCAPTCHA v3"]
    end

    subgraph BACKEND["⚙️ 3. BACKEND (Vercel Serverless Python / api/index.py)"]
        SUBMIT -->|POST /api/feedback| API["do_POST Handler"]
        API --> CHECK_SIZE["Проверка размера (макс 10 КБ)"]
        CHECK_SIZE --> VERIFY_CAP["Верификация reCAPTCHA токена через Google API"]
        VERIFY_CAP --> DB_SAVE["_save_feedback()"]
    end

    subgraph STORAGE["💾 4. ХРАНИЛИЩЕ ДАННЫХ (3 уровня надежности)"]
        DB_SAVE -->|Уровень 1 (Главный)| FIRESTORE["🔥 Cloud Firestore\nКоллекция 'feedback'"]
        DB_SAVE -->|Уровень 2 (Для клиента)| SHEETS["📊 Google Sheets API\nАвто-строка в таблицу ресторана"]
        DB_SAVE -->|Уровень 3 (Резервный)| CSV["📄 Локальный CSV (/tmp/)\nЕсли всё упало"]
    end

    subgraph ALERTS["🔔 5. МНОГОКАНАЛЬНЫЕ УВЕДОМЛЕНИЯ В РЕАЛЬНОМ ВРЕМЕНИ"]
        API --> CHECK_TYPE{"Тип заявки?"}
        
        CHECK_TYPE -- "Лид с лендинга" --> TG_ADMIN["📱 Admin Telegram Bot\n'Новая заявка на тест 14 дней!'"]
        CHECK_TYPE -- "Лид с лендинга" --> EMAIL_ADMIN["📧 Admin Email Notification"]
        
        CHECK_TYPE -- "Негативный отзыв 1-3★" --> TG_CLIENT["📱 Client Telegram Bot\n'⚠️ Nowa negatywna opinia! Stolik 5'"]
        CHECK_TYPE -- "Негативный отзыв 1-3★" --> EMAIL_CLIENT["📧 Email менеджеру заведения\n(SMTP с красивым HTML-письмом)"]
    end
```

---

## 🔍 Детальный разбор каждого компонента

### 1. Точка входа (QR-код и URL)
- Каждому заведению генерируется уникальная ссылка формата:  
  `https://revshield.pl/?client=amar_beirut&table=5&waiter=anna`
- Параметры `table` (столик) и `waiter` (официант) опциональны и помогают менеджеру точно знать, где возникла проблема.

### 2. Фронтенд (Single Page Application)
- **Изолированность компонентов:** Быстрое переключение экранов без перезагрузки страницы.
- **Интернационализация (i18n):** Авто-определение языка браузера (`PL`, `EN`, `UA`, `RU`).
- **Omnibus & UOKiK Compliance:** На странице негативного отзыва присутствует прямая ссылка *"Chcę przejść bezpośrednio do Google Maps"*, что исключает претензии регуляторов о сокрытии публичных отзывов.

### 3. Бэкенд (Python Serverless Function)
- Развернут на платформе **Vercel** (`api/index.py`).
- Валидация входных данных: проверят `Content-Length <= 10KB`, структуру JSON и валидность токена **Google reCAPTCHA v3**.
- Оптимизированное чтение конфигураций: считывает Firestore ровно 1 раз за запрос.

### 4. Трехуровневая Система Хранения
1. **Firestore (Google Cloud):** Основная БД для отчетов и будущей панели управления.
2. **Google Sheets:** Динамическая запись в персональную таблицу клиента в реальном времени.
3. **CSV Fallback:** Если отвалился интернет или сервисы Google недоступны, данные пишутся во временный CSV-файл `/tmp/reviewshield_feedback.csv`.

### 5. Система Уведомлений
- **Telegram Bot (Client):** Мгновенная доставка текста отзыва, номера телефона гостя и номера столика управляющему заведением.
- **Email (SMTP):** Красивое HTML-письмо с кнопкой немедленного реагирования.
