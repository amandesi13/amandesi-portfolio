const revealItems = document.querySelectorAll("[data-reveal]");
const heroImage = document.querySelector(".hero-media img");
const glow = document.querySelector(".cursor-glow");
const marquee = document.querySelector(".skill-marquee div");

if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

let latestScroll = 0;
let ticking = false;

function updateScrollEffects() {
  const progress = Math.min(latestScroll / Math.max(window.innerHeight, 1), 1);
  if (heroImage) {
    heroImage.style.transform = `scale(${1.04 + progress * 0.06}) translateY(${progress * 18}px)`;
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    latestScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener("pointermove", (event) => {
  if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  glow.style.opacity = "1";
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

updateScrollEffects();
