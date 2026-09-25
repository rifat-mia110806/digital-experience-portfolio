/* =========================================================
   RIFAT® — Small, readable JavaScript
   1. Loader
   2. Header on scroll
   3. Mobile menu
   4. Scroll reveal
   ========================================================= */

const loader = document.querySelector(".page-loader");
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealElements = document.querySelectorAll(".reveal");

// Hide the intro loader after the page is ready.
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 500);
});

// Add a glassy header after the user starts scrolling.
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

// Open and close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close mobile navigation after a link is selected.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections when they enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));
