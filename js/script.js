// ===================================
// Berkah Samudera Group - Main Script
// ===================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navbarNav = document.getElementById('navbar-nav');
const hamburgerMenu = document.getElementById('hamburger-menu');
const faqChatToggle = document.getElementById('faq-chat-toggle');
const faqChatWindow = document.getElementById('faq-chat-window');
const faqQuestionsContainer = document.getElementById('faq-questions');
const faqMessagesContainer = document.getElementById('faq-messages');

// ===================================
// FAQ Data - Predefined Q&A
// ===================================
const faqData = [
  {
    id: 1,
    question: "Berapa harga cuci motor?",
    answer: "Harga cuci motor mulai dari Rp 12.000. Tersedia juga paket doorsmeer mulai dari Rp 15.000 untuk pembersihan lebih menyeluruh termasuk kolong kendaraan."
  },
  {
    id: 2,
    question: "Berapa harga cuci mobil?",
    answer: "Harga cuci mobil mulai dari Rp 35.000. Layanan termasuk cuci eksterior, pembersihan interior cepat, dan pengeringan optimal tanpa water spot."
  },
  {
    id: 3,
    question: "Jam operasional usaha?",
    answer: "Untuk layanan Cuci Kendaraan: Buka setiap hari pukul 08.00 - 16.00 WIB.\n\nUntuk Bengkel Kaki Mobil: Buka Senin-Sabtu pukul 08.00 - 16.00 WIB."
  },
  {
    id: 4,
    question: "Apakah ada layanan antar jemput?",
    answer: "Ya, kami menyediakan layanan antar jemput GRATIS untuk radius maksimal 3 km dari lokasi usaha kami. Silakan hubungi kami via WhatsApp untuk mengatur jadwal."
  },
  {
    id: 5,
    question: "Metode pembayaran apa saja?",
    answer: "Kami menerima pembayaran Tunai dan Non-Tunai (QRIS/Cashless Payment). Scan QR code QRIS kami yang tersedia di bagian bawah website."
  },
  {
    id: 6,
    question: "Di mana lokasi Berkah Samudera?",
    answer: "Kami berlokasi di Purwokerto. Lihat peta lokasi lengkap di bagian Fasilitas website kami atau klik link Google Maps yang tersedia."
  },
  {
    id: 7,
    question: "Layanan bengkel apa saja?",
    answer: "Bengkel Kaki Mobil kami melayani:\n• Pemeriksaan kaki-kaki\n• Perbaikan & penggantian tie rod, ball joint, rack end\n• Servis rem dan shock breaker\n• Penyetelan dan uji jalan"
  },
  {
    id: 8,
    question: "Bagaimana cara booking?",
    answer: "Cara booking sangat mudah:\n1. Klik tombol WhatsApp di website\n2. Kirim pesan dengan jenis layanan yang diinginkan\n3. Tim kami akan konfirmasi jadwal\n4. Datang sesuai jadwal atau gunakan layanan antar jemput"
  },
  {
    id: 9,
    question: "Apakah ada fasilitas tunggu?",
    answer: "Ya! Kami menyediakan:\n• Ruang tunggu nyaman ber-AC\n• Free Wi-Fi\n• Toilet bersih\n• Mushola\n• Rumah makan dengan berbagai menu"
  },
  {
    id: 10,
    question: "Hubungi CS langsung",
    answer: "Silakan hubungi Customer Service kami:\n\n📱 Cuci Kendaraan: 0813-2652-3184\n📱 Bengkel Kaki Mobil: 0895-4227-21519\n📱 Umum: 0895-1298-0425\n\nAtau klik tombol WhatsApp di website untuk chat langsung!"
  }
];

// ===================================
// Hamburger Menu Toggle
// ===================================
if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    navbarNav.classList.toggle('active');
    hamburgerMenu.querySelector('i').setAttribute('data-feather', 
      navbarNav.classList.contains('active') ? 'x' : 'menu'
    );
    feather.replace();
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburgerMenu && navbarNav) {
    if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove('active');
      hamburgerMenu.querySelector('i').setAttribute('data-feather', 'menu');
      feather.replace();
    }
  }
});

// Close menu when clicking on a nav link
if (navbarNav) {
  navbarNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarNav.classList.remove('active');
      if (hamburgerMenu) {
        hamburgerMenu.querySelector('i').setAttribute('data-feather', 'menu');
        feather.replace();
      }
    });
  });
}

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for navbar styling
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after animation
      // observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
  animatedElements.forEach(el => scrollObserver.observe(el));
});

// ===================================
// FAQ Chat Widget
// ===================================

// Initialize FAQ Questions
function initFAQQuestions() {
  if (!faqQuestionsContainer) return;
  
  faqQuestionsContainer.innerHTML = '';
  
  faqData.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'faq-question-btn';
    btn.textContent = item.question;
    btn.dataset.id = item.id;
    btn.addEventListener('click', () => handleFAQQuestion(item));
    faqQuestionsContainer.appendChild(btn);
  });
}

// Handle FAQ Question Click
function handleFAQQuestion(item) {
  // Add user message
  addMessage(item.question, 'user');
  
  // Hide questions temporarily
  faqQuestionsContainer.style.display = 'none';
  
  // Add bot response after a small delay
  setTimeout(() => {
    addMessage(item.answer, 'bot');
    
    // Add back button
    addBackButton();
  }, 500);
}

// Add message to chat
function addMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `faq-message ${type}`;
  messageDiv.innerHTML = text.replace(/\n/g, '<br>');
  faqMessagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  const chatBody = document.getElementById('faq-chat-body');
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Add back button to show questions again
function addBackButton() {
  // Check if back button already exists
  if (document.querySelector('.faq-back-btn')) return;
  
  const backBtn = document.createElement('button');
  backBtn.className = 'faq-back-btn';
  backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Pertanyaan Lain';
  backBtn.addEventListener('click', () => {
    // Show questions again
    faqQuestionsContainer.style.display = 'flex';
    backBtn.remove();
  });
  faqMessagesContainer.appendChild(backBtn);
  
  // Scroll to bottom
  const chatBody = document.getElementById('faq-chat-body');
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Toggle FAQ Chat Window
if (faqChatToggle && faqChatWindow) {
  faqChatToggle.addEventListener('click', () => {
    faqChatWindow.classList.toggle('active');
    faqChatToggle.classList.toggle('active');
    
    // Initialize questions on first open
    if (faqChatWindow.classList.contains('active') && faqQuestionsContainer.children.length === 0) {
      initFAQQuestions();
    }
  });
}

// Close chat when clicking outside
document.addEventListener('click', (e) => {
  if (faqChatToggle && faqChatWindow) {
    const widget = document.getElementById('faq-chat-widget');
    if (!widget.contains(e.target) && faqChatWindow.classList.contains('active')) {
      faqChatWindow.classList.remove('active');
      faqChatToggle.classList.remove('active');
    }
  }
});

// ===================================
// Smooth Scroll for Internal Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Active Nav Link Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
  
  // Initialize FAQ
  initFAQQuestions();
  
  // Trigger scroll animations for elements in viewport on load
  setTimeout(() => {
    const event = new Event('scroll');
    window.dispatchEvent(event);
  }, 100);
});

// ===================================
// Performance: Debounce scroll events
// ===================================
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(highlightNavLink, 50));
