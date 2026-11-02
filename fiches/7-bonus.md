# 7. Bonus — pour aller plus loin

**Vos fichiers :** `src/bonus.js`, puis `app.js` · **Vos tests :** `npm run test:bonus` (8 tests)

Seulement quand le socle est complet. Pas de pseudo-code de référence ni de piste détaillée : combinez ce que vous avez appris, cherchez ce qui manque, et sachez expliquer ce code en soutenance.

## Les fonctions (`src/bonus.js`, +1)

- **`supprimerReleve(releves, id)`** : retire le relevé du journal et le renvoie ; `undefined` s'il n'existe pas (le journal ne change pas). Piste : il faut sa position dans le tableau, puis le retirer à cette position ; cherchez une méthode des tableaux pour chaque étape.
- **`modifierReleve(releves, id, champ, valeur)`** : modifie un champ ; la valeur arrive en texte et suit les règles de l'ajout. Renvoie les erreurs (`[]` si c'est fait). Vérifiez dans cet ordre et arrêtez-vous au premier problème : identifiant introuvable, `champ` qui vaut `'id'`, `champ` absent de `CHAMPS_MODIFIABLES` (une seule erreur pour chacun), puis valeur refusée ; en cas d'erreur, rien ne change. Pistes : les règles existent déjà dans `verifierReleve` ; attention, le relevé ne doit pas être vu comme un doublon de lui-même.
- **`trierParTemperatureDecroissante(releves)`** : une copie, la journée la plus chaude d'abord ; deux relevés égaux gardent leur ordre.
- **`journeeLaPlusChaude(releves)`** : le relevé de température la plus haute (M06 avec les données de départ, pas M10 qui a aussi 30 °C) ; `null` si le journal est vide ; en cas d'égalité, le premier rencontré.

## Le menu (`app.js`, +1)

Ajoutez au menu `6. Supprimer un relevé` et `7. Modifier un relevé`, et importez vos fonctions de `src/bonus.js`. Dialogue **imposé** :

| Choix | Questions, dans l'ordre | Affichage |
| --- | --- | --- |
| `6` | `Identifiant : ` (en majuscules) | `Relevé M03 supprimé. Le journal compte 9 relevé(s).` ou `Relevé M99 introuvable.` |
| `7` | `Identifiant : ` (en majuscules), `Champ à modifier (date, temperatureC, pluieMm, humiditeAirPct) : `, `Nouvelle valeur : ` | `Relevé M03 modifié.` ou `Modification refusée :` puis une erreur par ligne (`  - …`) |

Après une suppression ou une modification réussie, enregistrez le journal dans `donnees/releves.json`.

Deux ajouts d'affichage, comptés dans ce point :

- sous-menu **Trier** : `3. Par température décroissante`, la liste s'affichant juste après le choix ;
- **synthèse**, juste après la ligne des journées pluvieuses : `Journée la plus chaude : M06 | 2026-10-20 | 30 °C | 0 mm | air 68 %`, ou `Journée la plus chaude : aucune donnée` si le journal est vide.

Le formateur joue ces scénarios dans votre `app.js` : relancez `node app.js` après chaque modification.
