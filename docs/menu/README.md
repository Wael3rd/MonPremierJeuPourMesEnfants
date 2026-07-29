# Pavillon — commande en ligne

Site de commande construit à partir de la carte plastifiée du Pavillon
(photo fournie). On choisit ses articles, le total se calcule tout seul.

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

## Réserve sur un prix

La pizza **Fruits de mer** n'est proposée qu'en taille **L (26.000 DT)** :
sur la carte, le prix de la taille M est masqué par une photo. Il n'a pas
été inventé. Dès que vous me le donnez, c'est une ligne à ajouter.

## Portée

Cette page calcule un total à titre indicatif. Elle n'envoie rien au
restaurant : il n'y a ni serveur, ni paiement, ni transmission de commande.
