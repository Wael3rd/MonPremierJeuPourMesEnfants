# Pavillon — commande en ligne

Site de commande construit à partir de la carte plastifiée du Pavillon
(photo fournie). On choisit ses articles, le total se calcule tout seul.


## Deux pages, deux usages

| Page | Pour qui | Pensée pour |
|---|---|---|
| `index.html` | le client | donner envie : grandes photos, gros titres, défilement tranquille |
| `service.html` | la salle | aller vite : tout à l'écran, aucune photo, recherche au clavier |

### Le poste de salle (`service.html`)

- **Recherche instantanée**, insensible aux accents et à la casse : `cesar`
  trouve « Salade César », `margh` trouve « Margherita ». On tape n'importe où
  sur la page, le focus part tout seul dans le champ.
- <kbd>Entrée</kbd> ajoute le premier résultat et vide la recherche : on
  enchaîne les articles sans lever les mains du clavier.
- **Multiplicateur ×1 à ×4** avant de toucher un article, pour les tablées.
  Il retombe à ×1 après chaque ajout, pour éviter les erreurs en cascade.
- **Deux tailles de pizza = deux boutons** dans la même tuile : un seul geste.
- **16 tables + Bar + Emporter, ouvertes en parallèle.** Chaque table garde sa
  commande et son nombre de couverts ; les tables occupées portent une pastille
  verte et leur total dans le sélecteur. Tout est conservé localement, un
  rafraîchissement de la page ne perd rien.
- **Bon de commande groupé par catégorie** (la cuisine lit plus vite), sur 32
  colonnes comme une imprimante thermique, copiable en un geste.
- Sur téléphone, la commande passe en panneau plein écran, appelé par la barre
  verte du bas.

L'interface est sombre : en service du soir, un écran blanc éblouit et se voit
de loin en salle.

## Fonctionnement

- **115 articles** répartis en **23 catégories**, du sandwich au milk-shake.
- Les pizzas ont deux tailles (**L** / **M**) : chaque taille compte comme une
  ligne distincte dans le panier, avec son propre prix.
- **Panier persistant** : il survit à la fermeture de l'onglet (`localStorage`).
- **Récapitulatif** copiable en un clic, à montrer au serveur.
- Rail de catégories collant, qui suit automatiquement la section à l'écran.
- Mode clair et **mode sombre** automatiques, selon le réglage du téléphone.

## Précision des montants

Tous les prix sont stockés en **millimes** (entiers) et non en dinars
décimaux : `19000` plutôt que `19.0`. Les totaux sont donc des additions
d'entiers, et aucun arrondi en virgule flottante ne peut décaler le
résultat d'un millime. La conversion en `19.000 DT` n'a lieu qu'à
l'affichage.

## Design

Reprise du langage visuel d'Apple : typographie très large à interlettrage
serré, barres translucides en verre dépoli, boutons en pilule, bleu `#0071e3`,
grands rayons de bordure, beaucoup de blanc.

La police est **Geist** (Vercel, SIL OFL 1.1), auto-hébergée : c'est la
plus proche alternative libre de SF Pro, qui n'est pas redistribuable.
Aucune requête vers un CDN, la page fonctionne hors-ligne.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure |
| `styles.css` | Design, thèmes clair/sombre, responsive |
| `data.js` | La carte : catégories, articles, prix |
| `app.js` | Panier, totaux, rendu, récapitulatif |
| `fonts/` | Geist et Geist Mono |

Pour changer un prix : une seule ligne dans `data.js`.

## Les photos

**Chaque article a sa propre photo**, référencée par son identifiant Pexels
dans le champ `photo` de `data.js` et servie depuis le CDN de Pexels
(licence libre, sans obligation d'attribution).

Ces photos ont été **choisies sur la foi du titre du résultat de recherche** :
l'environnement de développement n'a aucun accès réseau vers les hébergeurs
d'images, elles n'ont donc pas pu être affichées avant d'être posées. Ouvrez
`photos.html` pour les voir toutes sur une page et signaler celles à changer.

Si une photo ne charge pas, la carte retombe automatiquement sur la vignette
de sa catégorie, puis sur un aplat à l'emoji — jamais d'image cassée.

Pour remplacer une photo : changez le nombre du champ `photo` par un autre
identifiant Pexels (le nombre à la fin de l'URL d'une photo, par exemple
`.../photo/pizza-margherita-20115306/` → `20115306`), ou déposez votre
propre image dans `img/items/` et mettez le nom du fichier à la place.

## Les vignettes de catégories

Chaque cartouche d'article affiche une photo, en 4/3 au-dessus du nom
(16/9 sur mobile, pour ne pas trop allonger la page).

L'image retenue suit cet ordre :

1. le champ `photo` de l'article → `img/items/<nom>.jpg` ;
2. sinon la photo de sa catégorie → `img/<nom>.jpg` ;
3. sinon un aplat portant l'emoji de la catégorie.

Les 16 photos de catégories sont **découpées dans la photo de la carte**
du restaurant, recadrées pour écarter au maximum les colonnes de prix
imprimées par-dessus. Elles font 320 × 320 (245 Ko au total).

Les photos plus hautes que larges (les verres : mojito, smoothie, jus, et
le tacos) sont complétées sur les côtés par **la photo elle-même, agrandie
et floutée**. Un recadrage carré décapitait le verre, et un aplat uni
laissait deux bandes de couleur bien visibles une fois la carte affichée
en 4/3.

Pour donner une photo propre à un article précis, voir `img/items/README.md`.

Cinq catégories gardent leur emoji, faute de photo exploitable :

| Catégorie | Raison |
|---|---|
| Pizza | quatre lignes de prix couvrent toute la photo |
| Brunch | vernis plastifié craquelé, image illisible |
| Omelettes, Spécial, Petit-déj, Thé, Frappuccino | pas de photo sur la carte |

Pour remplacer une vignette : déposez votre image dans `img/` sous le même
nom (`pizza.jpg` par exemple) et ajoutez `photo: 'pizza'` à la catégorie
dans `data.js`.

## Portée

Cette page calcule un total à titre indicatif. Elle n'envoie rien au
restaurant : il n'y a ni serveur, ni paiement, ni transmission de commande.
