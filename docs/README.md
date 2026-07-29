# La Frise des Grandes Inventions

Une application web interactive qui raconte 18 inventions qui ont changé le monde,
de la maîtrise du feu à l'intelligence artificielle — avec un modèle 3D pour chacune
et **trois niveaux de lecture** : 7 ans (CM2), 12 ans (5ᵉ) et adultes.

## Ce qu'il y a dedans

- **Frise chronologique** en bas d'écran : on la fait glisser (doigt, souris, molette),
  elle se cale toute seule sur l'invention la plus proche du centre. Les couleurs
  correspondent aux six grandes époques.
- **Modèles 3D** générés à la volée avec Three.js — aucun fichier de modèle à charger.
  On les fait tourner au doigt ou à la souris, on zoome à la molette ou en pinçant.
  Chacun est animé (le feu crépite, la machine à vapeur tourne, l'ordinateur clignote…).
- **Trois niveaux d'explication**, choisis en haut à droite. Le texte change, pas la page.
  Le choix est mémorisé d'une visite à l'autre.
- **Quiz** de 10 questions (bouton 🎯), avec l'explication après chaque réponse.
- **Visite guidée** automatique (bouton ▶).
- Navigation aussi au clavier : `←` `→` `Début` `Fin`.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `styles.css` | Design, thème, mise en page responsive |
| `data.js` | Tout le contenu : inventions, textes des 3 niveaux, quiz |
| `scenes.js` | Les 18 modèles 3D, construits en code à partir de primitives |
| `app.js` | Frise, navigation, quiz, moteur de rendu et caméra |
| `fonts/` | Les trois polices, auto-hébergées |
| `vendor/` | Three.js, auto-hébergé |

Pour ajouter une invention : une entrée dans `data.js`, une fonction du même `id`
dans `scenes.js`, et c'est tout — la frise, le panneau et la caméra s'adaptent seuls.

## Typographie

Trois polices libres (licence SIL Open Font License 1.1), volontairement choisies
hors des grotesques « par défaut » :

- **Bricolage Grotesque** (variable, axes `opsz` / `wdth` / `wght`) — titres
- **Familjen Grotesk** (variable) — texte courant
- **Space Mono** — dates, étiquettes, petites capitales

Elles sont servies depuis le dépôt : aucun appel à un CDN de polices, donc pas de
dépendance externe ni de requête vers un tiers.

## Aucune dépendance réseau

Three.js (r161, licence MIT) est inclus dans `vendor/`. La page ne fait aucune
requête sortante : elle fonctionne hors-ligne et se charge aussi vite en 3G.

Si l'appareil ne sait pas faire de WebGL, la vue 3D est remplacée automatiquement
par un visuel de repli — le reste de l'application continue de fonctionner.

## Lancer en local

```bash
cd docs
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Un serveur est nécessaire (et non un double-clic sur le fichier) car l'application
utilise les modules ES.

## Crédits

- Three.js — MIT — https://threejs.org
- Bricolage Grotesque — Mathieu Triay / ATF — OFL 1.1
- Familjen Grotesk — Emil Olsson — OFL 1.1
- Space Mono — Colophon Foundry — OFL 1.1

Les textes de licence sont dans `vendor/` et `fonts/`.
