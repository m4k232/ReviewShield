document.addEventListener('DOMContentLoaded', () => {
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

  // --- Initialize App ---
  async function init() {
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
      messageError.textContent = 'Treść opinii jest wymagana.';
      feedbackMessage.style.borderColor = 'var(--accent-red)';
      isValid = false;
    } else if (messageVal.length < 5) {
      messageError.textContent = 'Proszę napisać dłuższą opinię (minimum 5 znaków).';
      feedbackMessage.style.borderColor = 'var(--accent-red)';
      isValid = false;
    }

    // Validate phone (optional, but if filled, test for general format)
    const phoneVal = feedbackPhone.value.trim();
    if (phoneVal) {
      // Basic phone pattern check (allows spaces, +, digits, min length 9)
      const phoneRegex = /^[+]?[0-9\s-]{9,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        phoneError.textContent = 'Niepoprawny format numeru telefonu.';
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
