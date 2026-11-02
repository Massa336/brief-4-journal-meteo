# 4. Rechercher et trier

**Vos fichiers :** `src/recherche.js`, puis `app.js` (choix 3 et 4) · **Vos tests :** `npm run test:recherche` (6 tests fournis)

## 1. `trouverParDate(releves, date)`

Renvoie le **premier** relevé de cette date (l'objet du journal lui-même), ou `undefined`. `'2026-10-22'` donne M08.

**À vous.** Piste : une de vos fonctions de la fiche 3 fait presque la même chose.

## 2. `joursPluvieux(releves, seuil)`

Renvoie un **nouveau** tableau des relevés dont la pluie est **supérieure ou égale** au seuil, dans l'ordre du journal, éventuellement vide. Avec `SEUIL_JOUR_PLUVIEUX` (10 mm, une catégorie d'exercice qui ne prévoit rien) : M03 et M08.

**À vous.** Pistes : une journée à exactement 10 mm compte-t-elle ? La fonction doit marcher avec n'importe quel seuil reçu.

## 3. `trierParTemperature(releves)`

Renvoie une **copie** triée par température croissante ; deux relevés égaux gardent leur ordre ; le journal reçu ne change pas. Le tri commence par M03 et M08 (26 °C).

**À vous.** Le brief impose un **comparateur numérique** : cherchez dans la documentation de `sort` ce qu'est une fonction de comparaison. Essayez dans un terminal `node` : `[10, 9, -2, 0].sort()`.

## 4. `trierParPluie(releves)`

Renvoie une **copie** triée par pluie croissante ; deux pluies égales gardent leur ordre. Les pluies sortent dans l'ordre 0, 0, 0, 0, 2, 3, 5, 8, 12, 15.

**À vous.** Piste : que renvoie votre comparateur quand deux pluies sont égales ?

## 5. Le menu : choix 3 et 4 (`app.js`)

Dialogue **imposé** :

```text
--- Rechercher ---
1. Par identifiant
2. Par date
3. Les journées pluvieuses (au moins 10 mm)
Votre choix : 2
Date (AAAA-MM-JJ) : 2026-10-22
M08 | 2026-10-22 | 26 °C | 15 mm | air 85 %
```

| Sous-choix | Question | Affichage |
| --- | --- | --- |
| `1` | `Identifiant : ` (en majuscules) | la ligne, ou `Relevé M99 introuvable.` |
| `2` | `Date (AAAA-MM-JJ) : ` | la ligne, ou `Relevé du 2026-10-30 introuvable.` |
| `3` | — | `2 journée(s) avec au moins 10 mm de pluie :` puis la liste |
| autre | — | `Choix inconnu : retour au menu.` |

Le seuil affiché vient de `SEUIL_JOUR_PLUVIEUX`, pas d'un 10 écrit en dur.

```text
--- Trier ---
1. Par température croissante
2. Par pluie croissante
Votre choix : 2
M01 | 2026-10-15 | 27 °C | 0 mm | air 75 %
M04 | 2026-10-18 | 29 °C | 0 mm | air 70 %
…
```

La liste triée s'affiche juste après le choix, sans titre ; autre sous-choix : `Choix inconnu : retour au menu.` Les listes sont le texte de `listerReleves`.

## Vérifier

`npm run test:recherche`, puis dans le menu : `M03`, `M99`, `2026-10-22`, `2026-10-30`, les journées pluvieuses, les deux tris. Après un tri, la liste (choix 2) doit être revenue dans l'ordre d'origine.
