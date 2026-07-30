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
const catById = new Map(CATEGORIES.map(c => [c.id, c]));

/* vignette de la catégorie : photo découpée dans la carte, sinon emoji */
const thumb = (c, cls) => c.photo
  ? `<img class="${cls}" src="img/${c.photo}.jpg" alt="" width="320" height="320" loading="lazy" decoding="async">`
  : `<span class="${cls} ${cls}-emoji">${c.emoji}</span>`;

/* Photo d'un article.
   - `photo` numérique  -> identifiant Pexels, servi depuis leur CDN ;
   - `photo` texte      -> fichier local img/items/<nom>.jpg ;
   - sinon              -> photo de la catégorie, puis aplat à l'emoji.
   Le repli est câblé en dur sur l'élément (data-fb) : si le CDN ne
   répond pas, la carte retombe sur la vignette locale au lieu d'afficher
   une image cassée. */
const pexels = id =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;

function photoFor(it) {
  if (typeof it.photo === 'number') return pexels(it.photo);
  if (typeof it.photo === 'string') return `img/items/${it.photo}.jpg`;
  return null;
}
const catPhoto = it => {
  const c = catById.get(it.cat);
  return c && c.photo ? `img/${c.photo}.jpg` : '';
};

function mediaHTML(it) {
  const src = photoFor(it) || catPhoto(it);
  const fb = photoFor(it) ? catPhoto(it) : '';
  const c = catById.get(it.cat) || {};
  return src
    ? `<img class="c-img" src="${src}"${fb ? ` data-fb="${fb}"` : ''} alt="${it.name}"
            loading="lazy" decoding="async">`
    : `<div class="c-img c-img-ph" aria-hidden="true">${c.emoji || '🍽️'}</div>`;
}

/* une image qui ne charge pas retombe sur la vignette de sa catégorie,
   puis sur un aplat — jamais d'icône « image cassée » */
document.addEventListener('error', e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.classList.contains('c-img')) return;
  const fb = img.dataset.fb;
  if (fb) { img.dataset.fb = ''; img.src = fb; return; }
  const ph = document.createElement('div');
  ph.className = 'c-img c-img-ph';
  ph.setAttribute('aria-hidden', 'true');
  const card = img.closest('.card');
  const cat = card && catById.get((byId.get(card.dataset.card) || {}).cat);
  ph.textContent = (cat && cat.emoji) || '🍽️';
  img.replaceWith(ph);
}, true);

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
    <div class="stepper sm">
      <button data-act="dec" data-key="${k}" aria-label="Retirer un ${it.name}">−</button>
      <span class="qty">${qty}</span>
      <button data-act="inc" data-key="${k}" aria-label="Ajouter un ${it.name}">+</button>
    </div>` : `
    <button class="c-add" data-act="add" data-key="${k}" aria-label="Ajouter ${it.name}">+</button>`;

  return `
  <article class="card${qty > 0 ? ' in-bag' : ''}" data-card="${it.id}">
    <div class="c-txt">
      <h3>${it.name}</h3>
      ${it.desc ? `<p class="c-desc">${it.desc}</p>` : ''}
      ${it.note ? `<p class="c-note">${it.note}</p>` : ''}
      ${sizesHTML}
      <div class="c-price">${fmt(price)} <small>${CURRENCY}</small></div>
    </div>
    <div class="c-media">
      ${mediaHTML(it)}
      ${it.star ? '<span class="c-star">Spécial</span>' : ''}
      <div class="c-ctl">${control}</div>
    </div>
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

/* ------------------------- ticket de caisse ------------------------ */
let ticket = null;      // { num, date } figés à l'ouverture du ticket

function newTicket() {
  const d = new Date();
  return {
    num: 'A' + String(100 + Math.floor(Math.random() * 900)),
    date: d.toLocaleDateString('fr-FR'),
    heure: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };
}

/* les lignes du ticket, sous une forme utilisable par les deux rendus */
function ticketLines() {
  return [...cart].map(([k, q]) => {
    const { id, size } = parseKey(k);
    const unit = priceOf(id, size);
    return { q, name: nameOf(id), size, unit, sum: unit * q };
  });
}

function renderReceipt() {
  const L = ticketLines(), n = totalCount(), t = totalMillimes();
  $('#receipt').innerHTML = `
    <div class="r-head">
      <div class="r-name">PAVILLON</div>
      <div class="r-tag">Café · Restaurant</div>
    </div>
    <div class="r-rule"></div>
    <div class="r-meta">
      <span>${ticket.date}</span><span>${ticket.heure}</span>
    </div>
    <div class="r-meta">
      <span>Commande</span><span>N° ${ticket.num}</span>
    </div>
    <div class="r-rule"></div>
    <div class="r-cols"><span>Qté</span><span>Désignation</span><span>Montant</span></div>
    <div class="r-rule thin"></div>
    <ul class="r-lines">
      ${L.map(l => `
        <li>
          <span class="r-q">${l.q}</span>
          <span class="r-d">${l.name}${l.size ? ` <i>${l.size}</i>` : ''}
            ${l.q > 1 ? `<em>${fmt(l.unit)} × ${l.q}</em>` : ''}</span>
          <span class="r-a">${fmt(l.sum)}</span>
        </li>`).join('')}
    </ul>
    <div class="r-rule"></div>
    <div class="r-sub"><span>Articles</span><span>${n}</span></div>
    <div class="r-total"><span>TOTAL</span><span>${fmt(t)} <i>${CURRENCY}</i></span></div>
    <div class="r-rule dash"></div>
    <p class="r-foot">Merci de votre visite<br><span>Prix en dinars tunisiens</span></p>`;
}

/* Version texte, calibrée sur 32 colonnes comme un ticket thermique :
   à copier dans un SMS ou WhatsApp sans que ça parte en vrille. */
const W = 32;
function row(left, right) {
  const r = String(right);
  const l = String(left).slice(0, Math.max(0, W - r.length - 1));
  return l + ' '.repeat(Math.max(1, W - l.length - r.length)) + r;
}
const centre = s => ' '.repeat(Math.max(0, Math.floor((W - s.length) / 2))) + s;

function recapText() {
  const L = ticketLines(), out = [];
  out.push(centre('P A V I L L O N'), centre('Café · Restaurant'), '='.repeat(W));
  out.push(row(`${ticket.date} ${ticket.heure}`, `N° ${ticket.num}`), '-'.repeat(W));
  L.forEach(l => {
    const nom = l.name + (l.size ? ` (${l.size})` : '');
    const montant = fmt(l.sum);
    if (l.q > 1) {
      out.push(`${l.q}  ${nom}`.slice(0, W));
      out.push(row(`   ${fmt(l.unit)} × ${l.q}`, montant));
    } else if (`1  ${nom}`.length + montant.length + 1 <= W) {
      out.push(row(`1  ${nom}`, montant));
    } else {
      /* nom trop long : on ne le tronque pas au milieu, il prend sa ligne */
      out.push(`1  ${nom}`.slice(0, W));
      out.push(row('', montant));
    }
  });
  out.push('-'.repeat(W));
  out.push(row('Articles', totalCount()));
  out.push(row('TOTAL', `${fmt(totalMillimes())} ${CURRENCY}`));
  out.push('='.repeat(W), centre('Merci de votre visite'));
  return out.join('\n');
}

function showDone() {
  if (!cart.size) return;
  ticket = newTicket();
  renderReceipt();
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
