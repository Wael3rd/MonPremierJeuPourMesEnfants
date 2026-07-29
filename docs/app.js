/* =====================================================================
   La Frise des Grandes Inventions — logique de l'application
   ===================================================================== */
import { INVENTIONS, ERAS, QUIZ } from './data.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const eraOf = id => ERAS.find(e => e.id === id) || ERAS[0];

const LEVELS = {
  cm2:    { label: '7 ans · CM2',     short: '7 ans',  ico: '🧒' },
  cinq:   { label: '12 ans · 5ᵉ',     short: '12 ans', ico: '🧑‍🎓' },
  grands: { label: 'Adultes',         short: 'Adulte', ico: '👓' }
};

const state = {
  index: 0,
  level: localStorage.getItem('gi-level') || 'cm2',
  autoplay: false,
  ready3d: false
};

/* ==================================================================== */
/*  1. La frise                                                         */
/* ==================================================================== */
const railScroll = $('#railScroll');
const railInner  = $('#railInner');

function buildRail() {
  INVENTIONS.forEach((inv, i) => {
    const era = eraOf(inv.era);
    const b = document.createElement('button');
    b.className = 'node';
    b.style.setProperty('--node-c', era.color);
    b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    b.innerHTML = `<span class="emoji">${inv.icon}</span>
                   <span class="dot"></span>
                   <span class="yr">${shortYear(inv)}</span>
                   <span class="nm">${inv.name}</span>`;
    b.addEventListener('click', () => select(i));
    railInner.appendChild(b);
  });
  requestAnimationFrame(drawEraBands);
}

function shortYear(inv) {
  if (inv.year < -1000) return `-${Math.round(-inv.year / 1000)}k`;
  if (inv.year < 0)     return `${inv.year} `.replace('-', '−');
  return String(inv.year);
}

/* bandes d'ères dessinées derrière les jalons */
function drawEraBands() {
  $$('.era-band, .era-label', railInner).forEach(e => e.remove());
  const nodes = $$('.node', railInner);
  if (!nodes.length) return;
  ERAS.forEach(era => {
    const idxs = INVENTIONS.map((v, i) => v.era === era.id ? i : -1).filter(i => i >= 0);
    if (!idxs.length) return;
    const a = nodes[idxs[0]], b = nodes[idxs[idxs.length - 1]];
    const l = a.offsetLeft - 12, r = b.offsetLeft + b.offsetWidth + 12;
    const band = document.createElement('div');
    band.className = 'era-band';
    band.style.cssText = `left:${l}px;width:${r - l}px;background:${era.color}`;
    railInner.appendChild(band);
    const lab = document.createElement('div');
    lab.className = 'era-label';
    lab.textContent = era.label;
    lab.style.cssText = `left:${(l + r) / 2}px;color:${era.color}`;
    railInner.appendChild(lab);
  });
}

/* Recentre un jalon. Le défilement fluide peut durer bien plus longtemps
   qu'un délai fixe : on neutralise l'auto-sélection jusqu'à ce que la
   position se soit réellement stabilisée, sinon la frise s'auto-interrompt
   en cours de route et sélectionne un jalon intermédiaire. */
function centerNode(i, smooth = true) {
  const n = $$('.node', railInner)[i];
  if (!n) return;
  const max = Math.max(0, railScroll.scrollWidth - railScroll.clientWidth);
  const target = Math.min(max, Math.max(0, n.offsetLeft + n.offsetWidth / 2 - railScroll.clientWidth / 2));

  suppressScroll = true;
  railScroll.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' });

  cancelAnimationFrame(settleRAF);
  let last = -1, stable = 0;
  const t0 = performance.now();
  const check = () => {
    const cur = Math.round(railScroll.scrollLeft);
    stable = (cur === last) ? stable + 1 : 0;
    last = cur;
    const settled = (Math.abs(cur - target) <= 2 && stable >= 2)
                 || stable >= 10
                 || performance.now() - t0 > 2500;
    if (settled) { suppressScroll = false; clearTimeout(scrollIdle); }
    else settleRAF = requestAnimationFrame(check);
  };
  settleRAF = requestAnimationFrame(check);
}

/* scrub : on sélectionne le jalon le plus proche du centre */
let suppressScroll = false, settleRAF = 0, scrollIdle = null;
railScroll.addEventListener('scroll', () => {
  if (suppressScroll) return;
  clearTimeout(scrollIdle);
  scrollIdle = setTimeout(() => {
    const c = railScroll.scrollLeft + railScroll.clientWidth / 2;
    let best = 0, bd = Infinity;
    $$('.node', railInner).forEach((n, i) => {
      const d = Math.abs(n.offsetLeft + n.offsetWidth / 2 - c);
      if (d < bd) { bd = d; best = i; }
    });
    if (best !== state.index) select(best);
    else centerNode(best);
  }, 150);
}, { passive: true });

/* glisser-déposer à la souris sur la frise */
(() => {
  let down = false, x0 = 0, l0 = 0, moved = false;
  railScroll.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    down = true; moved = false; x0 = e.clientX; l0 = railScroll.scrollLeft;
    railScroll.classList.add('dragging');
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 4) moved = true;
    railScroll.scrollLeft = l0 - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false; railScroll.classList.remove('dragging');
  });
  railScroll.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  /* molette verticale → défilement horizontal */
  railScroll.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      railScroll.scrollLeft += e.deltaY; e.preventDefault();
    }
  }, { passive: false });
})();

/* ==================================================================== */
/*  2. Le panneau de texte                                              */
/* ==================================================================== */
const panel = $('#panel');

function renderPanel() {
  const inv = INVENTIONS[state.index];
  const era = eraOf(inv.era);
  const lv = LEVELS[state.level];
  panel.innerHTML = `
    <div class="eyebrow">${inv.icon} ${era.label}</div>
    <h2>${inv.name}</h2>
    <p class="tagline">« ${inv.tagline} »</p>
    <div class="meta">
      <span><b>Quand</b> &nbsp;${inv.yearLabel}</span>
      <span><b>Qui</b> &nbsp;${inv.who}</span>
      <span><b>Où</b> &nbsp;${inv.where}</span>
    </div>
    <div class="explain lvl-${state.level}">
      <p>${inv.levels[state.level]}</p>
    </div>
    <div class="fact">
      <strong>Le savais-tu ?</strong>
      <p>${inv.fact}</p>
    </div>
    <div class="impacts">
      <h3>Ce que ça a changé</h3>
      <ul>${inv.impact.map(x => `<li>${x}</li>`).join('')}</ul>
    </div>
    <p class="sr">Niveau de lecture : ${lv.label}</p>`;
  panel.scrollTop = 0;
}

/* ==================================================================== */
/*  3. Sélection + habillage                                            */
/* ==================================================================== */
function select(i, opts = {}) {
  state.index = (i + INVENTIONS.length) % INVENTIONS.length;
  const inv = INVENTIONS[state.index];
  const era = eraOf(inv.era);

  document.documentElement.style.setProperty('--accent', era.color);
  $('#stageYear').textContent = inv.yearLabel
    .split('→')[0].trim()
    .replace('≈ ', '')
    .replace(' apr. J.-C.', '')
    .replace(' av. J.-C.', ' av.');

  $$('.node', railInner).forEach((n, k) => n.setAttribute('aria-current', k === state.index ? 'true' : 'false'));
  if (opts.scroll !== false) centerNode(state.index);

  $('#prevBtn').disabled = false;
  $('#nextBtn').disabled = false;

  renderPanel();
  if (state.ready3d) loadModel(inv.id);
  try { history.replaceState(null, '', '#' + inv.id); } catch (_) {}
}

/* ==================================================================== */
/*  4. Niveaux de lecture                                               */
/* ==================================================================== */
const thumb = $('#thumb');
function moveThumb() {
  const btn = $(`.levels button[data-lvl="${state.level}"]`);
  if (!btn) return;
  thumb.style.left  = btn.offsetLeft + 'px';
  thumb.style.width = btn.offsetWidth + 'px';
}
$$('.levels button').forEach(b => {
  b.addEventListener('click', () => {
    state.level = b.dataset.lvl;
    localStorage.setItem('gi-level', state.level);
    $$('.levels button').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    requestAnimationFrame(moveThumb);
    renderPanel();
  });
});

/* ==================================================================== */
/*  5. Navigation                                                       */
/* ==================================================================== */
$('#prevBtn').addEventListener('click', () => { stopAuto(); select(state.index - 1); });
$('#nextBtn').addEventListener('click', () => { stopAuto(); select(state.index + 1); });

window.addEventListener('keydown', e => {
  if ($('#quiz').classList.contains('open')) { if (e.key === 'Escape') closeQuiz(); return; }
  if (e.key === 'ArrowRight') { stopAuto(); select(state.index + 1); }
  if (e.key === 'ArrowLeft')  { stopAuto(); select(state.index - 1); }
  if (e.key === 'Home')       { stopAuto(); select(0); }
  if (e.key === 'End')        { stopAuto(); select(INVENTIONS.length - 1); }
});

/* visite guidée */
let autoTimer = null;
const playBtn = $('#playBtn');
function startAuto() {
  state.autoplay = true; playBtn.textContent = '⏸'; playBtn.setAttribute('aria-pressed', 'true');
  autoTimer = setInterval(() => select(state.index + 1), 9000);
}
function stopAuto() {
  if (!state.autoplay) return;
  state.autoplay = false; playBtn.textContent = '▶'; playBtn.setAttribute('aria-pressed', 'false');
  clearInterval(autoTimer);
}
playBtn.addEventListener('click', () => (state.autoplay ? stopAuto() : startAuto()));

/* ==================================================================== */
/*  6. Le quiz                                                          */
/* ==================================================================== */
const quiz = $('#quiz'), quizCard = $('#quizCard');
let qi = 0, score = 0, answered = false;

function openQuiz() { stopAuto(); qi = 0; score = 0; quiz.classList.add('open'); renderQuestion(); }
function closeQuiz() { quiz.classList.remove('open'); }
$('#quizBtn').addEventListener('click', openQuiz);
quiz.addEventListener('click', e => { if (e.target === quiz) closeQuiz(); });

function renderQuestion() {
  if (qi >= QUIZ.length) return renderScore();
  const q = QUIZ[qi];
  answered = false;
  quizCard.innerHTML = `
    <div class="q-count">Question ${qi + 1} / ${QUIZ.length} · Score ${score}</div>
    <p class="q-text">${q.q}</p>
    <div class="choices">
      ${q.choices.map((c, i) => `<button class="choice" data-i="${i}"><span class="k">${'ABC'[i]}</span>${c}</button>`).join('')}
    </div>
    <div id="qFeed"></div>`;
  $$('.choice', quizCard).forEach(btn => btn.addEventListener('click', () => answer(+btn.dataset.i)));
}

function answer(i) {
  if (answered) return;
  answered = true;
  const q = QUIZ[qi];
  const btns = $$('.choice', quizCard);
  btns.forEach((b, k) => {
    b.disabled = true;
    if (k === q.answer) b.classList.add('good');
    else if (k === i)   b.classList.add('bad');
  });
  if (i === q.answer) score++;
  $('#qFeed').innerHTML = `
    <p class="q-explain">${i === q.answer ? '✅ Bravo ! ' : '❌ Presque ! '}${q.explain}</p>
    <div class="sheet-actions">
      <button class="btn primary" id="qNext">${qi + 1 < QUIZ.length ? 'Question suivante →' : 'Voir mon score →'}</button>
      <button class="btn" id="qGo">Voir l’invention ${INVENTIONS.find(v => v.id === q.inv).icon}</button>
    </div>`;
  $('#qNext').addEventListener('click', () => { qi++; renderQuestion(); });
  $('#qGo').addEventListener('click', () => {
    closeQuiz();
    select(INVENTIONS.findIndex(v => v.id === q.inv));
  });
}

function renderScore() {
  const msg = score >= 9 ? 'Incroyable ! Tu es un vrai inventeur 🏆'
            : score >= 6 ? 'Très bien joué ! 🎉'
            : score >= 3 ? 'Pas mal — refais un tour de la frise 🔍'
            : 'Allez, explore la frise et reviens ! 🚀';
  quizCard.innerHTML = `
    <div class="q-count">Résultat</div>
    <div class="score-big">${score}<span style="font-size:26px">/${QUIZ.length}</span></div>
    <h2 style="margin-top:14px">${msg}</h2>
    <div class="sheet-actions">
      <button class="btn primary" id="qAgain">Rejouer</button>
      <button class="btn" id="qClose">Retour à la frise</button>
    </div>`;
  $('#qAgain').addEventListener('click', openQuiz);
  $('#qClose').addEventListener('click', closeQuiz);
}

/* ==================================================================== */
/*  7. La scène 3D                                                      */
/* ==================================================================== */
let THREE, renderer, scene, camera, pivot, ground, current = null, buildModel, ZOOM;
const canvas = $('#scene'), stageEl = $('#stage');
const cam = { dist: 6, minDist: 2.5, maxDist: 26, az: 0.7, pol: 1.15, tDist: 6, tAz: 0.7, tPol: 1.15, cy: 0, tCy: 0 };

async function init3D() {
  try {
    THREE = await import('three');
    ({ buildModel, ZOOM } = await import('./scenes.js'));
  } catch (err) {
    console.warn('Three.js indisponible, repli 2D.', err);
    return fallback2D();
  }

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x070912, 22, 60);
  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);

  scene.add(new THREE.HemisphereLight(0xbcd4ff, 0x241a12, 1.15));
  const key = new THREE.DirectionalLight(0xfff0d8, 2.3);
  key.position.set(5, 8, 6); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = key.shadow.camera.bottom = -12;
  key.shadow.camera.right = key.shadow.camera.top = 12;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fd4ff, 1.1); rim.position.set(-6, 3, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffb168, .6); fill.position.set(2, -4, 4); scene.add(fill);

  /* sol qui reçoit l'ombre */
  ground = new THREE.Mesh(
    new THREE.CircleGeometry(30, 48),
    new THREE.ShadowMaterial({ opacity: .32 })
  );
  ground.rotation.x = -Math.PI / 2; ground.position.y = -3.2; ground.receiveShadow = true;
  scene.add(ground);

  pivot = new THREE.Group(); scene.add(pivot);

  state.ready3d = true;
  resize();
  loadModel(INVENTIONS[state.index].id);
  animate();
  setTimeout(() => $('#loader').classList.add('gone'), 420);
  setTimeout(() => $('#hint').classList.add('hide'), 7000);
}

function loadModel(id) {
  if (!state.ready3d) return;
  if (current) { pivot.remove(current.group); disposeTree(current.group); }
  current = buildModel(id);
  current.modelId = id;
  pivot.add(current.group);
  if (current.update) { try { current.update(1); } catch (_) {} }   // pose représentative
  frameCamera();
  cam.dist = cam.tDist;                    // pas de zoom parasite au changement
  cam.tAz = 0.65; cam.tPol = 1.12;
  animIn = 0;
}
let animIn = 1;

/* Cadrage automatique : on mesure la boîte englobante réelle du modèle
   (hors éléments décoratifs) et on place la caméra pour qu'il tienne
   entièrement dans le champ, quel que soit le format d'écran. */
function frameCamera() {
  if (!current || !camera) return;
  const box = new THREE.Box3();
  const tmp = new THREE.Box3();
  current.group.updateWorldMatrix(true, true);
  current.group.traverse(o => {
    if (!o.geometry || o.userData.decor) return;
    for (let p = o.parent; p && p !== current.group; p = p.parent) if (p.userData.decor) return;
    tmp.setFromObject(o);
    if (isFinite(tmp.min.x) && isFinite(tmp.max.x)) box.union(tmp);
  });
  if (box.isEmpty()) { cam.tDist = 8; cam.tCy = 0; return; }

  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const vfov = camera.fov * Math.PI / 180;
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
  const half = Math.min(vfov, hfov) / 2;
  const zoom = (ZOOM && ZOOM[current.modelId]) || 1;

  cam.tDist  = clamp((sphere.radius / Math.sin(half)) * 0.93 * zoom, 2, 70);
  cam.minDist = cam.tDist * 0.4;
  cam.maxDist = cam.tDist * 2.8;
  cam.tCy = sphere.center.y;
  if (ground) ground.position.y = box.min.y - 0.25;
}

function disposeTree(root) {
  root.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose());
  });
}

/* ---- commandes orbitales maison (souris, tactile, molette) -------- */
(() => {
  const pts = new Map();
  let lastX = 0, lastY = 0, pinch0 = 0, dist0 = 0, autoSpin = true, idle = null;

  const wake = () => {
    autoSpin = false; clearTimeout(idle);
    idle = setTimeout(() => (autoSpin = true), 3500);
    $('#hint').classList.add('hide');
  };

  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    lastX = e.clientX; lastY = e.clientY; wake();
    if (pts.size === 2) { pinch0 = pointerDistance(pts); dist0 = cam.tDist; }
  });
  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    wake();
    if (pts.size >= 2) {
      const d = pointerDistance(pts);
      if (pinch0 > 0) cam.tDist = clamp(dist0 * (pinch0 / d), cam.minDist, cam.maxDist);
      return;
    }
    cam.tAz  -= (e.clientX - lastX) * 0.007;
    cam.tPol = clamp(cam.tPol - (e.clientY - lastY) * 0.006, 0.22, Math.PI - 0.22);
    lastX = e.clientX; lastY = e.clientY;
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = 0; };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => {
    e.preventDefault(); wake();
    cam.tDist = clamp(cam.tDist * (1 + Math.sign(e.deltaY) * 0.12), cam.minDist, cam.maxDist);
  }, { passive: false });

  window.__spin = () => autoSpin;
})();

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function pointerDistance(pts) {
  const [a, b] = [...pts.values()];
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function resize() {
  if (!renderer) return;
  const w = stageEl.clientWidth, h = stageEl.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  frameCamera();          // le cadrage dépend du format de l'écran
}
addEventListener('resize', () => { resize(); moveThumb(); drawEraBands(); centerNode(state.index, false); });

let t0 = performance.now();
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now(), t = now / 1000, dt = Math.min((now - t0) / 1000, 0.05); t0 = now;

  if (window.__spin && window.__spin()) cam.tAz += dt * 0.16;

  cam.az   += (cam.tAz - cam.az) * 0.12;
  cam.pol  += (cam.tPol - cam.pol) * 0.09;
  cam.dist += (cam.tDist - cam.dist) * 0.07;
  cam.cy   += (cam.tCy - cam.cy) * 0.08;

  camera.position.set(
    cam.dist * Math.sin(cam.pol) * Math.sin(cam.az),
    cam.cy + cam.dist * Math.cos(cam.pol),
    cam.dist * Math.sin(cam.pol) * Math.cos(cam.az)
  );
  camera.lookAt(0, cam.cy, 0);

  if (current) {
    animIn = Math.min(1, animIn + dt * 2.4);
    const e = 1 - Math.pow(1 - animIn, 3);
    current.group.scale.setScalar(0.35 + e * 0.65);
    current.group.rotation.y = (1 - e) * 1.6;
    if (current.update) { try { current.update(t); } catch (_) {} }
  }
  renderer.render(scene, camera);
}

/* ------------------------- repli sans WebGL ------------------------ */
function fallback2D() {
  canvas.remove();
  $('#loader').classList.add('gone');
  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px';
  holder.innerHTML = `<div>
    <div id="fbIcon" style="font-size:clamp(80px,18vw,170px);line-height:1;filter:drop-shadow(0 18px 40px rgba(0,0,0,.6));animation:rise .6s"></div>
    <p style="margin-top:16px;font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-dim)">
      Vue 3D indisponible sur cet appareil</p></div>`;
  stageEl.appendChild(holder);
  const paint = () => { const el = $('#fbIcon'); if (el) el.textContent = INVENTIONS[state.index].icon; };
  paint();
  loadModel = paint;
  state.ready3d = true;
}

/* ==================================================================== */
/*  8. Démarrage                                                        */
/* ==================================================================== */
function boot() {
  buildRail();
  moveThumb();
  $$('.levels button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lvl === state.level)));
  $('#hint').textContent = matchMedia('(pointer:coarse)').matches
    ? 'Fais tourner l’objet avec le doigt · pince pour zoomer'
    : 'Clique-glisse pour tourner · molette pour zoomer';

  const fromHash = INVENTIONS.findIndex(v => v.id === location.hash.slice(1));
  select(fromHash >= 0 ? fromHash : 0, { scroll: false });
  requestAnimationFrame(() => centerNode(state.index, false));

  init3D();
  /* la frise attend le chargement des polices pour se recaler */
  if (document.fonts) document.fonts.ready.then(() => { moveThumb(); drawEraBands(); centerNode(state.index, false); });
}

boot();
