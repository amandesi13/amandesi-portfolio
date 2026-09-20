/* Amandeep Singh — portfolio interactions.
   Progressive enhancement: everything is readable with JS disabled. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* Nav shadow once scrolled past the top */
const nav = document.getElementById("site-nav");
const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Scroll reveals — classes are added here so no-JS renders fully visible */
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".hero-copy, .hero-portrait, .section-head, .principles li, .approach-visual, .now-panel, .timeline > li, .tl-visual, .card, .stack-col, .about-visual, .about-copy, .contact-inner > *"
  );

  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Elements already scrolled past (deep links) must not stay invisible.
        const scrolledPast = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !scrolledPast) return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  targets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
    revealer.observe(el);
  });
}

/* Active section in the nav */
const navLinks = [...document.querySelectorAll(".nav-sections a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5] }
  );

  sections.forEach((section) => spy.observe(section));
}

/* Pointer spotlight on project cards */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      },
      { passive: true }
    );
  });
}
