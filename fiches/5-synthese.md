# 5. Statistiques de la série

**Vos fichiers :** `src/synthese.js`, puis `app.js` (choix 5) · **Vos tests :** `npm run test:synthese` (5 tests fournis)

Aucune de ces fonctions ne modifie le journal reçu.

## 1. `cumulPluie(releves)`

Renvoie la somme des pluies en mm : `45` avec les données de départ, `0` pour un journal vide.

**À vous.** Piste : avec quelle valeur commence la variable qui accumule ?

## 2. `moyenneTemperature(releves)`

Renvoie la moyenne des températures, **arrondie à une décimale** : `28` avec les données de départ, `27.7` pour 27, 26 et 30 °C ; `null` pour un journal vide.

**Pseudo-code de référence :**

```text
SI releves est vide ALORS
  RENVOYER rien (null)
FIN SI
somme ← 0
POUR CHAQUE releve DANS releves
  somme ← somme + releve.temperatureC
FIN POUR
RENVOYER (somme / nombre de relevés), arrondie à une décimale      ← l'arrondi : à vous
```

L'arrondi est à vous : cherchez comment arrondir un nombre en JavaScript, puis comment garder une décimale et obtenir un nombre (pas un texte).

## 3. `temperatureMinMax(releves)`

Renvoie `{ min: 26, max: 30 }`, ou `null` pour un journal vide. Une seule température par jour : ce sont les températures minimale et maximale **de la série**, pas celles de chaque journée.

**À vous** : écrivez d'abord l'algorithme et suivez-le à la main sur un exemple. Pistes : avec quelle valeur commencer `min` ? Une série où il gèle a des températures négatives.

## 4. Le menu : choix 5 (`app.js`)

Dialogue **imposé** (données de départ), lignes dans cet ordre :

```text
--- Synthèse de la série ---
Nombre de relevés : 10
Température moyenne : 28 °C
Température minimale : 26 °C · maximale : 30 °C
Cumul de pluie : 45 mm
Journées avec au moins 10 mm de pluie : 2
Rappels :
  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.
  - Le seuil de 10 mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.
  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.
```

- Les journées pluvieuses : `joursPluvieux` et `SEUIL_JOUR_PLUVIEUX`.
- Journal vide : `Température moyenne : aucune donnée` et `Températures minimale et maximale : aucune donnée`.

## Vérifier

`npm run test:synthese`, puis le choix 5 : comparez avec vos calculs à la main. Ajoutez une journée fraîche et pluvieuse : la moyenne, le minimum, le cumul et le nombre de journées pluvieuses changent comme prévu.
