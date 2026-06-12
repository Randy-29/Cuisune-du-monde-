document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hamburger ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fermer le menu si on clique sur un lien (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- Animation d'apparition au scroll (Fade-in) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Une fois l'élément apparu, on arrête de l'observer
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Bouton "Découvrir" scroll doux ---
    const discoverBtn = document.querySelector('.btn-discover');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = discoverBtn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
