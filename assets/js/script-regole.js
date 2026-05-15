/* ============================================
   SCRIPT PER LA PAGINA DELLE REGOLE
   Gestisce animazioni ed effetti interattivi
   ============================================ */

// Animazioni ed effetti per la pagina delle regole

document.addEventListener('DOMContentLoaded', () => {
    // Animazione di ingresso per le sezioni con scroll
    const sections = document.querySelectorAll('.rule-section');
    
    // Opzioni per l'Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observer per animare le sezioni quando entrano nel viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Effetto hover sui livelli di difficoltà (se presenti)
    const levels = document.querySelectorAll('.level');
    levels.forEach(level => {
        level.addEventListener('click', () => {
            const difficulty = level.querySelector('h3').textContent.toLowerCase();
            
            // Mappa i nomi italiani alle chiavi di difficoltà
            const difficultyMap = {
                'facile': 'easy',
                'medio': 'medium',
                'difficile': 'hard'
            };
            
            localStorage.setItem('selectedDifficulty', difficultyMap[difficulty]);
            window.location.href = 'index.html';
        });
    });
    
    // Animazione sul pulsante "Inizia a Giocare"
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('mouseenter', () => {
            playButton.style.transform = 'scale(1.05) translateY(-3px)';
        });
        
        playButton.addEventListener('mouseleave', () => {
            playButton.style.transform = 'scale(1) translateY(0)';
        });
    }
    
    // Smooth scroll per link interni (ancora)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});