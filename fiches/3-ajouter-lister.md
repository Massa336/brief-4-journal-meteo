# 3. Le menu, ajouter et lister

**Vos fichiers :** `src/registre.js`, puis `app.js` (le menu, choix 1 et 2) · **Vos tests :** `npm run test:registre` (13 tests fournis)

Un relevé est un objet ; le journal est un tableau de relevés :

```js
{ id: 'M08', date: '2026-10-22', temperatureC: 26, pluieMm: 15, humiditeAirPct: 85 }
```

Codez les fonctions dans l'ordre : chacune sert aux suivantes. Les tests fournis montrent ce que chacune doit renvoyer.

## Le menu (`app.js`)

`app.js` ne contient que les imports et le nom du fichier de données : écrivez tout le menu. Comportement imposé :

1. Au lancement : l'écran d'accueil, puis les données lues avec `chargerJson` et le message `10 relevé(s) chargé(s) depuis donnees/releves.json.`. Si la lecture échoue : `Impossible de lire donnees/releves.json : <message de l'erreur>. Le journal démarre vide.`, et le programme continue avec une liste vide.
2. Avant **chaque** choix, le menu s'affiche, puis la question `Votre choix : `. Lisez `src/saisie.js` (`ouvrirSaisie`, `demander`, `fermerSaisie`).
3. Chaque choix lance son action, puis le menu revient.
4. `0` quitte en affichant `Au revoir !` ; le programme quitte aussi si `demander` renvoie `null` (Ctrl+C).
5. Un autre choix affiche `Choix inconnu : « 9 ». Tapez un chiffre du menu.`, puis le menu revient.
6. Aucune erreur n'arrête le programme : affichez `À compléter : …` (le message de l'erreur) si elle vient d'une fonction pas encore codée (message commençant par `TODO`), sinon `Erreur inattendue : …`, puis le menu revient.

```text
==================================================
   JOURNAL MÉTÉOROLOGIQUE DE LA FERME
   Suivi agroclimatique de la ferme pédagogique
==================================================
10 relevé(s) chargé(s) depuis donnees/releves.json.

--------------------- MENU ---------------------
1. Ajouter un relevé
2. Lister les relevés
3. Rechercher (identifiant, date, journées pluvieuses)
4. Trier (température, pluie)
5. Synthèse de la série
0. Quitter
Votre choix :
```

Pistes : quelle boucle répète des instructions tant qu'une condition est vraie ? Quelle instruction choisit entre plusieurs cas selon une valeur ? Cherchez comment attraper une erreur. Écrivez d'abord le menu avec des actions vides, puis remplissez-les une à une.

## 1. `formaterReleve(releve)`

Renvoie une ligne de texte : `'M08 | 2026-10-22 | 26 °C | 15 mm | air 85 %'`. Avec une décimale : `'M11 | 2026-10-25 | 27.5 °C | 4 mm | air 79 %'` (JavaScript affiche un point, même si la virgule est acceptée à la saisie).

**À vous.** Piste : un gabarit de chaîne `` `${…}` ``.

## 2. `listerReleves(releves)`

Renvoie un relevé par ligne (pas de retour à la ligne après le dernier), ou `'Aucun relevé enregistré.'` si le tableau est vide.

**À vous.** Pistes : réutilisez `formaterReleve` ; cherchez une méthode des tableaux qui rassemble les éléments en un texte, avec un séparateur.

## 3. `trouverParId(releves, id)`

Renvoie le relevé (l'objet du journal lui-même) ou `undefined`.

**À vous.** Pistes : arrêtez la recherche dès que c'est trouvé ; que renvoyer si rien ne correspond ?

## 4. `verifierReleve(saisie, releves)`

Tous les champs de la saisie sont des **textes** : `{ id: 'M11', date: '2026-10-25', temperatureC: '27,5', pluieMm: '4', humiditeAirPct: '79' }`. Renvoie un tableau de messages d'erreur, **un par règle non respectée** ; `[]` signifie « valide ». Ne modifie pas le journal.

| Champ | Règle |
| --- | --- |
| `id` | obligatoire, et absent du journal reçu |
| `date` | une date qui existe, au format `AAAA-MM-JJ` |
| `temperatureC` | un nombre ; négatif, nul ou décimal accepté |
| `pluieMm` | un nombre positif ou nul |
| `humiditeAirPct` | un nombre entre 0 et 100, bornes comprises |

N'ajoutez aucune autre règle.

**À vous** : écrivez d'abord l'algorithme complet, sur papier. Pistes : `src/outils.js` contient deux outils ; que vaut `Number('')`, et `versNombre('')` ? Une température de 0 °C ou de -2 °C est une vraie mesure. Pour l'humidité, testez 0, 100 et 101.

## 5. `creerReleve(saisie)`

Renvoie un **nouvel** objet, avec les trois mesures converties en nombres (`'-3,5'` devient `-3.5`).

**À vous.**

## 6. `ajouterReleve(releves, saisie)`

Si la saisie est valide, ajoute le relevé à la fin du journal et renvoie `[]`. Sinon, renvoie les erreurs sans rien ajouter.

**Pseudo-code de référence :**

```text
erreurs ← verifierReleve(saisie, releves)
SI erreurs n'est pas vide ALORS
  RENVOYER erreurs
FIN SI
ajouter creerReleve(saisie) à la fin de releves
RENVOYER une liste vide
```

## 7. Les choix 1 et 2 (`app.js`)

Écrivez les actions `ajouter` et `lister`. Le dialogue est **imposé** : le formateur le joue automatiquement.

```text
--- Ajouter un relevé ---
Identifiant (ex. M11) : m11
Date du relevé (AAAA-MM-JJ) : 2026-10-25
Température en °C : 27,5
Pluie en mm : 4
Humidité relative de l'air en % : 79
Relevé M11 ajouté. Le journal compte 11 relevé(s).
```

- Les cinq questions dans cet ordre, avec `demander` (voir `src/saisie.js`).
- Avant de vérifier, mettez l'identifiant en majuscules. Cherchez comment changer la casse d'un texte.
- Ajout réussi : enregistrez le journal dans `donnees/releves.json` (fiche 2), puis affichez la ligne ci-dessus.
- Saisie refusée :

  ```text
  Relevé refusé :
    - La pluie doit être un nombre positif ou nul (en mm).
  Le journal compte toujours 10 relevé(s).
  ```

- Si `demander` renvoie `null` (Ctrl+C), abandonnez l'ajout.

```text
--- Liste des relevés (10) ---
M01 | 2026-10-15 | 27 °C | 0 mm | air 75 %
…
```

## Vérifier

- `npm run test:registre`.
- Dans le menu : ajoutez `M11` ; essayez chaque règle avec une valeur interdite et un nouvel identifiant ; vérifiez que `-2` °C et `100` % sont acceptés ; essayez une saisie avec trois erreurs. Notez les résultats dans `docs/releve-tests.md`.
