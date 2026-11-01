// Chidiogo Joy Simon — Portfolio interactions

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // TikTok creator embeds. The TikTok script supplies each video's native caption.
  const carousel = document.getElementById('videoCarousel');
  if (carousel) {
    document.querySelectorAll('.carousel-arrow').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = Number(button.dataset.direction || 1);
        const card = carousel.querySelector('.video-card');
        const step = card ? card.getBoundingClientRect().width + 22 : 300;
        carousel.scrollBy({ left: direction * step * 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    });
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        carousel.scrollBy({ left: event.key === 'ArrowRight' ? 310 : -310, behavior: 'smooth' });
      }
    });
    if (!document.querySelector('script[data-tiktok-embed]')) {
      const embedScript = document.createElement('script');
      embedScript.src = 'https://www.tiktok.com/embed.js';
      embedScript.async = true;
      embedScript.dataset.tiktokEmbed = 'true';
      document.body.appendChild(embedScript);
    }
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
});

