document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const track = document.getElementById('careerTrack');
  const prevBtn = document.getElementById('careerPrev');
  const nextBtn = document.getElementById('careerNext');
  if (track && prevBtn && nextBtn) {
    const cardGap = 24;
    const scrollByCard = (direction) => {
      const card = track.querySelector('.career-card');
      const amount = card ? card.getBoundingClientRect().width + cardGap : 320;
      track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    };
    const updateControls = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= max;
    };
    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  }
});
