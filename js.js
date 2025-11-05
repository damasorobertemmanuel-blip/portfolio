document.addEventListener('DOMContentLoaded', () => {
  // ===== TYPEWRITER EFFECT =====
  const textArray = ["Web Developer", "Designer", "Tech Student", "UI / UX Learner"];
  let index = 0, charIndex = 0;
  const typingSpan = document.querySelector(".typing-text span");

  function type() {
    if (!typingSpan) return;
    if (charIndex < textArray[index].length) {
      typingSpan.textContent += textArray[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 90);
    } else {
      setTimeout(erase, 1300);
    }
  }

  function erase() {
    if (!typingSpan) return;
    if (charIndex > 0) {
      typingSpan.textContent = textArray[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 60);
    } else {
      index = (index + 1) % textArray.length;
      setTimeout(type, 200);
    }
  }

  type();

  // ===== PAGE LOAD ENTRANCE ANIMATIONS =====
  const fadeSlideElements = document.querySelectorAll('section, header, .home-content, .home-img, .about p, .achievements-container, .skills-container, .timeline, .exp-container, .contact form');
  fadeSlideElements.forEach(el => el.classList.add('fade-slide-up'));

  window.addEventListener('load', () => {
    fadeSlideElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('active');
      }, i * 150);
    });

    // Trigger nav link animations (CSS delays handle stagger)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.style.animationPlayState = 'running';
    });
  });

  // ===== NAV ACTIVE ON SCROLL & HEADER SHADOW =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;

    // Toggle header shadow on scroll
    header.classList.toggle('scrolled', scrollPos > 80);

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop - 200 && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`nav a[href*=${sec.id}]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== PROGRESS BAR FILL =====
  const progressBars = document.querySelectorAll('.progress-bar span');
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const widthValue = entry.target.parentNode.style.getPropertyValue('--width');
        entry.target.style.width = widthValue || '0%';
      }
    });
  }, { threshold: 0.4 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Adjust offset for fixed header height
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== MOBILE MENU TOGGLE (Optional) =====
  const menuToggle = document.querySelector('.menu-toggle'); // Add your hamburger button in HTML with this class
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Close menu when clicking a nav link (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
});
