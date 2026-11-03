// Statistiques descriptives de la série.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese
// Aucune fonction de ce fichier ne modifie le journal reçu.

// Renvoie la moyenne des températures en °C, arrondie à une décimale, ou null si la liste est vide.
// Exemples : 28 avec les données de départ · 27.7 pour 27, 26 et 30 °C (83 / 3 = 27.666…)
export function moyenneTemperature(releves) {
  if (releves.length === 0) {
    return null;
  }
  let somme = 0;
  for (const releve of releves) {
    somme += releve.temperatureC;
  }
  // Math.round arrondit à l'entier : on multiplie par 10, on arrondit, on divise par 10.
  return Math.round((somme / releves.length) * 10) / 10;
}

// Renvoie le cumul (la somme) des pluies, en mm. Liste vide : 0.
export function cumulPluie(releves) {
 let cumul = 0;
  for (const releve of releves) {
    cumul += releve.pluieMm;
  }
  return cumul;
}

// Renvoie { min, max } des températures de la série, ou null si la liste est vide.
// Exemple : { min: 26, max: 30 }
export function temperatureMinMax(releves) {
  if (releves.length === 0) {
    return null;
  }
  let min = releves[0].temperatureC;
  let max = releves[0].temperatureC;
  for (const releve of releves) {
    if (releve.temperatureC < min) {
      min = releve.temperatureC;
    }
    if (releve.temperatureC > max) {
      max = releve.temperatureC;
    }
  }
  return { min, max };
}
