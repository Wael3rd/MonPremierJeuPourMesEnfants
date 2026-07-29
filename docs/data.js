/* =====================================================================
   Les Grandes Inventions — données
   Chaque invention propose 3 niveaux de lecture :
     - cm2    : 7 ans, entrée en CM2
     - cinq   : 12 ans, entrée en 5e
     - grands : les parents (40 ans)
   ===================================================================== */

export const ERAS = [
  { id: 'prehistoire', label: 'Préhistoire',            color: '#e2725b', from: -500000, to: -3600 },
  { id: 'antiquite',   label: 'Antiquité',              color: '#d8a03d', from: -3600,   to: 500 },
  { id: 'medieval',    label: 'Moyen Âge & Renaissance',color: '#6fa287', from: 500,     to: 1700 },
  { id: 'industrielle',label: 'Révolution industrielle',color: '#5b8bd0', from: 1700,    to: 1900 },
  { id: 'moderne',     label: 'Époque moderne',         color: '#a96fe0', from: 1900,    to: 1970 },
  { id: 'numerique',   label: 'Ère numérique',          color: '#2ec9b0', from: 1970,    to: 2030 }
];

export const INVENTIONS = [
  /* ------------------------------------------------------------------ */
  {
    id: 'feu',
    name: 'La maîtrise du feu',
    year: -400000,
    yearLabel: '≈ 400 000 av. J.-C.',
    era: 'prehistoire',
    icon: '🔥',
    who: 'Homo erectus',
    where: 'Afrique de l’Est, puis partout',
    tagline: 'La première fois qu’un être vivant a fabriqué sa propre lumière.',
    tags: ['Survie', 'Énergie'],
    levels: {
      cm2: "Avant, quand la nuit tombait, il faisait noir et froid, et les animaux dangereux rôdaient. Un jour, des hommes préhistoriques ont compris comment garder le feu allumé, puis comment l’allumer eux‑mêmes en frottant très fort deux morceaux de bois ou en cognant des pierres. Le feu, ça change tout : ça réchauffe, ça éclaire, ça fait peur aux animaux, et surtout ça permet de faire cuire la viande. La viande cuite est plus facile à mâcher et à digérer !",
      cinq: "Maîtriser le feu, ce n’est pas seulement le trouver après un orage : c’est savoir le produire, le transporter et l’entretenir. Cette maîtrise apparaît progressivement avec Homo erectus, il y a plusieurs centaines de milliers d’années. La cuisson des aliments libère beaucoup plus d’énergie qu’un aliment cru et détruit une partie des parasites. Le feu allonge aussi la journée : autour du foyer, on fabrique des outils, on se raconte des choses. C’est probablement là que naissent les premières veillées, donc une grande part de la culture humaine.",
      grands: "L’hypothèse du « cooking ape » (Richard Wrangham) fait de la cuisson un facteur d’encéphalisation : la pré‑digestion externe des aliments réduit le coût métabolique du tube digestif et libère de l’énergie pour un cerveau qui consomme ~20 % du métabolisme de base. Le feu est aussi la première technologie d’externalisation d’un processus chimique. Les traces les plus solidement datées (Wonderwerk, Afrique du Sud) remontent à ≈ 1 Ma, mais un usage habituel et contrôlé n’est attesté qu’autour de 400 000 ans. Toute notre trajectoire énergétique — charbon, vapeur, moteur, centrale — est la continuation directe de ce geste."
    },
    fact: "Un foyer préhistorique bien entretenu pouvait rester allumé pendant des mois, voire des années.",
    impact: ['Cuisson des aliments', 'Protection contre les prédateurs', 'Vie sociale nocturne', 'Métallurgie plus tard']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'roue',
    name: 'La roue',
    year: -3500,
    yearLabel: '≈ 3500 av. J.-C.',
    era: 'antiquite',
    icon: '🛞',
    who: 'Artisans de Mésopotamie',
    where: 'Mésopotamie (Irak actuel)',
    tagline: 'Le cercle qui a mis le monde en mouvement.',
    tags: ['Transport', 'Mécanique'],
    levels: {
      cm2: "Pousser une grosse pierre par terre, c’est très dur : elle frotte. Mais si tu la poses sur des rouleaux, elle glisse toute seule ! Des gens de Mésopotamie ont eu une idée géniale : fixer un rouleau au milieu, avec une tige — l’axe — pour qu’il tourne sur place. C’était la roue. D’un coup, on a pu tirer des charrettes pleines de blé avec un seul âne. La roue sert encore partout : vélos, voitures, valises, et même dans les machines à laver !",
      cinq: "La roue seule ne sert à rien : l’invention réelle, c’est le couple roue + essieu, qui transforme le frottement de glissement en frottement de roulement, bien plus faible. Fait surprenant, elle apparaît d’abord comme tour de potier avant de servir au transport. Elle exige un savoir‑faire précis : l’axe doit être bien rond et bien centré, sinon la roue bloque. C’est pour cela que les civilisations sans métallurgie fine, ou sans grands animaux de trait, ne l’ont pas développée pour le transport — les Incas, par exemple, connaissaient le cercle mais n’avaient ni chevaux ni bœufs.",
      grands: "La roue est le prototype de toute machine tournante : palier, réducteur, poulie, turbine, rotor d’alternateur. Elle introduit le rendement mécanique comme concept opératoire — le coefficient de roulement de l’acier sur l’acier est environ 1000 fois inférieur au frottement statique bois/sol. Son adoption est fortement conditionnée par les infrastructures : sans routes plates, la roue est inférieure au bât. Rome l’a compris et a construit 80 000 km de voies. Aujourd’hui encore, un pneu radial reste l’un des objets manufacturés les plus optimisés au monde."
    },
    fact: "La roue a d’abord servi à tourner de l’argile (tour de potier) environ 300 ans avant de servir à rouler.",
    impact: ['Transport de marchandises', 'Poulies et engrenages', 'Moulins', 'Toute la mécanique moderne']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'ecriture',
    name: 'L’écriture',
    year: -3300,
    yearLabel: '≈ 3300 av. J.-C.',
    era: 'antiquite',
    icon: '𓂀',
    who: 'Scribes sumériens',
    where: 'Ourouk, Sumer',
    tagline: 'La mémoire qui sort du cerveau et se pose sur l’argile.',
    tags: ['Information', 'Culture'],
    levels: {
      cm2: "Imagine que tu ne puisses rien noter : ni liste de courses, ni devoirs, ni message à ton copain. Tout devrait tenir dans ta tête ! Il y a très longtemps, des marchands avaient trop de choses à retenir : combien de sacs de blé, combien de moutons… Alors ils ont dessiné de petits signes dans de l’argile molle avec un roseau taillé. Ces signes racontaient les nombres et les objets. C’est comme ça qu’est née l’écriture — et l’Histoire a commencé, parce qu’on pouvait enfin se souvenir de tout.",
      cinq: "L’écriture cunéiforme naît à Sumer de besoins comptables : des jetons d’argile représentant des marchandises sont d’abord enfermés dans des boules scellées, puis on prend l’habitude d’imprimer leur forme à la surface — et le dessin remplace l’objet. On passe ensuite des pictogrammes (un dessin = une chose) aux signes phonétiques (un signe = un son), ce qui permet enfin d’écrire des noms propres, des lois, des poèmes. Ce basculement est décisif : avec ~30 signes alphabétiques, on peut tout écrire, alors qu’il en fallait des centaines auparavant.",
      grands: "L’écriture est la première technologie de stockage d’information hors du système nerveux : elle rend le savoir asynchrone (transmissible dans le temps) et non‑rival (copiable sans perte). Elle permet aussi la comptabilité, donc l’État, la fiscalité et le droit écrit — la frontière conventionnelle entre préhistoire et histoire n’est pas anodine. Trois foyers d’invention indépendants sont attestés (Sumer, Chine, Mésoamérique), ce qui suggère une réponse convergente à la complexification sociale. Le codage binaire de vos fichiers appartient à la même famille d’idées : rendre le sens manipulable par un support matériel."
    },
    fact: "Le premier auteur connu de l’Histoire dont on a le nom est une femme : Enheduanna, prêtresse et poétesse, vers 2300 av. J.-C.",
    impact: ['Lois et contrats', 'Transmission du savoir', 'Littérature', 'Comptabilité et États']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'papier',
    name: 'Le papier',
    year: 105,
    yearLabel: '105 apr. J.-C.',
    era: 'antiquite',
    icon: '📜',
    who: 'Cai Lun',
    where: 'Chine des Han',
    tagline: 'Un support léger, pas cher, et fabriqué à partir de déchets.',
    tags: ['Information', 'Matériaux'],
    levels: {
      cm2: "Avant le papier, pour écrire, il fallait de la pierre (très lourde), de l’argile (ça casse) ou de la peau d’animal (très cher). En Chine, un homme nommé Cai Lun a eu une idée : prendre de vieux chiffons, de l’écorce et des filets de pêche usés, les faire bouillir jusqu’à obtenir une bouillie, puis étaler cette bouillie très fine sur un tamis pour la faire sécher. En séchant, ça donne une feuille ! Légère, souple, pas chère : le papier.",
      cinq: "Le papier est une nappe de fibres de cellulose enchevêtrées : on désagrège des végétaux dans l’eau, on répartit la pâte sur une forme (un tamis), on presse et on sèche. Les fibres s’accrochent entre elles par liaisons hydrogène — aucune colle n’est nécessaire. Le procédé quitte la Chine très lentement : il atteint le monde arabe après la bataille de Talas (751), où des artisans chinois auraient été faits prisonniers, puis l’Europe via l’Espagne au XIIᵉ siècle. Sans papier bon marché, l’imprimerie n’aurait servi à rien.",
      grands: "Le papier fait chuter le coût marginal du support d’écriture d’un facteur considérable : un codex en parchemin réclamait le troupeau de plusieurs dizaines de bêtes. C’est le cas d’école d’une innovation de procédé dont l’impact est décuplé par une innovation complémentaire arrivée 1300 ans plus tard (les caractères mobiles). Le procédé de Cai Lun reste conceptuellement identique dans une machine à papier Fourdrinier moderne — dispersion, égouttage, pressage, séchage — simplement mené à 100 km/h sur une toile de 10 mètres de large."
    },
    fact: "La Chine a gardé le secret de fabrication du papier pendant plus de 600 ans.",
    impact: ['Livres accessibles', 'Administration', 'Monnaie de papier', 'Imprimerie possible']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'boussole',
    name: 'La boussole',
    year: 1040,
    yearLabel: '≈ 1040',
    era: 'medieval',
    icon: '🧭',
    who: 'Ingénieurs chinois de la dynastie Song',
    where: 'Chine',
    tagline: 'Une aiguille qui sait toujours où est le nord.',
    tags: ['Navigation', 'Physique'],
    levels: {
      cm2: "En pleine mer, il n’y a pas de panneaux ni de routes. Le jour, on peut suivre le soleil ; la nuit, les étoiles. Mais s’il y a des nuages… on est perdu ! La boussole règle le problème : c’est une petite aiguille aimantée posée sur une pointe, et elle tourne toujours pour montrer le nord. Pourquoi ? Parce que la Terre est un énorme aimant. Grâce à ça, les marins ont osé partir loin, très loin, même sans voir la côte.",
      cinq: "Une aiguille aimantée s’aligne sur les lignes du champ magnétique terrestre, produit par les courants de fer liquide dans le noyau externe de la Terre. La boussole apparaît en Chine, d’abord pour la géomancie (l’orientation des bâtiments) avant d’être utilisée en mer vers le XIᵉ siècle. Attention : le nord magnétique n’est pas exactement le nord géographique — l’écart, appelé déclinaison, varie selon le lieu et se déplace d’année en année. Les navigateurs doivent en tenir compte, sinon ils dérivent.",
      grands: "La boussole transforme la navigation d’un art côtier en une pratique hauturière : associée au portulan et à l’estime (cap + vitesse + temps), elle rend possible la traversée régulière de l’Atlantique. C’est un cas rare où un phénomène physique non compris est exploité pendant 800 ans avant d’être expliqué — Gilbert publie De Magnete en 1600, le géodynamo n’est modélisé qu’au XXᵉ siècle. Le pôle nord magnétique se déplace actuellement de ~50 km/an vers la Sibérie, ce qui oblige à réviser le modèle magnétique mondial tous les 5 ans, y compris dans votre téléphone."
    },
    fact: "Le pôle nord magnétique bouge tellement vite que les cartes de navigation doivent être corrigées régulièrement.",
    impact: ['Grandes explorations', 'Commerce maritime', 'Cartographie', 'Géophysique']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'imprimerie',
    name: 'L’imprimerie à caractères mobiles',
    year: 1450,
    yearLabel: '≈ 1450',
    era: 'medieval',
    icon: '🅰',
    who: 'Johannes Gutenberg',
    where: 'Mayence, Saint-Empire',
    tagline: 'Copier un livre en quelques heures au lieu de plusieurs années.',
    tags: ['Information', 'Industrie'],
    levels: {
      cm2: "Avant, chaque livre était recopié à la main par un moine, lettre par lettre. Ça prenait parfois plus d’un an pour UN seul livre ! Gutenberg a fabriqué de minuscules lettres en métal qu’on peut ranger côte à côte pour former des mots, comme des tampons. On met de l’encre dessus, on presse une feuille, et hop : une page. Et on peut recommencer 300 fois ! Les livres sont devenus beaucoup moins chers, et beaucoup plus de gens ont appris à lire.",
      cinq: "Le génie de Gutenberg n’est pas l’impression (la Chine et la Corée la pratiquaient déjà) mais un système complet : un alliage plomb‑étain‑antimoine qui fond bas et se dilate en refroidissant pour remplir le moule, une matrice réglable produisant des caractères tous exactement de la même hauteur, une encre grasse à base d’huile de lin qui accroche le métal, et une presse à vis dérivée du pressoir à vin. Résultat : environ 3 600 pages par jour au lieu de quelques dizaines. En 50 ans, l’Europe passe de quelques milliers de manuscrits à plus de 20 millions de livres imprimés.",
      grands: "C’est l’archétype de l’innovation systémique : chaque brique existait, la valeur est dans l’intégration et dans la tolérance dimensionnelle obtenue sur le caractère. L’effondrement du coût marginal de la copie déclenche une cascade sociale — Réforme protestante, standardisation des langues vernaculaires, naissance de la propriété intellectuelle, puis de la méthode scientifique par publication reproductible. La comparaison avec Internet est fondée : dans les deux cas, ce n’est pas le contenu qui change d’abord, c’est le coût de diffusion, et l’ordre social suit avec un décalage d’une génération."
    },
    fact: "Gutenberg a fait faillite : son associé Fust lui a fait un procès et a récupéré l’atelier juste avant que la Bible ne rapporte de l’argent.",
    impact: ['Alphabétisation', 'Réforme religieuse', 'Science moderne', 'Presse et journaux']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'telescope',
    name: 'La lunette astronomique',
    year: 1609,
    yearLabel: '1609',
    era: 'medieval',
    icon: '🔭',
    who: 'Galilée (d’après Lippershey)',
    where: 'Padoue, Italie',
    tagline: 'Le jour où l’humanité a compris qu’elle n’était pas au centre.',
    tags: ['Science', 'Optique'],
    levels: {
      cm2: "Galilée a mis deux morceaux de verre bombés dans un tube, et en regardant dedans, les choses lointaines paraissaient toutes proches. Alors il l’a pointé vers le ciel. Il a vu que la Lune n’était pas une boule lisse mais pleine de montagnes et de trous, et que Jupiter avait quatre petites lunes qui tournaient autour d’elle. Donc tout ne tournait pas autour de la Terre ! Ça a fait beaucoup, beaucoup de bruit à l’époque.",
      cinq: "Une lunette associe un objectif (grande lentille convergente qui collecte la lumière) et un oculaire qui agrandit l’image formée. Deux gains : le grossissement, mais surtout la surface collectrice — une lentille 20 fois plus large que la pupille capte 400 fois plus de photons, donc révèle des objets invisibles à l’œil nu. Galilée observe les phases de Vénus, impossibles dans le modèle géocentrique de Ptolémée : c’est une réfutation observationnelle, pas une opinion. Il sera pourtant condamné par l’Inquisition en 1633.",
      grands: "Instrument fondateur de la science instrumentale : il déplace l’autorité du texte antique vers la mesure reproductible. Le passage à la réflexion (Newton, 1668) élimine l’aberration chromatique et ouvre la course au diamètre, qui n’a pas cessé — de 2,5 cm chez Galilée à 39 m pour l’ELT en construction au Chili. Chaque saut de diamètre ou de longueur d’onde a produit une révolution conceptuelle : galaxies extérieures (Hubble, 1924), fond diffus cosmologique, exoplanètes. Le JWST observe aujourd’hui des objets dont la lumière est partie il y a 13,4 milliards d’années."
    },
    fact: "Galilée vendait des lunettes aux marchands de Venise pour repérer les navires avant leurs concurrents — c’était son business.",
    impact: ['Fin du géocentrisme', 'Méthode scientifique', 'Astronomie moderne', 'Optique de précision']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'vapeur',
    name: 'La machine à vapeur',
    year: 1769,
    yearLabel: '1769',
    era: 'industrielle',
    icon: '⚙️',
    who: 'James Watt (après Newcomen)',
    where: 'Écosse',
    tagline: 'De l’eau qui bout, et soudain les machines remplacent les bras.',
    tags: ['Énergie', 'Industrie'],
    levels: {
      cm2: "Quand l’eau bout dans une casserole, la vapeur soulève le couvercle : elle pousse ! Des inventeurs ont eu l’idée d’enfermer cette vapeur dans un gros tube pour qu’elle pousse une pièce qui glisse — un piston. En reliant ce piston à une roue, on obtient une machine qui tourne toute seule, sans cheval et sans rivière. Avec ça, on a fait marcher des usines, des trains et des bateaux. Le monde s’est mis à aller beaucoup plus vite.",
      cinq: "Newcomen construit dès 1712 une machine atmosphérique, mais elle gaspille énormément de charbon car on refroidit et réchauffe le même cylindre à chaque cycle. Watt ajoute en 1769 un condenseur séparé : le cylindre reste chaud en permanence, la vapeur va se condenser ailleurs. Le rendement est multiplié par 3 à 4. Il ajoute ensuite le mouvement rotatif et le régulateur à boules, qui ralentit automatiquement la machine si elle s’emballe — l’un des tout premiers systèmes d’asservissement automatique de l’histoire.",
      grands: "Première conversion à grande échelle d’énergie thermique en travail mécanique, elle affranchit la production de la géographie (plus besoin de chute d’eau) et déclenche l’industrialisation, l’exode rural et le charbon comme socle énergétique — donc l’Anthropocène. Fait notable : la thermodynamique naît de la machine, et non l’inverse. Carnot publie en 1824 ses Réflexions pour comprendre pourquoi le rendement plafonne, et en tire le principe qui portera son nom. Le régulateur de Watt sera analysé par Maxwell en 1868, fondant la théorie du contrôle."
    },
    fact: "L’unité de puissance « watt » vient de James Watt, qui avait aussi inventé le « cheval-vapeur » pour convaincre les clients qui n’avaient que des chevaux.",
    impact: ['Usines partout', 'Chemin de fer', 'Exode rural', 'Thermodynamique']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'vaccin',
    name: 'La vaccination',
    year: 1796,
    yearLabel: '1796',
    era: 'industrielle',
    icon: '💉',
    who: 'Edward Jenner, puis Louis Pasteur',
    where: 'Angleterre, puis France',
    tagline: 'Apprendre au corps à se défendre… avant l’attaque.',
    tags: ['Santé', 'Biologie'],
    levels: {
      cm2: "Ton corps a une armée à l’intérieur pour te défendre contre les microbes. Le problème, c’est qu’elle met du temps à apprendre à reconnaître un nouvel ennemi — parfois trop de temps. Le vaccin, c’est un entraînement : on montre à ton armée une version du microbe qui ne peut pas te rendre malade. Comme ça, si le vrai microbe arrive un jour, ton corps le reconnaît tout de suite et le bat très vite. C’est un peu comme réviser avant le contrôle.",
      cinq: "Jenner remarque que les fermières ayant attrapé la variole de la vache (bénigne) ne contractent pas la variole humaine (mortelle dans 30 % des cas). En 1796, il inocule volontairement le pus de vaccine à un enfant, puis lui expose la variole : il ne tombe pas malade. Un siècle plus tard, Pasteur généralise le principe en atténuant volontairement des germes en laboratoire, et invente le mot « vaccin » en hommage à Jenner. Le mécanisme réel — mémoire des lymphocytes B et T, anticorps — ne sera compris qu’au XXᵉ siècle.",
      grands: "Seule technologie humaine ayant éradiqué une maladie de la surface du globe : la variole, déclarée éliminée en 1980 après ~300 millions de morts au seul XXᵉ siècle. Le vaccin illustre une externalité positive majeure — l’immunité collective protège aussi les non‑vaccinés, ce qui en fait un bien public typique et explique la régulation étatique. La plateforme ARN messager, préparée pendant deux décennies de recherche fondamentale (Karikó & Weissman, Nobel 2023), a fait passer le délai de conception d’un vaccin de plusieurs années à quelques jours après le séquençage."
    },
    fact: "La variole est la seule maladie humaine totalement éradiquée de la planète — il n’en reste que deux échantillons, sous très haute sécurité.",
    impact: ['Espérance de vie ×2', 'Éradication de la variole', 'Immunologie', 'Santé publique']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'telephone',
    name: 'Le téléphone',
    year: 1876,
    yearLabel: '1876',
    era: 'industrielle',
    icon: '☎️',
    who: 'Alexander Graham Bell (et Elisha Gray, Antonio Meucci)',
    where: 'Boston, États-Unis',
    tagline: 'La voix humaine transportée le long d’un fil de cuivre.',
    tags: ['Communication', 'Électricité'],
    levels: {
      cm2: "Quand tu parles, ta voix fait vibrer l’air. Dans un téléphone, ces vibrations font bouger une toute petite plaque, ce qui transforme ta voix en électricité qui file dans le fil. À l’autre bout, l’électricité fait vibrer une autre plaque… et ta voix ressort ! C’est magique, mais c’est de la physique. Avant, pour parler à quelqu’un de loin, il fallait écrire une lettre et attendre des jours. Là, on s’entend tout de suite.",
      cinq: "Le microphone convertit une onde acoustique en signal électrique analogique (transduction), et l’écouteur fait l’opération inverse. Bell dépose son brevet le 14 février 1876, quelques heures avant Elisha Gray qui travaillait sur un principe voisin — l’un des litiges de propriété industrielle les plus célèbres de l’histoire ; le Congrès américain a reconnu en 2002 les travaux antérieurs d’Antonio Meucci. Le vrai défi n’était pas l’appareil, mais le réseau : commutation, central téléphonique, puis numérotation automatique.",
      grands: "Le téléphone introduit la communication synchrone bidirectionnelle à distance et, avec elle, la première infrastructure en réseau maillé de l’histoire — les Bell Labs, nés de ce monopole, produiront le transistor, l’information de Shannon, le laser, Unix et le C. C’est aussi le premier grand cas de régulation d’un monopole naturel (démantèlement d’AT&T en 1984). Le basculement du circuit commuté vers la VoIP paquetisée achève de dissoudre la voix dans un flux de données parmi d’autres : votre appel WhatsApp est l’arrière‑petit‑enfant direct de ce brevet."
    },
    fact: "Bell refusait d’avoir un téléphone dans son bureau : il trouvait que ça le dérangeait dans son travail.",
    impact: ['Communication instantanée', 'Réseaux mondiaux', 'Bell Labs', 'Origine du mobile']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'ampoule',
    name: 'L’ampoule électrique',
    year: 1879,
    yearLabel: '1879',
    era: 'industrielle',
    icon: '💡',
    who: 'Thomas Edison, Joseph Swan',
    where: 'Menlo Park, États-Unis',
    tagline: 'La nuit devient facultative.',
    tags: ['Énergie', 'Vie quotidienne'],
    levels: {
      cm2: "Dans une ampoule, il y a un fil minuscule. Quand l’électricité passe dedans, le fil chauffe tellement qu’il devient blanc et brille, comme un morceau de métal dans un feu. Le problème, c’est qu’en présence d’air, le fil brûle et casse tout de suite. Alors on enlève tout l’air de l’ampoule ! Comme ça, le fil brille très longtemps sans se consumer. Grâce à ça, on peut lire, jouer et travailler même quand il fait nuit dehors.",
      cinq: "Une lampe à incandescence exploite l’effet Joule : le courant qui traverse un filament de forte résistance le porte à ~2 500 °C, température à laquelle il émet dans le visible. Il faut le vide (ou un gaz inerte) pour éviter l’oxydation. Edison n’a pas « inventé » l’ampoule — Swan et une vingtaine d’autres avaient des prototypes — mais il a trouvé un filament de bambou carbonisé tenant 1 200 heures, et surtout il a conçu tout le système autour : dynamo, compteur, câblage, culot à vis, tarification.",
      grands: "L’ampoule est le produit d’appel qui justifie la construction d’un réseau électrique — Pearl Street Station, 1882. Elle inaugure aussi le laboratoire de R&D industriel organisé, modèle repris par General Electric puis par toute l’industrie. Son rendement lumineux est médiocre (~15 lm/W, 95 % de l’énergie en chaleur) ; la LED atteint aujourd’hui 200 lm/W, un facteur 13. Cas d’école du paradoxe de Jevons : l’effondrement du coût du lumen‑heure d’un facteur ~500 000 depuis la bougie n’a jamais réduit la consommation d’énergie d’éclairage, il a explosé les usages."
    },
    fact: "Une ampoule de la caserne de Livermore, en Californie, brille sans interruption depuis 1901.",
    impact: ['Travail de nuit', 'Réseau électrique', 'Sécurité urbaine', 'Laboratoires de R&D']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'automobile',
    name: 'L’automobile',
    year: 1886,
    yearLabel: '1886',
    era: 'industrielle',
    icon: '🚗',
    who: 'Karl Benz, Bertha Benz',
    where: 'Mannheim, Allemagne',
    tagline: 'Une voiture qui n’a besoin ni de cheval ni de rails.',
    tags: ['Transport', 'Industrie'],
    levels: {
      cm2: "Karl Benz a construit un engin à trois roues avec un moteur qui brûle un peu d’essence pour tourner : la première vraie voiture. Mais personne n’y croyait ! Alors sa femme, Bertha, est partie en cachette avec ses deux fils faire 106 km pour aller voir sa mère. Elle a réparé la voiture en route avec une épingle à chapeau et une jarretière, et elle a acheté l’essence à la pharmacie. Après ce voyage, tout le monde a voulu une voiture.",
      cinq: "Le moteur à combustion interne brûle un mélange air‑essence dans un cylindre fermé ; l’explosion pousse le piston, qui fait tourner le vilebrequin. Le cycle à quatre temps (admission, compression, combustion, échappement) est formalisé par Nikolaus Otto en 1876. L’avantage décisif sur la vapeur : l’essence contient énormément d’énergie pour son poids (~12 kWh/kg) et ne demande ni chaudière ni temps de chauffe. Bertha Benz, lors de son voyage de 1888, invente au passage le garnissage de frein et signale le besoin d’une vitesse supplémentaire en côte.",
      grands: "L’automobile est moins une invention qu’un écosystème : raffinage, réseau routier, assurance, crédit à la consommation, urbanisme périphérique, puis normes d’émissions. Ford y ajoute en 1913 la chaîne de montage, qui fait passer le temps d’assemblage d’un châssis de 12 h à 1 h 33 et divise le prix par trois : la production de masse crée son propre marché en solvabilisant l’ouvrier. Le basculement actuel vers l’électrique est structurellement comparable à 1886 — ce n’est pas le moteur qui décide, c’est la densité énergétique du stockage et le réseau de distribution."
    },
    fact: "Bertha Benz a fait le premier « road trip » de l’histoire sans prévenir son mari : elle lui a laissé un mot.",
    impact: ['Liberté de déplacement', 'Production de masse', 'Villes étalées', 'Industrie pétrolière']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'avion',
    name: 'L’avion',
    year: 1903,
    yearLabel: '1903',
    era: 'moderne',
    icon: '✈️',
    who: 'Wilbur et Orville Wright',
    where: 'Kitty Hawk, Caroline du Nord',
    tagline: '12 secondes de vol qui ouvrent le ciel.',
    tags: ['Transport', 'Physique'],
    levels: {
      cm2: "Les frères Wright réparaient des vélos, et ils rêvaient de voler. Ils ont compris quelque chose que les autres avaient raté : ce n’est pas seulement une histoire de moteur, il faut aussi pouvoir DIRIGER l’appareil, comme on tient un guidon. Ils ont donc fabriqué des ailes dont on pouvait tordre le bout pour tourner. Le 17 décembre 1903, leur machine a volé 12 secondes sur 37 mètres. C’est court… mais c’était la première fois !",
      cinq: "Une aile crée de la portance parce qu’elle dévie l’air vers le bas : par réaction, l’air pousse l’aile vers le haut (troisième loi de Newton ; la différence de pression décrite par Bernoulli en est l’autre face). Les Wright ont réussi là où d’autres avaient échoué parce qu’ils ont traité les trois axes de rotation : tangage, lacet et surtout roulis, via le gauchissement des ailes. Ils ont aussi construit leur propre soufflerie pour tester 200 profils d’aile, et ont dû usiner eux‑mêmes un moteur assez léger, aucun constructeur n’en proposant.",
      grands: "Le vol motorisé est un problème de rapport puissance/masse et de stabilité en boucle fermée : la vraie percée des Wright est le contrôle, pas la sustentation — leur brevet porte d’ailleurs sur le système de commandes. En 66 ans, on passe de 37 mètres à la mer de la Tranquillité. L’aviation instaure aussi la culture moderne de la sécurité par retour d’expérience : enquête systématique, boîte noire, redondance, facteurs humains — un modèle depuis transposé à la médecine hospitalière et au nucléaire civil."
    },
    fact: "Le premier vol des Wright était plus court que la cabine d’un Airbus A380.",
    impact: ['Monde connecté', 'Fret express', 'Conquête spatiale', 'Culture de la sécurité']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'penicilline',
    name: 'La pénicilline',
    year: 1928,
    yearLabel: '1928',
    era: 'moderne',
    icon: '🧫',
    who: 'Alexander Fleming, Florey et Chain',
    where: 'Londres / Oxford',
    tagline: 'Une boîte oubliée par un chercheur distrait a sauvé 200 millions de vies.',
    tags: ['Santé', 'Biologie'],
    levels: {
      cm2: "Alexander Fleming était un peu désordonné. Un jour, il est parti en vacances en laissant traîner ses boîtes de microbes. En revenant, il a vu de la moisissure verte dans l’une d’elles — comme sur un vieux pain. Mais surtout, autour de la moisissure, tous les microbes étaient morts ! La moisissure fabriquait un produit qui les tuait. Ce produit, la pénicilline, est devenu le premier médicament capable de guérir des maladies dont on mourait avant.",
      cinq: "La moisissure Penicillium notatum sécrète une molécule qui bloque la construction de la paroi des bactéries : la cellule ne tient plus sous sa propre pression osmotique et éclate. Comme nos cellules n’ont pas de paroi, la molécule nous épargne — c’est ce qu’on appelle la toxicité sélective. Fleming publie en 1929 mais ne parvient pas à purifier le produit ; ce sont Florey, Chain et Heatley qui, à Oxford en 1940, réussissent l’extraction et la production de masse, à temps pour soigner les blessés du Débarquement.",
      grands: "Premier antibiotique à usage clinique large, la pénicilline fait chuter la mortalité par infection post‑opératoire et post‑partum, et transforme la chirurgie en pratique routinière. Elle inaugure aussi la course évolutive contre l’antibiorésistance : Fleming lui‑même l’annonce dans son discours Nobel de 1945. L’OMS classe aujourd’hui la résistance antimicrobienne parmi les dix principales menaces sanitaires mondiales — ~1,3 million de décès directs par an — alors qu’aucune nouvelle classe d’antibiotiques à large spectre n’a atteint le marché depuis les années 1980."
    },
    fact: "Pour produire assez de pénicilline en 1941, les chercheurs d’Oxford la cultivaient dans… des bassines et des bassins de lit d’hôpital.",
    impact: ['Chirurgie sûre', 'Fin des infections mortelles banales', 'Industrie pharmaceutique', 'Antibiorésistance']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'ordinateur',
    name: 'L’ordinateur',
    year: 1945,
    yearLabel: '1945',
    era: 'moderne',
    icon: '🖥',
    who: 'Turing, von Neumann, Eckert & Mauchly',
    where: 'Royaume-Uni / États-Unis',
    tagline: 'Une machine qui change de métier selon ce qu’on lui écrit.',
    tags: ['Information', 'Mathématiques'],
    levels: {
      cm2: "Un ordinateur, c’est une machine qui sait faire des calculs à une vitesse folle — des millions par seconde. Mais le plus fort, c’est qu’elle ne fait pas toujours la même chose : on lui donne une liste d’instructions, un programme, et elle obéit. Change le programme, et la même machine devient un jeu, un dessin ou une calculatrice. Les premiers ordinateurs remplissaient une pièce entière et pesaient 30 tonnes. Celui de ta poche est des milliards de fois plus rapide.",
      cinq: "Turing démontre en 1936 qu’une machine très simple peut exécuter n’importe quel calcul si on lui fournit le bon programme : c’est l’universalité. L’architecture dite de von Neumann (1945) applique cette idée en stockant le programme dans la même mémoire que les données — c’est ce qui rend la machine reprogrammable sans recâblage. L’ENIAC, opérationnel en 1945, occupe 167 m² et contient 17 468 tubes à vide ; il faut deux jours pour le « reprogrammer » à la main, tâche assurée par six mathématiciennes trop longtemps oubliées.",
      grands: "La rupture n’est pas l’automatisation du calcul (Pascal, Babbage) mais la thèse de Church‑Turing : tout ce qui est effectivement calculable l’est par une machine universelle. Le transistor (1947) puis le circuit intégré (1958) donnent à cette abstraction un substrat dont la densité double tous les deux ans pendant cinquante ans. Conséquence économique : le coût marginal du calcul tend vers zéro, ce qui déplace toute la valeur vers les données et les modèles — et rend caduque, secteur après secteur, la logique de l’avantage par le capital physique."
    },
    fact: "Le mot « bug » vient d’un vrai insecte, un papillon de nuit coincé dans un relais du Mark II en 1947 — il est scotché dans le carnet de bord.",
    impact: ['Automatisation', 'Internet', 'Sciences par simulation', 'Intelligence artificielle']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'internet',
    name: 'Internet et le Web',
    year: 1969,
    yearLabel: '1969 → 1989',
    era: 'numerique',
    icon: '🌐',
    who: 'ARPANET, Cerf & Kahn, Tim Berners-Lee',
    where: 'Californie, puis CERN (Genève)',
    tagline: 'Un réseau sans chef, où l’information trouve toujours un chemin.',
    tags: ['Communication', 'Information'],
    levels: {
      cm2: "Internet, ce sont des millions d’ordinateurs reliés entre eux par des câbles, dont d’énormes câbles posés au fond des océans. Quand tu envoies une photo, elle est découpée en tout petits morceaux qui partent chacun de leur côté et se retrouvent à l’arrivée pour se recoller. S’il y a un embouteillage, les morceaux prennent un autre chemin, comme une voiture qui contourne un bouchon. Le Web, lui, c’est ce qui permet de cliquer sur un lien pour sauter d’une page à l’autre.",
      cinq: "Ne pas confondre : Internet est le réseau (le système de routes), le Web est un service qui circule dessus (les pages et les liens), au même titre que le mail. La commutation de paquets découpe chaque message en datagrammes routés indépendamment — d’où la robustesse du réseau, conçue à l’origine pour rester opérationnel même très dégradé. TCP/IP (Cerf & Kahn, 1974) impose un principe fort : le réseau reste bête, l’intelligence est aux extrémités. En 1989, Tim Berners‑Lee ajoute HTTP, HTML et l’URL — et met le tout dans le domaine public en 1993.",
      grands: "Architecture end‑to‑end et absence de point de contrôle central : c’est ce qui a permis l’innovation sans permission, du streaming au P2P. La décision du CERN de renoncer à tout brevet sur le Web est probablement l’arbitrage de politique technologique le plus rentable de l’histoire. La tension actuelle porte précisément sur ce principe — concentration sur quelques plateformes, CDN et cloud propriétaires, fragmentation réglementaire — soit un glissement d’un réseau de pairs vers une architecture de facto centralisée, avec des conséquences directes sur la vie privée et la résilience."
    },
    fact: "Le tout premier message envoyé sur ARPANET devait être « LOGIN ». Le système a planté après deux lettres : le premier mot d’Internet est donc « LO ».",
    impact: ['Savoir accessible à tous', 'Économie numérique', 'Réseaux sociaux', 'Télétravail']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'smartphone',
    name: 'Le smartphone',
    year: 2007,
    yearLabel: '2007',
    era: 'numerique',
    icon: '📱',
    who: 'Apple, et 30 ans de recherche publique',
    where: 'Californie',
    tagline: 'Un ordinateur, un appareil photo, une carte et une bibliothèque dans une poche.',
    tags: ['Communication', 'Vie quotidienne'],
    levels: {
      cm2: "Un smartphone, ce n’est pas juste un téléphone : c’est un ordinateur très puissant, avec un appareil photo, une boussole, un GPS qui parle aux satellites, et un écran qui comprend quand tu poses ton doigt dessus. Tout ça tient dans ta main et marche sur une batterie. Avant, il aurait fallu remplir un sac entier d’appareils différents pour faire la même chose. Et un seul de ces appareils coûtait le prix d’une voiture.",
      cinq: "Le smartphone est un objet de convergence : puce système‑sur‑puce, écran capacitif multipoint, accéléromètre MEMS, GPS, radio 4G/5G, batterie lithium‑ion. Aucune de ces briques n’a été inventée en 2007 — l’économiste Mariana Mazzucato a montré que presque toutes viennent de programmes de recherche publics (GPS et Internet du DARPA, écran tactile du CERN et d’universités, lithium‑ion de travaux financés par l’État). L’innovation d’Apple est l’intégration, l’interface directe au doigt sans stylet, et l’écosystème d’applications ouvert aux développeurs.",
      grands: "Le smartphone achève de faire de l’informatique une infrastructure ambiante et fait basculer l’accès au réseau vers le mobile pour la majorité de l’humanité — c’est le premier ordinateur de milliards de personnes, avec des effets de saut technologique majeurs (paiement mobile M‑Pesa avant la bancarisation). Il installe aussi une économie de l’attention dont les externalités — sommeil, santé mentale adolescente, polarisation — sont désormais documentées, et pose la question d’une capture privée de rentes bâties sur cinquante ans de recherche financée publiquement."
    },
    fact: "Le smartphone que tu tiens est environ 100 000 fois plus puissant que l’ordinateur qui a guidé Apollo 11 jusqu’à la Lune.",
    impact: ['Accès permanent à l’information', 'Photo pour tous', 'Économie des applications', 'Économie de l’attention']
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'ia',
    name: 'L’intelligence artificielle',
    year: 2012,
    yearLabel: '2012 → aujourd’hui',
    era: 'numerique',
    icon: '🧠',
    who: 'Hinton, LeCun, Bengio et bien d’autres',
    where: 'Toronto, Montréal, New York',
    tagline: 'Des machines qui apprennent à partir d’exemples, au lieu d’obéir à des règles.',
    tags: ['Information', 'Science'],
    levels: {
      cm2: "Avant, pour qu’un ordinateur reconnaisse un chat, il fallait lui expliquer : « un chat a des moustaches, des oreilles pointues… ». Ça ne marchait jamais très bien. Maintenant, on fait autrement : on lui montre des millions de photos de chats en disant « ça, c’est un chat », et il apprend tout seul à repérer ce qui fait un chat. C’est comme toi quand tu apprends à reconnaître les lettres : personne ne te donne une règle, tu en vois beaucoup et ça finit par rentrer.",
      cinq: "Un réseau de neurones artificiels est une immense fonction mathématique avec des milliards de réglages appelés paramètres. On lui montre un exemple, on mesure son erreur, et on corrige légèrement tous les paramètres dans la direction qui réduit cette erreur : c’est la rétropropagation du gradient. L’idée date des années 1980 ; ce qui a changé en 2012 (AlexNet), c’est la puissance des cartes graphiques et la disponibilité d’énormes jeux de données. Attention : ces systèmes n’ont ni intention ni compréhension du monde — ils modélisent des régularités statistiques, et peuvent donc se tromper avec beaucoup d’aplomb.",
      grands: "L’apprentissage profond est une rupture méthodologique : on cesse de spécifier l’algorithme pour spécifier l’objectif et laisser l’optimisation trouver la représentation. Les lois d’échelle (Kaplan et al., 2020) ont transformé la recherche en problème d’ingénierie de ressources, avec une concentration capitalistique inédite. Les enjeux ouverts sont sérieux et non résolus : opacité des décisions, biais hérités des corpus, empreinte énergétique, propriété des données d’entraînement, et surtout automatisation de tâches cognitives — la première vague technologique à concurrencer le travail qualifié plutôt que le travail manuel."
    },
    fact: "Pour reconnaître un chat, un réseau de neurones ajuste plus de paramètres qu’il n’y a d’habitants sur Terre.",
    impact: ['Traduction automatique', 'Diagnostic médical assisté', 'Recherche scientifique accélérée', 'Transformation du travail']
  }
];

/* ---------------------------- Quiz ---------------------------------- */
export const QUIZ = [
  { inv: 'roue',        q: "À quoi la roue a-t-elle servi en tout premier ?",
    choices: ["À tirer des charrettes", "À tourner de l’argile (poterie)", "À moudre du grain"], answer: 1,
    explain: "Le tour de potier précède le transport d’environ 300 ans." },
  { inv: 'feu',         q: "Pourquoi la cuisson des aliments a-t-elle été si importante ?",
    choices: ["C’est meilleur au goût", "Ça libère plus d’énergie et tue des parasites", "Ça conserve la viande au froid"], answer: 1,
    explain: "Plus d’énergie disponible : un argument avancé pour l’évolution de notre cerveau." },
  { inv: 'imprimerie',  q: "Quelle est la vraie invention de Gutenberg ?",
    choices: ["L’impression sur papier", "Un système complet : alliage, moule, encre, presse", "Le papier lui-même"], answer: 1,
    explain: "L’impression existait en Asie : le génie est l’intégration de tout le système." },
  { inv: 'boussole',    q: "Pourquoi l’aiguille de la boussole montre-t-elle le nord ?",
    choices: ["Elle suit l’étoile polaire", "La Terre se comporte comme un gros aimant", "Elle est attirée par le froid"], answer: 1,
    explain: "Le fer liquide du noyau terrestre engendre un champ magnétique." },
  { inv: 'vapeur',      q: "Qu’a apporté James Watt à la machine à vapeur ?",
    choices: ["Il l’a inventée de zéro", "Le condenseur séparé, qui économise le charbon", "Il a remplacé l’eau par de l’huile"], answer: 1,
    explain: "La machine de Newcomen existait depuis 1712, mais gaspillait énormément." },
  { inv: 'vaccin',      q: "Comment agit un vaccin ?",
    choices: ["Il tue directement les microbes", "Il entraîne les défenses du corps à l’avance", "Il fait baisser la fièvre"], answer: 1,
    explain: "C’est un entraînement du système immunitaire, pas un désinfectant." },
  { inv: 'avion',       q: "Quelle était la vraie difficulté résolue par les frères Wright ?",
    choices: ["Faire un moteur puissant", "Contrôler l’appareil sur ses trois axes", "Trouver un terrain assez plat"], answer: 1,
    explain: "Leur brevet porte sur les commandes de vol, pas sur l’aile." },
  { inv: 'penicilline', q: "Comment la pénicilline a-t-elle été découverte ?",
    choices: ["Par une expérience planifiée", "Par accident, grâce à une boîte oubliée", "En analysant du pain moisi exprès"], answer: 1,
    explain: "Fleming revient de vacances et trouve une moisissure qui a tué ses bactéries." },
  { inv: 'internet',    q: "Quelle est la différence entre Internet et le Web ?",
    choices: ["Aucune, c’est pareil", "Internet est le réseau, le Web est un service dessus", "Le Web est plus ancien"], answer: 1,
    explain: "Internet : 1969. Le Web : 1989, inventé au CERN par Tim Berners-Lee." },
  { inv: 'ia',          q: "Comment une IA moderne apprend-elle à reconnaître un chat ?",
    choices: ["On lui décrit les moustaches et les oreilles", "Elle déduit seule à partir de millions d’exemples", "Elle cherche sur Internet"], answer: 1,
    explain: "On spécifie l’objectif, pas la règle : c’est l’apprentissage." }
];
