/* ============================================
   Preet Mehta, Portfolio | script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== HERO TYPEWRITER EFFECT ========== */
  const heroGreeting = document.getElementById('heroGreeting');
  const heroName = document.getElementById('heroName');

  function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.style.animation = 'blinkCaret 0.75s step-end infinite';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.style.animation = 'none';
        element.classList.add('typed');
        if (callback) setTimeout(callback, 300);
      }
    }
    type();
  }

  // Disable CSS fade-in on hero-greeting and hero-name since we use typewriter
  heroGreeting.style.opacity = '1';
  heroGreeting.style.animation = 'none';
  heroGreeting.closest('.hero-content').querySelector('.hero-name').style.opacity = '1';
  heroGreeting.closest('.hero-content').querySelector('.hero-name').style.animation = 'none';

  // Start typing after a short delay
  setTimeout(() => {
    typeWriter(heroGreeting, "Hello, I'm", 80);
    typeWriter(heroName, "Preet Mehta", 100);
  }, 400);

  /* ========== NAVBAR SCROLL EFFECT ========== */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');

  const onScroll = () => {
    const y = window.scrollY;

    // Navbar solid background on scroll
    navbar.classList.toggle('scrolled', y > 60);

    // Scroll-to-top button
    scrollTopBtn.classList.toggle('visible', y > 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ========== MOBILE NAV TOGGLE ========== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  /* ========== SCROLL REVEAL ANIMATIONS ========== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ========== ACTIVE NAV LINK HIGHLIGHT ========== */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('nav-active');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('nav-active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  /* ========== SMOOTH SCROLL FOR ANCHORS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ========== CONTACT FORM HANDLER ========== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '.7';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      formSuccess.classList.add('show');

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1500);
  });


  /* ========== 3D TILT ON PROJECT CARDS ========== */
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 4;
      const rotateY = ((centerX - x) / centerX) * 4;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease';
    });
  });


  /* ========== PARALLAX ON HERO ORBS ========== */
  const heroOrbs = document.querySelectorAll('.hero-orbs span');

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    heroOrbs.forEach((orb, i) => {
      const speed = (i + 1) * 18;
      const moveX = (x - 0.5) * speed;
      const moveY = (y - 0.5) * speed;
      orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }, { passive: true });


  /* ========== TYPING CURSOR EFFECT ON CODE BLOCK ========== */
  const codeBlock = document.querySelector('.about-code-block');
  if (codeBlock) {
    const lastLine = codeBlock.querySelector('.code-line:last-child');
    if (lastLine) {
      const cursor = document.createElement('span');
      cursor.style.cssText =
        'display:inline-block;width:8px;height:1.1em;background:var(--accent-indigo);' +
        'margin-left:4px;vertical-align:text-bottom;animation:cursorBlink 1s step-end infinite;';
      lastLine.appendChild(cursor);

      // Add cursor blink keyframes
      const style = document.createElement('style');
      style.textContent = '@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}';
      document.head.appendChild(style);
    }
  }

});
