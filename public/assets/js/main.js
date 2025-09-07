// Configuration et initialisation des animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation d'AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Configuration de Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00f5ff', '#ff0080', '#39ff14']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00f5ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Configuration de Typed.js pour l'effet de frappe
    const typed = new Typed('.typed-text', {
        strings: [
            'Waribiz',
            'des formations digitales',
            'votre expertise',
            'votre succès'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Animation des compteurs statistiques
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 secondes
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Observer pour déclencher l'animation des compteurs
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Animation des barres de progression
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressTexts = document.querySelectorAll('.progress-text');
        
        progressBars.forEach((bar, index) => {
            // Valeurs aléatoires pour la démo
            const randomProgress = Math.floor(Math.random() * 100);
            
            setTimeout(() => {
                bar.style.width = randomProgress + '%';
                if (progressTexts[index]) {
                    progressTexts[index].textContent = randomProgress + '% complété';
                }
            }, index * 200);
        });
    }

    // Observer pour les barres de progression
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    });

    const formationsSection = document.querySelector('#formations');
    if (formationsSection) {
        progressObserver.observe(formationsSection);
    }

    // Smooth scrolling pour les liens de navigation
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

    // Effet ripple sur les boutons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple-effect');

        const ripple = button.getElementsByClassName('ripple-effect')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Ajouter l'effet ripple aux boutons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
        button.classList.add('ripple');
    });

    // Animation de la navigation au scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher la navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer la navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        // Effet de transparence
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255,255,255,0.1)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.05)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animations GSAP pour les éléments avancés
    if (typeof gsap !== 'undefined') {
        // Animation des cards flottantes
        gsap.to('.floating-card:nth-child(1)', {
            y: -20,
            duration: 2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to('.floating-card:nth-child(2)', {
            y: -15,
            duration: 2.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.5
        });

        gsap.to('.floating-card:nth-child(3)', {
            y: -25,
            duration: 1.8,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1
        });

        // Animation du diagramme de parrainage
        gsap.fromTo('.connection-line', {
            scaleX: 0
        }, {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.network-diagram',
                start: 'top 80%'
            }
        });

        gsap.fromTo('.commission-flow', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 1,
            scrollTrigger: {
                trigger: '.network-diagram',
                start: 'top 80%'
            }
        });

        // Animation des nodes
        gsap.fromTo('.node', {
            scale: 0,
            rotation: 180
        }, {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.network-diagram',
                start: 'top 80%'
            }
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation de soumission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (remplacer par vraie logique)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message envoyé !';
                submitBtn.classList.remove('btn-neon-primary');
                submitBtn.classList.add('btn-neon-secondary');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-neon-secondary');
                    submitBtn.classList.add('btn-neon-primary');
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }

    // Effet de parallax subtil sur les sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animation des icônes néon au hover
    document.querySelectorAll('.neon-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Gestion des tooltips personnalisés
    function createTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 30 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
        
        element.addEventListener('mousemove', function(e) {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 30 + 'px';
        });
    }

    // Ajouter des tooltips aux éléments avec data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        createTooltip(element, element.getAttribute('data-tooltip'));
    });

    // Gestion de la performance sur mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Désactiver certaines animations coûteuses sur mobile
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.animation = 'none';
        });
        
        // Réduire le nombre de particules
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.number.value = 30;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    // Lazy loading pour les images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Notification toast personnalisée
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle me-2"></i>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Exemple d'utilisation des toasts
    document.querySelectorAll('.btn-neon-primary').forEach(btn => {
        if (btn.textContent.includes('Acheter')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Fonctionnalité d\'achat bientôt disponible !', 'info');
            });
        }
    });

    // Animation de chargement de la page
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Gestion du mode sombre/clair (optionnel)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    console.log('🚀 Waribiz - Toutes les animations sont initialisées !');
});

// Styles CSS pour les éléments JavaScript
const additionalStyles = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .custom-tooltip {
        position: absolute;
        background: var(--glass-bg);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        display: none;
        border: 1px solid var(--neon-primary);
        box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        backdrop-filter: blur(10px);
    }

    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid var(--neon-primary);
        box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        backdrop-filter: blur(10px);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    }

    .toast-notification.show {
        transform: translateX(0);
    }

    .toast-success {
        border-color: var(--neon-accent);
        box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
    }

    .toast-error {
        border-color: var(--neon-secondary);
        box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
    }

    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }

    .navbar {
        transition: transform 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease;
    }

    @media (max-width: 768px) {
        .toast-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
        }
        
        .toast-notification.show {
            transform: translateY(0);
        }
    }
`;

// Ajouter les styles supplémentaires
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

