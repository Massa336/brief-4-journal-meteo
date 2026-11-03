// Statistiques descriptives de la série.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese
// Aucune fonction de ce fichier ne modifie le journal reçu.

// Renvoie la moyenne des températures en °C, arrondie à une décimale, ou null si la liste est vide.
// Exemples : 28 avec les données de départ · 27.7 pour 27, 26 et 30 °C (83 / 3 = 27.666…)
export function moyenneTemperature(releves) {
  throw new Error('TODO : coder moyenneTemperature dans src/synthese.js');
}

// Renvoie le cumul (la somme) des pluies, en mm. Liste vide : 0.
export function cumulPluie(releves) {
  throw new Error('TODO : coder cumulPluie dans src/synthese.js');
}

// Renvoie { min, max } des températures de la série, ou null si la liste est vide.
// Exemple : { min: 26, max: 30 }
export function temperatureMinMax(releves) {
  throw new Error('TODO : coder temperatureMinMax dans src/synthese.js');
}
