/**
 * Saveurs du Monde - Script Principal
 * Gère le menu mobile, les animations au scroll et les interactions utilisateur.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hamburger & Navigation Sliding ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Basculer l'état actif du menu et de l'icône
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Empêcher le scroll quand le menu est ouvert sur mobile
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Animation d'Apparition au Scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // L'élément doit être visible à 10%
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe 'appear' pour déclencher la transition CSS
                entry.target.classList.add('appear');
                // Cesser d'observer l'élément une fois apparu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Cibler tous les éléments avec la classe .fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Défilement Doux pour les boutons d'ancrage ---
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Interaction Flip Cards au Clic ---
    // Permet de retourner la carte au clic (utile pour mobile et accessibilité)
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function() {
            const inner = this.querySelector('.flip-card-inner');
            // On bascule une classe 'flipped' pour gérer l'état
            inner.classList.toggle('flipped');
        });
    });
});
