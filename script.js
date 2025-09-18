document.addEventListener("DOMContentLoaded", () => {
  // ===== UTILITAIRES =====
  const qs = (s, o = document) => o.querySelector(s);
  const qsa = (s, o = document) => [...o.querySelectorAll(s)];
  const toggleClass = (el, cls) => el?.classList.toggle(cls);
  const addClass = (el, cls) => el?.classList.add(cls);
  const removeClass = (el, cls) => el?.classList.remove(cls);

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const showNotification = (message, type = "info") => {
    qs(".notification")?.remove();

    const notif = document.createElement("div");
    notif.className = `notification notification--${type}`;
    notif.innerHTML = `
      <div class="notification__content">
        <span>${message}</span>
        <button class="notification__close">&times;</button>
      </div>
    `;
    document.body.appendChild(notif);

    requestAnimationFrame(() => notif.classList.add("show"));

    const removeNotif = () => {
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 300);
    };

    notif.querySelector(".notification__close").addEventListener("click", removeNotif);
    setTimeout(removeNotif, 5000);
  };

  // ===== VARIABLES =====
  const burger = qs("#burger");
  const navMenu = qs("#navMenu");
  const navOverlay = qs("#navOverlay");
  const navLinks = qsa(".nav-link");
  const header = qs(".header");

  // ===== MENU MOBILE =====
  const toggleMobileMenu = () => {
    toggleClass(burger, "active");
    toggleClass(navMenu, "show");
    toggleClass(navOverlay, "show");
    document.body.style.overflow = navMenu.classList.contains("show") ? "hidden" : "auto";
  };

  const closeMobileMenu = () => {
    [burger, navMenu, navOverlay].forEach(el => removeClass(el, "show"));
    removeClass(burger, "active");
    document.body.style.overflow = "auto";
  };

  burger?.addEventListener("click", toggleMobileMenu);
  navOverlay?.addEventListener("click", closeMobileMenu);
  navLinks.forEach(link => link.addEventListener("click", closeMobileMenu));
  document.addEventListener("keydown", e => e.key === "Escape" && navMenu.classList.contains("show") && closeMobileMenu());

  // ===== ANIMATION D'ÉCRITURE =====
  const typewriterText = "Bienvenue dans l'univers des saveurs authentiques du café. Découvrez nos créations artisanales préparées avec passion pour éveiller tous vos sens.";
  const typewriterElement = qs("#typewriter");
  let i = 0;
  const typeWriter = () => {
    if (i < typewriterText.length) {
      typewriterElement.textContent += typewriterText.charAt(i++);
      setTimeout(typeWriter, 50);
    }
  };
  setTimeout(typeWriter, 1000);

  // ===== ANIMATIONS AU SCROLL =====
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
  }, observerOptions);

  qsa(".fade-in, .menu-item").forEach(el => observer.observe(el));

  // ===== SCROLL SMOOTH =====
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = qs(anchor.getAttribute("href"));
      if (target) {
        const headerHeight = header?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ===== HEADER STYLE AU SCROLL =====
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "linear-gradient(90deg, var(--color-coffee) 50%, rgba(26, 26, 26, 0.95) 50%)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "linear-gradient(90deg, var(--color-coffee) 50%, var(--color-black) 50%)";
      header.style.backdropFilter = "none";
    }
  });

  // ===== FORMULAIRE DE RÉSERVATION =====
  const reservationForm = qs("#reservationForm");
  reservationForm?.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    const { name, email, date, people } = Object.fromEntries(formData);

    if (!name || !email || !date || !people) return alert("Veuillez remplir tous les champs obligatoires.");
    if (new Date(date) < new Date().setHours(0, 0, 0, 0)) return alert("Veuillez sélectionner une date future.");

    alert(`Merci ${name} ! Votre réservation pour ${people} personne(s) le ${date} a été enregistrée. Confirmation par email à ${email}.`);
    reservationForm.reset();
  });

  // ===== PARALLAXE =====
  window.addEventListener("scroll", () => {
    const heroBackground = qs(".hero-bg");
    if (heroBackground) heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
  });

  // ===== HOVER SUR CARTES =====
  qsa(".service-card").forEach(card => {
    card.addEventListener("mouseenter", () => (card.style.background = "rgba(210, 105, 30, 0.2)"));
    card.addEventListener("mouseleave", () => (card.style.background = "rgba(255, 255, 255, 0.1)"));
  });

  // ===== COMPTEUR DE PRIX =====
  const animatePrice = el => {
    const price = parseFloat(el.textContent.replace("€", ""));
    const steps = 30, duration = 1000, increment = price / steps;
    let current = 0, step = 0;
    const timer = setInterval(() => {
      step++;
      current = step >= steps ? price : increment * step;
      el.textContent = current.toFixed(2) + " €";
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  };

  const priceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatePrice(entry.target);
        priceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  qsa(".menu-price").forEach(price => priceObserver.observe(price));

  // ===== LAZY LOADING IMAGES =====
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s";
          requestAnimationFrame(() => (img.style.opacity = "1"));
          imageObserver.unobserve(img);
        }
      });
    });
    qsa(".menu-image").forEach(img => imageObserver.observe(img));
  }

  // ===== REDIMENSIONNEMENT =====
  window.addEventListener("resize", () => {
    const hero = qs(".hero");
    if (window.innerHeight > hero.offsetHeight) hero.style.minHeight = window.innerHeight + "px";
  });

  // ===== EASTER EGG : LOGO =====
  const logo = qs(".logo");
  let clickCount = 0;
  logo?.addEventListener("click", () => {
    if (++clickCount >= 5) {
      logo.style.animation = "spin 1s ease-in-out";
      setTimeout(() => {
        logo.style.animation = "";
        clickCount = 0;
      }, 1000);
    }
  });

  const style = document.createElement("style");
  style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
});
