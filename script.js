"use strict";

document.documentElement.classList.add("js-enabled");

// Content and links work without JavaScript; only reveal controls once ready.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
menuToggle.hidden = false;

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(max-width: 620px)").addEventListener("change", closeMenu);

// Keep navigation in step with the section being read.
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));
let scrollScheduled = false;

function updateNavigation() {
  const readingLine = Math.min(window.innerHeight * 0.3, 200);
  let activeSection = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) activeSection = section;
  }
  for (const link of navLinks) {
    if (link.getAttribute("href") === `#${activeSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
  scrollScheduled = false;
}
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(updateNavigation);
}, { passive: true });
updateNavigation();

const filters = document.querySelector(".filters");
const filterButtons = [...filters.querySelectorAll("button")];
const workGroups = [...document.querySelectorAll("[data-work-group]")];
const filterStatus = document.querySelector("#filter-status");
filters.hidden = false;
for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    for (const otherButton of filterButtons) {
      otherButton.setAttribute("aria-pressed", String(otherButton === button));
    }
    for (const group of workGroups) {
      group.hidden = filter !== "all" && group.dataset.workGroup !== filter;
    }
    const count = workGroups.filter((group) => !group.hidden)
      .reduce((total, group) => total + group.querySelectorAll("[data-kind]").length, 0);
    const label = filter === "all" ? "works" : filter === "publication" ? "publications" : "projects";
    filterStatus.textContent = `Showing ${count} ${label}.`;
  });
}

// Metadata follows the project pages. VideoReloc is an arXiv preprint.
const citations = {
  cinematraj: {
    name: "CinemaTraj",
    bibtex: `@inproceedings{li2026cinematraj,
  title = {CinemaTraj: Composing Atomic Camera Trajectories for 3D Scenes with LLM Agents},
  author = {Li, Qianru and Chen, Xuyang and Turkoz, Erkin and Wang, Xuqin and Wu, Tao and Liu, Lu and Zhang, Yanfeng},
  booktitle = {Proceedings of the 34th ACM International Conference on Multimedia (MM '26)},
  year = {2026},
  url = {https://cinematraj.github.io/}
}`
  },
  videoreloc: {
    name: "VideoReloc",
    bibtex: `@misc{li2026videoreloc,
  title = {VideoReloc: Long-Term Indoor Video Relocalization against a Kilobyte-Scale Semantic Scene Graph},
  author = {Li, Qianru and Chen, Xuyang and Wang, Xuqin and Zhang, Zhenghao and Luo, Hongyi and Wu, Tao and Cremers, Daniel and Liu, Lu and Zhang, Yanfeng},
  year = {2026},
  eprint = {2609.21804},
  archivePrefix = {arXiv},
  primaryClass = {cs.CV},
  url = {https://arxiv.org/abs/2609.21804}
}`
  }
};

const citationDialog = document.querySelector("#citation-dialog");
const citationText = document.querySelector("#citation-text");
const citationTitle = document.querySelector("#citation-title");
const copyStatus = document.querySelector("#copy-status");
const copyButton = document.querySelector("#copy-citation");
for (const button of document.querySelectorAll("[data-citation]")) {
  button.hidden = false;
  button.addEventListener("click", () => {
    const citation = citations[button.dataset.citation];
    citationTitle.textContent = `Cite ${citation.name}`;
    citationText.textContent = citation.bibtex;
    copyStatus.textContent = "";
    citationDialog.showModal();
  });
}
copyButton.addEventListener("click", async () => {
  copyButton.disabled = true;
  copyStatus.textContent = "";
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(citationText.textContent);
    } else {
      // Local-file previews and HTTP hosts may not expose Clipboard API.
      const input = document.createElement("textarea");
      input.value = citationText.textContent;
      input.setAttribute("aria-label", "Citation to copy");
      input.style.position = "fixed";
      input.style.opacity = "0";
      citationDialog.append(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      if (!copied) throw new Error("Copy unavailable");
    }
    copyStatus.textContent = "Citation copied.";
  } catch {
    copyStatus.textContent = "Select the citation above to copy it manually.";
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citationText);
    selection.removeAllRanges();
    selection.addRange(range);
    citationText.parentElement.focus();
  } finally {
    copyButton.disabled = false;
  }
});

const demoDialog = document.querySelector("#demo-dialog");
const demoVideo = document.querySelector("#cinematraj-video");
const demoButton = document.querySelector("[data-open-demo]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
demoButton.hidden = false;
demoButton.addEventListener("click", () => {
  demoDialog.showModal();
  // Playback follows an explicit click; reduced-motion visitors use controls.
  if (!reduceMotion.matches) demoVideo.play().catch(() => {});
});
demoDialog.addEventListener("close", () => demoVideo.pause());

for (const dialog of document.querySelectorAll("dialog")) {
  dialog.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
  let pointerStartedOnBackdrop = false;
  dialog.addEventListener("pointerdown", (event) => {
    pointerStartedOnBackdrop = event.target === dialog && isOutsideDialog(event, dialog);
  });
  dialog.addEventListener("click", (event) => {
    if (pointerStartedOnBackdrop && event.target === dialog && isOutsideDialog(event, dialog)) dialog.close();
    pointerStartedOnBackdrop = false;
  });
}
function isOutsideDialog(event, dialog) {
  const bounds = dialog.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
}
document.querySelector("#current-year").textContent = new Date().getFullYear();
