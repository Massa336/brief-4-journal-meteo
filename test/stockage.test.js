// Tests de l'EXTENSION FACULTATIVE (src/stockage.js) : ils restent rouges tant qu'elle n'est pas codée.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { chargerJson, enregistrerJson } from '../src/stockage.js';

const DOSSIER = join('test', 'tmp');
const ENREGISTREMENTS = [
  { id: 'X01', libelle: 'premier', valeur: 3 },
  { id: 'X02', libelle: 'deuxième', valeur: 4.5 },
];

test('extension : enregistrerJson écrit un JSON indenté de 2 espaces', async () => {
  await mkdir(DOSSIER, { recursive: true });
  const chemin = join(DOSSIER, 'ecriture.json');
  await enregistrerJson(chemin, ENREGISTREMENTS);
  const texte = await readFile(chemin, 'utf8');
  assert.deepEqual(JSON.parse(texte), ENREGISTREMENTS);
  assert.ok(texte.includes('\n  {'), 'le JSON doit être indenté de 2 espaces');
});

test('extension : chargerJson relit ce qu’enregistrerJson a écrit', async () => {
  await mkdir(DOSSIER, { recursive: true });
  const chemin = join(DOSSIER, 'aller-retour.json');
  await enregistrerJson(chemin, ENREGISTREMENTS);
  assert.deepEqual(await chargerJson(chemin), ENREGISTREMENTS);
});

test('extension : chargerJson laisse remonter l’erreur « fichier absent » (ENOENT)', async () => {
  const chemin = join(DOSSIER, 'absent.json');
  await rm(chemin, { force: true });
  await assert.rejects(() => chargerJson(chemin), (erreur) => erreur.code === 'ENOENT' || erreur.cause?.code === 'ENOENT');
});
