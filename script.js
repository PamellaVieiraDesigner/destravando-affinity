/* ============================================
   Destravando o Affinity — Scripts
   ============================================ */

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal on scroll (Intersection Observer)
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item__question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
    // toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (window.innerWidth > 768 && cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor update
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  const interactives = document.querySelectorAll('a, button, .btn-cta, .faq-item__question');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
}

// Order Bump Modal Logic
const obModal = document.getElementById('obModal');
const obModalClose = document.getElementById('obModalClose');
const hotmartLinks = document.querySelectorAll('a[href^="https://pay.hotmart.com"]');

if (obModal && obModalClose) {
  // Prevent default redirect and show modal instead
  hotmartLinks.forEach(link => {
    // Only target links that go to hotmart and aren't the modal's own continue button
    if (link.id !== 'obModalContinue') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        obModal.classList.add('active');
      });
    }
  });

  // Close modal when clicking X
  obModalClose.addEventListener('click', () => {
    obModal.classList.remove('active');
  });

  // Close modal when clicking outside content
  obModal.addEventListener('click', (e) => {
    if (e.target === obModal) {
      obModal.classList.remove('active');
    }
  });
}
