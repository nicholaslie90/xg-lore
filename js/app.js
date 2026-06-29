/* ============================================================
   APP — timeline, relationship graph, search, dossier, audio
   Reads globals from data.js / portraits.js / scenes.js / audio.js
   ============================================================ */

const charById = Object.fromEntries(CHARACTERS.map(c => [c.id, c]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function shortName(c) { return c.short || c.name.split(" ")[0]; }
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function hexA(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function isRevealed() { return document.body.classList.contains("revealed"); }

const charMeta = CHARACTERS.map(c => ({ id: c.id, short: shortName(c), keys: c.keys || [shortName(c)] }));
function eventChars(ev) {
  const text = (ev.title || "") + " " + ev.blurb;
  return charMeta.filter(m => m.keys.some(k => new RegExp("\\b" + escRe(k) + "\\b").test(text)));
}

/* ============================================================
   TIMELINE
   ============================================================ */
(function renderTimeline() {
  const root = document.getElementById("timeline");
  let lastEra = null, side = 0;

  EVENTS.forEach((ev, idx) => {
    if (ev.era !== lastEra) {
      const h = document.createElement("div");
      h.className = "era-head";
      h.innerHTML = `<span>${ev.era}</span>`;
      root.appendChild(h);
      lastEra = ev.era;
    }
    const wrapEl = document.createElement("div");
    wrapEl.className = "event" + (side % 2 ? " right" : "");
    side++;

    const color = ENTRY[ev.entry] || "#45e6b0";
    const sp = ev.spoiler ? " spoiler" : "";
    const chips = eventChars(ev).map(m => `<button class="chip" data-go="${m.id}">${m.short}</button>`).join("");
    const detId = "det-" + idx;
    const scene = ev.art ? `<div class="scene"><svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${ev.title} illustration">${FFScene(ev.art)}</svg></div>` : "";
    const detailHtml = ev.detail
      ? `<button class="expand" aria-expanded="false" aria-controls="${detId}"><span class="exp-ic">⌄</span><span class="exp-lbl">Read more</span></button>
         <div class="details" id="${detId}">
           ${scene}
           <p class="detail${sp}">${ev.detail}</p>
         </div>`
      : "";

    const card = document.createElement("article");
    card.className = "card" + (ev.spoiler ? " is-spoiler" : "");
    card.style.setProperty("--entry", color);
    card.innerHTML = `
      <div class="card-top"><span class="tag">${ev.entry}</span><span class="yr">${ev.yr}</span></div>
      <h3>${ev.title}</h3>
      <p class="blurb${sp}">${ev.blurb}</p>
      ${chips ? `<div class="who${sp}">${chips}</div>` : ""}
      ${detailHtml}
    `;
    wrapEl.appendChild(card);
    root.appendChild(wrapEl);
  });

  // click anywhere on a card to expand/collapse; chips still jump to the web
  root.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) { switchView("relations"); selectNode(chip.dataset.go); return; }
    if (e.target.closest(".details")) return;  // don't collapse while reading expanded content
    const card = e.target.closest(".card");
    if (!card) return;
    const det = card.querySelector(".details");
    if (!det) return;
    const open = det.classList.toggle("open");
    const exp = card.querySelector(".expand");
    if (exp) {
      exp.setAttribute("aria-expanded", open ? "true" : "false");
      exp.classList.toggle("open", open);
      const l = exp.querySelector(".exp-lbl");
      if (l) l.textContent = open ? "Show less" : "Read more";
    }
  });

  // scroll reveal
  const events = root.querySelectorAll(".event");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    events.forEach(el => io.observe(el));
  } else {
    events.forEach(el => el.classList.add("in"));
  }

  // expand / collapse all
  const expandAllBtn = document.getElementById("expand-all");
  function setAllCards(open) {
    root.querySelectorAll(".card").forEach(card => {
      const det = card.querySelector(".details");
      if (!det) return;
      det.classList.toggle("open", open);
      const exp = card.querySelector(".expand");
      if (exp) {
        exp.setAttribute("aria-expanded", open ? "true" : "false");
        exp.classList.toggle("open", open);
        const l = exp.querySelector(".exp-lbl");
        if (l) l.textContent = open ? "Show less" : "Read more";
      }
    });
    expandAllBtn.setAttribute("aria-pressed", open ? "true" : "false");
    expandAllBtn.classList.toggle("open", open);
    expandAllBtn.querySelector(".tl-lbl").textContent = open ? "Collapse all" : "Expand all";
  }
  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      const dets = root.querySelectorAll(".details");
      const allOpen = dets.length > 0 && Array.from(dets).every(d => d.classList.contains("open"));
      setAllCards(!allOpen);
    });
  }
})();

/* ============================================================
   COMPENDIUM
   ============================================================ */
(function renderCompendium() {
  const grid = document.getElementById("comp-grid");
  const order = ["The Planet & Its Powers", "Summons", "Artifacts & Weapons"];
  const byCat = {};
  COMPENDIUM.forEach(c => { const k = c.cat || "Other"; (byCat[k] = byCat[k] || []).push(c); });
  const cats = order.filter(k => byCat[k]).concat(Object.keys(byCat).filter(k => !order.includes(k)));
  cats.forEach(cat => {
    const h = document.createElement("div");
    h.className = "comp-cat";
    h.innerHTML = `<span>${cat}</span>`;
    grid.appendChild(h);
    byCat[cat].forEach(c => {
      const el = document.createElement("article");
      el.className = "comp-card";
      el.style.setProperty("--cglow", hexA(c.color, 0.18));
      el.style.setProperty("--cglow-solid", c.color);
      el.innerHTML = `<div class="sigil">${c.sigil}</div><h3>${c.title}</h3><p>${c.body}</p>`;
      grid.appendChild(el);
    });
  });
})();

/* ============================================================
   RELATIONSHIP WEB — force graph with portrait nodes
   ============================================================ */
const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("graph");
const W = 1280, H = 1000, R = 21;
svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

const nodes = CHARACTERS.map((c, i) => {
  const ang = (i / CHARACTERS.length) * Math.PI * 2;
  return { id: c.id, ch: c, x: W / 2 + Math.cos(ang) * 360, y: H / 2 + Math.sin(ang) * 360, vx: 0, vy: 0, fixed: false };
});
const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]));
const edges = RELATIONS.map(raw => ({
  a: raw[0], b: raw[1], type: raw[2],
  label: typeof raw[3] === "string" ? raw[3] : "",
  spoiler: raw.some((v, idx) => idx >= 3 && v === true),
}));

const gEdges = document.createElementNS(SVG_NS, "g");   // visible lines
const gHits = document.createElementNS(SVG_NS, "g");    // wide transparent hover targets
const gLabels = document.createElementNS(SVG_NS, "g");  // on-edge labels for the selected node
const gNodes = document.createElementNS(SVG_NS, "g");
const defs = document.createElementNS(SVG_NS, "defs");
defs.innerHTML = `<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#45e6b0"/></marker>`;
svg.appendChild(defs);
svg.appendChild(gEdges);
svg.appendChild(gHits);
svg.appendChild(gLabels);
svg.appendChild(gNodes);

// edge tooltip
const graphPane = document.querySelector(".graph-pane");
const edgeTip = document.createElement("div");
edgeTip.className = "edge-tip";
edgeTip.setAttribute("aria-hidden", "true");
graphPane.appendChild(edgeTip);
const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
function showTip(e, ev) {
  if (e.hit.style.display === "none") return;
  const t = RTYPE[e.type];
  const A = charById[e.a].name, B = charById[e.b].name;
  const note = e.label && e.label !== t.label ? `${cap(e.label)} · ${t.label}` : cap(t.label);
  edgeTip.innerHTML = `<span class="et-pair"><b>${A}</b> <span class="et-ic" style="color:${t.stroke}">${t.icon}</span> <b>${B}</b></span><span class="et-type">${note}</span>`;
  edgeTip.classList.add("show");
  moveTip(ev);
  e.el.classList.add("hover");
}
function moveTip(ev) {
  const r = graphPane.getBoundingClientRect();
  const tw = edgeTip.offsetWidth, th = edgeTip.offsetHeight;
  let x = ev.clientX - r.left + 14, y = ev.clientY - r.top + 14;
  if (x + tw > r.width - 6) x = ev.clientX - r.left - tw - 14;
  if (y + th > r.height - 6) y = ev.clientY - r.top - th - 14;
  edgeTip.style.left = Math.max(6, x) + "px";
  edgeTip.style.top = Math.max(6, y) + "px";
}
function hideTip(e) { edgeTip.classList.remove("show"); if (e) e.el.classList.remove("hover"); }

// edges as elements (+ transparent hit line for easy hovering)
edges.forEach(e => {
  const t = RTYPE[e.type];
  const ln = document.createElementNS(SVG_NS, "line");
  ln.setAttribute("class", "edge edge-" + e.type);
  ln.setAttribute("stroke-width", "1.6");
  ln.setAttribute("stroke-opacity", "0.5");
  if (t.dash) ln.setAttribute("stroke-dasharray", t.dash);
  if (e.type === "mentor") ln.setAttribute("marker-end", "url(#arrow)");
  e.el = ln;
  gEdges.appendChild(ln);

  const hit = document.createElementNS(SVG_NS, "line");
  hit.setAttribute("class", "edge-hit");
  hit.setAttribute("stroke", "transparent");
  hit.setAttribute("stroke-width", "16");
  hit.setAttribute("pointer-events", "stroke");
  e.hit = hit;
  gHits.appendChild(hit);
  hit.addEventListener("mouseenter", (ev) => showTip(e, ev));
  hit.addEventListener("mousemove", moveTip);
  hit.addEventListener("mouseleave", () => hideTip(e));
});

// nodes as markup (portraits)
gNodes.innerHTML = nodes.map(n => {
  const fac = FACTIONS[n.ch.faction];
  return `<g class="node-g" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.ch.name}">
    <circle class="node-halo" r="${R + 6}" fill="${hexA(fac.color, 0.16)}"/>
    <svg class="node-portrait" x="${-R}" y="${-R}" width="${R * 2}" height="${R * 2}" viewBox="0 0 100 100">
      <defs><clipPath id="clip_${n.id}"><circle cx="50" cy="50" r="50"/></clipPath></defs>
      <g clip-path="url(#clip_${n.id})">${FFPortrait(n.ch.portrait, n.id)}</g>
    </svg>
    <circle class="node-ring" r="${R}" fill="none" stroke="${fac.color}" stroke-width="2.5"/>
    <text class="node-label" y="${R + 15}">${shortName(n.ch)}</text>
  </g>`;
}).join("");

nodes.forEach(n => {
  n.g = gNodes.querySelector(`[data-id="${n.id}"]`);
  n.ring = n.g.querySelector(".node-ring");
  n.g.addEventListener("click", () => { if (!n._dragged) selectNode(n.id); });
  n.g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectNode(n.id); } });
  attachDrag(n);
});

/* ---- force simulation ---- */
let alpha = 1, rafId = null;
function visibleEdges() { const rev = isRevealed(); return edges.filter(e => rev || !e.spoiler); }
function tick() {
  const REP = 13000, SPRING = 0.014, LEN = 142, CENTER = 0.012, DAMP = 0.86;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy || 0.01, d = Math.sqrt(d2);
      const f = REP / d2, fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
    }
  }
  visibleEdges().forEach(e => {
    const a = nodeById[e.a], b = nodeById[e.b];
    let dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 0.01;
    const f = (d - LEN) * SPRING, fx = (dx / d) * f, fy = (dy / d) * f;
    a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
  });
  nodes.forEach(n => {
    if (n.fixed) { n.vx = 0; n.vy = 0; return; }
    n.vx += (W / 2 - n.x) * CENTER; n.vy += (H / 2 - n.y) * CENTER;
    n.vx *= DAMP; n.vy *= DAMP;
    n.x += n.vx * alpha; n.y += n.vy * alpha;
    n.x = Math.max(R + 10, Math.min(W - R - 10, n.x));
    n.y = Math.max(R + 10, Math.min(H - R - 26, n.y));
  });
}
function draw() {
  edges.forEach(e => {
    const a = nodeById[e.a], b = nodeById[e.b];
    e.el.setAttribute("x1", a.x); e.el.setAttribute("y1", a.y);
    e.el.setAttribute("x2", b.x); e.el.setAttribute("y2", b.y);
    e.hit.setAttribute("x1", a.x); e.hit.setAttribute("y1", a.y);
    e.hit.setAttribute("x2", b.x); e.hit.setAttribute("y2", b.y);
  });
  nodes.forEach(n => n.g.setAttribute("transform", `translate(${n.x},${n.y})`));
  updateEdgeLabels();
}

/* on-edge relationship labels for the selected node */
let activeLabels = [];
function buildEdgeLabels(id) {
  gLabels.innerHTML = "";
  activeLabels = [];
  if (!id) return;
  neighborsOf(id).forEach(e => {
    const t = RTYPE[e.type];
    const text = (e.label || t.label);
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "edge-label");
    const txt = document.createElementNS(SVG_NS, "text");
    txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("dominant-baseline", "central");
    txt.setAttribute("fill", t.stroke);
    txt.textContent = `${t.icon} ${text}`;
    g.appendChild(txt);
    gLabels.appendChild(g);
    activeLabels.push({ e, g });
  });
  updateEdgeLabels();
}
function updateEdgeLabels() {
  for (const { e, g } of activeLabels) {
    const a = nodeById[e.a], b = nodeById[e.b];
    g.setAttribute("transform", `translate(${(a.x + b.x) / 2},${(a.y + b.y) / 2})`);
  }
}
function run() {
  cancelAnimationFrame(rafId);
  alpha = 1;
  if (reduceMotion) { for (let i = 0; i < 360; i++) { tick(); alpha *= 0.99; } alpha = 1; draw(); applySelectionStyles(); return; }
  const loop = () => { tick(); draw(); alpha *= 0.985; if (alpha > 0.02) rafId = requestAnimationFrame(loop); };
  rafId = requestAnimationFrame(loop);
}

/* ---- drag ---- */
function attachDrag(n) {
  let startX, startY, sx, sy;
  function pt(e) {
    const r = svg.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) / r.width * W, y: (cy - r.top) / r.height * H };
  }
  function down(e) {
    e.preventDefault();
    n.fixed = true; n._dragged = false;
    svg.classList.add("dragging");
    const p = pt(e); startX = p.x; startY = p.y; sx = n.x; sy = n.y;
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false }); window.addEventListener("touchend", up);
  }
  function move(e) {
    e.preventDefault();
    const p = pt(e);
    if (Math.abs(p.x - startX) > 3 || Math.abs(p.y - startY) > 3) n._dragged = true;
    n.x = sx + (p.x - startX); n.y = sy + (p.y - startY); draw();
  }
  function up() {
    n.fixed = false; svg.classList.remove("dragging");
    window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up);
    window.removeEventListener("touchmove", move); window.removeEventListener("touchend", up);
    run(); setTimeout(() => { n._dragged = false; }, 50);
  }
  n.g.addEventListener("mousedown", down);
  n.g.addEventListener("touchstart", down, { passive: false });
}

/* ---- selection + dossier ---- */
let selectedId = null;
let curMode = "web";   // "web" graph or "grid" roster
function neighborsOf(id) { const rev = isRevealed(); return edges.filter(e => (rev || !e.spoiler) && (e.a === id || e.b === id)); }

function applySelectionStyles() {
  const id = selectedId, rev = isRevealed();
  if (!id) {
    nodes.forEach(n => { n.g.classList.remove("dim", "sel"); n.ring.setAttribute("r", R); });
    edges.forEach(e => {
      const hidden = e.spoiler && !rev;
      e.el.style.display = hidden ? "none" : "";
      e.hit.style.display = hidden ? "none" : "";
      e.el.classList.remove("dim");
      e.el.setAttribute("stroke-width", "1.6");
      e.el.setAttribute("stroke-opacity", hidden ? "0" : "0.5");
    });
    buildEdgeLabels(null);
    return;
  }
  const connected = new Set([id]);
  neighborsOf(id).forEach(e => { connected.add(e.a); connected.add(e.b); });
  nodes.forEach(n => {
    const on = connected.has(n.id);
    n.g.classList.toggle("dim", !on);
    n.g.classList.toggle("sel", n.id === id);
    n.ring.setAttribute("r", n.id === id ? R + 3 : R);
    n.ring.setAttribute("stroke-width", n.id === id ? 3.5 : 2.5);
  });
  edges.forEach(e => {
    const hidden = e.spoiler && !rev;
    const on = !hidden && (e.a === id || e.b === id);
    e.el.style.display = hidden ? "none" : "";
    e.hit.style.display = hidden ? "none" : "";
    e.el.classList.toggle("dim", !on);
    e.el.setAttribute("stroke-width", on ? 2.8 : 1.4);
    e.el.setAttribute("stroke-opacity", on ? 0.95 : (hidden ? 0 : 0.3));
  });
  buildEdgeLabels(id);
}
function selectNode(id) { selectedId = id; applySelectionStyles(); renderDossier(id); closeSearch(); markRosterSelected(id); }
function clearSelection() { selectedId = null; applySelectionStyles(); }

function renderDossier(id) {
  const c = charById[id];
  const dossier = document.getElementById("dossier");
  const fac = FACTIONS[c.faction];
  const myEdges = neighborsOf(id);

  const relItems = myEdges.map(e => {
    const otherId = e.a === id ? e.b : e.a, other = charById[otherId], t = RTYPE[e.type];
    return `<li tabindex="0" data-go="${otherId}"><span class="ric" style="color:${t.stroke}">${t.icon}</span><span class="rname">${other.name}</span><span class="rtype">${e.label || t.label}</span></li>`;
  }).join("");

  const bgHtml = (c.background && c.background.length)
    ? `<div class="dos-role">Background</div><div class="bg-block${c.bgSpoiler ? " spoiler" : ""}">${c.background.map(p => `<p class="bio">${p}</p>`).join("")}</div>`
    : "";
  const spoilerSec = c.spoilerBio ? `<div class="dos-role">Hidden truth</div><p class="bio spoiler">${c.spoilerBio}</p>` : "";
  const tidbit = c.tidbit ? `<div class="tidbit"><span class="tidbit-h">◈ Did you know?</span><p>${c.tidbit}</p></div>` : "";

  dossier.innerHTML = `
    <div class="dos-head">
      <div class="dos-avatar" style="--ring:${fac.color}; --glow:${hexA(fac.color, 0.5)}">${portraitSVG(c, 72, "big")}</div>
      <div><h2>${c.name}</h2><div class="dos-faction" style="color:${fac.color}">${fac.name}</div></div>
    </div>
    <div class="dos-subtitle">${c.role}</div>
    <div class="dos-role">Temperament</div>
    <p class="bio">${c.personality}</p>
    <div class="dos-role">In the story</div>
    <p class="bio">${c.bio}</p>
    ${bgHtml}
    ${spoilerSec}
    ${tidbit}
    <div class="dos-role">Connections</div>
    <ul class="rel-list">${relItems || '<li style="cursor:default"><span class="rtype">no ties revealed — try declassifying</span></li>'}</ul>
  `;
  dossier.querySelectorAll(".rel-list li[data-go]").forEach(li => {
    li.addEventListener("click", () => selectNode(li.dataset.go));
    li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectNode(li.dataset.go); } });
  });
  dossier.scrollTop = 0;
}

svg.addEventListener("click", (e) => { if (e.target === svg) clearSelection(); });
clearSelection();
run();

/* ============================================================
   CHARACTER SEARCH (relationships view)
   ============================================================ */
const searchInput = document.getElementById("char-search");
const searchResults = document.getElementById("search-results");

function closeSearch() { searchResults.innerHTML = ""; searchResults.classList.remove("open"); }
function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { closeSearch(); return; }
  const matches = CHARACTERS.filter(c =>
    c.name.toLowerCase().includes(q) || (c.role || "").toLowerCase().includes(q) || FACTIONS[c.faction].name.toLowerCase().includes(q)
  ).slice(0, 8);
  if (!matches.length) {
    searchResults.innerHTML = `<div class="sr-empty">No character found</div>`;
    searchResults.classList.add("open"); return;
  }
  searchResults.innerHTML = matches.map(c =>
    `<button class="sr-item" data-go="${c.id}">
      <span class="sr-pic">${portraitSVG(c, 30, "sm")}</span>
      <span class="sr-text"><span class="sr-name">${c.name}</span><span class="sr-role">${FACTIONS[c.faction].name}</span></span>
    </button>`).join("");
  searchResults.classList.add("open");
}
if (searchInput) {
  searchInput.addEventListener("input", () => { if (curMode === "grid") filterRoster(searchInput.value); else runSearch(); });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (curMode === "grid") { const first = roster.querySelector(".roster-card:not(.hide)"); if (first) selectNode(first.dataset.id); }
      else { const first = searchResults.querySelector(".sr-item"); if (first) selectNode(first.dataset.go); }
    }
    if (e.key === "Escape") { searchInput.value = ""; closeSearch(); if (curMode === "grid") filterRoster(""); }
  });
  searchResults.addEventListener("click", (e) => { const it = e.target.closest(".sr-item"); if (it) { selectNode(it.dataset.go); searchInput.value = charById[it.dataset.go].name; } });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search-wrap")) closeSearch(); });
}

/* ---- view modes: web graph / alphabetical grid ---- */
const roster = document.getElementById("roster");
const modeBtns = Array.from(document.querySelectorAll(".mode-btn"));
function renderRoster() {
  const sorted = CHARACTERS.slice().sort((a, b) => a.name.localeCompare(b.name));
  roster.innerHTML = sorted.map(c =>
    `<button class="roster-card" data-id="${c.id}">
      <span class="rc-pic">${portraitSVG(c, 50, "")}</span>
      <span class="rc-meta"><span class="rc-name">${c.name}</span><span class="rc-role">${c.role}</span></span>
    </button>`).join("");
  roster.querySelectorAll(".roster-card").forEach(b => b.addEventListener("click", () => selectNode(b.dataset.id)));
}
function markRosterSelected(id) { if (!roster) return; roster.querySelectorAll(".roster-card").forEach(b => b.classList.toggle("sel", b.dataset.id === id)); }
function filterRoster(q) {
  if (!roster) return;
  q = (q || "").trim().toLowerCase();
  roster.querySelectorAll(".roster-card").forEach(b => {
    const c = charById[b.dataset.id];
    const hit = !q || c.name.toLowerCase().includes(q) || (c.role || "").toLowerCase().includes(q) || FACTIONS[c.faction].name.toLowerCase().includes(q);
    b.classList.toggle("hide", !hit);
  });
}
function setMode(m) {
  curMode = m;
  graphPane.classList.toggle("mode-web", m === "web");
  graphPane.classList.toggle("mode-grid", m === "grid");
  modeBtns.forEach(b => { const on = b.dataset.mode === m; b.classList.toggle("active", on); b.setAttribute("aria-selected", on ? "true" : "false"); });
  closeSearch();
  if (m === "grid") { cancelAnimationFrame(rafId); filterRoster(searchInput ? searchInput.value : ""); markRosterSelected(selectedId); }
  else { run(); }
}
modeBtns.forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
renderRoster();

/* ============================================================
   VIEW SWITCHING + SPOILER TOGGLE
   ============================================================ */
const tabs = {
  timeline: { btn: document.getElementById("tab-timeline"), view: document.getElementById("view-timeline") },
  relations: { btn: document.getElementById("tab-relations"), view: document.getElementById("view-relations") },
  compendium: { btn: document.getElementById("tab-compendium"), view: document.getElementById("view-compendium") },
};
function switchView(key) {
  Object.entries(tabs).forEach(([k, t]) => {
    const on = k === key;
    t.btn.setAttribute("aria-selected", on ? "true" : "false");
    t.view.classList.toggle("active", on);
  });
  if (key === "relations" && curMode === "web") run();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}
Object.entries(tabs).forEach(([k, t]) => t.btn.addEventListener("click", () => switchView(k)));

const declassify = document.getElementById("declassify");
const declassifyLbl = document.getElementById("declassify-lbl");
function toggleSpoilers() {
  const on = document.body.classList.toggle("revealed");
  declassify.setAttribute("aria-checked", on ? "true" : "false");
  declassifyLbl.textContent = on ? "Unsealed" : "Sealed";
  if (selectedId) renderDossier(selectedId);
  applySelectionStyles();
  run();
}
declassify.addEventListener("click", toggleSpoilers);
declassify.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSpoilers(); } });

let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(run, 200); });

/* ============================================================
   AMBIENT AUDIO CONTROL
   ============================================================ */
(function audioControl() {
  const btn = document.getElementById("audio-btn");
  if (!btn || !FFAudio.isReady()) { if (btn) btn.style.display = "none"; return; }
  const icon = btn.querySelector(".audio-ic");
  const lbl = btn.querySelector(".audio-lbl");
  const PREF = "xg-ambient";

  FFAudio.onState = (playing) => {
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.classList.toggle("on", playing);
    icon.textContent = playing ? "♪" : "♪";
    lbl.textContent = playing ? "Lifestream" : "Muted";
  };

  btn.addEventListener("click", () => {
    FFAudio.toggle();
    try { localStorage.setItem(PREF, FFAudio.isPlaying() ? "on" : "off"); } catch (e) {}
  });

  // Autoplay-on-first-interaction (browsers block sound before a gesture)
  function firstGesture(e) {
    // if the first interaction IS the audio button, let its own handler decide
    if (e && e.target && e.target.closest && e.target.closest("#audio-btn")) return;
    document.removeEventListener("pointerdown", firstGesture);
    document.removeEventListener("keydown", firstGesture);
    let pref = null;
    try { pref = localStorage.getItem(PREF); } catch (e2) {}
    if (pref !== "off") FFAudio.start();
  }
  document.addEventListener("pointerdown", firstGesture, { once: false });
  document.addEventListener("keydown", firstGesture, { once: false });
})();

/* ============================================================
   THEME TOGGLE (dark / light)
   ============================================================ */
(function themeToggle() {
  const btn = document.getElementById("theme-btn");
  if (!btn) return;
  const ic = btn.querySelector(".theme-ic"), lbl = btn.querySelector(".theme-lbl");
  function sync() {
    const light = document.body.classList.contains("light");
    btn.setAttribute("aria-pressed", light ? "true" : "false");
    ic.textContent = light ? "☾" : "☀";
    lbl.textContent = light ? "Dark" : "Light";
  }
  btn.addEventListener("click", () => {
    const light = document.body.classList.toggle("light");
    try { localStorage.setItem("xg-theme", light ? "light" : "dark"); } catch (e) {}
    sync();
  });
  sync();
})();
