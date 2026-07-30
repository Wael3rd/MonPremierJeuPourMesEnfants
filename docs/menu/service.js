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

/* recherche insensible aux accents et à la casse */
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const HAY = new Map(ITEMS.map(i => [i.id, norm(`${i.name} ${(catById.get(i.cat) || {}).label || ''} ${i.desc || ''}`)]));

/* ------------------------------- état ------------------------------ */
const state = {
  table: '1',
  cat: 'all',
  q: '',
  mult: 1,
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
function add(id, size, n = state.mult) {
  const k = key(id, size);
  const L = lignes();
  L[k] = (L[k] || 0) + n;
  state.mult = 1;                    // le multiplicateur ne vaut que pour un ajout
  save(); paint();
}
function setQty(k, q) {
  const L = lignes();
  if (q <= 0) delete L[k]; else L[k] = Math.min(q, 99);
  save(); paint();
}

/* ============================== rendu ============================== */
function paintCats() {
  const wrap = $('#cats');
  const used = CATEGORIES.filter(c => ITEMS.some(i => i.cat === c.id));
  wrap.innerHTML =
    `<button data-cat="all" aria-pressed="${state.cat === 'all'}">Tout</button>` +
    used.map(c => `<button data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c.emoji} ${c.label}</button>`).join('');
}

function visibleItems() {
  const q = norm(state.q.trim());
  if (q) {
    const mots = q.split(/\s+/);
    return ITEMS.filter(i => { const h = HAY.get(i.id); return mots.every(m => h.includes(m)); });
  }
  return state.cat === 'all' ? ITEMS : ITEMS.filter(i => i.cat === state.cat);
}

function tileHTML(it) {
  const L = lignes();
  const cat = (catById.get(it.cat) || {}).label || '';
  if (it.sizes) {
    const total = it.sizes.reduce((s, sz) => s + (L[key(it.id, sz.label)] || 0), 0);
    return `
    <div class="tile${total ? ' on' : ''}" data-tile="${it.id}">
      <div>
        <div class="t-name">${it.name}</div>
        <div class="t-cat">${cat}</div>
      </div>
      <div class="t-szs">
        ${it.sizes.map(sz => {
          const q = L[key(it.id, sz.label)] || 0;
          return `<button class="${q ? 'on' : ''}" data-add="${it.id}" data-size="${sz.label}"
                    aria-label="${it.name} ${sz.label}"><b>${sz.label}</b>${fmt(sz.price)}</button>`;
        }).join('')}
      </div>
      ${total ? `<span class="t-qty">${total}</span>` : ''}
    </div>`;
  }
  const q = L[it.id] || 0;
  return `
  <button class="tile${q ? ' on' : ''}" data-tile="${it.id}" data-add="${it.id}">
    <div>
      <div class="t-name">${it.name}</div>
      <div class="t-cat">${cat}</div>
    </div>
    <div class="t-price">${fmt(it.price)}</div>
    ${q ? `<span class="t-qty">${q}</span>` : ''}
  </button>`;
}

function paintGrid() {
  const items = visibleItems();
  $('#grid').innerHTML = items.map(tileHTML).join('');
  $('#empty').hidden = items.length > 0;
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

function paintMult() {
  $$('#mult button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.m === state.mult)));
}

/* paintMult est inclus : le multiplicateur retombe à 1 après chaque ajout,
   l'affichage doit suivre, sinon le serveur croit ajouter ×3 alors que
   l'état est déjà revenu à ×1. */
function paint() { paintGrid(); paintOrder(); paintMult(); }

/* =========================== interactions ========================== */
$('#grid').addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  add(b.dataset.add, b.dataset.size || null);
});

$('#lines').addEventListener('click', e => {
  const b = e.target.closest('[data-q]');
  if (!b) return;
  const k = b.dataset.key, cur = lignes()[k] || 0;
  setQty(k, b.dataset.q === 'inc' ? cur + 1 : cur - 1);
});

$('#cats').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]');
  if (!b) return;
  state.cat = b.dataset.cat;
  state.q = ''; $('#q').value = ''; $('#qClear').hidden = true;
  paintCats(); paintGrid();
  $('.grid-wrap').scrollTop = 0;
});

$('#mult').addEventListener('click', e => {
  const b = e.target.closest('[data-m]');
  if (!b) return;
  state.mult = +b.dataset.m;
  paintMult();
});

/* recherche */
const qInput = $('#q');
qInput.addEventListener('input', () => {
  state.q = qInput.value;
  $('#qClear').hidden = !state.q;
  paintGrid();
  $('.grid-wrap').scrollTop = 0;
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
      add(first.id, first.sizes ? first.sizes[0].label : null);
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
paintCats();
paintMult();
paint();
if (matchMedia('(min-width: 901px)').matches) qInput.focus();
