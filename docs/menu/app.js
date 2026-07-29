/* =====================================================================
   Pavillon — logique de commande
   Le panier est une Map : clé = "idArticle|taille", valeur = quantité.
   Tous les montants circulent en millimes (entiers) : aucun arrondi
   flottant ne peut fausser le total.
   ===================================================================== */
import { ITEMS, CATEGORIES, EXTRAS, fmt, CURRENCY } from './data.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const STORE = 'pavillon-panier-v1';
const byId = new Map(ITEMS.map(i => [i.id, i]));
const extraById = new Map(EXTRAS.map(e => [e.id, e]));

/** clé de ligne */
const key = (id, size) => (size ? `${id}|${size}` : id);
const parseKey = k => { const [id, size] = k.split('|'); return { id, size }; };

/* le prix d'un article, éventuellement pour une taille donnée */
function priceOf(id, size) {
  const it = byId.get(id) || extraById.get(id);
  if (!it) return 0;
  if (!it.sizes) return it.price;
  const s = it.sizes.find(x => x.label === size) || it.sizes[0];
  return s.price;
}
const nameOf = id => (byId.get(id) || extraById.get(id) || {}).name || id;

/* ------------------------------- état ------------------------------ */
let cart = new Map();
const chosenSize = new Map();   // id -> taille sélectionnée sur la carte

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || '[]');
    cart = new Map(raw.filter(([k, q]) =>
      Number.isFinite(q) && q > 0 && (byId.has(parseKey(k).id) || extraById.has(parseKey(k).id))));
  } catch (_) { cart = new Map(); }
}
const save = () => { try { localStorage.setItem(STORE, JSON.stringify([...cart])); } catch (_) {} };

const totalMillimes = () => [...cart].reduce((s, [k, q]) => {
  const { id, size } = parseKey(k); return s + priceOf(id, size) * q;
}, 0);
const totalCount = () => [...cart.values()].reduce((a, b) => a + b, 0);

/* ------------------------------ actions ---------------------------- */
function setQty(k, q) {
  if (q <= 0) cart.delete(k); else cart.set(k, Math.min(q, 99));
  save(); refresh();
}
const addOne = k => setQty(k, (cart.get(k) || 0) + 1);

/* ============================== rendu ============================== */
/* vignette de la catégorie : photo découpée dans la carte, sinon emoji */
const thumb = (c, cls) => c.photo
  ? `<img class="${cls}" src="img/${c.photo}.jpg" alt="" width="320" height="320" loading="lazy" decoding="async">`
  : `<span class="${cls} ${cls}-emoji">${c.emoji}</span>`;

function buildCats() {
  const wrap = $('#catsScroll');
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-pill" data-cat="${c.id}" aria-current="false">${thumb(c, 'pill-thumb')}${c.label}</button>`
  ).join('');
  wrap.addEventListener('click', e => {
    const b = e.target.closest('.cat-pill');
    if (!b) return;
    const el = document.getElementById('sec-' + b.dataset.cat);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function cardHTML(it) {
  const hasSizes = !!it.sizes;
  const size = hasSizes ? (chosenSize.get(it.id) || it.sizes[0].label) : null;
  const k = key(it.id, size);
  const qty = cart.get(k) || 0;
  const price = priceOf(it.id, size);

  const sizesHTML = hasSizes ? `
    <div class="sizes" role="group" aria-label="Taille">
      ${it.sizes.map(s => `<button data-size="${s.label}" data-item="${it.id}"
          aria-pressed="${s.label === size}">${s.label}</button>`).join('')}
    </div>` : '';

  const control = qty > 0 ? `
    <div class="stepper">
      <button data-act="dec" data-key="${k}" aria-label="Retirer un ${it.name}">−</button>
      <span class="qty">${qty}</span>
      <button data-act="inc" data-key="${k}" aria-label="Ajouter un ${it.name}">+</button>
    </div>` : `
    <button class="btn btn-blue" data-act="add" data-key="${k}">Ajouter</button>`;

  return `
  <article class="card${qty > 0 ? ' in-bag' : ''}" data-card="${it.id}">
    ${it.star ? '<span class="card-star">Spécial</span>' : ''}
    <h3>${it.name}</h3>
    ${it.desc ? `<p class="desc">${it.desc}</p>` : ''}
    ${it.note ? `<p class="note">${it.note}</p>` : ''}
    ${sizesHTML}
    <div class="price">${fmt(price)} <small>${CURRENCY}</small></div>
    <div class="add-row">${control}</div>
  </article>`;
}

function buildSections() {
  const host = $('#sections');
  host.innerHTML = CATEGORIES.map(c => {
    const items = ITEMS.filter(i => i.cat === c.id);
    const extras = EXTRAS.filter(e => e.cats.includes(c.id));
    if (!items.length && !extras.length) return '';
    return `
    <section class="section" id="sec-${c.id}" data-sec="${c.id}">
      <div class="section-head">
        ${thumb(c, 'sec-thumb')}
        <h2>${c.label}</h2>
        <span class="count">${items.length} article${items.length > 1 ? 's' : ''}</span>
      </div>
      <div class="grid">
        ${items.map(cardHTML).join('')}
        ${extras.map(cardHTML).join('')}
      </div>
    </section>`;
  }).join('');
}

/* on ne repeint qu'une carte : évite de recharger toute la page */
function repaintCard(itemId) {
  const it = byId.get(itemId) || extraById.get(itemId);
  const el = $(`.card[data-card="${itemId}"]`);
  if (!it || !el) return;
  el.outerHTML = cardHTML(it);
}

function refreshBadges() {
  const n = totalCount(), t = totalMillimes();
  const badge = $('#bagCount');
  badge.textContent = n; badge.hidden = n === 0;

  const sb = $('#stickybar');
  sb.hidden = n === 0;
  $('#sbCount').textContent = `${n} article${n > 1 ? 's' : ''}`;
  $('#sbTotal').textContent = `${fmt(t)} ${CURRENCY}`;
}

function renderBag() {
  const body = $('#bagBody'), foot = $('#bagFoot');
  if (!cart.size) {
    body.innerHTML = `<div class="bag-empty"><div class="big">🛒</div>
      <p>Votre panier est vide.</p></div>`;
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = [...cart].map(([k, q]) => {
    const { id, size } = parseKey(k);
    const unit = priceOf(id, size);
    return `
    <div class="line">
      <div class="line-main">
        <div class="line-name">${nameOf(id)}</div>
        <div class="line-meta">${size ? `Taille ${size} · ` : ''}${fmt(unit)} ${CURRENCY} l’unité</div>
      </div>
      <div class="line-right">
        <div class="line-price">${fmt(unit * q)}</div>
        <div class="stepper sm">
          <button data-act="dec" data-key="${k}" aria-label="Retirer">−</button>
          <span class="qty">${q}</span>
          <button data-act="inc" data-key="${k}" aria-label="Ajouter">+</button>
        </div>
      </div>
    </div>`;
  }).join('');

  const n = totalCount(), t = totalMillimes();
  foot.innerHTML = `
    <div class="total-row"><span class="lbl">Articles</span><span class="val">${n}</span></div>
    <div class="total-grand">
      <span class="lbl">Total</span>
      <span class="val">${fmt(t)} <span style="font-size:.5em;font-weight:600">${CURRENCY}</span></span>
    </div>
    <button class="btn btn-blue btn-full" id="checkout">Valider la commande</button>
    <button class="bag-clear" id="clearBag">Vider le panier</button>`;
}

function refresh() {
  refreshBadges();
  if (!$('#bag').hidden) renderBag();
}

/* =========================== interactions ========================== */
document.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  /* taille choisie sur une carte */
  if (btn.dataset.size) {
    chosenSize.set(btn.dataset.item, btn.dataset.size);
    repaintCard(btn.dataset.item);
    return;
  }

  const act = btn.dataset.act, k = btn.dataset.key;
  if (!act || !k) return;

  const cur = cart.get(k) || 0;
  if (act === 'add' || act === 'inc') setQty(k, cur + 1);
  if (act === 'dec') setQty(k, cur - 1);

  /* si le clic vient d'une carte, on repeint juste cette carte */
  const card = btn.closest('.card');
  if (card) repaintCard(card.dataset.card);
});

/* ouverture / fermeture du panier */
function openBag() {
  $('#bag').hidden = false; $('#scrim').hidden = false;
  document.body.style.overflow = 'hidden';
  renderBag();
  $('#bagClose').focus();
}
function closeBag() {
  $('#bag').hidden = true; $('#scrim').hidden = true;
  document.body.style.overflow = '';
}
$('#bagBtn').addEventListener('click', openBag);
$('#sbOpen').addEventListener('click', openBag);
$('#bagClose').addEventListener('click', closeBag);
$('#scrim').addEventListener('click', closeBag);
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('#done').hidden) return closeDone();
  if (!$('#bag').hidden) closeBag();
});

/* boutons du pied de panier (créés dynamiquement) */
$('#bagFoot').addEventListener('click', e => {
  if (e.target.id === 'clearBag') {
    cart.clear(); save(); refresh();
    $$('.card').forEach(c => repaintCard(c.dataset.card));
  }
  if (e.target.id === 'checkout') showDone();
});

/* ---------------------- récapitulatif de commande ------------------ */
function recapText() {
  const lines = [...cart].map(([k, q]) => {
    const { id, size } = parseKey(k);
    const unit = priceOf(id, size);
    const label = `${q}× ${nameOf(id)}${size ? ` (${size})` : ''}`;
    return `${label.padEnd(38, '.')} ${fmt(unit * q).padStart(8)} ${CURRENCY}`;
  });
  return [
    'PAVILLON — COMMANDE',
    '='.repeat(50),
    ...lines,
    '='.repeat(50),
    `${String(totalCount() + ' article(s)').padEnd(38, '.')} ${fmt(totalMillimes()).padStart(8)} ${CURRENCY}`
  ].join('\n');
}

function showDone() {
  if (!cart.size) return;
  $('#doneRecap').textContent = recapText();
  $('#done').hidden = false;
}
function closeDone() { $('#done').hidden = true; }
$('#doneClose').addEventListener('click', closeDone);
$('#done').addEventListener('click', e => { if (e.target.id === 'done') closeDone(); });

$('#doneCopy').addEventListener('click', async () => {
  const btn = $('#doneCopy'), txt = recapText();
  try {
    await navigator.clipboard.writeText(txt);
  } catch (_) {
    /* clipboard refusé (http, permission) : on retombe sur une sélection */
    const ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    ta.remove();
  }
  const old = btn.textContent;
  btn.textContent = 'Copié ✓';
  setTimeout(() => (btn.textContent = old), 1800);
});

/* ------------------- surlignage de la catégorie active ------------- */
function setupScrollSpy() {
  const pills = new Map($$('.cat-pill').map(p => [p.dataset.cat, p]));
  const scroller = $('#catsScroll');
  let active = null;

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const id = en.target.dataset.sec;
      if (id === active) return;
      active = id;
      pills.forEach((p, k) => p.setAttribute('aria-current', String(k === id)));
      const p = pills.get(id);
      if (p) {
        const left = p.offsetLeft - scroller.clientWidth / 2 + p.offsetWidth / 2;
        scroller.scrollTo({ left, behavior: 'smooth' });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  $$('.section').forEach(s => io.observe(s));
}

/* ============================= démarrage =========================== */
/* bandeau défilant de photos sous le hero */
function buildStrip() {
  const shots = CATEGORIES.filter(c => c.photo);
  if (!shots.length) return;
  const one = shots.map(c =>
    `<img src="img/${c.photo}.jpg" alt="${c.label}" width="320" height="320" loading="lazy" decoding="async">`
  ).join('');
  /* la liste est doublée pour que la boucle se referme sans saut */
  $('#strip').innerHTML = `<div class="strip-track">${one}${one}</div>`;
}

function boot() {
  load();
  buildCats();
  buildStrip();
  buildSections();
  refreshBadges();
  setupScrollSpy();

  $('#statItems').textContent = ITEMS.length;
  $('#statCats').textContent = CATEGORIES.length;
  const min = Math.min(...ITEMS.map(i => i.sizes ? Math.min(...i.sizes.map(s => s.price)) : i.price));
  $('#statMin').textContent = `${fmt(min)} ${CURRENCY}`;
}

boot();
