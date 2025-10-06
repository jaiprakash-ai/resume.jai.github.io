// --- Preloader ---
window.onload = function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('preloader-hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileMenuButton.querySelector('svg');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  const hamburgerIconPath = "M4 8h16M4 16h16";
  const closeIconPath = "M6 18L18 6M6 6l12 12";

  const toggleMenu = () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
      mobileMenuButton.setAttribute('aria-label', 'Close menu');
      menuIcon.querySelector('path').setAttribute('d', closeIconPath);
    } else {
      mobileMenuButton.setAttribute('aria-label', 'Open menu');
      menuIcon.querySelector('path').setAttribute('d', hamburgerIconPath);
    }
  };

  mobileMenuButton?.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  });

  // --- Framer Motion Animations ---
  // Hero section animation (runs on page load)
  const heroSection = document.querySelector('#hero .motion-section');
  if (heroSection) {
    motion.animate(heroSection, { opacity: [0, 1], y: [50, 0] }, { duration: 1 });
  }

  // Other sections animation (runs when they scroll into view)
  const motionSections = document.querySelectorAll('.motion-section[data-animation="fade-in-up"]');
  motionSections.forEach(section => {
    // Skip the hero section as it's already animated
    if (section.parentElement.id === 'hero') return;

    motion.inView(section, () => {
      motion.animate(section, { opacity: [0, 1], y: [50, 0] }, { duration: 0.8 });
      return () => motion.animate(section, { opacity: [1, 0], y: [0, 50] }, { duration: 0.8 });
    }, { once: true }); // 'once: true' ensures the animation only runs once
  });
});

// Smooth scroll handled by CSS scroll-behavior

// Custom glowing cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
  cursorRing.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
});

// Parallax effect on hero
document.addEventListener('mousemove', e => {
  const parallaxBg = document.getElementById('parallax-bg');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
});

// Theme toggle (Neon <-> Dim)
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dim-theme');
  const isDim = document.body.classList.contains('dim-theme');
  themeToggleBtn.textContent = isDim ? 'Dim ↔ Neon' : 'Neon ↔ Dim';
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn?.classList.remove('opacity-0');
    scrollTopBtn?.classList.add('opacity-100');
  } else {
    scrollTopBtn?.classList.remove('opacity-100');
    scrollTopBtn?.classList.add('opacity-0');
  }
});

const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const message = contactForm.querySelector('textarea').value;
  const submitButton = contactForm.querySelector('button[type="submit"]');
  let formMessage = document.getElementById('form-message');

  // Create message element if it doesn't exist
  if (!formMessage) {
    formMessage = document.createElement('div');
    formMessage.id = 'form-message';
    formMessage.className = 'mt-4 text-center';
    contactForm.appendChild(formMessage);
  }

  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  try {
    // Temporarily disable sending and show "Coming Soon" message
    formMessage.textContent = 'Message sending is coming soon. Thank you for your patience!';
    formMessage.style.color = '#00ffff'; // Cyan
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = 'An error occurred. Please check your connection and try again.';
    formMessage.style.color = '#ff00ff'; // Magenta
  } finally {
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;
  }
});

// Copy email button (if exists)
const copyEmailBtn = document.getElementById('copy-email-btn');
copyEmailBtn?.addEventListener('click', () => {
  const emailElement = document.getElementById('email-text');
  if (emailElement) {
    navigator.clipboard.writeText(emailElement.textContent).then(() => {
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
      }, 2000);
    });
  }
});

// Set current year in footer (if exists)
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}
