// Interactive JS logic for VisionMate Website

document.addEventListener('DOMContentLoaded', () => {
  initCursorTrail();
  initSpotlightEffect();
  initScrollReveal();
  initMobileMenu();
  initCreatorFlip();
});

// 1. Custom Trail Cursor Trail Logic
function initCursorTrail() {
  const cursor = document.getElementById('custom-cursor');
  const glow = document.getElementById('custom-cursor-glow');
  
  if (!cursor || !glow) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let glowX = 0;
  let glowY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!document.body.classList.contains('cursor-active')) {
      document.body.classList.add('cursor-active');
    }
  });

  // Hide cursor when leaving viewport
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active');
  });

  // Smooth trail loop using LERP (Linear Interpolation)
  function animateCursor() {
    // Faster lerp for center cursor
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    // Slower lerp for glowing outline ring to create a "trailing" lag effect
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();

  // Add scale animation when hovering interactive elements
  const interactives = document.querySelectorAll('a, button, .btn, .gallery-item, .doc-option-card');
  interactives.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      glow.classList.add('custom-cursor-hover');
    });
    elem.addEventListener('mouseleave', () => {
      glow.classList.remove('custom-cursor-hover');
    });
  });
}

// 2. Spotlight Card Hover Lighting logic
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 3. Intersection Observer for Setup Story Scroll-Reveal & Nav Highlighting
function initScrollReveal() {
  const steps = document.querySelectorAll('.timeline-step');
  
  // Set up intersection observer for timeline blocks
  const stepObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, no need to track it again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  steps.forEach(step => {
    stepObserver.observe(step);
  });

  // Highlight active navbar links representing currently active viewport section
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSection = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id') || 'home';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  });
}

// 4. Mobile Menu Drawer Drawer Logic
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close menu on navigation click
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

// 5. Gallery Switch Tab switcher
function switchTab(event, tabId) {
  // Deactivate all tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));

  // Activate current tab and button
  event.currentTarget.classList.add('active');
  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
  }
}

// 6. Screenshot Lightbox Viewer
function openLightbox(src, title, descText) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  lightboxImg.src = src;
  lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size: 0.85rem; color: var(--text-secondary);">${descText}</span>`;
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

function closeLightboxOnOverlay(event) {
  // Close only if clicked directly on the overlay backdrop
  if (event.target.id === 'lightbox') {
    closeLightbox();
  }
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeDownloadModal();
  }
});

// 7. Interactive Downloads selection modal
function openDownloadModal() {
  const docModal = document.getElementById('doc-modal');
  if (docModal) {
    docModal.classList.add('active');
  }
}

function closeDownloadModal() {
  const docModal = document.getElementById('doc-modal');
  if (docModal) {
    docModal.classList.remove('active');
  }
}

function closeModalOnOverlay(event) {
  if (event.target.id === 'doc-modal') {
    closeDownloadModal();
  }
}

// 8. Creator card flipping interactive controls
function initCreatorFlip() {
  const wrapper = document.getElementById('creator-card-wrapper');
  const inner = document.getElementById('creator-card-inner');
  if (!wrapper || !inner) return;

  // Hover out (mouseleave) flips card back to Uday Kiran
  wrapper.addEventListener('mouseleave', () => {
    inner.classList.remove('flipped');
  });
}

function flipCreatorCard(event) {
  event.stopPropagation();
  const inner = document.getElementById('creator-card-inner');
  if (inner) {
    inner.classList.add('flipped');
  }
}

