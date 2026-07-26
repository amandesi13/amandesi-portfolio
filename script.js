const chapters = [...document.querySelectorAll(".chapter")];
const chapterRail = document.querySelector(".chapter-rail");
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

let selectedChapter = "comnets";
let resetTimer = null;

function activateChapter(name) {
  chapterRail.classList.toggle("has-active", Boolean(name));

  chapters.forEach((chapter) => {
    const active = chapter.dataset.chapter === name;
    const trigger = chapter.querySelector(".chapter-trigger");
    const panel = chapter.querySelector(".chapter-content");

    chapter.classList.toggle("is-active", active);
    trigger.setAttribute("aria-selected", String(active));
    panel.setAttribute("aria-hidden", String(!active));
  });
}

chapters.forEach((chapter, index) => {
  const trigger = chapter.querySelector(".chapter-trigger");
  const closeButton = chapter.querySelector(".chapter-close");
  const name = chapter.dataset.chapter;

  chapter.addEventListener("pointerenter", () => {
    if (!hoverCapable.matches) return;
    window.clearTimeout(resetTimer);
    activateChapter(name);
  });

  trigger.addEventListener("click", () => {
    selectedChapter = name;
    activateChapter(name);
  });

  trigger.addEventListener("focus", () => {
    window.clearTimeout(resetTimer);
    activateChapter(name);
  });

  trigger.addEventListener("keydown", (event) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = Math.min(index + 1, chapters.length - 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = Math.max(index - 1, 0);
    }
    if (next !== index) {
      event.preventDefault();
      chapters[next].querySelector(".chapter-trigger").focus();
    }
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedChapter = null;
    activateChapter(null);
    chapterRail.focus({ preventScroll: true });
  });
});

chapterRail.addEventListener("pointerleave", () => {
  if (!hoverCapable.matches) return;
  window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => activateChapter(selectedChapter), 140);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  selectedChapter = null;
  activateChapter(null);
  chapterRail.focus({ preventScroll: true });
});

activateChapter(selectedChapter);
