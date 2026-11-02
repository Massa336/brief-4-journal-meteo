# 2. Lire et écrire les données JSON

**Fichier :** `src/stockage.js` · **Tests :** `npm run test:stockage` (3 tests)

À faire en premier : au démarrage, `app.js` charge les données avec votre `chargerJson`. Tant qu'elle n'est pas codée, le menu démarre avec une liste vide.

## `chargerJson(chemin)`

**Reçoit** le chemin d'un fichier JSON. **Renvoie** le tableau qu'il contient. Si le fichier n'existe pas ou n'est pas du JSON valide, laissez l'erreur remonter : le menu l'affiche.

**À vous.** Pistes : `readFile` est déjà importée ; elle renvoie une promesse : que faut-il écrire devant ? Cherchez comment transformer un texte JSON en tableau JavaScript.

## `enregistrerJson(chemin, enregistrements)`

Écrit le tableau dans le fichier, au format JSON indenté de 2 espaces. Le contenu précédent du fichier est remplacé.

**À vous.** Piste : cherchez comment transformer un tableau en texte JSON, et comment l'indenter.

## Dans le menu

- Après chaque ajout réussi (et, au bonus, chaque suppression ou modification), enregistrez tout le tableau dans le fichier de données avec `enregistrerJson`.
- Vérifiez : ajoutez un enregistrement, quittez, relancez `node app.js` : il est toujours là.
- Pour revenir aux données de départ : `git restore donnees/` suivi du nom du fichier.
