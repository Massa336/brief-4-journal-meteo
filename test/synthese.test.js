import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from '../src/synthese.js';

// Copie figée des données de départ : vos ajouts dans donnees/releves.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

test('moyenneTemperature : la température moyenne est de 28 °C', () => {
  assert.equal(moyenneTemperature(DONNEES), 28);
});

test('moyenneTemperature d’un journal vide renvoie null (« aucune donnée »)', () => {
  assert.equal(moyenneTemperature([]), null);
});

test('cumulPluie : le cumul de pluie est de 45 mm', () => {
  assert.equal(cumulPluie(DONNEES), 45);
});

test('cumulPluie : le cumul d’un journal vide vaut 0', () => {
  assert.equal(cumulPluie([]), 0);
});

test('temperatureMinMax : minimum 26 °C, maximum 30 °C', () => {
  assert.deepEqual(temperatureMinMax(DONNEES), { min: 26, max: 30 });
});
