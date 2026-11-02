// Tests du BONUS (src/bonus.js) : ils restent rouges tant que le bonus n'est pas codé.
// Ils ne comptent pas dans les tests du socle.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { journeeLaPlusChaude, modifierReleve, supprimerReleve, trierParTemperatureDecroissante } from '../src/bonus.js';

// Copie figée des données de départ : vos ajouts dans donnees/releves.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function copieDesDonnees() {
  return DONNEES.map((releve) => ({ ...releve }));
}

function ids(releves) {
  return releves.map((releve) => releve.id);
}

test('bonus : supprimerReleve retire M03 et le renvoie', () => {
  const releves = copieDesDonnees();
  const supprime = supprimerReleve(releves, 'M03');
  assert.equal(supprime.id, 'M03');
  assert.equal(releves.length, 9);
  assert.equal(releves.some((releve) => releve.id === 'M03'), false);
});

test('bonus : supprimerReleve d’un identifiant inconnu renvoie undefined et ne change rien', () => {
  const releves = copieDesDonnees();
  assert.equal(supprimerReleve(releves, 'M99'), undefined);
  assert.deepEqual(ids(releves), ids(DONNEES));
});

test('bonus : modifierReleve change la pluie de M03, convertie en nombre', () => {
  const releves = copieDesDonnees();
  assert.deepEqual(modifierReleve(releves, 'M03', 'pluieMm', '11'), []);
  assert.equal(releves[2].pluieMm, 11);
});

test('bonus : modifierReleve accepte une température décimale avec une virgule', () => {
  const releves = copieDesDonnees();
  assert.deepEqual(modifierReleve(releves, 'M01', 'temperatureC', '26,5'), []);
  assert.equal(releves[0].temperatureC, 26.5);
});

test('bonus : modifierReleve refuse une valeur invalide et ne change rien', () => {
  const releves = copieDesDonnees();
  assert.notEqual(modifierReleve(releves, 'M03', 'humiditeAirPct', '101').length, 0);
  assert.notEqual(modifierReleve(releves, 'M03', 'pluieMm', '-1').length, 0);
  assert.notEqual(modifierReleve(releves, 'M03', 'date', '30/10/2026').length, 0);
  assert.deepEqual(releves, DONNEES);
});

test('bonus : modifierReleve refuse un identifiant inconnu, le champ id et un champ inconnu', () => {
  const releves = copieDesDonnees();
  assert.equal(modifierReleve(releves, 'M99', 'pluieMm', '5').length, 1);
  assert.equal(modifierReleve(releves, 'M03', 'id', 'M30').length, 1);
  assert.equal(modifierReleve(releves, 'M03', 'vent', '12').length, 1);
  assert.deepEqual(releves, DONNEES);
});

test('bonus : trierParTemperatureDecroissante commence par la plus chaude, sans modifier l’original', () => {
  const releves = copieDesDonnees();
  const temperatures = trierParTemperatureDecroissante(releves).map((releve) => releve.temperatureC);
  assert.deepEqual(temperatures, [30, 30, 29, 29, 28, 28, 27, 27, 26, 26]);
  assert.deepEqual(ids(releves), ids(DONNEES));
});

test('bonus : journeeLaPlusChaude renvoie la première journée à 30 °C, ou null si le journal est vide', () => {
  assert.equal(journeeLaPlusChaude(DONNEES).id, 'M06');
  assert.equal(journeeLaPlusChaude([]), null);
});
