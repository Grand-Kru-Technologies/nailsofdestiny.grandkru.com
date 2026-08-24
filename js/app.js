const THEMES = {
  temple: {
    name: "Alkaline Temple",
    defaultPalette: "gold",
    eyebrow: "Plant · Mineral · Ancestral",
    headline: "Where the body is a garden.",
    hero: "A nail-service catalog first — soak, pedicure, cuticle rite, Destiny Set — then a small take-home shelf.",
    menuTitle: "Nail services. This is the first menu.",
    menuLede: "Same four services in every house. Book the chair first. Products wait below.",
    houseTitle: "Built for people who already drink the teas.",
    house: "Every look opens on the same service catalog. Alkaline Temple just dresses it in gold hairlines and candlelight.",
    booking: "Services first. Then the shelf.",
  },
  clay: {
    name: "Red Clay",
    defaultPalette: "river",
    eyebrow: "Earth · Cowrie · Firelight",
    headline: "Earth-made. Destiny-kept.",
    hero: "The same service catalog, in clay and cowrie. Book the chair first. Take pigment home after if you want it.",
    menuTitle: "Nail services. This is the first menu.",
    menuLede: "Soak, pedicure, cuticle rite, Destiny Set. Products sit on the second shelf.",
    houseTitle: "A studio with clay under its nails.",
    house: "Every look opens on the same service catalog. Red Clay just warms it with terracotta tiles and Sunday-best gold.",
    booking: "Services first. Then the shelf.",
  },
  garden: {
    name: "Wild Herb Garden",
    defaultPalette: "linen",
    eyebrow: "Linen · Sea moss · Morning",
    headline: "Sun, sea moss, and still hands.",
    hero: "The same service catalog, in morning light. Book a ritual first. The garden shelf comes second.",
    menuTitle: "Nail services. This is the first menu.",
    menuLede: "A garden path of services. Products wait after you sit.",
    houseTitle: "A garden that does nails.",
    house: "Every look opens on the same service catalog. Wild Herb Garden just lights it with linen, sage, and sky.",
    booking: "Services first. Then the shelf.",
  },
};

const PALETTES = {
  temple: {
    gold: {
      name: "Gold Grove",
      note: "Forest wall, cream type, antique gold accent, deep moss card.",
      roles: [
        { label: "Wall", hex: "#0e120d" },
        { label: "Type", hex: "#f3ead8" },
        { label: "Accent", hex: "#c9a227" },
        { label: "Card", hex: "#171d15" },
      ],
    },
    moon: {
      name: "Moon Moss",
      note: "Near-black wall, bone type, pale metal accent, cool moss card.",
      roles: [
        { label: "Wall", hex: "#080b0a" },
        { label: "Type", hex: "#efe8dc" },
        { label: "Accent", hex: "#c5b89a" },
        { label: "Card", hex: "#121816" },
      ],
    },
    amber: {
      name: "Amber Sanctuary",
      note: "Warm umber wall, ivory type, copper accent, brown card.",
      roles: [
        { label: "Wall", hex: "#1a1410" },
        { label: "Type", hex: "#f6ead6" },
        { label: "Accent", hex: "#c4783a" },
        { label: "Card", hex: "#241c16" },
      ],
    },
  },
  clay: {
    river: {
      name: "River Clay",
      note: "Sand wall, umber type, fired-clay accent, cream card.",
      roles: [
        { label: "Wall", hex: "#f3e6d4" },
        { label: "Type", hex: "#3a2216" },
        { label: "Accent", hex: "#b5651d" },
        { label: "Card", hex: "#fff6ec" },
      ],
    },
    cowrie: {
      name: "Cowrie Night",
      note: "Deep earth wall, ivory type, cowrie-gold accent, brown card.",
      roles: [
        { label: "Wall", hex: "#2a1810" },
        { label: "Type", hex: "#f3e6d0" },
        { label: "Accent", hex: "#d4a017" },
        { label: "Card", hex: "#3a2418" },
      ],
    },
    ochre: {
      name: "Ochre Market",
      note: "Sun-sand wall, cocoa type, market-ochre accent, pale card.",
      roles: [
        { label: "Wall", hex: "#efe0c4" },
        { label: "Type", hex: "#4a2c18" },
        { label: "Accent", hex: "#c4892a" },
        { label: "Card", hex: "#fff6e4" },
      ],
    },
  },
  garden: {
    linen: {
      name: "Morning Linen",
      note: "Sun-oat wall, warm ink, olive-morning accent, cream card.",
      roles: [
        { label: "Wall", hex: "#f3ead4" },
        { label: "Type", hex: "#2a2418" },
        { label: "Accent", hex: "#6a7a38" },
        { label: "Card", hex: "#fff8ec" },
      ],
    },
    seaglass: {
      name: "Sea Moss Glass",
      note: "Tide-glass wall, deep driftwood type, sea-moss accent, icy card.",
      roles: [
        { label: "Wall", hex: "#c9e6e2" },
        { label: "Type", hex: "#0e2422" },
        { label: "Accent", hex: "#0f6f64" },
        { label: "Card", hex: "#f3fffc" },
      ],
    },
    night: {
      name: "Night Garden",
      note: "Deep olive wall, cream type, moss accent, dusk card.",
      roles: [
        { label: "Wall", hex: "#1c241c" },
        { label: "Type", hex: "#efe8d4" },
        { label: "Accent", hex: "#7d9a5a" },
        { label: "Card", hex: "#262e24" },
      ],
    },
  },
};

const STORAGE_KEY = "nails-of-destiny-look";
const FADE_MS = 560;
const veil = document.querySelector(".veil");
const copyNodes = document.querySelectorAll("[data-copy]");
const themeButtons = document.querySelectorAll("[data-theme-btn]");
const chooseButton = document.getElementById("choose-look");
const form = document.getElementById("feedback-form");
const feedback = document.getElementById("feedback");
const errorSummary = document.getElementById("error-summary");
const commentField = document.getElementById("comment");
const nameField = document.getElementById("name");
const dockNote = document.getElementById("dock-note");
const paletteGrid = document.getElementById("palette-grid");
const quotes = [...document.querySelectorAll("[data-quote]")];
const quoteStatus = document.getElementById("quote-status");
let quoteIndex = 0;
let fading = false;

function reduceMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") || "temple";
}

function currentPalette() {
  return document.documentElement.getAttribute("data-palette") || THEMES[currentTheme()].defaultPalette;
}

function paletteName(theme, palette) {
  return PALETTES[theme][palette]?.name || palette;
}

function applyTheme(theme, palette) {
  if (!THEMES[theme]) return;
  const nextPalette = palette || THEMES[theme].defaultPalette;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-palette", nextPalette);
  const copy = THEMES[theme];
  copyNodes.forEach((node) => {
    const key = node.getAttribute("data-copy");
    if (key === "chooser") {
      node.textContent = `You are previewing ${copy.name} · ${paletteName(theme, nextPalette)}.`;
      return;
    }
    if (copy[key]) node.textContent = copy[key];
  });
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-theme-btn") === theme));
  });
  chooseButton.textContent = `Keep ${copy.name} · ${paletteName(theme, nextPalette)}`;
  dockNote.textContent = `${copy.name} · ${paletteName(theme, nextPalette)}`;
  renderPalettes(theme, nextPalette);
}

function renderPalettes(theme, active) {
  const set = PALETTES[theme];
  paletteGrid.innerHTML = "";
  Object.entries(set).forEach(([id, palette]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-card";
    button.setAttribute("data-palette-btn", id);
    button.setAttribute("aria-pressed", String(id === active));
    button.innerHTML = `
      <strong>${palette.name}</strong>
      <span class="chip-row">${palette.roles
        .map((role) => `<span class="chip"><i style="background:${role.hex}"></i><span>${role.label}</span></span>`)
        .join("")}</span>
      <span class="muted">${palette.note}</span>
    `;
    button.addEventListener("click", () => applyTheme(theme, id));
    paletteGrid.appendChild(button);
  });
}

function paint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function fadeThrough(next) {
  if (fading) return;
  if (reduceMotion()) {
    next();
    window.scrollTo(0, 0);
    return;
  }
  fading = true;
  veil.style.background = getComputedStyle(document.body).backgroundColor;
  document.documentElement.classList.add("is-fading");
  await wait(FADE_MS);
  next();
  window.scrollTo(0, 0);
  await paint();
  document.documentElement.classList.remove("is-fading");
  await wait(FADE_MS);
  veil.style.background = "";
  fading = false;
}

function goToChooser() {
  document.getElementById("choose").scrollIntoView({
    behavior: reduceMotion() ? "auto" : "smooth",
  });
}

function switchHouse(theme) {
  if (theme === currentTheme()) return;
  fadeThrough(() => applyTheme(theme, THEMES[theme].defaultPalette));
}

const GROW_MS = 360;
const SPLIT_MS = 420;
const rails = [...document.querySelectorAll(".float-rail")];

function railBusy() {
  return rails.some((rail) => rail.classList.contains("is-busy"));
}

function measureRail(rail) {
  const button = rail.querySelector(".float-toggle");
  const panel = rail.querySelector(".float-panel");
  const bubble = button.getBoundingClientRect();
  rail.classList.add("is-measure");
  const box = panel.getBoundingClientRect();
  rail.classList.remove("is-measure");
  const maxWidth = Math.min(box.width, window.innerWidth - 28);
  rail.style.setProperty("--bubble-w", `${Math.round(bubble.width)}px`);
  rail.style.setProperty("--bubble-h", `${Math.round(bubble.height)}px`);
  rail.style.setProperty("--box-w", `${Math.round(maxWidth)}px`);
  rail.style.setProperty("--box-h", `${Math.round(box.height + 16)}px`);
}

async function openRail(rail) {
  const button = rail.querySelector(".float-toggle");
  measureRail(rail);
  button.setAttribute("aria-expanded", "true");
  if (reduceMotion()) {
    rail.classList.add("is-open");
    return;
  }
  rail.classList.add("is-grow");
  await wait(GROW_MS);
  rail.classList.add("is-open");
  await paint();
  rail.classList.remove("is-grow");
  await wait(SPLIT_MS);
}

async function closeRail(rail, instant) {
  const button = rail.querySelector(".float-toggle");
  if (instant || reduceMotion() || !rail.classList.contains("is-open")) {
    rail.classList.remove("is-open", "is-grow");
    button.setAttribute("aria-expanded", "false");
    return;
  }
  rail.classList.add("is-grow");
  rail.classList.remove("is-open");
  await wait(SPLIT_MS);
  rail.classList.remove("is-grow");
  button.setAttribute("aria-expanded", "false");
  await wait(GROW_MS);
}

function setupRails() {
  rails.forEach((rail) => {
    const button = rail.querySelector(".float-toggle");
    button.addEventListener("click", async () => {
      if (railBusy()) return;
      const shouldOpen = !rail.classList.contains("is-open");
      rail.classList.add("is-busy");
      if (shouldOpen) {
        await Promise.all(
          rails.filter((other) => other !== rail).map((other) => closeRail(other, true))
        );
        await openRail(rail);
      } else {
        await closeRail(rail);
      }
      rail.classList.remove("is-busy");
    });
  });
}

function savedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveState(partial) {
  const next = { ...savedState(), ...partial, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function summarize(state) {
  const theme = state.choice || currentTheme();
  const palette = state.palette || currentPalette();
  const name = state.name ? `${state.name}: ` : "";
  const choice = state.choice
    ? `Chose ${THEMES[theme].name} · ${paletteName(theme, palette)}.`
    : "No look chosen yet.";
  const comment = state.comment ? ` Comment: ${state.comment}` : "";
  return `${name}${choice}${comment}`.trim();
}

function showFeedback(message) {
  errorSummary.classList.remove("show");
  feedback.classList.add("show");
  feedback.textContent = message;
}

function showError(message) {
  feedback.classList.remove("show");
  errorSummary.classList.add("show");
  errorSummary.textContent = message;
  errorSummary.focus();
}

function showQuote(next) {
  quoteIndex = (next + quotes.length) % quotes.length;
  quotes.forEach((quote, index) => {
    quote.hidden = index !== quoteIndex;
  });
  quoteStatus.textContent = `Story ${quoteIndex + 1} of ${quotes.length}`;
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => switchHouse(button.getAttribute("data-theme-btn")));
});

document.getElementById("back-to-chooser").addEventListener("click", goToChooser);
document.getElementById("all-houses").addEventListener("click", goToChooser);
document.getElementById("hero-choose").addEventListener("click", goToChooser);

chooseButton.addEventListener("click", () => {
  const theme = currentTheme();
  const palette = currentPalette();
  saveState({ choice: theme, palette, name: nameField.value.trim() });
  showFeedback(`Saved: ${THEMES[theme].name} · ${paletteName(theme, palette)}.`);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const comment = commentField.value.trim();
  if (!comment) {
    showError("Write what you’d change, or keep a look and palette above.");
    commentField.focus();
    return;
  }
  const state = saveState({
    comment,
    name: nameField.value.trim(),
    choice: savedState().choice || currentTheme(),
    palette: savedState().palette || currentPalette(),
  });
  showFeedback(`Noted. ${summarize(state)}`);
  commentField.value = "";
});

document.getElementById("copy-feedback").addEventListener("click", async () => {
  const text = summarize(savedState());
  try {
    await navigator.clipboard.writeText(text);
    showFeedback(`Copied: ${text}`);
  } catch {
    showFeedback(text);
  }
});

document.getElementById("quote-prev").addEventListener("click", () => showQuote(quoteIndex - 1));
document.getElementById("quote-next").addEventListener("click", () => showQuote(quoteIndex + 1));

const TOUR_KEY = "nails-of-destiny-tour";
const tourRoot = document.getElementById("tour");
const tourCard = document.getElementById("tour-card");
const tourTitle = document.getElementById("tour-title");
const tourBody = document.getElementById("tour-body");
const tourCount = document.getElementById("tour-count");
const tourSkip = document.getElementById("tour-skip");
const tourBack = document.getElementById("tour-back");
const tourNext = document.getElementById("tour-next");
const startTourButton = document.getElementById("start-tour");
const lookRail = document.querySelector(".float-looks");
const colorRail = document.querySelector(".float-palettes");

const TOUR_STEPS = [
  {
    title: "This page picks a look.",
    body: "You are inside a salon catalog. The four services stay the same. House and Color only change the room they sit in.",
  },
  {
    title: "House is the room.",
    body: "Open House for three layouts: Alkaline Temple, Red Clay, and Wild Herb Garden. Type, photos, and the shape of the page change with the house.",
    target: ".float-looks",
    rail: "look",
    place: "right",
  },
  {
    title: "Color is the paint.",
    body: "Each house has three palettes. Try one. The menu does not move.",
    target: ".float-palettes",
    rail: "color",
    place: "left",
  },
  {
    title: "Keep the one that feels like home.",
    body: "When a pair feels right, keep it. Or scroll to the bottom and say what you’d rather see.",
    target: "#all-houses",
    place: "below",
  },
];

let tourIndex = 0;
let tourActive = false;
let tourBusy = false;
let tourReturnFocus = null;

function tourSeen() {
  try {
    return Boolean(JSON.parse(localStorage.getItem(TOUR_KEY) || "{}").seen);
  } catch {
    return false;
  }
}

function markTourSeen() {
  localStorage.setItem(TOUR_KEY, JSON.stringify({ seen: true, at: new Date().toISOString() }));
}

function setPageInert(on) {
  [...document.body.children].forEach((node) => {
    if (node === tourRoot || node.classList.contains("skip-link")) return;
    if (on) node.setAttribute("inert", "");
    else node.removeAttribute("inert");
  });
}

function clearTourTarget() {
  document.querySelectorAll(".is-tour-target").forEach((node) => {
    node.classList.remove("is-tour-target");
  });
}

async function prepareTourStep(step) {
  if (step.rail === "look") {
    await closeRail(colorRail, true);
    if (!lookRail.classList.contains("is-open")) await openRail(lookRail);
  } else if (step.rail === "color") {
    await closeRail(lookRail, true);
    if (!colorRail.classList.contains("is-open")) await openRail(colorRail);
  } else {
    await Promise.all([closeRail(lookRail, true), closeRail(colorRail, true)]);
  }
}

function placeTourCard(step) {
  const margin = 14;
  const cardW = Math.min(360, window.innerWidth - 28);
  tourCard.style.width = `${cardW}px`;
  const cardH = tourCard.offsetHeight;
  const target = step.target ? document.querySelector(step.target) : null;
  let top;
  let left;

  if (!target) {
    left = (window.innerWidth - cardW) / 2;
    top = Math.max(16, (window.innerHeight - cardH) / 2);
  } else {
    const box = target.getBoundingClientRect();
    const canRight = step.place === "right" && box.right + margin + cardW <= window.innerWidth - 12;
    const canLeft = step.place === "left" && box.left - margin - cardW >= 12;
    const canBelow = box.bottom + margin + cardH <= window.innerHeight - 12;

    if (canRight) {
      left = box.right + margin;
      top = Math.min(box.top, window.innerHeight - cardH - 12);
    } else if (canLeft) {
      left = box.left - margin - cardW;
      top = Math.min(box.top, window.innerHeight - cardH - 12);
    } else if (step.place === "below" && canBelow) {
      left = Math.min(Math.max(12, box.left + box.width / 2 - cardW / 2), window.innerWidth - cardW - 12);
      top = box.bottom + margin;
    } else {
      left = Math.min(Math.max(12, box.left + box.width / 2 - cardW / 2), window.innerWidth - cardW - 12);
      top = box.top - cardH - margin;
      if (top < 12) {
        left = (window.innerWidth - cardW) / 2;
        top = Math.max(12, Math.min(box.top - cardH - margin, (window.innerHeight - cardH) / 2));
        if (top < 12) top = 12;
      }
    }
  }

  tourCard.style.left = `${Math.max(12, Math.min(left, window.innerWidth - cardW - 12))}px`;
  tourCard.style.top = `${Math.max(12, Math.min(top, window.innerHeight - cardH - 12))}px`;
}

async function renderTourStep() {
  const step = TOUR_STEPS[tourIndex];
  const last = tourIndex === TOUR_STEPS.length - 1;
  await prepareTourStep(step);
  clearTourTarget();
  if (step.target) document.querySelector(step.target)?.classList.add("is-tour-target");
  tourCount.textContent = `${tourIndex + 1} of ${TOUR_STEPS.length}`;
  tourTitle.textContent = step.title;
  tourBody.textContent = step.body;
  tourBack.hidden = tourIndex === 0;
  tourNext.textContent = last ? "Got it" : "Next";
  placeTourCard(step);
  await paint();
  placeTourCard(step);
  tourTitle.focus();
}

async function goTour(delta) {
  if (!tourActive || tourBusy) return;
  const next = tourIndex + delta;
  if (next < 0) return;
  if (next >= TOUR_STEPS.length) {
    await stopTour();
    return;
  }
  tourBusy = true;
  tourIndex = next;
  tourBack.disabled = true;
  tourNext.disabled = true;
  try {
    await renderTourStep();
  } finally {
    tourBusy = false;
    tourBack.disabled = false;
    tourNext.disabled = false;
  }
}

async function startTour() {
  if (tourActive || tourBusy) return;
  tourActive = true;
  tourBusy = true;
  tourReturnFocus =
    document.activeElement && document.activeElement !== document.body
      ? document.activeElement
      : startTourButton;
  tourIndex = 0;
  document.documentElement.classList.add("is-touring");
  tourRoot.hidden = false;
  setPageInert(true);
  try {
    await renderTourStep();
  } finally {
    tourBusy = false;
  }
}

async function stopTour() {
  if (!tourActive) return;
  tourActive = false;
  tourBusy = false;
  markTourSeen();
  clearTourTarget();
  await Promise.all([closeRail(lookRail, true), closeRail(colorRail, true)]);
  tourRoot.hidden = true;
  document.documentElement.classList.remove("is-touring");
  setPageInert(false);
  const focusBack =
    tourReturnFocus && typeof tourReturnFocus.focus === "function" && document.contains(tourReturnFocus)
      ? tourReturnFocus
      : startTourButton;
  focusBack.focus();
}

function onTourKey(event) {
  if (!tourActive) return;
  if (event.key === "Escape") {
    event.preventDefault();
    stopTour();
    return;
  }
  if (event.key !== "Tab") return;
  const buttons = [tourTitle, tourSkip, tourBack, tourNext].filter((button) => !button.hidden);
  const first = buttons[0];
  const last = buttons[buttons.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setupTour() {
  startTourButton.addEventListener("click", () => {
    clearTimeout(setupTour.timer);
    startTour();
  });
  tourSkip.addEventListener("click", stopTour);
  tourBack.addEventListener("click", () => goTour(-1));
  tourNext.addEventListener("click", () => goTour(1));
  document.addEventListener("keydown", onTourKey);
  window.addEventListener("resize", () => {
    if (tourActive) placeTourCard(TOUR_STEPS[tourIndex]);
  });
  const force = new URLSearchParams(location.search).has("tour");
  if (force || !tourSeen()) {
    setupTour.timer = setTimeout(startTour, reduceMotion() ? 0 : 480);
  }
}

setupRails();
const initial = savedState();
applyTheme(initial.choice || "temple", initial.palette);
if (initial.choice || initial.comment) showFeedback(summarize(initial));
showQuote(0);
setupTour();
