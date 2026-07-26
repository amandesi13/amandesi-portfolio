const storyButtons = [...document.querySelectorAll("[data-story]")];
const storyPanels = [...document.querySelectorAll("[data-panel]")];
const backdrop = document.querySelector(".story-backdrop");
const glow = document.querySelector(".cursor-glow");
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

let activeStory = null;
let pinnedStory = null;
let closeTimer = null;
let suppressFocusOpen = false;

function getButton(story) {
  return storyButtons.find((button) => button.dataset.story === story);
}

function getPanel(story) {
  return storyPanels.find((panel) => panel.dataset.panel === story);
}

function placePanel(story) {
  const button = getButton(story);
  const panel = getPanel(story);

  if (!button || !panel || window.innerWidth <= 860) return;

  panel.style.setProperty("--panel-left", "16px");
  panel.style.setProperty("--panel-top", "16px");

  const buttonRect = button.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const gap = 14;
  const edge = 16;

  let left = buttonRect.left + buttonRect.width / 2 - panelRect.width / 2;
  left = Math.max(edge, Math.min(left, window.innerWidth - panelRect.width - edge));

  let top = buttonRect.top - panelRect.height - gap;
  if (top < edge) top = buttonRect.bottom + gap;
  if (top + panelRect.height > window.innerHeight - edge) {
    top = Math.max(edge, window.innerHeight - panelRect.height - edge);
  }

  panel.style.setProperty("--panel-left", `${Math.round(left)}px`);
  panel.style.setProperty("--panel-top", `${Math.round(top)}px`);
}

function openStory(story, { pin = false } = {}) {
  window.clearTimeout(closeTimer);
  activeStory = story;
  if (pin) pinnedStory = story;

  storyButtons.forEach((button) => {
    const selected = button.dataset.story === story;
    button.setAttribute("aria-expanded", String(selected));
  });

  storyPanels.forEach((panel) => {
    panel.classList.toggle("is-open", panel.dataset.panel === story);
  });

  document.body.classList.add("story-open");
  document.body.classList.toggle("story-pinned", Boolean(pinnedStory));
  window.requestAnimationFrame(() => placePanel(story));
}

function closeStories({ force = false } = {}) {
  if (pinnedStory && !force) return;

  activeStory = null;
  pinnedStory = null;
  storyButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  storyPanels.forEach((panel) => panel.classList.remove("is-open"));
  document.body.classList.remove("story-open");
  document.body.classList.remove("story-pinned");
}

function scheduleClose() {
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => {
    if (!pinnedStory) closeStories();
  }, 240);
}

storyButtons.forEach((button) => {
  const story = button.dataset.story;

  button.addEventListener("click", () => {
    if (pinnedStory === story) {
      closeStories({ force: true });
      return;
    }
    openStory(story, { pin: true });
  });

  button.addEventListener("pointerenter", () => {
    if (hoverCapable.matches && !pinnedStory) openStory(story);
  });

  button.addEventListener("pointerleave", () => {
    if (hoverCapable.matches && !pinnedStory) scheduleClose();
  });

  button.addEventListener("focus", () => {
    if (!pinnedStory && !suppressFocusOpen) openStory(story);
  });
});

storyPanels.forEach((panel) => {
  panel.addEventListener("pointerenter", () => window.clearTimeout(closeTimer));
  panel.addEventListener("pointerleave", () => {
    if (!pinnedStory) scheduleClose();
  });

  panel.querySelector(".panel-close")?.addEventListener("click", () => {
    closeStories({ force: true });
    suppressFocusOpen = true;
    getButton(panel.dataset.panel)?.focus();
    window.requestAnimationFrame(() => {
      suppressFocusOpen = false;
    });
  });
});

backdrop?.addEventListener("click", () => closeStories({ force: true }));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeStory) closeStories({ force: true });
});

window.addEventListener("resize", () => {
  if (activeStory) placePanel(activeStory);
});

window.addEventListener("pointermove", (event) => {
  if (!glow || !hoverCapable.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  glow.style.opacity = "1";
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
