import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  ajouterReleve,
  creerReleve,
  formaterReleve,
  listerReleves,
  trouverParId,
  verifierReleve,
} from '../src/registre.js';

// Copie figée des données de départ : vos ajouts dans donnees/releves.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

// Une copie neuve des données pour chaque test : un ajout ne gêne pas les autres tests.
function copieDesDonnees() {
  return DONNEES.map((releve) => ({ ...releve }));
}

const SAISIE_VALIDE = { id: 'M11', date: '2026-10-25', temperatureC: '27,5', pluieMm: '4', humiditeAirPct: '79' };

test('formaterReleve écrit un relevé sur une ligne', () => {
  assert.equal(formaterReleve(DONNEES[7]), 'M08 | 2026-10-22 | 26 °C | 15 mm | air 85 %');
});

test('listerReleves écrit une ligne par relevé', () => {
  const lignes = listerReleves(DONNEES).split('\n');
  assert.equal(lignes.length, 10);
  assert.equal(lignes[0], 'M01 | 2026-10-15 | 27 °C | 0 mm | air 75 %');
});

test('listerReleves affiche un message si le journal est vide', () => {
  assert.equal(listerReleves([]), 'Aucun relevé enregistré.');
});

test('trouverParId : M08 renvoie le relevé du 2026-10-22 avec 15 mm de pluie', () => {
  const releve = trouverParId(DONNEES, 'M08');
  assert.equal(releve.date, '2026-10-22');
  assert.equal(releve.pluieMm, 15);
});

test('trouverParId : M99 est introuvable (undefined)', () => {
  assert.equal(trouverParId(DONNEES, 'M99'), undefined);
});

test('verifierReleve accepte une saisie valide', () => {
  assert.deepEqual(verifierReleve(SAISIE_VALIDE, DONNEES), []);
});

test('verifierReleve refuse une pluie négative', () => {
  assert.notEqual(verifierReleve({ ...SAISIE_VALIDE, pluieMm: '-3' }, DONNEES).length, 0);
});

test('verifierReleve refuse une humidité de 101 %', () => {
  assert.notEqual(verifierReleve({ ...SAISIE_VALIDE, humiditeAirPct: '101' }, DONNEES).length, 0);
});

test('verifierReleve refuse un identifiant déjà utilisé', () => {
  assert.notEqual(verifierReleve({ ...SAISIE_VALIDE, id: 'M01' }, DONNEES).length, 0);
});

test('creerReleve convertit les trois mesures en nombres', () => {
  assert.deepEqual(creerReleve(SAISIE_VALIDE), {
    id: 'M11',
    date: '2026-10-25',
    temperatureC: 27.5,
    pluieMm: 4,
    humiditeAirPct: 79,
  });
});

test('ajouterReleve ajoute une saisie valide à la fin du journal', () => {
  const releves = copieDesDonnees();
  assert.deepEqual(ajouterReleve(releves, SAISIE_VALIDE), []);
  assert.equal(releves.length, 11);
  assert.equal(releves[10].id, 'M11');
  assert.equal(releves[10].temperatureC, 27.5);
});

test('ajouterReleve refuse un deuxième M01 : le journal reste à dix relevés', () => {
  const releves = copieDesDonnees();
  assert.notEqual(ajouterReleve(releves, { ...SAISIE_VALIDE, id: 'M01' }).length, 0);
  assert.equal(releves.length, 10);
});

test('ajouterReleve refuse une pluie négative sans ajouter de ligne', () => {
  const releves = copieDesDonnees();
  assert.notEqual(ajouterReleve(releves, { ...SAISIE_VALIDE, pluieMm: '-3' }).length, 0);
  assert.equal(releves.length, 10);
});
