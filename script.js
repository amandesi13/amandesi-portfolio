const storyTabs = [...document.querySelectorAll("[data-story]")];
const storyPanels = [...document.querySelectorAll("[data-panel]")];
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

let selectedStory = "comnets";
let resetTimer = null;

function showStory(story) {
  storyTabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.story === story));
  });

  storyPanels.forEach((panel) => {
    const active = panel.dataset.panel === story;
    panel.classList.toggle("is-active", active);
    panel.setAttribute("aria-hidden", String(!active));
  });
}

function returnToSelection() {
  window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => showStory(selectedStory), 120);
}

storyTabs.forEach((tab, index) => {
  const story = tab.dataset.story;

  tab.addEventListener("pointerenter", () => {
    if (hoverCapable.matches) {
      window.clearTimeout(resetTimer);
      showStory(story);
    }
  });

  tab.addEventListener("pointerleave", () => {
    if (hoverCapable.matches) returnToSelection();
  });

  tab.addEventListener("focus", () => {
    window.clearTimeout(resetTimer);
    showStory(story);
  });

  tab.addEventListener("click", () => {
    selectedStory = story;
    showStory(story);
  });

  tab.addEventListener("keydown", (event) => {
    const columns = window.innerWidth <= 560 ? 2 : 2;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = Math.min(index + 1, storyTabs.length - 1);
    if (event.key === "ArrowLeft") nextIndex = Math.max(index - 1, 0);
    if (event.key === "ArrowDown") nextIndex = Math.min(index + columns, storyTabs.length - 1);
    if (event.key === "ArrowUp") nextIndex = Math.max(index - columns, 0);

    if (nextIndex !== index) {
      event.preventDefault();
      storyTabs[nextIndex].focus();
    }
  });
});

showStory(selectedStory);
