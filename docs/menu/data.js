/* =====================================================================
   Carte du Pavillon — relevée depuis la carte plastifiée.
   Les prix sont en millimes (1 DT = 1000 millimes) pour éviter toute
   erreur d'arrondi en virgule flottante sur les totaux.
   ===================================================================== */

export const CURRENCY = 'DT';

/** 19000 -> "19.000" */
export const fmt = m => (m / 1000).toFixed(3);

export const CATEGORIES = [
  { id: 'pizza',      label: 'Pizza',        emoji: '🍕' },
  { id: 'sandwiches', label: 'Sandwiches',   emoji: '🥪' },
  { id: 'makloub',    label: 'Makloub',      emoji: '🌯' },
  { id: 'baguettes',  label: 'Baguettes',    emoji: '🥖' },
  { id: 'tacos',      label: 'Tacos',        emoji: '🌮' },
  { id: 'salades',    label: 'Salades',      emoji: '🥗' },
  { id: 'briks',      label: 'Briks',        emoji: '🥟' },
  { id: 'plats',      label: 'Plats',        emoji: '🍽️' },
  { id: 'pates',      label: 'Pâtes & Ojja', emoji: '🍝' },
  { id: 'omelette',   label: 'Omelettes',    emoji: '🍳' },
  { id: 'special',    label: 'Spécial',      emoji: '⭐' },
  { id: 'petitdej',   label: 'Petit-déj',    emoji: '🥐' },
  { id: 'brunch',     label: 'Brunch',       emoji: '🥞' },
  { id: 'crepes',     label: 'Crêpes',       emoji: '🫓' },
  { id: 'desserts',   label: 'Desserts',     emoji: '🍰' },
  { id: 'cafe',       label: 'Café & Eau',   emoji: '☕' },
  { id: 'icecoffee',  label: 'Ice Coffee',   emoji: '🧊' },
  { id: 'the',        label: 'Thé & Ice Thé',emoji: '🍵' },
  { id: 'frappuccino',label: 'Frappuccino',  emoji: '🥤' },
  { id: 'smoothie',   label: 'Smoothie',     emoji: '🍹' },
  { id: 'milkshake',  label: 'Milk-shake',   emoji: '🥛' },
  { id: 'mojito',     label: 'Mojito',       emoji: '🍸' },
  { id: 'jus',        label: 'Jus frais',    emoji: '🍊' }
];

/* Un article : { id, cat, name, price } ou, si plusieurs tailles :
   { id, cat, name, sizes: [{ label, price }] }                       */
export const ITEMS = [
  /* ------------------------------- PIZZA ------------------------------ */
  { id: 'pz-4saisons',  cat: 'pizza', name: '4 Saisons',     sizes: [{ label: 'L', price: 19000 }, { label: 'M', price: 17000 }] },
  { id: 'pz-marinara',  cat: 'pizza', name: 'Marinara',      sizes: [{ label: 'L', price: 17000 }, { label: 'M', price: 15000 }] },
  { id: 'pz-margherita',cat: 'pizza', name: 'Margherita',    sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 11000 }] },
  { id: 'pz-pepperoni', cat: 'pizza', name: 'Pepperoni',     sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 12000 }] },
  { id: 'pz-neptune',   cat: 'pizza', name: 'Neptune',       sizes: [{ label: 'L', price: 15000 }, { label: 'M', price: 13000 }] },
  { id: 'pz-vegeta',    cat: 'pizza', name: 'Végétarienne',  sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 11000 }] },
  { id: 'pz-4fromages', cat: 'pizza', name: '4 Fromages',    sizes: [{ label: 'L', price: 17000 }, { label: 'M', price: 15000 }] },
  { id: 'pz-escalope',  cat: 'pizza', name: 'Escalope',      sizes: [{ label: 'L', price: 16000 }, { label: 'M', price: 14000 }] },
  { id: 'pz-fdm',       cat: 'pizza', name: 'Fruits de mer', sizes: [{ label: 'L', price: 26000 }],
    note: 'Le prix M était masqué par une photo sur la carte' },

  /* -------------------------- SANDWICHES TABOUNA ---------------------- */
  { id: 'sw-kafteji',   cat: 'sandwiches', name: 'Kafteji',           price: 6000 },
  { id: 'sw-thon',      cat: 'sandwiches', name: 'Thon',              price: 7000 },
  { id: 'sw-escgrill',  cat: 'sandwiches', name: 'Escalope grillée',  price: 8000 },
  { id: 'sw-escpanee',  cat: 'sandwiches', name: 'Escalope panée',    price: 9000 },
  { id: 'sw-merguez',   cat: 'sandwiches', name: 'Merguez',           price: 9000 },

  /* ------------------------------ MAKLOUB ----------------------------- */
  { id: 'mk-thon',      cat: 'makloub', name: 'Thon',             price: 8000 },
  { id: 'mk-escpanee',  cat: 'makloub', name: 'Escalope panée',   price: 10000 },
  { id: 'mk-escgrill',  cat: 'makloub', name: 'Escalope grillée', price: 9000 },
  { id: 'mk-merguez',   cat: 'makloub', name: 'Merguez',          price: 10000 },

  /* ------------------------- BAGUETTES FARCIES ------------------------ */
  { id: 'bg-thon',      cat: 'baguettes', name: 'Thon',             price: 9000 },
  { id: 'bg-escpanee',  cat: 'baguettes', name: 'Escalope panée',   price: 12000 },
  { id: 'bg-escgrill',  cat: 'baguettes', name: 'Escalope grillée', price: 11000 },
  { id: 'bg-merguez',   cat: 'baguettes', name: 'Merguez',          price: 12000 },

  /* ------------------------------- TACOS ------------------------------ */
  { id: 'tc-escpanee',  cat: 'tacos', name: 'Escalope panée',   price: 8000 },
  { id: 'tc-cordon',    cat: 'tacos', name: 'Cordon bleu',      price: 10000 },
  { id: 'tc-hachee',    cat: 'tacos', name: 'Viande hachée',    price: 10000 },
  { id: 'tc-escgrill',  cat: 'tacos', name: 'Escalope grillée', price: 8000 },

  /* ------------------------------ SALADES ----------------------------- */
  { id: 'sa-frite',     cat: 'salades', name: 'Frite',             price: 5000 },
  { id: 'sa-mechouia',  cat: 'salades', name: 'Slata Mechouia',    price: 5000 },
  { id: 'sa-tunisienne',cat: 'salades', name: 'Salade Tunisienne', price: 5000 },
  { id: 'sa-cesar',     cat: 'salades', name: 'Salade César',      price: 15000 },

  /* ------------------------------- BRIKS ------------------------------ */
  { id: 'br-thon',      cat: 'briks', name: 'Brik Thon',     price: 4000 },
  { id: 'br-crevette',  cat: 'briks', name: 'Brik Crevette', price: 6000 },

  /* ------------------------------- PLATS ------------------------------ */
  { id: 'pl-cuisse',    cat: 'plats', name: 'Plat Cuisse Poulet',   price: 18000 },
  { id: 'pl-escgrill',  cat: 'plats', name: 'Plat Escalope Grillée',price: 18000 },
  { id: 'pl-escpanee',  cat: 'plats', name: 'Plat Escalope Panée',  price: 20000 },
  { id: 'pl-dorade',    cat: 'plats', name: 'Plat Dorade & Loup',   price: 25000 },
  { id: 'pl-tastira',   cat: 'plats', name: 'Plat Tastira',         price: 7000 },
  { id: 'pl-tunisie',   cat: 'plats', name: 'Plat Tunisie',         price: 9000 },
  { id: 'pl-kafteji',   cat: 'plats', name: 'Plat Kafteji',         price: 7000 },
  { id: 'pl-lasagne',   cat: 'plats', name: 'Lasagne',              price: 20000 },

  /* ---------------------------- PÂTES & OJJA -------------------------- */
  { id: 'pa-spagfdm',   cat: 'pates', name: 'Spaghetti Fruits de mer',  price: 27000 },
  { id: 'pa-spagblanc', cat: 'pates', name: 'Spaghetti Sauce blanche',  price: 25000, desc: 'Escalope + champignons' },
  { id: 'pa-puttanesca',cat: 'pates', name: 'Spaghetti Puttanesca',     price: 12000 },
  { id: 'pa-ojjamerg',  cat: 'pates', name: 'Ojja Merguez',             price: 15000 },
  { id: 'pa-ojjafdm',   cat: 'pates', name: 'Ojja Fruits de mer',       price: 22000 },

  /* ----------------------------- OMELETTE ----------------------------- */
  { id: 'om-jambon',    cat: 'omelette', name: 'Omelette jambon fromage', price: 9000 },
  { id: 'om-thon',      cat: 'omelette', name: 'Omelette thon fromage',   price: 10000 },

  /* ------------------------------ SPÉCIAL ----------------------------- */
  { id: 'sp-symphonie', cat: 'special', name: 'Symphonie Fruits de mer', price: 60000, desc: 'Spécial Pavillon' },

  /* -------------------------- PETIT DÉJEUNER -------------------------- */
  { id: 'pd-classique', cat: 'petitdej', name: 'Classique', price: 10000,
    desc: 'Café au choix, eau 1/2 L, jus au choix, croissant, omelette' },
  { id: 'pd-kids',      cat: 'petitdej', name: 'Kids',      price: 10000 },

  /* ------------------------------ BRUNCH ------------------------------ */
  { id: 'bu-1p', cat: 'brunch', name: 'Brunch 1 personne',  price: 30000,
    desc: 'Omelette fromage & jambon, crêpe chocolat, jus au choix, café au choix, croissant, beurre, confiture, chamia, chocolat, eau 1/2 L' },
  { id: 'bu-2p', cat: 'brunch', name: 'Brunch 2 personnes', price: 40000 },
  { id: 'bu-royale', cat: 'brunch', name: 'Brunch Royale Pavillon', price: 60000, star: true,
    desc: '2 personnes · Charcuterie, 2 crêpes au choix, fruits de saison, 2 jus au choix, panée (nuggets / calamar / cordon bleu), 2 croissants, ojja merguez, bsissa, fruits secs, confiture, beurre, Nutella, chamia, fraidoux, mini sandwich' },

  /* ------------------------------ CRÊPES ------------------------------ */
  { id: 'cr-said',      cat: 'crepes', name: 'Chocolat SAID',              price: 8000 },
  { id: 'cr-morgene',   cat: 'crepes', name: 'Morgène Noisette',           price: 10000 },
  { id: 'cr-nutella',   cat: 'crepes', name: 'Nutella / Spéculoos / Oreo', price: 11000 },
  { id: 'cr-brownies',  cat: 'crepes', name: 'Brownies',                   price: 14000 },
  { id: 'cr-tagliatelles',cat:'crepes',name: 'Tagliatelles',               price: 15000 },
  { id: 'cr-dubai',     cat: 'crepes', name: 'Dubai',                      price: 16000 },
  { id: 'cr-thon',      cat: 'crepes', name: 'Thon Fromage',               price: 10000 },
  { id: 'cr-jambon',    cat: 'crepes', name: 'Jambon Fromage',             price: 9000 },
  { id: 'cr-pavillon',  cat: 'crepes', name: 'Pavillon Salé',              price: 15000 },

  /* ----------------------------- DESSERTS ----------------------------- */
  { id: 'de-cheesecake',cat: 'desserts', name: 'Cheesecake',          price: 10000 },
  { id: 'de-americain', cat: 'desserts', name: 'Gâteaux Américain',   price: 12000 },
  { id: 'de-platfruits',cat: 'desserts', name: 'Plat fruits',         price: 40000, desc: '4 personnes' },
  { id: 'de-gauffre',   cat: 'desserts', name: 'Gauffre Pavillon',    price: 15000 },

  /* ---------------------------- CAFÉ & EAU ---------------------------- */
  { id: 'cf-express',   cat: 'cafe', name: 'Express',          price: 2500 },
  { id: 'cf-capucin',   cat: 'cafe', name: 'Capucin',          price: 3000 },
  { id: 'cf-direct',    cat: 'cafe', name: 'Direct',           price: 3500 },
  { id: 'cf-american',  cat: 'cafe', name: 'American',         price: 3000 },
  { id: 'cf-chocolat',  cat: 'cafe', name: 'Chocolat au lait', price: 3000 },
  { id: 'cf-affogato',  cat: 'cafe', name: 'Affogato',         price: 8000 },
  { id: 'cf-macchiato', cat: 'cafe', name: 'Macchiato',        price: 5000 },
  { id: 'cf-turc',      cat: 'cafe', name: 'Café Turc',        price: 3000 },
  { id: 'cf-eau',       cat: 'cafe', name: 'Eau minérale',     price: 2500 },
  { id: 'cf-canette',   cat: 'cafe', name: 'Canette',          price: 3000 },
  { id: 'cf-energie',   cat: 'cafe', name: 'Énergétique',      price: 8000 },

  /* ---------------------------- ICE COFFEE ---------------------------- */
  { id: 'ic-caramel',   cat: 'icecoffee', name: 'Caramel Latté',       price: 8000 },
  { id: 'ic-framboise', cat: 'icecoffee', name: 'Framboise Brownies',  price: 10000 },
  { id: 'ic-tiramisu',  cat: 'icecoffee', name: 'Tiramisu Latté',      price: 10000 },
  { id: 'ic-bluevanil', cat: 'icecoffee', name: 'Blue Vanilla Latté',  price: 10000 },
  { id: 'ic-spanish',   cat: 'icecoffee', name: 'Spanish Latté',       price: 10000 },
  { id: 'ic-nutella',   cat: 'icecoffee', name: 'Nutella Latté',       price: 12000 },
  { id: 'ic-limesoda',  cat: 'icecoffee', name: 'Lime Soda',           price: 10000 },

  /* --------------------------- THÉ & ICE THÉ -------------------------- */
  { id: 'th-menthe',    cat: 'the', name: 'Thé vert menthe',   price: 2000 },
  { id: 'th-pignon',    cat: 'the', name: 'Thé vert pignon',   price: 6000 },
  { id: 'th-amande',    cat: 'the', name: 'Thé vert amande',   price: 4000 },
  { id: 'th-baklawa',   cat: 'the', name: 'Thé vert baklawa',  price: 8000 },
  { id: 'th-icepeche',  cat: 'the', name: 'Ice Thé Pêche',     price: 8000 },
  { id: 'th-icelime',   cat: 'the', name: 'Ice Thé Lime',      price: 8000 },

  /* --------------------------- FRAPPUCCINO ---------------------------- */
  { id: 'fr-caramel',   cat: 'frappuccino', name: 'Caramel / Vanille', price: 10000 },
  { id: 'fr-pistache',  cat: 'frappuccino', name: 'Pistache',          price: 10000 },
  { id: 'fr-nutella',   cat: 'frappuccino', name: 'Nutella / Lotus',   price: 12000 },

  /* ----------------------------- SMOOTHIE ----------------------------- */
  { id: 'sm-pasteque',  cat: 'smoothie', name: 'Pastèque',        price: 8000 },
  { id: 'sm-bananeam',  cat: 'smoothie', name: 'Banane Amande',   price: 12000 },
  { id: 'sm-fraise',    cat: 'smoothie', name: 'Fraise',          price: 8000 },
  { id: 'sm-kiwi',      cat: 'smoothie', name: 'Kiwi',            price: 12000 },
  { id: 'sm-pavillon',  cat: 'smoothie', name: 'Pavillon',        price: 14000 },

  /* ---------------------------- MILK-SHAKE ---------------------------- */
  { id: 'ms-vanfraise', cat: 'milkshake', name: 'Vanille Fraise',     price: 10000 },
  { id: 'ms-chocban',   cat: 'milkshake', name: 'Chocolat Banane',    price: 10000 },
  { id: 'ms-pistnois',  cat: 'milkshake', name: 'Pistache Noisette',  price: 10000 },
  { id: 'ms-nutella',   cat: 'milkshake', name: 'Nutella',            price: 12000 },
  { id: 'ms-morgene',   cat: 'milkshake', name: 'Morgène',            price: 10000 },
  { id: 'ms-pavillon',  cat: 'milkshake', name: 'Pavillon',           price: 14000 },

  /* ------------------------------ MOJITO ------------------------------ */
  { id: 'mo-classique', cat: 'mojito', name: 'Classique / Blue',              price: 8000 },
  { id: 'mo-fruitsbois',cat: 'mojito', name: 'Red Fruits de bois / Framboise',price: 8000 },
  { id: 'mo-pina',      cat: 'mojito', name: 'Piña Colada',                   price: 8000 },
  { id: 'mo-orange',    cat: 'mojito', name: 'Blue / Red Orange',             price: 10000 },
  { id: 'mo-energie',   cat: 'mojito', name: 'Énergétique',                   price: 14000 },

  /* ----------------------------- JUS FRAIS ---------------------------- */
  { id: 'ju-laitpoule', cat: 'jus', name: 'Lait de poule',    price: 12000 },
  { id: 'ju-fraise',    cat: 'jus', name: 'Fraise',           price: 6000 },
  { id: 'ju-citron',    cat: 'jus', name: 'Citron',           price: 5000 },
  { id: 'ju-fraisecit', cat: 'jus', name: 'Fraise Citron',    price: 6000 },
  { id: 'ju-kiwiframb', cat: 'jus', name: 'Kiwi / Framboise', price: 12000 },
  { id: 'ju-degrade',   cat: 'jus', name: 'Dégradé',          price: 8000 }
];

/* Suppléments proposés sur les crêpes */
export const EXTRAS = [
  { id: 'ex-banane',    name: 'Supplément banane',      price: 2000, cats: ['crepes'] },
  { id: 'ex-fruitssecs',name: 'Supplément fruits secs', price: 2000, cats: ['crepes'] }
];
