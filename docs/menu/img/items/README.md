# Photos par article

Déposez ici une image par article, nommée d'après son identifiant, puis
ajoutez le champ `photo` correspondant dans `data.js`.

Exemple pour la pizza 4 Saisons (`id: 'pz-4saisons'`) :

1. copier l'image sous `img/items/pz-4saisons.jpg` ;
2. dans `data.js`, écrire :

```js
{ id: 'pz-4saisons', cat: 'pizza', name: '4 Saisons',
  photo: 'pz-4saisons',
  sizes: [{ label: 'L', price: 19000 }, { label: 'M', price: 17000 }] },
```

Le champ `photo` de l'article l'emporte sur la vignette de sa catégorie.
Sans lui, l'article affiche la photo de sa catégorie ; et si la catégorie
n'en a pas, un aplat avec son emoji.

## Format conseillé

- Carré ou 4/3, **au moins 640 px** de côté (les cartouches affichent en 4/3).
- JPEG qualité ~85, autour de 40 Ko par image.
- Le cadrage se fait en `object-fit: cover` : centrez le plat.

## Identifiants disponibles

Les identifiants sont ceux du champ `id` dans `data.js` : `pz-` pour les
pizzas, `sw-` sandwiches, `mk-` makloub, `bg-` baguettes, `tc-` tacos,
`sa-` salades, `br-` briks, `pl-` plats, `pa-` pâtes & ojja, `om-`
omelettes, `sp-` spécial, `pd-` petit-déjeuner, `bu-` brunch, `cr-`
crêpes, `de-` desserts, `cf-` café, `ic-` ice coffee, `th-` thés,
`fr-` frappuccino, `sm-` smoothies, `ms-` milk-shakes, `mo-` mojitos,
`ju-` jus frais.
