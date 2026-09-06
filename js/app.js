const THEMES = {
  temple: {
    name: "Alkaline Temple",
    defaultPalette: "gold",
    eyebrow: "Plant · Mineral · Ancestral",
    headline: "Where the body is a garden.",
    hero:
      "Plant pigments, sea moss soaks, and hands that treat beauty as a rite. Book the chair first — take-home formulas wait on the shelf below.",
    menuTitle: "Nail services",
    menuLede: "Soak, pedicure, cuticle rite, Destiny Set. Book the chair first. Products wait below.",
    houseTitle: "Built for people who already drink the teas.",
    house:
      "Gold hairlines, candlelight, and slower hands. Editorial type, 2px corners, forest wall and antique gold. Afrocentric on purpose.",
    booking: "Book a service",
  },
  clay: {
    name: "Red Clay",
    defaultPalette: "river",
    eyebrow: "Earth · Cowrie · Firelight",
    headline: "Earth-made. Destiny-kept.",
    hero:
      "Terracotta basins, cowrie light, and the same four services in fired earth. Book the chair first — pigment waits on the shelf.",
    menuTitle: "Nail services",
    menuLede: "Soak, pedicure, cuticle rite, Destiny Set — served in clay-warm rooms, not warm paper.",
    houseTitle: "A studio with clay under its nails.",
    house:
      "Terracotta bento grids, 22px softness, and cowrie warmth. The same four services in fired earth and Sunday gold.",
    booking: "Book a service",
  },
  garden: {
    name: "Wild Herb Garden",
    defaultPalette: "linen",
    eyebrow: "Linen · Sea moss · Sage",
    headline: "Sun, sea moss, and still hands.",
    hero:
      "Morning linen, herb air, and the same four services in soft garden light. Book the ritual first — the shelf comes after.",
    menuTitle: "Nail services",
    menuLede: "Herb-cuticle rites and sea-moss soaks in linen-bright rooms. Products wait after you sit.",
    houseTitle: "A garden that does nails.",
    house:
      "Morning linen, curved photos, and Cormorant italics over Montserrat. Biophilic air — same chair, softer light.",
    booking: "Book a service",
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

const HOUSE_SCENES = {
  temple: {
    heroLabel: "Alkaline Temple nail sanctuary with sea moss and candlelight",
    stillLabel: "Sea moss, gold vessels, and candlelight in the Alkaline Temple",
  },
  clay: {
    heroLabel: "Red Clay studio with terracotta basins and cowrie warmth",
    stillLabel: "River clay, cowrie shells, and fired earth in the Red Clay studio",
  },
  garden: {
    heroLabel: "Wild Herb Garden in morning linen light with sea moss and sage",
    stillLabel: "Linen, sage, and herb cuttings in the Wild Herb Garden",
  },
};

const OPTIONAL_THEME_FONTS = {
  clay: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap",
  garden:
    "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,500;0,600;1,500;1,600&family=Montserrat:wght@400;500;600&display=swap",
};

const STORAGE_KEY = "nails-of-destiny-look";
const FADE_MS = 560;
const veil = document.querySelector(".veil");
const copyNodes = document.querySelectorAll("[data-copy]");
const themeButtons = document.querySelectorAll("[data-theme-btn]");
const dockNote = document.getElementById("dock-note");
const paletteGrid = document.getElementById("palette-grid");
const paletteLabel = document.getElementById("palette-label");
const heroPhoto = document.getElementById("hero-photo");
const stillFrame = document.getElementById("still-frame");
const quotes = [...document.querySelectorAll("[data-quote]")];
const quoteStatus = document.getElementById("quote-status");
let quoteIndex = 0;
let fading = false;
const loadedFonts = new Set(["temple"]);

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

function ensureThemeFonts(theme) {
  if (theme === "temple" || loadedFonts.has(theme)) return Promise.resolve();
  const href = OPTIONAL_THEME_FONTS[theme];
  if (!href) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => {
      loadedFonts.add(theme);
      resolve();
    };
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}

function applyTheme(theme, palette) {
  if (!THEMES[theme]) return;
  const nextPalette = palette || THEMES[theme].defaultPalette;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-palette", nextPalette);
  const copy = THEMES[theme];
  copyNodes.forEach((node) => {
    const key = node.getAttribute("data-copy");
    if (copy[key]) node.textContent = copy[key];
  });
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-theme-btn") === theme));
  });
  if (theme === "temple") {
    dockNote.textContent = "Plant-based nail services · by appointment";
  } else {
    dockNote.textContent = `${copy.name} · ${paletteName(theme, nextPalette)}`;
  }
  if (paletteLabel) {
    paletteLabel.textContent = `Color · ${paletteName(theme, nextPalette)}`;
  }
  if (heroPhoto && HOUSE_SCENES[theme]) {
    heroPhoto.setAttribute("aria-label", HOUSE_SCENES[theme].heroLabel);
  }
  if (stillFrame && HOUSE_SCENES[theme]) {
    stillFrame.setAttribute("aria-label", HOUSE_SCENES[theme].stillLabel);
  }
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
    button.addEventListener("click", () => {
      applyTheme(theme, id);
      saveState({ choice: theme, palette: id });
    });
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

async function switchHouse(theme) {
  if (theme === currentTheme()) return;
  await ensureThemeFonts(theme);
  fadeThrough(() => {
    applyTheme(theme, THEMES[theme].defaultPalette);
    saveState({ choice: theme, palette: THEMES[theme].defaultPalette });
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

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
});

document.getElementById("quote-prev").addEventListener("click", () => showQuote(quoteIndex - 1));
document.getElementById("quote-next").addEventListener("click", () => showQuote(quoteIndex + 1));

applyTheme("temple", "gold");
showQuote(0);
