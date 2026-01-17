/**
 * Naram Alhasani - Personal Website
 * Modern Vanilla JavaScript
 * 2026
 */

(function() {
    'use strict';

    // ========================================
    // Navigation
    // ========================================
    
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    // Scroll-based nav styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // Smooth Scrolling
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    
    const revealElements = document.querySelectorAll('.reveal, .reveal-word');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // Hero Animation on Load
    // ========================================
    
    window.addEventListener('load', () => {
        // Reveal hero title words
        const heroWords = document.querySelectorAll('.hero-title .reveal-word');
        heroWords.forEach((word, index) => {
            setTimeout(() => {
                word.classList.add('visible');
            }, 200 + (index * 100));
        });
        
        // Reveal other hero elements
        const heroElements = document.querySelectorAll('.hero .reveal');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 400 + (index * 80));
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const sectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ========================================
    // Subtle Parallax on Hero (Desktop only)
    // ========================================
    
    if (window.innerWidth > 768) {
        const heroContent = document.querySelector('.hero-content');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight && heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        });
    }

    // ========================================
    // Console Easter Egg
    // ========================================
    
    console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
    console.log('%cBuilding something? Let\'s connect.', 'font-size: 14px; color: #6366f1;');

})();
