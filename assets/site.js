// Shared site behaviors
(function () {
  // Language toggle
  const langBtns = document.querySelectorAll('[data-set-lang]');
  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.setLang === lang));
    document.querySelectorAll('.el, .en').forEach(el => {
      if (el.classList.contains('el') || el.classList.contains('en')) {
        el.style.display = el.classList.contains(lang) ? '' : 'none';
      }
    });
    try { localStorage.setItem('dta_lang', lang); } catch (_) {}
  }
  langBtns.forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.setLang)));
  try {
    const saved = localStorage.getItem('dta_lang');
    if (saved === 'el' || saved === 'en') applyLang(saved);
  } catch (_) {}

  // Nav shrink on scroll
  const navEl = document.getElementById('nav');
  if (navEl) {
    window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', window.scrollY > 50));
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
