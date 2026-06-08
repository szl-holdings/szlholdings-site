document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || prefersReduced) {
    // No observer support or reduced motion: show everything immediately.
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    revealElements.forEach(el => observer.observe(el));
    // Safety net: if anything is still hidden after load, reveal it so content is never lost.
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) el.classList.add('active');
        });
      }, 1200);
    });
  }

  // Simulated live receipt updates
  const hashes = document.querySelectorAll('.hash');
  setInterval(() => {
    if (Math.random() > 0.7) {
      const idx = Math.floor(Math.random() * hashes.length);
      const randomHash = Math.random().toString(16).substring(2, 10);
      hashes[idx].textContent = '0x' + randomHash;
      hashes[idx].style.opacity = '0.5';
      setTimeout(() => {
        hashes[idx].style.opacity = '1';
      }, 200);
    }
  }, 2000);
});
