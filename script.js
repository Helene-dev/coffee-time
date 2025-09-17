// ANIMATION D'ÉCRITURE AUTOMATIQUE AU CHARGEMENT
        const typewriterText = "Bienvenue dans l'univers des saveurs authentiques du café. Découvrez nos créations artisanales préparées avec passion pour éveiller tous vos sens.";
        const typewriterElement = document.getElementById('typewriter');
        let i = 0;

        function typeWriter() {
            if (i < typewriterText.length) {
                typewriterElement.innerHTML += typewriterText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); 
            }
        }

        // Démarrer l'animation après 1 seconde
        setTimeout(typeWriter, 1000);

        // ANIMATIONS AU SCROLL
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec la classe fade-in
        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.fade-in, .menu-item');
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        });

        // MENU MOBILE
        const mobileMenu = document.getElementById('mobileMenu');
        const navMenu = document.getElementById('navMenu');

        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        
        // FERMER LE MENU MOBILE AU CLIC SUR UN LIEN
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenu.querySelector('i').className = 'fas fa-bars';
            });
        });

        // SCROLL SMOOTH POUR LES LIENS D'ANCRAGE
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // HEADER QUI CHANGE DE STYLE AU SCROLL
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'linear-gradient(90deg, var(--color-coffee) 50%, rgba(26, 26, 26, 0.95) 50%)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(90deg, var(--color-coffee) 50%, var(--color-black) 50%)';
                header.style.backdropFilter = 'none';
            }

            lastScrollY = currentScrollY;
        });

        // GESTION DU FORMULAIRE DE RÉSERVATION
        const reservationForm = document.getElementById('reservationForm');
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(reservationForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const date = formData.get('date');
            const people = formData.get('people');

            // Validation simple
            if (!name || !email || !date || !people) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            // Validation de la date (ne pas accepter les dates passées)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                alert('Veuillez sélectionner une date future.');
                return;
            }

            // Simulation d'envoi 
            alert(`Merci ${name} ! Votre réservation pour ${people} personne(s) le ${date} a été enregistrée. Nous vous confirmerons par email à ${email}.`);
            
            // Réinitialiser le formulaire
            reservationForm.reset();
        });

        // ANIMATION PARALLAXE LÉGÈRE SUR LE HERO
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // EFFET HOVER SUR LES CARTES DE SERVICE
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(210, 105, 30, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });

        // ANIMATION DE COMPTEUR POUR LES PRIX 
        function animatePrice(element) {
            const price = parseFloat(element.textContent.replace('€', ''));
            const duration = 1000;
            const steps = 30;
            const increment = price / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current = increment * step;
                
                if (step >= steps) {
                    current = price;
                    clearInterval(timer);
                }
                
                element.textContent = current.toFixed(2) + ' €';
            }, duration / steps);
        }

        // Observer pour les prix
        const priceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePrice(entry.target);
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.addEventListener('DOMContentLoaded', function() {
            const priceElements = document.querySelectorAll('.menu-price');
            priceElements.forEach(price => {
                priceObserver.observe(price);
            });
        });

        // LAZY LOADING POUR LES IMAGES (
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s';
                        
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 100);
                        
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.menu-image').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // GESTION DU REDIMENSIONNEMENT DE LA FENÊTRE
        window.addEventListener('resize', function() {
            // Réajuster la hauteur du hero si nécessaire
            const hero = document.querySelector('.hero');
            if (window.innerHeight > hero.offsetHeight) {
                hero.style.minHeight = window.innerHeight + 'px';
            }
        });

       

        // Appeler le préchargement après le chargement de la page
        window.addEventListener('load', preloadImages);

        // EASTER EGG : ANIMATION SPÉCIALE SUR LE LOGO
        const logo = document.querySelector('.logo');
        let clickCount = 0;

        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount >= 5) {
                this.style.animation = 'spin 1s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                    clickCount = 0;
                }, 1000);
            }
        });

        // Animation de rotation pour l'easter egg
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);