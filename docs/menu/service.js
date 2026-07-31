/* =====================================================================
   Pavillon — poste de salle
   Plusieurs tables ouvertes en parallèle, saisie au clavier ou au doigt.
   Montants en millimes, comme sur la carte client.
   ===================================================================== */
import { ITEMS, CATEGORIES, fmt, CURRENCY } from './data.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const byId    = new Map(ITEMS.map(i => [i.id, i]));
const catById = new Map(CATEGORIES.map(c => [c.id, c]));

const TABLES = [...Array(16)].map((_, i) => String(i + 1)).concat(['Bar', 'Emporter']);
const STORE  = 'pavillon-salle-v1';

const key      = (id, size) => (size ? `${id}|${size}` : id);
const parseKey = k => { const [id, size] = k.split('|'); return { id, size }; };
const nameOf   = id => (byId.get(id) || {}).name || id;

function priceOf(id, size) {
  const it = byId.get(id);
  if (!it) return 0;
  if (!it.sizes) return it.price;
  return (it.sizes.find(s => s.label === size) || it.sizes[0]).price;
}

/* Prix des tuiles : deux décimales au lieu de trois. Tous les tarifs de
   la carte se terminent par un zéro (x.000 ou x.500), on ne perd donc
   aucune information, et on gagne la largeur qui manquait au compteur.
   Le panneau de commande, le total et le bon gardent les trois décimales
   du dinar. */
const fmtT = m => (m / 1000).toFixed(2);

/* recherche insensible aux accents et à la casse */
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const HAY = new Map(ITEMS.map(i => [i.id, norm(`${i.name} ${(catById.get(i.cat) || {}).label || ''} ${i.desc || ''}`)]));

/* ------------------------------- état ------------------------------ */
const state = {
  table: '1',
  cat: '',            // section actuellement en haut de l'écran (pas un filtre)
  q: '',
  orders: {}          // table -> { covers, lignes: { clé: qté } }
};

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || '{}');
    if (raw && typeof raw === 'object') {
      state.orders = raw.orders && typeof raw.orders === 'object' ? raw.orders : {};
      if (TABLES.includes(raw.table)) state.table = raw.table;
    }
  } catch (_) { state.orders = {}; }
  /* purge des clés devenues invalides (carte modifiée entre-temps) */
  for (const t of Object.keys(state.orders)) {
    const o = state.orders[t];
    if (!o || typeof o !== 'object') { delete state.orders[t]; continue; }
    o.covers = Number.isFinite(o.covers) ? o.covers : 2;
    o.lignes = o.lignes && typeof o.lignes === 'object' ? o.lignes : {};
    for (const k of Object.keys(o.lignes)) {
      const q = o.lignes[k];
      if (!byId.has(parseKey(k).id) || !Number.isFinite(q) || q <= 0) delete o.lignes[k];
    }
  }
}
const save = () => {
  try { localStorage.setItem(STORE, JSON.stringify({ table: state.table, orders: state.orders })); }
  catch (_) {}
};

function order(t = state.table) {
  return (state.orders[t] ||= { covers: 2, lignes: {} });
}
const lignes = () => order().lignes;

const totalOf = t => Object.entries(order(t).lignes)
  .reduce((s, [k, q]) => { const { id, size } = parseKey(k); return s + priceOf(id, size) * q; }, 0);
const countOf = t => Object.values(order(t).lignes).reduce((a, b) => a + b, 0);

/* ------------------------------ actions ---------------------------- */
function setQty(k, q) {
  const L = lignes();
  if (q <= 0) delete L[k]; else L[k] = Math.min(q, 99);
  save(); paint();
}

/* ============================== rendu ============================== */
/* Une teinte par section. L'angle d'or écarte au maximum les teintes
   voisines : deux sections qui se suivent ne peuvent pas se ressembler,
   ce qui ne serait pas le cas d'un simple partage du cercle en 23. */
const USED = CATEGORIES.filter(c => ITEMS.some(i => i.cat === c.id));
const HUE = new Map(USED.map((c, i) => [c.id, Math.round((i * 137.508) % 360)]));

function paintCats() {
  $('#cats').innerHTML = USED.map(c =>
    `<button data-cat="${c.id}" aria-pressed="${c.id === state.cat}"
             style="--h:${HUE.get(c.id)}">${c.emoji} ${c.label}</button>`).join('');
}

function visibleItems() {
  const q = norm(state.q.trim());
  if (q) {
    const mots = q.split(/\s+/);
    return ITEMS.filter(i => { const h = HAY.get(i.id); return mots.every(m => h.includes(m)); });
  }
  return ITEMS;      // hors recherche, la grille est rendue par sections
}

/* ordre d'affichage des tailles : le médium à gauche, le large à droite */
const RANG = { M: 0, L: 1 };
const parTaille = (a, b) => (RANG[a.label] ?? 9) - (RANG[b.label] ?? 9);

/* Une ligne de prix par tarif : les articles à taille unique en ont une,
   les pizzas en ont deux. Même mise en page pour tout le monde, et le
   compteur est le seul élément actif — la tuile n'ajoute rien, on peut
   donc corriger une quantité sans risque d'ajout involontaire. */
function lignesPrix(it) {
  return it.sizes
    ? [...it.sizes].sort(parTaille).map(sz => ({ label: sz.label, price: sz.price, k: key(it.id, sz.label) }))
    : [{ label: '', price: it.price, k: it.id }];
}

function tileHTML(it) {
  const L = lignes();
  const cat = (catById.get(it.cat) || {}).label || '';
  const prix = lignesPrix(it);
  const total = prix.reduce((s, p) => s + (L[p.k] || 0), 0);

  return `
  <div class="tile${prix.length > 1 ? ' tile-sz' : ''}${total ? ' on' : ''}" data-tile="${it.id}">
    <div class="t-name">${it.name}</div>
    <div class="t-cat">${cat}</div>
    <div class="t-szs">
      ${prix.map(p => {
        const q = L[p.k] || 0;
        const nom = `${it.name}${p.label ? ' ' + p.label : ''}`;
        return `
        <div class="sz${q ? ' on' : ''}">
          ${p.label ? `<span class="sz-lab">${p.label}</span>` : ''}
          <span class="sz-price">${fmtT(p.price)}</span>
          <div class="stepper xs">
            <button data-q="dec" data-key="${p.k}" ${q ? '' : 'disabled'}
                    aria-label="Retirer ${nom}">−</button>
            <span class="n">${q}</span>
            <button data-q="inc" data-key="${p.k}" aria-label="Ajouter ${nom}">+</button>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function paintGrid() {
  const wrap = $('#grid');
  const q = state.q.trim();

  if (q) {                                   // en recherche : liste à plat
    const items = visibleItems();
    wrap.innerHTML = `<div class="grid">${items.map(tileHTML).join('')}</div>`;
    $('#empty').hidden = items.length > 0;
    return;
  }

  $('#empty').hidden = true;
  wrap.innerHTML = USED.map(c => {
    const items = ITEMS.filter(i => i.cat === c.id);
    return `
    <section class="sec" data-sec="${c.id}" style="--h:${HUE.get(c.id)}">
      <header class="sec-head">
        <span class="sec-dot"></span>
        <h2>${c.emoji} ${c.label}</h2>
        <span class="sec-n">${items.length}</span>
      </header>
      <div class="grid">${items.map(tileHTML).join('')}</div>
    </section>`;
  }).join('') + '<div class="sec-fin" aria-hidden="true"></div>';
}

function paintOrder() {
  const L = lignes(), ks = Object.keys(L);
  const box = $('#lines');

  box.innerHTML = ks.length ? ks.map(k => {
    const { id, size } = parseKey(k);
    const unit = priceOf(id, size), q = L[k];
    return `
    <div class="line">
      <div class="l-step">
        <button data-q="dec" data-key="${k}" aria-label="Retirer">−</button>
        <span class="n">${q}</span>
        <button data-q="inc" data-key="${k}" aria-label="Ajouter">+</button>
      </div>
      <div>
        <div class="l-name">${nameOf(id)}${size ? ` · ${size}` : ''}</div>
        <div class="l-meta">${fmt(unit)} l’unité</div>
      </div>
      <div class="l-sum">${fmt(unit * q)}</div>
    </div>`;
  }).join('') : `<p class="o-empty">Table vide.<br>Tapez le début d’un nom,<br>ou touchez un article.<br><br>
      <kbd>Entrée</kbd> ajoute le premier résultat</p>`;

  $('#total').innerHTML = `${fmt(totalOf())} <i>${CURRENCY}</i>`;
  $('#send').disabled = ks.length === 0;
  $('#tbNum').textContent = state.table;
  $('#covers').textContent = order().covers;

  const n = countOf();
  const peek = $('#peek');
  peek.hidden = n === 0 || matchMedia('(min-width: 901px)').matches;
  $('#peekCount').textContent = `${n} article${n > 1 ? 's' : ''} · Table ${state.table}`;
  $('#peekTotal').textContent = `${fmt(totalOf())} ${CURRENCY}`;
}

function paint() { paintGrid(); paintOrder(); }

/* =========================== interactions ========================== */
$('#grid').addEventListener('click', e => {
  const step = e.target.closest('[data-q]');
  if (!step) return;                // seuls les compteurs agissent
  const k = step.dataset.key, cur = lignes()[k] || 0;
  setQty(k, step.dataset.q === 'inc' ? cur + 1 : cur - 1);
});

$('#lines').addEventListener('click', e => {
  const b = e.target.closest('[data-q]');
  if (!b) return;
  const k = b.dataset.key, cur = lignes()[k] || 0;
  setQty(k, b.dataset.q === 'inc' ? cur + 1 : cur - 1);
});

const wrapEl = () => $('.grid-wrap');

$('#cats').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]');
  if (!b) return;
  if (state.q) {                       // on sort d'abord de la recherche
    state.q = ''; $('#q').value = ''; $('#qClear').hidden = true; paintGrid();
  }
  gotoSection(b.dataset.cat);
});

/* --------- navigation par section + suivi du défilement ------------ */
/* Deux identifiants d'animation distincts : l'écouteur de défilement
   annulait la boucle qui surveille la fin du défilement programmé, et
   spySuppress restait vrai indéfiniment — le suivi ne repartait jamais. */
let spySuppress = false, spyRAF = 0, settleRAF = 0;

function setActive(id, { snap = true } = {}) {
  if (id === state.cat) return;
  state.cat = id;
  $$('#cats button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === id)));
  if (!snap) return;
  const pill = $(`#cats button[data-cat="${id}"]`);
  /* la pastille active vient se caler à gauche du rail */
  if (pill) $('#cats').scrollTo({ left: Math.max(0, pill.offsetLeft - 12), behavior: 'smooth' });
}

function gotoSection(id) {
  const sec = $(`.sec[data-sec="${id}"]`);
  if (!sec) return;
  setActive(id);
  const w = wrapEl();
  spySuppress = true;
  const delta = sec.getBoundingClientRect().top - w.getBoundingClientRect().top;
  w.scrollTo({ top: Math.max(0, w.scrollTop + delta - 6), behavior: 'smooth' });

  /* on rend la main au suivi seulement quand le défilement s'est posé :
     un délai fixe le couperait en route sur une longue course */
  cancelAnimationFrame(settleRAF);
  const t0 = performance.now();
  let last = -1, stable = 0;
  const check = () => {
    const cur = Math.round(w.scrollTop);
    stable = cur === last ? stable + 1 : 0;
    last = cur;
    if (stable >= 3 || performance.now() - t0 > 2500) { spySuppress = false; return; }
    settleRAF = requestAnimationFrame(check);
  };
  settleRAF = requestAnimationFrame(check);
}

/* la section en haut de l'écran pilote la pastille active */
function spy() {
  if (spySuppress || state.q) return;
  const w = wrapEl(), secs = $$('.sec', w);
  if (!secs.length) return;
  const haut = w.getBoundingClientRect().top;
  let cur = secs[0];
  for (const s of secs) if (s.getBoundingClientRect().top - haut <= 30) cur = s;
  setActive(cur.dataset.sec);
}


/* recherche */
const qInput = $('#q');
qInput.addEventListener('input', () => {
  state.q = qInput.value;
  $('#qClear').hidden = !state.q;
  paintGrid();
  wrapEl().scrollTop = 0;
});
$('#qClear').addEventListener('click', () => {
  state.q = ''; qInput.value = ''; $('#qClear').hidden = true; paintGrid(); qInput.focus();
});

/* couverts */
$('.covers').addEventListener('click', e => {
  const b = e.target.closest('[data-cov]');
  if (!b) return;
  const o = order();
  o.covers = Math.max(1, Math.min(30, o.covers + (+b.dataset.cov)));
  save(); paintOrder();
});

/* clavier : on tape, ça cherche ; Entrée ajoute le premier résultat */
addEventListener('keydown', e => {
  if (!$('#tables').hidden || !$('#sent').hidden) {
    if (e.key === 'Escape') { $('#tables').hidden = true; $('#sent').hidden = true; }
    return;
  }
  if (e.key === 'Escape') {
    if (state.q) { state.q = ''; qInput.value = ''; $('#qClear').hidden = true; paintGrid(); }
    qInput.blur();
    return;
  }
  if (e.key === 'Enter' && document.activeElement === qInput) {
    const first = visibleItems()[0];
    if (first) {
      const p = lignesPrix(first)[0];      // la ligne la plus à gauche
      setQty(p.k, (lignes()[p.k] || 0) + 1);
      state.q = ''; qInput.value = ''; $('#qClear').hidden = true; paintGrid();
    }
    e.preventDefault();
    return;
  }
  /* une frappe imprimable ramène le focus dans la recherche */
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement !== qInput) {
    qInput.focus();
  }
});

/* ------------------------------ tables ----------------------------- */
function paintTables() {
  $('#tGrid').innerHTML = TABLES.map(t => {
    const n = countOf(t);
    return `<button data-t="${t}" aria-current="${t === state.table}" class="${n ? 'busy' : ''}">
      ${t}${n ? `<small>${fmt(totalOf(t))}</small>` : ''}</button>`;
  }).join('');
}
$('#tablesBtn').addEventListener('click', () => { paintTables(); $('#tables').hidden = false; });
$('#tClose').addEventListener('click', () => ($('#tables').hidden = true));
$('#tables').addEventListener('click', e => {
  if (e.target.id === 'tables') { $('#tables').hidden = true; return; }
  const b = e.target.closest('[data-t]');
  if (!b) return;
  state.table = b.dataset.t;
  save(); $('#tables').hidden = true; paint();
});

/* ------------------------- envoi / bon papier ---------------------- */
const W = 32;
const row = (l, r) => {
  const rs = String(r), ls = String(l).slice(0, Math.max(0, W - rs.length - 1));
  return ls + ' '.repeat(Math.max(1, W - ls.length - rs.length)) + rs;
};
const centre = s => ' '.repeat(Math.max(0, Math.floor((W - s.length) / 2))) + s;

function bonText() {
  const L = lignes(), o = order();
  const d = new Date();
  const out = [
    centre('P A V I L L O N'), centre('BON DE COMMANDE'), '='.repeat(W),
    row(`Table ${state.table}`, `${o.covers} couv.`),
    row(d.toLocaleDateString('fr-FR'), d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })),
    '-'.repeat(W)
  ];
  /* regroupé par catégorie : la cuisine lit plus vite */
  for (const c of CATEGORIES) {
    const ks = Object.keys(L).filter(k => (byId.get(parseKey(k).id) || {}).cat === c.id);
    if (!ks.length) continue;
    out.push(c.label.toUpperCase());
    ks.forEach(k => {
      const { id, size } = parseKey(k);
      out.push(row(`  ${L[k]}× ${nameOf(id)}${size ? ` (${size})` : ''}`, fmt(priceOf(id, size) * L[k])));
    });
  }
  out.push('-'.repeat(W), row('Articles', countOf()), row('TOTAL', `${fmt(totalOf())} ${CURRENCY}`), '='.repeat(W));
  return out.join('\n');
}

$('#send').addEventListener('click', () => {
  if (!countOf()) return;
  $('#bon').textContent = bonText();
  $('#sent').hidden = false;
});
$('#bonClose').addEventListener('click', () => ($('#sent').hidden = true));
$('#sent').addEventListener('click', e => { if (e.target.id === 'sent') $('#sent').hidden = true; });
$('#bonCopy').addEventListener('click', async () => {
  const btn = $('#bonCopy'), txt = bonText();
  try { await navigator.clipboard.writeText(txt); }
  catch (_) {
    const ta = document.createElement('textarea');
    ta.value = txt; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    ta.remove();
  }
  const old = btn.textContent; btn.textContent = 'Copié ✓';
  setTimeout(() => (btn.textContent = old), 1600);
});

$('#clear').addEventListener('click', () => {
  if (!countOf()) return;
  if (!confirm(`Annuler la commande de la table ${state.table} ?`)) return;
  order().lignes = {};
  save(); paint();
});

/* panneau de commande sur écran étroit */
$('#peek').addEventListener('click', () => $('#order').classList.add('open'));
$('#oClose').addEventListener('click', () => $('#order').classList.remove('open'));
addEventListener('resize', paintOrder);

/* ============================= démarrage =========================== */
load();
state.cat = USED.length ? USED[0].id : '';
paintCats();
wrapEl().addEventListener('scroll', () => {
  cancelAnimationFrame(spyRAF);
  spyRAF = requestAnimationFrame(spy);
}, { passive: true });
paint();
if (matchMedia('(min-width: 901px)').matches) qInput.focus();
