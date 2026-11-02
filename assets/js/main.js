(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  if (reduced || !hasGsap) document.documentElement.classList.add('reduced');

  // Nav: background on scroll, mobile menu toggle
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // Gallery lightbox
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button aria-label="Close">×</button><figure style="margin:0"><img alt=""><p></p></figure>';
    document.body.appendChild(box);
    const close = () => box.classList.remove('open');
    gallery.querySelectorAll('figure').forEach((fig) => {
      fig.addEventListener('click', () => {
        const img = fig.querySelector('img');
        box.querySelector('img').src = img.src;
        box.querySelector('img').alt = img.alt;
        box.querySelector('p').textContent = fig.querySelector('figcaption')?.textContent || '';
        box.classList.add('open');
      });
    });
    box.addEventListener('click', (e) => { if (e.target === box || e.target.tagName === 'BUTTON') close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Rotating role under the name
  const roleEl = document.querySelector('[data-roles]');
  if (roleEl) {
    const roles = roleEl.dataset.roles.split('|');
    let i = 0;
    setInterval(() => {
      i = (i + 1) % roles.length;
      if (reduced || !hasGsap) { roleEl.textContent = roles[i]; return; }
      gsap.to(roleEl, {
        opacity: 0, y: -10, duration: 0.3,
        onComplete: () => {
          roleEl.textContent = roles[i];
          gsap.fromTo(roleEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
        },
      });
    }, 2400);
  }

  // Count-up: data-to, data-decimals, data-suffix, data-prefix
  const formatNum = (el, v) => {
    const d = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = (el.dataset.prefix || '') + v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) + (el.dataset.suffix || '');
  };
  const counters = document.querySelectorAll('[data-to]');

  if (reduced || !hasGsap) {
    counters.forEach((el) => formatNum(el, parseFloat(el.dataset.to)));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  if (typeof window.Lenis !== 'undefined') {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Hero intro
  const intro = gsap.utils.toArray('[data-intro]');
  if (intro.length) {
    gsap.from(intro, { opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 });
  }

  // Scroll reveals
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  counters.forEach((el) => {
    const obj = { v: 0 };
    formatNum(el, 0);
    gsap.to(obj, {
      v: parseFloat(el.dataset.to), duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => formatNum(el, obj.v),
    });
  });

  // Gentle tilt on cards (pointer devices only)
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotateY: x * 8, rotateX: -y * 8, y: -6, duration: 0.4, transformPerspective: 800 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }
})();
