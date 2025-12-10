// script.js - interactions for sidebar, active link, social toggle, lightbox, video modal, reveal

document.addEventListener('DOMContentLoaded', () => {

  // --- Active nav link ---
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // --- Floating social toggle (supports multiple pages with different IDs) ---
  function initSocial(buttonId, listId) {
    const btn = document.getElementById(buttonId);
    const list = document.getElementById(listId);
    if (!btn || !list) return;
    btn.addEventListener('click', () => {
      const shown = list.classList.toggle('show');
      list.setAttribute('aria-hidden', !shown);
    });
  }
  initSocial('socialToggle','socialList');
  initSocial('socialToggle2','socialList2');
  initSocial('socialToggle3','socialList3');

  // --- Lightbox for images (single instance used on all pages) ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbClose = document.querySelectorAll('.lb-close');

  function openLightbox(src) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox || !lbImg) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // attach to gallery items & avatar & clickable images
  document.querySelectorAll('.gallery-item, .gallery .clickable, .hobby-img, .avatar-btn, .clickable').forEach(el => {
    el.addEventListener('click', (e) => {
      // prefer data-full attribute, else image src
      const full = el.dataset?.full || el.querySelector?.('img')?.src || (el.tagName === 'IMG' && el.src);
      if (full) openLightbox(full);
    });
  });

  lbClose.forEach(b => b.addEventListener('click', closeLightbox));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // --- Video modal ---
  const videoModal = document.getElementById('videoModal');
  const vmPlayer = document.querySelector('.vm-player');
  const vmClose = document.querySelectorAll('.vm-close');

  document.querySelectorAll('.video-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset?.video;
      if (!src || !videoModal || !vmPlayer) return;
      vmPlayer.src = src;
      videoModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      videoModal.setAttribute('aria-hidden','false');
    });
  });

  vmClose.forEach(b => b.addEventListener('click', () => {
    if (!videoModal || !vmPlayer) return;
    videoModal.classList.remove('show');
    vmPlayer.pause();
    vmPlayer.src = '';
    document.body.style.overflow = '';
    videoModal.setAttribute('aria-hidden','true');
  }));
  videoModal?.addEventListener('click', (e) => { if (e.target === videoModal) { videoModal.classList.remove('show'); vmPlayer.pause(); vmPlayer.src=''; document.body.style.overflow=''; } });

  // --- Scroll reveal simple ---
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 120) el.classList.add('active');
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // --- Prevent accidental text selection on double-click ---
  document.addEventListener('mousedown', (e) => { if (e.detail > 1) e.preventDefault(); });

  // --- Contact form basic handler (if present) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput')?.value || 'friend';
      alert(`Thanks ${email}! Your message was submitted.`);
      contactForm.reset();
    });
  }

});
