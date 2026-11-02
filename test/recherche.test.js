import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from '../src/recherche.js';

// Copie figée des données de départ : vos ajouts dans donnees/releves.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function ids(releves) {
  return releves.map((releve) => releve.id);
}

test('trouverParDate : la date 2026-10-22 renvoie M08 et 15 mm de pluie', () => {
  const releve = trouverParDate(DONNEES, '2026-10-22');
  assert.equal(releve.id, 'M08');
  assert.equal(releve.pluieMm, 15);
});

test('trouverParDate : une date sans relevé renvoie undefined', () => {
  assert.equal(trouverParDate(DONNEES, '2026-10-30'), undefined);
});

test('joursPluvieux : deux journées ont une pluie d’au moins 10 mm', () => {
  assert.deepEqual(ids(joursPluvieux(DONNEES, SEUIL_JOUR_PLUVIEUX)), ['M03', 'M08']);
});

test('trierParTemperature commence par les journées les plus fraîches', () => {
  const temperatures = trierParTemperature(DONNEES).map((releve) => releve.temperatureC);
  assert.deepEqual(temperatures, [26, 26, 27, 27, 28, 28, 29, 29, 30, 30]);
});

test('trierParPluie place 0 avant 2, 3, 5, 8, 12 et 15', () => {
  const pluies = trierParPluie(DONNEES).map((releve) => releve.pluieMm);
  assert.deepEqual(pluies, [0, 0, 0, 0, 2, 3, 5, 8, 12, 15]);
});

test('trierParPluie ne modifie pas le journal d’origine', () => {
  const releves = DONNEES.map((releve) => ({ ...releve }));
  trierParPluie(releves);
  assert.deepEqual(ids(releves), ids(DONNEES));
});
