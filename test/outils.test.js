// Tests des outils fournis (src/outils.js) : ils sont verts dès le départ.
import test from 'node:test';
import assert from 'node:assert/strict';
import { estDateValide, versNombre } from '../src/outils.js';

test('outils : versNombre convertit un texte en nombre, virgule acceptée', () => {
  assert.equal(versNombre('2000'), 2000);
  assert.equal(versNombre('5,2'), 5.2);
  assert.equal(versNombre('3 000'), 3000);
  assert.equal(versNombre('-1'), -1);
});

test('outils : versNombre renvoie NaN pour un texte vide ou non numérique', () => {
  assert.ok(Number.isNaN(versNombre('')));
  assert.ok(Number.isNaN(versNombre('abc')));
  assert.ok(Number.isNaN(versNombre('12 kg')));
});

test('outils : estDateValide accepte seulement une date réelle au format AAAA-MM-JJ', () => {
  assert.equal(estDateValide('2026-10-22'), true);
  assert.equal(estDateValide('22/10/2026'), false);
  assert.equal(estDateValide('2026-10-32'), false);
  assert.equal(estDateValide('2026-02-30'), false);
  assert.equal(estDateValide(''), false);
});
