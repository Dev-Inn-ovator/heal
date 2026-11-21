const STORE_KEY = "heal-v2";

const store = {
  load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw) return raw;
    } catch {}
    // migrate v1 lightly
    try {
      const v1 = JSON.parse(localStorage.getItem("heal-v1"));
      if (v1) return { lifts: {}, body: v1.body || [], habits: {}, meta: { reentryDone: false }, legacyLifts: v1.lifts || {} };
    } catch {}
    return { lifts: {}, body: [], habits: {}, meta: { reentryDone: false, showArchive: false } };
  },
  save(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }
};

let state = store.load();
if (!state.meta) state.meta = { reentryDone: false };
/* New plan start (22 Nov) clears an old “re-entry done” flag so Day 1 shows Warm-up again. */
if (state.meta.planStart !== HEAL.profile.startDate) {
  state.meta.planStart = HEAL.profile.startDate;
  state.meta.reentryDone = false;
  delete state.meta.reentryDoneDate;
  store.save(state);
}
let activeGymDay = null;
let gymView = "current"; // current | archive
let selectedMuscle = "chest";
let selectedRegion = null; // arms | chest | ...
let sectionOpen = { warmup: true, work: true, cardio: true, stretch: true };

/** "07:30" or "19:45–22:45" → 12-hour */
function to12(t) {
  if (!t) return t;
  return String(t).replace(/\b(\d{1,2}):(\d{2})\b/g, (_, h, m) => {
    let hour = Number(h);
    const ap = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${m} ${ap}`;
  });
}

function exName(ref) {
  return (EX[ref] && EX[ref].name) || ref;
}

function muscleLabel(key) {
  const info = MUSCLE_INFO[key];
  return info ? info.label.split(" (")[0] : key;
}

function atlasRef(ref) {
  if (!ref || !window.ATLAS) return null;
  const [figId, key] = ref.split(":");
  const fig = ATLAS.figures[figId];
  const label = fig && fig.labels.find((l) => l.key === key);
  return label ? { fig, label } : null;
}

function badgeInk(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 160 ? "#16201b" : "#fff";
}

function atlasNum(label) {
  return `<span class="atlas-num" style="background:${label.color};color:${badgeInk(label.color)}">${label.n}</span>`;
}

function atlasSvg(f, compact) {
  const c = compact ? f.compact : { x: 0, y: 0, w: f.w, h: f.h };
  const marks = f.labels
    .map((l) => {
      const [bx, by] = compact ? c.pos[l.key] : [l.lx, l.ly];
      const leaders = l.anchors
        .map(([x, y]) => `<line class="atlas-leader" x1="${bx}" y1="${by}" x2="${x}" y2="${y}" />`)
        .join("");
      const dots = l.anchors
        .map(([x, y]) => `<circle class="atlas-dot" cx="${x}" cy="${y}" r="8" />`)
        .join("");
      let text = "";
      if (!compact) {
        const tx = l.side === "L" ? bx - 34 : bx + 34;
        const lines = l.lines
          .map((t, i) => `<tspan x="${tx}" y="${by + (i - (l.lines.length - 1) / 2) * 31}">${t}</tspan>`)
          .join("");
        text = `<text class="atlas-text" text-anchor="${l.side === "L" ? "end" : "start"}" dominant-baseline="central">${lines}</text>`;
      }
      return `<g>${leaders}${dots}${text}
        <g class="atlas-badge"><circle cx="${bx}" cy="${by}" r="22" fill="${l.color}" />
          <text x="${bx}" y="${by}" text-anchor="middle" dominant-baseline="central" fill="${badgeInk(l.color)}">${l.n}</text></g></g>`;
    })
    .join("");
  const a11y = compact ? `aria-hidden="true"` : `role="img" aria-label="${f.alt}"`;
  return `<svg class="atlas-svg ${compact ? "is-compact" : "is-wide"}" viewBox="${c.x} ${c.y} ${c.w} ${c.h}" ${a11y}>
    <image href="${f.src}?v=${ATLAS.version}" x="0" y="0" width="${f.w}" height="${f.h}" />${marks}</svg>`;
}

function atlasFigureHtml(id) {
  const f = window.ATLAS && ATLAS.figures[id];
  if (!f) return "";
  const legend = f.labels
    .map((l) => {
      const inner = `${atlasNum(l)}${l.name}`;
      return MUSCLE_INFO[l.key]
        ? `<li><button type="button" class="atlas-link" data-muscle="${l.key}">${inner}</button></li>`
        : `<li>${inner}</li>`;
    })
    .join("");
  return `
    <figure class="atlas">
      <figcaption class="atlas-title">${f.title}</figcaption>
      <div class="atlas-frame">${atlasSvg(f, false)}${atlasSvg(f, true)}</div>
      <ol class="atlas-legend">${legend}</ol>
    </figure>`;
}

function muscleFiguresHtml(info) {
  if (info.figures) return info.figures.map(atlasFigureHtml).join("");
  const legend = Array.isArray(info.imageLegend) && info.imageLegend.length
    ? `<ul class="image-legend">${info.imageLegend
        .map((l) => `<li><span class="swatch" style="background:${l.color}"></span>${l.name}</li>`)
        .join("")}</ul>`
    : "";
  return `<figure class="muscle-figure">
    <img class="muscle-hero${info.imageDark ? " is-dark" : ""}" src="${info.image}" alt="${info.label} labelled anatomy map" loading="lazy" />
    ${legend}
  </figure>`;
}

function bindAtlasLinks(root) {
  root.querySelectorAll(".atlas-link[data-muscle]").forEach((b) => {
    b.onclick = () => openMuscleModal(b.dataset.muscle);
  });
}

function partsHtml(muscleKey) {
  const parts = MUSCLE_PARTS[muscleKey] || [];
  if (!parts.length) {
    return `<p class="small muted">No sub-parts listed yet for this muscle.</p>`;
  }
  return parts
    .map((p) => {
      const ref = atlasRef(p.fig);
      const badge = ref ? atlasNum(ref.label) : "";
      const where = ref
        ? `<p class="small muted">Shown as <b>${ref.label.n}</b> in “${ref.fig.title}”.</p>`
        : p.shown
          ? `<p class="small muted">${p.shown}</p>`
        : p.deep
          ? `<p class="small muted"><span class="tag-deep">Deep</span> Not drawn in the figure — lies under the muscles shown.</p>`
          : p.notShown
            ? `<p class="small muted"><span class="tag-deep">Not shown</span> This structure is outside the labelled area of the figure.</p>`
          : "";
      const exercises = p.hits.length ? p.hits.map(exName).join(" · ") : "No direct exercise in this plan";
      return `
    <article class="part-card">
      <h4>${badge}${p.name}</h4>
      ${where}
      <p class="small"><b>Where:</b> ${p.where}</p>
      <p class="small"><b>What it does:</b> ${p.does}</p>
      <p class="small"><b>Your exercises that train it:</b> ${exercises}</p>
      <p class="small muted">${p.tip}</p>
    </article>`;
    })
    .join("");
}

function openMuscleModal(key) {
  const info = MUSCLE_INFO[key];
  if (!info) return;
  selectedMuscle = key;
  const modal = document.getElementById("muscle-modal");
  modal.hidden = false;
  modal.innerHTML = `
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-sheet" role="dialog" aria-label="${info.label}">
      <button type="button" class="modal-x" data-close-modal>✕</button>
      <p class="kicker">Target muscle</p>
      <h2>${info.label}</h2>
      ${muscleFiguresHtml(info)}
      <p class="small">${info.anatomy}</p>
      <p class="small muted">${info.tip}</p>
      <h3 class="parts-title">Parts + which of your exercises train each</h3>
      ${partsHtml(key)}
      <p class="small muted">${info.credit || "HEAL"}</p>
      <div class="btn-row">
        <button type="button" class="btn" id="goto-muscle-tab">Full guide in Muscles tab</button>
        <button type="button" class="btn secondary" data-close-modal>Close</button>
      </div>
    </div>`;
  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.onclick = () => {
      modal.hidden = true;
    };
  });
  document.getElementById("goto-muscle-tab").onclick = () => {
    modal.hidden = true;
    selectedRegion = BODY_REGIONS.find((r) => r.muscles.includes(key))?.id || null;
    switchTab("muscles");
  };
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1800);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function isSunday(d = new Date()) {
  return d.getDay() === 0;
}
function daysSinceStart() {
  const start = new Date(HEAL.profile.startDate + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.floor((now - start) / 86400000) + 1;
}
function daysUntilBirthday() {
  const bday = new Date(HEAL.profile.birthday + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((bday - now) / 86400000);
}
function checkpointSpanDays() {
  const start = new Date(HEAL.profile.startDate + "T00:00:00");
  const bday = new Date(HEAL.profile.birthday + "T00:00:00");
  return Math.round((bday - start) / 86400000);
}

function getPhase() {
  const day = daysSinceStart();
  if (day >= 15) return HEAL.phases.full;
  if (state.meta.reentryDone || day >= 4) return HEAL.phases.build;
  return HEAL.phases.reentry;
}

function parseSetCount(setsStr) {
  const m = String(setsStr).match(/^(\d+)\s*[x×]/i);
  return m ? Math.min(6, Number(m[1])) : 3;
}

function resolveEx(refOrObj) {
  if (typeof refOrObj === "string") return EX[refOrObj];
  return EX[refOrObj];
}

function lastSession(exerciseId) {
  const logs = state.lifts[exerciseId] || [];
  return logs.length ? logs[logs.length - 1] : null;
}

function bestPR(exerciseId) {
  const logs = state.lifts[exerciseId] || [];
  let best = null;
  for (const sess of logs) {
    for (const s of sess.sets || []) {
      const score = (Number(s.weight) || 0) * (Number(s.reps) || 0);
      if (!best || score > best.score) best = { ...s, date: sess.date, score };
    }
  }
  return best;
}

function saveSession(exerciseId, name, setRows) {
  const sets = setRows
    .map((r) => ({ weight: Number(r.weight) || 0, reps: Number(r.reps) || 0, note: r.note || "" }))
    .filter((s) => s.weight || s.reps);
  if (!sets.length) return toast("Enter at least one set");
  if (!state.lifts[exerciseId]) state.lifts[exerciseId] = [];
  // replace if same day already logged
  const today = todayISO();
  const idx = state.lifts[exerciseId].findIndex((x) => x.date === today);
  const entry = { date: today, name, sets };
  if (idx >= 0) state.lifts[exerciseId][idx] = entry;
  else state.lifts[exerciseId].push(entry);
  store.save(state);
  toast("Session sets saved");
  renderGymDetail();
}

function latestBody() {
  const rows = state.body || [];
  if (!rows.length) return null;
  return [...rows].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
}

function displayMeasure(key, fallback) {
  const last = latestBody();
  if (last && last[key] != null && last[key] !== "") return last[key];
  return fallback;
}

function musclePills(primary, secondary) {
  const all = [...(primary || []), ...(secondary || []).map((m) => m)];
  const uniq = [...new Set(all)];
  return uniq
    .map((m) => {
      const isPri = (primary || []).includes(m);
      return `<button type="button" class="muscle-pill ${isPri ? "pri" : ""}" data-muscle="${m}">${muscleLabel(m)}</button>`;
    })
    .join("");
}

function renderExCard(ex, opts = {}) {
  const { sets = "", rest = "", loggable = false } = opts;
  if (!ex) return `<div class="ex"><p class="muted">Missing exercise</p></div>`;
  const nSets = parseSetCount(sets || "3×10");
  const last = lastSession(ex.id);
  const pr = bestPR(ex.id);
  const lastHtml = last
    ? last.sets.map((s, i) => `Set ${i + 1}: ${s.weight} kg × ${s.reps}`).join(" · ")
    : "No previous log";

  let setInputs = "";
  if (loggable) {
    const prefill = last?.sets || [];
    setInputs = `
      <div class="sets-grid">
        <div class="sets-head"><span>Set</span><span>kg</span><span>Reps</span><span>Note</span></div>
        ${Array.from({ length: nSets }, (_, i) => {
          const p = prefill[i] || {};
          return `<div class="set-row" data-i="${i}">
            <span class="set-n">${i + 1}</span>
            <input type="number" inputmode="decimal" class="w" placeholder="${p.weight ?? "kg"}" />
            <input type="number" inputmode="numeric" class="r" placeholder="${p.reps ?? "reps"}" />
            <input type="text" class="n" placeholder="—" />
          </div>`;
        }).join("")}
      </div>
      <div class="btn-row">
        <button type="button" class="btn ghost btn-see-last" data-ex="${ex.id}">See last time</button>
        <button type="button" class="btn secondary btn-use-last" data-ex="${ex.id}">Use last time</button>
        <button type="button" class="btn" data-save-sets="${ex.id}" data-name="${ex.name}" data-n="${nSets}">Save ${nSets} sets</button>
      </div>
      <div class="last-box" hidden data-last="${ex.id}">
        <b>Last time (${last ? last.date : "—"}):</b>
        <div class="small">${lastHtml}</div>
        <p class="small muted">View only — tap Use last time to copy into the boxes, then bump the weight.</p>
      </div>`;
  }

  return `
    <article class="ex" data-ex-id="${ex.id}">
      <div class="ex-top">
        <div class="ex-imgs">
          <img class="ex-img" src="${ex.img0}" alt="${ex.name} start" loading="lazy" onerror="this.style.display='none'" />
          <img class="ex-img" src="${ex.img1}" alt="${ex.name} finish" loading="lazy" onerror="this.style.display='none'" />
        </div>
        <div>
          <h5>${ex.name}</h5>
          <div class="meta">${sets ? sets + " · Rest " + rest : "Warm-up / stretch"}${ex.alts ? " · " + ex.alts : ""}</div>
          <div class="muscle-row">${musclePills(ex.primary, ex.secondary)}</div>
          ${pr ? `<div class="pr">Best: ${pr.weight} kg × ${pr.reps} (${pr.date})</div>` : ""}
          ${last && !loggable ? "" : last ? `<div class="history">Last session: ${lastHtml}</div>` : ""}
        </div>
      </div>
      <details>
        <summary>How to do it · breathing · mistakes · video</summary>
        <p class="small"><b>Steps</b></p>
        <ol>${(ex.cues || []).map((c) => `<li>${c}</li>`).join("")}</ol>
        <div class="breath-box">
          <p class="small"><b>Breathing</b></p>
          <ol>${(ex.breathing && ex.breathing.length ? ex.breathing : ["Breathe continuously. Exhale on the hard part of the rep; inhale on the easier return. Do not hold your breath."]).map((c) => `<li>${c}</li>`).join("")}</ol>
        </div>
        <p class="small"><b>Avoid</b>: ${(ex.mistakes || []).join(" · ") || "—"}</p>
        <p class="small"><a href="${ex.video}" target="_blank" rel="noopener">${ex.videoLabel || "Watch form video"} ↗</a></p>
      </details>
      ${setInputs}
    </article>`;
}

function sessionById(id) {
  return HEAL.reentry.find((x) => x.id === id) || HEAL.ppl.find((x) => x.id === id);
}

function bindExCardEvents(root) {
  root.querySelectorAll("[data-muscle]").forEach((btn) => {
    btn.addEventListener("click", () => openMuscleModal(btn.dataset.muscle));
  });
  root.querySelectorAll(".btn-see-last").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.ex;
      const box = root.querySelector(`[data-last="${id}"]`);
      if (!lastSession(id)) return toast("No last session yet");
      if (box) box.hidden = !box.hidden;
    });
  });
  root.querySelectorAll(".btn-use-last").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.ex;
      const card = btn.closest(".ex");
      const last = lastSession(id);
      const box = root.querySelector(`[data-last="${id}"]`);
      if (!last) return toast("No last session yet");
      if (box) box.hidden = false;
      card.querySelectorAll(".set-row").forEach((row, i) => {
        const s = last.sets[i];
        if (!s) return;
        row.querySelector(".w").value = s.weight;
        row.querySelector(".r").value = s.reps;
      });
      toast("Copied last time into boxes");
    });
  });
  root.querySelectorAll("[data-save-sets]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ex");
      const rows = [...card.querySelectorAll(".set-row")].map((row) => ({
        weight: row.querySelector(".w").value,
        reps: row.querySelector(".r").value,
        note: row.querySelector(".n").value
      }));
      saveSession(btn.dataset.saveSets, btn.dataset.name, rows);
    });
  });
}

function renderGymDetail() {
  const root = document.getElementById("gym-detail");
  const s = sessionById(activeGymDay);
  if (!s) {
    root.innerHTML = `<div class="card muted">Pick a day.</div>`;
    return;
  }
  const archive = gymView === "archive";
  const fold = (key, title, body, cls = "") => `
    <details class="card phase ${cls} fold" data-fold="${key}" ${sectionOpen[key] ? "open" : ""}>
      <summary class="fold-sum">${title} <span class="muted small">tap to collapse</span></summary>
      <div class="fold-body">${body}</div>
    </details>`;

  root.innerHTML = `
    <div class="card">
      <div class="btn-row" style="margin:0">
        <span class="pill good">${s.label}</span>
        <span class="pill">${s.duration}</span>
        ${archive ? `<span class="pill warn">Archive</span>` : `<span class="pill">${getPhase().title}</span>`}
      </div>
      <h2 style="margin-top:10px">${s.title}</h2>
      <p class="muted small">${s.focus || ""}</p>
      <p class="small muted">Tip: collapse Warm-up after you finish it, so Main work stays on screen.</p>
    </div>
    ${fold(
      "warmup",
      "1 · Warm-up",
      s.warmupKeys.map((k) => renderExCard(EX[k], { loggable: false })).join(""),
      "warmup"
    )}
    ${fold(
      "work",
      `2 · Main work ${archive ? "(logging OK)" : "— log each set"}`,
      s.work.map((w) => renderExCard(EX[w.ref], { sets: w.sets, rest: w.rest, loggable: true })).join("")
    )}
    ${fold("cardio", "3 · Cardio", `<p>${s.cardio}</p>`)}
    ${fold(
      "stretch",
      "4 · Stretch",
      s.stretchKeys.map((k) => renderExCard(EX[k], { loggable: false })).join(""),
      "stretch"
    )}`;

  root.querySelectorAll("details.fold").forEach((d) => {
    d.addEventListener("toggle", () => {
      sectionOpen[d.dataset.fold] = d.open;
    });
  });
  bindExCardEvents(root);
}

function renderGym() {
  const phase = getPhase();
  const day = daysSinceStart();
  const showList = gymView === "archive" || phase.id === "reentry" ? HEAL.reentry : HEAL.ppl;

  if (!activeGymDay || !showList.find((x) => x.id === activeGymDay)) {
    activeGymDay = showList[0].id;
  }

  document.getElementById("gym-nav").innerHTML = `
    <div class="card" style="margin-top:0">
      <p class="small"><b>Plan day ${day}</b> · ${phase.title}</p>
      <p class="small muted">${phase.note}</p>
      <div class="btn-row">
        ${
          phase.id === "reentry"
            ? `<button class="btn" type="button" id="mark-reentry">Mark warm-up done (unlock Build PPL)</button>`
            : `<button class="btn secondary" type="button" id="view-archive">${gymView === "archive" ? "Back to current plan" : "View warm-up archive (read)"}</button>`
        }
      </div>
      ${
        phase.id === "reentry"
          ? `<p class="small muted">Do the 3 easy warm-up days first. Build unlocks automatically on Day 4, or mark done early if joints feel fine.</p>`
          : ""
      }
    </div>
    <div class="day-nav" id="day-chips">
      ${showList
        .map(
          (s) => `<button class="day-chip ${s.id === activeGymDay ? "active" : ""}" data-day="${s.id}" type="button">
        <strong>${s.label}</strong><span class="small">${s.duration}</span>
      </button>`
        )
        .join("")}
    </div>`;

  const mark = document.getElementById("mark-reentry");
  if (mark) {
    mark.onclick = () => {
      if (day < 3 && !confirm("Only day " + day + " — mark warm-up done anyway?")) return;
      state.meta.reentryDone = true;
      state.meta.reentryDoneDate = todayISO();
      store.save(state);
      gymView = "current";
      activeGymDay = HEAL.ppl[0].id;
      toast("Build phase unlocked");
      renderGym();
      renderHome();
    };
  }
  const arch = document.getElementById("view-archive");
  if (arch) {
    arch.onclick = () => {
      gymView = gymView === "archive" ? "current" : "archive";
      activeGymDay = gymView === "archive" ? HEAL.reentry[0].id : HEAL.ppl[0].id;
      renderGym();
    };
  }
  document.querySelectorAll("#day-chips [data-day]").forEach((b) => {
    b.onclick = () => {
      activeGymDay = b.dataset.day;
      renderGym();
    };
  });
  renderGymDetail();
}

function renderHome() {
  const mday = daysSinceStart();
  const bleft = daysUntilBirthday();
  const span = checkpointSpanDays();
  const phase = getPhase();
  const start = HEAL.measurementsStart;
  const t45 = HEAL.targets45;
  const tb = HEAL.targetsBaki;
  const live = {
    weightKg: displayMeasure("weightKg", start.weightKg),
    waistCm: displayMeasure("waistCm", start.waistCm),
    chestCm: displayMeasure("chestCm", start.chestCm),
    armCm: displayMeasure("armCm", start.armCm),
    thighCm: displayMeasure("thighCm", start.thighCm),
    forearmCm: displayMeasure("forearmCm", start.forearmCm),
    wristCm: displayMeasure("wristCm", start.wristCm)
  };
  const last = latestBody();

  document.getElementById("home").innerHTML = `
    <div class="card">
      <span class="kicker">Phase-aware plan</span>
      <h2>${phase.title}</h2>
      <p class="muted small">${phase.when} · Protein ${phase.protein} · Gym ${phase.mins} · Creatine: ${phase.creatine}</p>
      <div class="stats">
        <div class="stat"><b>Day ${mday}</b><span>since start</span></div>
        <div class="stat"><b>${bleft > 0 ? bleft + "d" : "Today"}</b><span>to ${HEAL.profile.birthdayLabel}</span></div>
        <div class="stat"><b>${isSunday() ? "Yes" : "No"}</b><span>measure Sunday?</span></div>
      </div>
      <div class="progress-bar"><span style="width:${Math.min(100, Math.max(0, ((span - bleft) / span) * 100))}%"></span></div>
      <p class="small muted" style="margin-top:6px">${phase.note}</p>
    </div>

    <div class="card">
      <h3>Your numbers → targets</h3>
      <p class="small muted">${last ? `Live column uses latest log (${last.date}).` : "Live = baseline until you log in Measure."}</p>
      <table class="table">
        <tr><th>Site</th><th>Start</th><th>Live now</th><th>By 20 Dec</th><th>Baki-like</th></tr>
        <tr><td>Weight</td><td>${start.weightKg}</td><td><b>${live.weightKg}</b></td><td>${t45.weightKg}</td><td>${tb.weightKg}</td></tr>
        <tr><td>Waist</td><td>${start.waistCm}</td><td><b>${live.waistCm}</b></td><td>${t45.waistCm}</td><td>${tb.waistCm}</td></tr>
        <tr><td>Chest</td><td>${start.chestCm}</td><td><b>${live.chestCm}</b></td><td>${t45.chestCm}</td><td>${tb.chestCm}</td></tr>
        <tr><td>Arm</td><td>${start.armCm}</td><td><b>${live.armCm}</b></td><td>${t45.armCm}</td><td>${tb.armCm}</td></tr>
        <tr><td>Thigh</td><td>${start.thighCm}</td><td><b>${live.thighCm}</b></td><td>${t45.thighCm}</td><td>${tb.thighCm}</td></tr>
        <tr><td>Forearm</td><td>${start.forearmCm}</td><td><b>${live.forearmCm}</b></td><td>${t45.forearmCm}</td><td>${tb.forearmCm}</td></tr>
        <tr><td>Wrist</td><td>${start.wristCm}</td><td><b>${live.wristCm}</b></td><td>—</td><td>${tb.wristCm}</td></tr>
      </table>
      <p class="small muted">${t45.note}</p>
      <p class="small muted" style="margin-top:8px">${tb.note}</p>
    </div>

    <div class="card">
      <h3>${HEAL.bakiTimeline.title}</h3>
      <p class="small muted">${HEAL.bakiTimeline.heightNote}</p>
      <ul class="small" style="margin:8px 0 0;padding-left:1.1rem">
        ${HEAL.bakiTimeline.steps.map((s) => `<li style="margin-bottom:6px"><b>${s.when}:</b> ${s.what}</li>`).join("")}
      </ul>
      <p class="small muted" style="margin-top:8px">${HEAL.bakiTimeline.caveat}</p>
      <p class="small muted">Target window on the table: <b>${tb.months}</b>.</p>
    </div>

    <div class="card">
      <h3>Weak points</h3>
      ${HEAL.weakPoints
        .map(
          (w) => `<div class="weak"><b>${w.area}</b> <span class="pill warn">${w.now}</span>
        <p class="small muted">${w.why}</p><p class="small">Focus: ${w.focus}</p></div>`
        )
        .join("")}
    </div>

    <div class="card">
      <h3>Buy only if needed</h3>
      <ul class="small">${HEAL.buyOnlyIfNeeded.map((b) => `<li><b>${b.item}</b> — ${b.why}</li>`).join("")}</ul>
    </div>`;
}

function renderTrack() {
  const sch = HEAL.measureSchedule;
  const rows = [...(state.body || [])].reverse().slice(0, 16);
  document.getElementById("track").innerHTML = `
    <div class="card">
      <h2>Measure schedule</h2>
      <table class="table">
        <tr><th>What</th><th>When</th><th>How</th></tr>
        <tr><td>Weight</td><td>${sch.weight.frequency}</td><td>${sch.weight.how}</td></tr>
        <tr><td>Waist</td><td>${sch.waist.frequency}</td><td>${sch.waist.how}</td></tr>
        <tr><td>Muscles</td><td>${sch.muscles.frequency}</td><td>${sch.muscles.sites.join(", ")}</td></tr>
        <tr><td>Photos</td><td>${sch.photos.frequency}</td><td>${sch.photos.how}</td></tr>
        <tr><td>Lifts</td><td>${sch.strength.frequency}</td><td>${sch.strength.how}</td></tr>
      </table>
    </div>
    <div class="card">
      <h3>Log</h3>
      <div class="grid-2">
        <div class="field"><label>Date</label><input id="b-date" type="date" value="${todayISO()}" /></div>
        <div class="field"><label>Type</label>
          <select id="b-type"><option value="weekly">Weekly weight+waist</option><option value="full">Full tape</option></select>
        </div>
        <div class="field"><label>Weight kg</label><input id="b-weight" type="number" step="0.1" placeholder="64.7" /></div>
        <div class="field"><label>Waist cm</label><input id="b-waist" type="number" step="0.1" /></div>
        <div class="field"><label>Chest</label><input id="b-chest" type="number" step="0.1" /></div>
        <div class="field"><label>Arm</label><input id="b-arm" type="number" step="0.1" /></div>
        <div class="field"><label>Forearm</label><input id="b-fore" type="number" step="0.1" /></div>
        <div class="field"><label>Thigh</label><input id="b-thigh" type="number" step="0.1" /></div>
        <div class="field"><label>Wrist</label><input id="b-wrist" type="number" step="0.1" /></div>
        <div class="field"><label>Notes</label><input id="b-notes" type="text" /></div>
      </div>
      <label class="small"><input id="b-photos" type="checkbox" /> Photos taken</label>
      <div class="btn-row">
        <button class="btn" id="b-save" type="button">Save</button>
        <button class="btn secondary" id="b-seed" type="button">Save baseline 64.7</button>
        <button class="btn ghost" id="b-export" type="button">Export JSON</button>
      </div>
    </div>
    <div class="card">
      <h3>History</h3>
      ${
        !rows.length
          ? `<p class="muted small">No logs yet.</p>`
          : `<table class="table"><tr><th>Date</th><th>Wt</th><th>Waist</th><th>Chest</th><th>Arm</th><th>Fore</th><th>Thigh</th></tr>
        ${rows
          .map(
            (r) => `<tr><td>${r.date}${r.photos ? " 📷" : ""}</td><td>${r.weightKg ?? "—"}</td><td>${r.waistCm ?? "—"}</td>
          <td>${r.chestCm ?? "—"}</td><td>${r.armCm ?? "—"}</td><td>${r.forearmCm ?? "—"}</td><td>${r.thighCm ?? "—"}</td></tr>`
          )
          .join("")}</table>`
      }
    </div>`;

  document.getElementById("b-save").onclick = () => {
    const entry = {
      date: document.getElementById("b-date").value,
      type: document.getElementById("b-type").value,
      weightKg: numOrNull("b-weight"),
      waistCm: numOrNull("b-waist"),
      chestCm: numOrNull("b-chest"),
      armCm: numOrNull("b-arm"),
      forearmCm: numOrNull("b-fore"),
      thighCm: numOrNull("b-thigh"),
      wristCm: numOrNull("b-wrist"),
      photos: document.getElementById("b-photos").checked,
      notes: document.getElementById("b-notes").value
    };
    if (entry.weightKg == null && entry.waistCm == null) return toast("Add weight or waist");
    state.body.push(entry);
    store.save(state);
    toast("Saved — Home live numbers update");
    renderTrack();
    renderHome();
  };
  document.getElementById("b-seed").onclick = () => {
    const s = HEAL.measurementsStart;
    state.body.push({
      date: HEAL.profile.startDate,
      type: "full",
      ...s,
      photos: false,
      notes: "Baseline"
    });
    store.save(state);
    toast("Baseline saved");
    renderTrack();
    renderHome();
  };
  document.getElementById("b-export").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
    a.download = `heal-log-${todayISO()}.json`;
    a.click();
  };
}

function numOrNull(id) {
  const v = document.getElementById(id).value;
  return v === "" || v == null ? null : Number(v);
}

function renderNutrition() {
  const phase = getPhase();
  const n = HEAL.nutritionBase;
  document.getElementById("nutrition").innerHTML = `
    <div class="card">
      <h2>Food · ${phase.title}</h2>
      <p class="small">Calories ~<b>${phase.kcal}</b> · Protein <b>${phase.protein}</b> · Creatine: <b>${phase.creatine}</b></p>
      <p class="small muted">${n.fridgeRule}</p>
      <p class="small">${n.soyNote}</p>
      <p class="small">${n.paneer}</p>
    </div>
    <div class="card">
      <h3>Meal map (12-hour times)</h3>
      <div class="meal-map">
        ${n.meals
          .map(
            (m) => `<article class="meal-row">
          <div class="meal-when">${to12(m.when)}</div>
          <div class="meal-p">${m.p}</div>
          <div class="meal-what">${m.items}</div>
        </article>`
          )
          .join("")}
      </div>
    </div>
    <div class="card">
      <h3>Supplements</h3>
      <div class="table-wrap">
        <table class="table"><tr><th>Item</th><th>Dose</th><th>Note</th></tr>
        ${HEAL.supplementsOwned.map((s) => `<tr><td>${s.name}</td><td>${s.dose}</td><td>${s.note}</td></tr>`).join("")}
        </table>
      </div>
    </div>
    <div class="card">
      <h3>Recipes</h3>
      ${n.recipes
        .map(
          (r) => `<details><summary><b>${r.id}. ${r.name}</b> (${r.time})</summary>
        <ol class="small">${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol></details>`
        )
        .join("")}
    </div>`;
}

function renderTimetable() {
  const phase = getPhase();
  const t = HEAL.timetableByPhase[phase.id] || HEAL.timetableByPhase.reentry;
  document.getElementById("timetable").innerHTML = `
    <div class="card">
      <h2>Day plan · ${phase.title}</h2>
      <p class="small"><b>Sleep:</b> ${to12(t.sleep)}</p>
      <p class="small"><b>Study:</b> ${to12(t.studyStart)} → ${to12(t.studyEnd)} (target ${phase.study})</p>
      <p class="small"><b>Prunes/anjeer:</b> ${to12(t.pruneTime)}</p>
    </div>
    <div class="card">
      <h3>Hour-by-hour (12-hour)</h3>
      <ul class="timeline">${t.rows.map((x) => `<li><time>${to12(x.t)}</time><div>${x.a}</div></li>`).join("")}</ul>
    </div>
    <div class="card">
      <h3>Habit ramp status</h3>
      <table class="table">
        <tr><th>Phase</th><th>Status</th><th>Gym</th><th>Study</th></tr>
        ${["reentry", "build", "full"]
          .map((id) => {
            const p = HEAL.phases[id];
            const active = getPhase().id === id;
            const done =
              (id === "reentry" && (state.meta.reentryDone || daysSinceStart() >= 4)) ||
              (id === "build" && daysSinceStart() >= 15) ||
              (id === "full" && daysSinceStart() >= 15 && getPhase().id === "full");
            const status = active ? "▶ Current" : done ? "✓ Done / unlocked" : "Locked";
            return `<tr><td>${p.title}</td><td>${status}</td><td>${p.mins}, ${p.gymDays}</td><td>${p.study}</td></tr>`;
          })
          .join("")}
      </table>
      <p class="small muted">Sunday = rest from weights + weekly measure. Weekend study builds toward 10 h in Full phase.</p>
    </div>`;
}

function renderMuscles() {
  const root = document.getElementById("muscles");
  const region = BODY_REGIONS.find((r) => r.id === selectedRegion);
  const scrollToGuideTop = () =>
    requestAnimationFrame(() => root.scrollIntoView({ block: "start", behavior: "auto" }));

  if (!region) {
    root.innerHTML = `
      <div class="card">
        <h2>Muscle guide</h2>
        <p class="small muted">Red = main muscle groups. Tap a name in a key to open it, or pick a body area below for labelled close-ups.</p>
        <div class="overview-pair">${BODY_OVERVIEW.map(atlasFigureHtml).join("")}</div>
      </div>
      <div class="region-grid">
        ${BODY_REGIONS.map(
          (r) => `
          <button type="button" class="region-card" data-region="${r.id}">
            <img src="${r.image}" alt="${r.label} muscles illustration" loading="lazy" />
            <div>
              <strong>${r.label}</strong>
              <p class="small muted">${r.blurb}</p>
            </div>
          </button>`
        ).join("")}
      </div>`;
    bindAtlasLinks(root);
    root.querySelectorAll("[data-region]").forEach((b) => {
      b.onclick = () => {
        selectedRegion = b.dataset.region;
        selectedMuscle = BODY_REGIONS.find((r) => r.id === selectedRegion).muscles[0];
        renderMuscles();
        scrollToGuideTop();
      };
    });
    return;
  }

  const info = MUSCLE_INFO[selectedMuscle] || MUSCLE_INFO[region.muscles[0]];
  const primaryEx = Object.values(EX).filter((e) => (e.primary || []).includes(selectedMuscle));
  const secondaryEx = Object.values(EX).filter(
    (e) => !(e.primary || []).includes(selectedMuscle) && (e.secondary || []).includes(selectedMuscle)
  );
  const exMini = (list, limit = 14) =>
    list.length
      ? list
          .slice(0, limit)
          .map(
            (e) => `<div class="ex-mini"><img src="${e.img0}" alt="" loading="lazy" /><div><b>${e.name}</b>
            <div class="small muted">${(e.primary || []).map(muscleLabel).join(", ")}</div>
            <a class="small" href="${e.video}" target="_blank" rel="noopener">Video ↗</a></div></div>`
          )
          .join("")
      : `<p class="muted small">No mapped moves.</p>`;
  const muscleExerciseCards = (label, main, helper) => {
    if (main.length) {
      return `<div class="card">
      <h3>Main plan exercises for ${label}</h3>
      <p class="small muted">These treat ${label} as the main target.</p>
      ${exMini(main)}
    </div>
    ${
      helper.length
        ? `<div class="card">
      <h3>Also involve ${label}</h3>
      <p class="small muted">Other lifts where ${label} helps, but is not the main focus.</p>
      ${exMini(helper, 10)}
    </div>`
        : ""
    }`;
    }
    return `<div class="card">
      <h3>Plan exercises for ${label}</h3>
      <p class="small muted">No lift lists ${label} as the #1 target. These plan moves still train it as a helper.</p>
      ${exMini(helper)}
    </div>`;
  };
  const partCount = (MUSCLE_PARTS[selectedMuscle] || []).length;

  const isLegs = region.id === "legs";

  if (isLegs) {
    const legKeys = region.muscles;
    const legPrimary = Object.values(EX).filter((e) => legKeys.some((k) => (e.primary || []).includes(k)));
    const legSecondary = Object.values(EX).filter(
      (e) => !legKeys.some((k) => (e.primary || []).includes(k)) && legKeys.some((k) => (e.secondary || []).includes(k))
    );
    root.innerHTML = `
    <div class="card">
      <div class="btn-row" style="margin:0">
        <button type="button" class="btn secondary" id="back-regions">← All body areas</button>
      </div>
      <h2 style="margin-top:10px">${region.label}</h2>
      <p class="small muted">${region.blurb}</p>
    </div>
    <div class="card">
      <h3>Legs — front and back views</h3>
      <p class="small muted">Front thighs: quadriceps (red) and adductors (purple); the green edge is the posterior hamstring seen from the side. Back view: gluteus maximus (purple), hamstrings (green), gastrocnemius (blue) and soleus (orange). The outer-hip muscles are not coloured.</p>
      <div class="preserved-pair">
        <figure>
          <img class="muscle-hero" src="assets/muscles/legs-front-thighs.jpg" alt="Front thighs: quadriceps red and inner-thigh adductors purple; lateral edge of hamstrings visible in green" loading="lazy" />
          <figcaption class="small muted">Front thighs</figcaption>
        </figure>
        <figure>
          <img class="muscle-hero" src="assets/muscles/legs-posterior.jpg" alt="Back of legs: gluteus maximus purple, hamstrings green, gastrocnemius blue and soleus orange" loading="lazy" />
          <figcaption class="small muted">Posterior legs</figcaption>
        </figure>
      </div>
    </div>
    <div class="card">
      <h3>Leg muscles + which exercise hits each</h3>
      <p class="small muted">Read the map above, then use this list in the gym.</p>
      ${region.muscles
        .map((k) => `<p class="parts-title">${MUSCLE_INFO[k].label}</p><p class="small">${MUSCLE_INFO[k].anatomy}</p>${partsHtml(k)}`)
        .join("")}
    </div>
    <div class="card">
      <h3>Main plan leg exercises</h3>
      <p class="small muted">Lifts that mainly target quads, hamstrings, glutes, calves or outer hips.</p>
      ${exMini(legPrimary, 16)}
    </div>
    ${
      legSecondary.length
        ? `<div class="card">
      <h3>Also involve the legs</h3>
      <p class="small muted">Other moves that use leg muscles as helpers only.</p>
      ${exMini(legSecondary, 10)}
    </div>`
        : ""
    }`;

    document.getElementById("back-regions").onclick = () => {
      selectedRegion = null;
      renderMuscles();
      scrollToGuideTop();
    };
    return;
  }

  root.innerHTML = `
    <div class="card">
      <div class="btn-row" style="margin:0">
        <button type="button" class="btn secondary" id="back-regions">← All body areas</button>
      </div>
      <h2 style="margin-top:10px">${region.label}</h2>
      <p class="small muted">${region.blurb}</p>
      <div class="muscle-row" style="margin:10px 0">
        ${region.muscles
          .map((k) => {
            const m = MUSCLE_INFO[k];
            const n = (MUSCLE_PARTS[k] || []).length;
            return `<button type="button" class="muscle-pill ${k === selectedMuscle ? "pri" : ""}" data-pick="${k}">${muscleLabel(k)}${n ? ` · ${n} parts` : ""}</button>`;
          })
          .join("")}
      </div>
    </div>
    <div class="card">
      <h3>${info.label}</h3>
      ${
        region.id === "arms"
          ? `<p class="small muted">Orientation: <b>front</b> of the upper arm = biceps, with brachialis underneath near the elbow. <b>Back</b> of the upper arm = triceps. Forearm: <b>palm side</b> = flexors, <b>back</b> = extensors, <b>thumb side</b> = brachioradialis.</p>`
          : ""
      }
      ${muscleFiguresHtml(info)}
      <p class="small">${info.anatomy}</p>
      <p class="small muted">${info.tip}</p>
    </div>
    <div class="card">
      <h3>Parts + which exercise trains each${partCount ? ` (${partCount})` : ""}</h3>
      <p class="small muted">${info.figures ? "Numbers and colours match" : "Names and colours match"} the figure above. Use this list in the gym.</p>
      ${partsHtml(selectedMuscle)}
    </div>
    ${muscleExerciseCards(info.label, primaryEx, secondaryEx)}`;

  document.getElementById("back-regions").onclick = () => {
    selectedRegion = null;
    renderMuscles();
    scrollToGuideTop();
  };
  bindAtlasLinks(root);
  root.querySelectorAll("[data-pick]").forEach((b) => {
    b.onclick = () => {
      selectedMuscle = b.dataset.pick;
      renderMuscles();
      scrollToGuideTop();
    };
  });
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === name));
  const map = { home: renderHome, gym: renderGym, track: renderTrack, nutrition: renderNutrition, timetable: renderTimetable, muscles: renderMuscles };
  (map[name] || renderHome)();
  history.replaceState(null, "", "#" + name);
}

function init() {
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  const hash = location.hash.replace("#", "");
  const ok = ["home", "gym", "track", "nutrition", "timetable", "muscles"];
  switchTab(ok.includes(hash) ? hash : "home");
}

document.addEventListener("DOMContentLoaded", init);
