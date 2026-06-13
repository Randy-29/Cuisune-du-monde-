/**
 * Saveurs du Monde - Script Principal
 * Gère les animations GSAP, le loading screen et les interactions UI.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Enregistrement de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- Mobile Menu Logic ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        });
    }

    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 1000);
        });
    } else {
        initAnimations();
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    function initAnimations() {
        // --- Hero Animations ---
        const tlHero = gsap.timeline();

        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            const text = heroTitle.innerText;
            heroTitle.innerHTML = text.split('').map(char => `<span class="char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

            tlHero.from('.char', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "power4.out"
            });
        }

        const subtitle = document.querySelector('.hero p, .continent-hero h1');
        if (subtitle) {
            tlHero.from(subtitle, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.4");
        }

        const btn = document.querySelector('.hero .btn, .continent-hero blockquote');
        if (btn) {
            tlHero.from(btn, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");
        }

        // --- Scroll Animations (Sections) ---
        gsap.utils.toArray('.continent-card, .recipe-card').forEach((card, i) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 1,
                delay: (i % 3) * 0.1,
                ease: "power3.out"
            });
        });

        // --- Parallax Hero ---
        if (document.querySelector('.hero-bg')) {
            gsap.to('.hero-bg', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100,
                ease: 'none'
            });
        }
    }

    // --- Flip Cards Interaction ---
    const cards = document.querySelectorAll('.recipe-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- Page Transitions ---
    document.querySelectorAll('.nav-link, .continent-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                e.preventDefault();
                gsap.to('body', {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    gsap.from('body', { opacity: 0, duration: 0.5 });
});
