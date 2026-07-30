/* =====================================================================
   Carte du Pavillon — relevée depuis la carte plastifiée.
   Les prix sont en millimes (1 DT = 1000 millimes) pour éviter toute
   erreur d'arrondi en virgule flottante sur les totaux.
   ===================================================================== */

export const CURRENCY = 'DT';

/** 19000 -> "19.000" */
export const fmt = m => (m / 1000).toFixed(3);

/* `photo` : vignette découpée dans la photo de la carte du restaurant.
   Absente là où la carte ne permet rien d'exploitable :
     - pizza  : quatre lignes de prix imprimées couvrent toute la photo
     - brunch : le vernis plastifié est craquelé, l'image est illisible
     - omelette, spécial, petit-déj, thé, frappuccino : pas de photo sur
       la carte pour ces rubriques.
   Ces catégories gardent leur emoji.                                    */
export const CATEGORIES = [
  { id: 'pizza',      label: 'Pizza',        emoji: '🍕' },
  { id: 'sandwiches', label: 'Sandwiches',   emoji: '🥪', photo: 'sandwiches' },
  { id: 'makloub',    label: 'Makloub',      emoji: '🌯', photo: 'makloub' },
  { id: 'baguettes',  label: 'Baguettes',    emoji: '🥖', photo: 'baguettes' },
  { id: 'tacos',      label: 'Tacos',        emoji: '🌮', photo: 'tacos' },
  { id: 'salades',    label: 'Salades',      emoji: '🥗', photo: 'salades' },
  { id: 'briks',      label: 'Briks',        emoji: '🥟', photo: 'briks' },
  { id: 'plats',      label: 'Plats',        emoji: '🍽️', photo: 'plats' },
  { id: 'pates',      label: 'Pâtes & Ojja', emoji: '🍝', photo: 'pates' },
  { id: 'omelette',   label: 'Omelettes',    emoji: '🍳' },
  { id: 'special',    label: 'Spécial',      emoji: '⭐' },
  { id: 'petitdej',   label: 'Petit-déj',    emoji: '🥐' },
  { id: 'brunch',     label: 'Brunch',       emoji: '🥞' },
  { id: 'crepes',     label: 'Crêpes',       emoji: '🫓', photo: 'crepes' },
  { id: 'desserts',   label: 'Desserts',     emoji: '🍰', photo: 'desserts' },
  { id: 'cafe',       label: 'Café & Eau',   emoji: '☕', photo: 'cafe' },
  { id: 'icecoffee',  label: 'Ice Coffee',   emoji: '🧊', photo: 'icecoffee' },
  { id: 'the',        label: 'Thé & Ice Thé',emoji: '🍵' },
  { id: 'frappuccino',label: 'Frappuccino',  emoji: '🥤' },
  { id: 'smoothie',   label: 'Smoothie',     emoji: '🍹', photo: 'smoothie' },
  { id: 'milkshake',  label: 'Milk-shake',   emoji: '🥛', photo: 'milkshake' },
  { id: 'mojito',     label: 'Mojito',       emoji: '🍸', photo: 'mojito' },
  { id: 'jus',        label: 'Jus frais',    emoji: '🍊', photo: 'jus' }
];

/* Un article : { id, cat, name, price } ou, si plusieurs tailles :
   { id, cat, name, sizes: [{ label, price }] }                       */
export const ITEMS = [
  /* ------------------------------- PIZZA ------------------------------ */
  { id: 'pz-4saisons', photo: 27582711,  cat: 'pizza', name: '4 Saisons',     sizes: [{ label: 'L', price: 19000 }, { label: 'M', price: 17000 }] },
  { id: 'pz-marinara', photo: 14590497,  cat: 'pizza', name: 'Marinara',      sizes: [{ label: 'L', price: 17000 }, { label: 'M', price: 15000 }] },
  { id: 'pz-margherita', photo: 20115306,cat: 'pizza', name: 'Margherita',    sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 11000 }] },
  { id: 'pz-pepperoni', photo: 7813574, cat: 'pizza', name: 'Pepperoni',     sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 12000 }] },
  { id: 'pz-neptune', photo: 16014980,   cat: 'pizza', name: 'Neptune',       sizes: [{ label: 'L', price: 15000 }, { label: 'M', price: 13000 }] },
  { id: 'pz-vegeta', photo: 7172067,    cat: 'pizza', name: 'Végétarienne',  sizes: [{ label: 'L', price: 13000 }, { label: 'M', price: 11000 }] },
  { id: 'pz-4fromages', photo: 17800186, cat: 'pizza', name: '4 Fromages',    sizes: [{ label: 'L', price: 17000 }, { label: 'M', price: 15000 }] },
  { id: 'pz-escalope', photo: 2762938,  cat: 'pizza', name: 'Escalope',      sizes: [{ label: 'L', price: 16000 }, { label: 'M', price: 14000 }] },
  { id: 'pz-fdm', photo: 365459,       cat: 'pizza', name: 'Fruits de mer', sizes: [{ label: 'L', price: 26000 }, { label: 'M', price: 20000 }] },

  /* -------------------------- SANDWICHES TABOUNA ---------------------- */
  { id: 'sw-kafteji', photo: 17942170,   cat: 'sandwiches', name: 'Kafteji',           price: 6000 },
  { id: 'sw-thon', photo: 13770177,      cat: 'sandwiches', name: 'Thon',              price: 7000 },
  { id: 'sw-escgrill', photo: 17486821,  cat: 'sandwiches', name: 'Escalope grillée',  price: 8000 },
  { id: 'sw-escpanee', photo: 35438305,  cat: 'sandwiches', name: 'Escalope panée',    price: 9000 },
  { id: 'sw-merguez', photo: 1848975,   cat: 'sandwiches', name: 'Merguez',           price: 9000 },

  /* ------------------------------ MAKLOUB ----------------------------- */
  { id: 'mk-thon', photo: 6605198,      cat: 'makloub', name: 'Thon',             price: 8000 },
  { id: 'mk-escpanee', photo: 4955266,  cat: 'makloub', name: 'Escalope panée',   price: 10000 },
  { id: 'mk-escgrill', photo: 5837108,  cat: 'makloub', name: 'Escalope grillée', price: 9000 },
  { id: 'mk-merguez', photo: 2204769,   cat: 'makloub', name: 'Merguez',          price: 10000 },

  /* ------------------------- BAGUETTES FARCIES ------------------------ */
  { id: 'bg-thon', photo: 34593400,      cat: 'baguettes', name: 'Thon',             price: 9000 },
  { id: 'bg-escpanee', photo: 17498978,  cat: 'baguettes', name: 'Escalope panée',   price: 12000 },
  { id: 'bg-escgrill', photo: 6605340,  cat: 'baguettes', name: 'Escalope grillée', price: 11000 },
  { id: 'bg-merguez', photo: 2204769,   cat: 'baguettes', name: 'Merguez',          price: 12000 },

  /* ------------------------------- TACOS ------------------------------ */
  { id: 'tc-escpanee', photo: 4955266,  cat: 'tacos', name: 'Escalope panée',   price: 8000 },
  { id: 'tc-cordon', photo: 6605198,    cat: 'tacos', name: 'Cordon bleu',      price: 10000 },
  { id: 'tc-hachee', photo: 5837108,    cat: 'tacos', name: 'Viande hachée',    price: 10000 },
  { id: 'tc-escgrill', photo: 11586829,  cat: 'tacos', name: 'Escalope grillée', price: 8000 },

  /* ------------------------------ SALADES ----------------------------- */
  { id: 'sa-frite', photo: 1583891,     cat: 'salades', name: 'Frite',             price: 5000 },
  { id: 'sa-mechouia', photo: 1640777,  cat: 'salades', name: 'Slata Mechouia',    price: 5000 },
  { id: 'sa-tunisienne', photo: 406152,cat: 'salades', name: 'Salade Tunisienne', price: 5000 },
  { id: 'sa-cesar', photo: 8251537,     cat: 'salades', name: 'Salade César',      price: 15000 },

  /* ------------------------------- BRIKS ------------------------------ */
  { id: 'br-thon', photo: 14477873,      cat: 'briks', name: 'Brik Thon',     price: 4000 },
  { id: 'br-crevette', photo: 2474658,  cat: 'briks', name: 'Brik Crevette', price: 6000 },

  /* ------------------------------- PLATS ------------------------------ */
  { id: 'pl-cuisse', photo: 15058965,    cat: 'plats', name: 'Plat Cuisse Poulet',   price: 18000 },
  { id: 'pl-escgrill', photo: 106343,  cat: 'plats', name: 'Plat Escalope Grillée',price: 18000 },
  { id: 'pl-escpanee', photo: 5618848,  cat: 'plats', name: 'Plat Escalope Panée',  price: 20000 },
  { id: 'pl-dorade', photo: 11653557,    cat: 'plats', name: 'Plat Dorade & Loup',   price: 25000 },
  { id: 'pl-tastira', photo: 11213759,   cat: 'plats', name: 'Plat Tastira',         price: 7000 },
  { id: 'pl-tunisie', photo: 8818732,   cat: 'plats', name: 'Plat Tunisie',         price: 9000 },
  { id: 'pl-kafteji', photo: 4552980,   cat: 'plats', name: 'Plat Kafteji',         price: 7000 },
  { id: 'pl-lasagne', photo: 9650082,   cat: 'plats', name: 'Lasagne',              price: 20000 },

  /* ---------------------------- PÂTES & OJJA -------------------------- */
  { id: 'pa-spagfdm', photo: 13322666,   cat: 'pates', name: 'Spaghetti Fruits de mer',  price: 27000 },
  { id: 'pa-spagblanc', photo: 1438672, cat: 'pates', name: 'Spaghetti Sauce blanche',  price: 25000, desc: 'Escalope + champignons' },
  { id: 'pa-puttanesca', photo: 18411462,cat: 'pates', name: 'Spaghetti Puttanesca',     price: 12000 },
  { id: 'pa-ojjamerg', photo: 15578009,  cat: 'pates', name: 'Ojja Merguez',             price: 15000 },
  { id: 'pa-ojjafdm', photo: 18535643,   cat: 'pates', name: 'Ojja Fruits de mer',       price: 22000 },

  /* ----------------------------- OMELETTE ----------------------------- */
  { id: 'om-jambon', photo: 10934498,    cat: 'omelette', name: 'Omelette jambon fromage', price: 9000 },
  { id: 'om-thon', photo: 1437268,      cat: 'omelette', name: 'Omelette thon fromage',   price: 10000 },

  /* ------------------------------ SPÉCIAL ----------------------------- */
  { id: 'sp-symphonie', photo: 30882978, cat: 'special', name: 'Symphonie Fruits de mer', price: 60000, desc: 'Spécial Pavillon' },

  /* -------------------------- PETIT DÉJEUNER -------------------------- */
  { id: 'pd-classique', photo: 29086306, cat: 'petitdej', name: 'Classique', price: 10000,
    desc: 'Café au choix, eau 1/2 L, jus au choix, croissant, omelette' },
  { id: 'pd-kids', photo: 20204699,      cat: 'petitdej', name: 'Kids',      price: 10000 },

  /* ------------------------------ BRUNCH ------------------------------ */
  { id: 'bu-1p', photo: 3758053, cat: 'brunch', name: 'Brunch 1 personne',  price: 30000,
    desc: 'Omelette fromage & jambon, crêpe chocolat, jus au choix, café au choix, croissant, beurre, confiture, chamia, chocolat, eau 1/2 L' },
  { id: 'bu-2p', photo: 253580, cat: 'brunch', name: 'Brunch 2 personnes', price: 40000 },
  { id: 'bu-royale', photo: 4005229, cat: 'brunch', name: 'Brunch Royale Pavillon', price: 60000, star: true,
    desc: '2 personnes · Charcuterie, 2 crêpes au choix, fruits de saison, 2 jus au choix, panée (nuggets / calamar / cordon bleu), 2 croissants, ojja merguez, bsissa, fruits secs, confiture, beurre, Nutella, chamia, fraidoux, mini sandwich' },

  /* ------------------------------ CRÊPES ------------------------------ */
  { id: 'cr-said', photo: 3396955,      cat: 'crepes', name: 'Chocolat SAID',              price: 8000 },
  { id: 'cr-morgene', photo: 23833880,   cat: 'crepes', name: 'Morgène Noisette',           price: 10000 },
  { id: 'cr-nutella', photo: 5639254,   cat: 'crepes', name: 'Nutella / Spéculoos / Oreo', price: 11000 },
  { id: 'cr-brownies', photo: 132694,  cat: 'crepes', name: 'Brownies',                   price: 14000 },
  { id: 'cr-tagliatelles', photo: 28561583,cat:'crepes',name: 'Tagliatelles',               price: 15000 },
  { id: 'cr-dubai', photo: 3225506,     cat: 'crepes', name: 'Dubai',                      price: 16000 },
  { id: 'cr-thon', photo: 8963447,      cat: 'crepes', name: 'Thon Fromage',               price: 10000 },
  { id: 'cr-jambon', photo: 15110224,    cat: 'crepes', name: 'Jambon Fromage',             price: 9000 },
  { id: 'cr-pavillon', photo: 3928854,  cat: 'crepes', name: 'Pavillon Salé',              price: 15000 },

  /* ----------------------------- DESSERTS ----------------------------- */
  { id: 'de-cheesecake', photo: 9820,cat: 'desserts', name: 'Cheesecake',          price: 10000 },
  { id: 'de-americain', photo: 1860209, cat: 'desserts', name: 'Gâteaux Américain',   price: 12000 },
  { id: 'de-platfruits', photo: 8755094,cat: 'desserts', name: 'Plat fruits',         price: 40000, desc: '4 personnes' },
  { id: 'de-gauffre', photo: 11513598,   cat: 'desserts', name: 'Gauffre Pavillon',    price: 15000 },

  /* ---------------------------- CAFÉ & EAU ---------------------------- */
  { id: 'cf-express', photo: 414630,   cat: 'cafe', name: 'Express',          price: 2500 },
  { id: 'cf-capucin', photo: 9249368,   cat: 'cafe', name: 'Capucin',          price: 3000 },
  { id: 'cf-direct', photo: 2555644,    cat: 'cafe', name: 'Direct',           price: 3500 },
  { id: 'cf-american', photo: 23031405,  cat: 'cafe', name: 'American',         price: 3000 },
  { id: 'cf-chocolat', photo: 6341422,  cat: 'cafe', name: 'Chocolat au lait', price: 3000 },
  { id: 'cf-affogato', photo: 4790062,  cat: 'cafe', name: 'Affogato',         price: 8000 },
  { id: 'cf-macchiato', photo: 2638019, cat: 'cafe', name: 'Macchiato',        price: 5000 },
  { id: 'cf-turc', photo: 1660916,      cat: 'cafe', name: 'Café Turc',        price: 3000 },
  { id: 'cf-eau', photo: 4667179,       cat: 'cafe', name: 'Eau minérale',     price: 2500 },
  { id: 'cf-canette', photo: 3651044,   cat: 'cafe', name: 'Canette',          price: 3000 },
  { id: 'cf-energie', photo: 53452,   cat: 'cafe', name: 'Énergétique',      price: 8000 },

  /* ---------------------------- ICE COFFEE ---------------------------- */
  { id: 'ic-caramel', photo: 5305639,   cat: 'icecoffee', name: 'Caramel Latté',       price: 8000 },
  { id: 'ic-framboise', photo: 11136849, cat: 'icecoffee', name: 'Framboise Brownies',  price: 10000 },
  { id: 'ic-tiramisu', photo: 11100423,  cat: 'icecoffee', name: 'Tiramisu Latté',      price: 10000 },
  { id: 'ic-bluevanil', photo: 7487380, cat: 'icecoffee', name: 'Blue Vanilla Latté',  price: 10000 },
  { id: 'ic-spanish', photo: 10738363,   cat: 'icecoffee', name: 'Spanish Latté',       price: 10000 },
  { id: 'ic-nutella', photo: 79511,   cat: 'icecoffee', name: 'Nutella Latté',       price: 12000 },
  { id: 'ic-limesoda', photo: 6794879,  cat: 'icecoffee', name: 'Lime Soda',           price: 10000 },

  /* --------------------------- THÉ & ICE THÉ -------------------------- */
  { id: 'th-menthe', photo: 4051212,    cat: 'the', name: 'Thé vert menthe',   price: 2000 },
  { id: 'th-pignon', photo: 8330323,    cat: 'the', name: 'Thé vert pignon',   price: 6000 },
  { id: 'th-amande', photo: 8330322,    cat: 'the', name: 'Thé vert amande',   price: 4000 },
  { id: 'th-baklawa', photo: 8329310,   cat: 'the', name: 'Thé vert baklawa',  price: 8000 },
  { id: 'th-icepeche', photo: 5507724,  cat: 'the', name: 'Ice Thé Pêche',     price: 8000 },
  { id: 'th-icelime', photo: 5668200,   cat: 'the', name: 'Ice Thé Lime',      price: 8000 },

  /* --------------------------- FRAPPUCCINO ---------------------------- */
  { id: 'fr-caramel', photo: 850367,   cat: 'frappuccino', name: 'Caramel / Vanille', price: 10000 },
  { id: 'fr-pistache', photo: 261019,  cat: 'frappuccino', name: 'Pistache',          price: 10000 },
  { id: 'fr-nutella', photo: 16560563,   cat: 'frappuccino', name: 'Nutella / Lotus',   price: 12000 },

  /* ----------------------------- SMOOTHIE ----------------------------- */
  { id: 'sm-pasteque', photo: 193037,  cat: 'smoothie', name: 'Pastèque',        price: 8000 },
  { id: 'sm-bananeam', photo: 775032,  cat: 'smoothie', name: 'Banane Amande',   price: 12000 },
  { id: 'sm-fraise', photo: 845552,    cat: 'smoothie', name: 'Fraise',          price: 8000 },
  { id: 'sm-kiwi', photo: 28617321,      cat: 'smoothie', name: 'Kiwi',            price: 12000 },
  { id: 'sm-pavillon', photo: 3342301,  cat: 'smoothie', name: 'Pavillon',        price: 14000 },

  /* ---------------------------- MILK-SHAKE ---------------------------- */
  { id: 'ms-vanfraise', photo: 10066814, cat: 'milkshake', name: 'Vanille Fraise',     price: 10000 },
  { id: 'ms-chocban', photo: 3727250,   cat: 'milkshake', name: 'Chocolat Banane',    price: 10000 },
  { id: 'ms-pistnois', photo: 11381485,  cat: 'milkshake', name: 'Pistache Noisette',  price: 10000 },
  { id: 'ms-nutella', photo: 18133821,   cat: 'milkshake', name: 'Nutella',            price: 12000 },
  { id: 'ms-morgene', photo: 5947038,   cat: 'milkshake', name: 'Morgène',            price: 10000 },
  { id: 'ms-pavillon', photo: 5327015,  cat: 'milkshake', name: 'Pavillon',           price: 14000 },

  /* ------------------------------ MOJITO ------------------------------ */
  { id: 'mo-classique', photo: 30591638, cat: 'mojito', name: 'Classique / Blue',              price: 8000 },
  { id: 'mo-fruitsbois', photo: 30412118,cat: 'mojito', name: 'Red Fruits de bois / Framboise',price: 8000 },
  { id: 'mo-pina', photo: 1187766,      cat: 'mojito', name: 'Piña Colada',                   price: 8000 },
  { id: 'mo-orange', photo: 7259040,    cat: 'mojito', name: 'Blue / Red Orange',             price: 10000 },
  { id: 'mo-energie', photo: 4021987,   cat: 'mojito', name: 'Énergétique',                   price: 14000 },

  /* ----------------------------- JUS FRAIS ---------------------------- */
  { id: 'ju-laitpoule', photo: 3558, cat: 'jus', name: 'Lait de poule',    price: 12000 },
  { id: 'ju-fraise', photo: 2994,    cat: 'jus', name: 'Fraise',           price: 6000 },
  { id: 'ju-citron', photo: 96620,    cat: 'jus', name: 'Citron',           price: 5000 },
  { id: 'ju-fraisecit', photo: 4134388, cat: 'jus', name: 'Fraise Citron',    price: 6000 },
  { id: 'ju-kiwiframb', photo: 8845008, cat: 'jus', name: 'Kiwi / Framboise', price: 12000 },
  { id: 'ju-degrade', photo: 11832019,   cat: 'jus', name: 'Dégradé',          price: 8000 }
];

/* Suppléments proposés sur les crêpes */
export const EXTRAS = [
  { id: 'ex-banane',    name: 'Supplément banane',      price: 2000, cats: ['crepes'] },
  { id: 'ex-fruitssecs',name: 'Supplément fruits secs', price: 2000, cats: ['crepes'] }
];
