document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const sections = ['features', 'download'].map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('[href$="#features"], [href$="#download"]');

  const sectionObs = new IntersectionObserver((entries) => {
    let activeId = null;
    entries.forEach(e => { if (e.isIntersecting) activeId = e.target.id; });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').endsWith(activeId ?? 'none'));
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px -20% 0px' });

  sections.forEach(s => sectionObs.observe(s));

  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  const icon = btn?.querySelector('.menu-icon');

  btn?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    if (open) {
      icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
    } else {
      icon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
    }
  });
});
