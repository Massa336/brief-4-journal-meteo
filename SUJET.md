# Brief 4 — Journal météorologique de la ferme

**Examen final de sélection · travail individuel.** Quatre jours de travail, organisés comme vous le voulez. Livraison à l'heure fixée par les coachs, à la fin du quatrième jour ; soutenance individuelle le lendemain.

## Le besoin

Le responsable de la ferme pédagogique rassemble des relevés météorologiques (température, pluie, humidité de l'air) pour comprendre les conditions rencontrées pendant les activités. Il veut les saisir dans un terminal, retrouver une journée, classer les relevés et décrire la série. Vous êtes assistant de suivi agroclimatique et développeur Agritech junior : vous construisez ce journal en JavaScript, avec Node.js.

- **Besoin professionnel** : organiser une courte série météorologique et expliquer ce qu'elle permet ou non de conclure.
- **Geste professionnel** : lire les grandeurs d'une fiche météo, reprendre les unités, saisir les observations, décrire la série ; distinguer les conditions d'une journée et le climat.

## Ce que vous construisez

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

Les relevés sont lus dans `donnees/releves.json`, et chaque ajout y est enregistré.

## Le kit

| Fichier | Contenu | Votre travail |
| --- | --- | --- |
| `app.js` | Les imports et le nom du fichier de données | Écrire tout le menu : accueil, chargement, menu affiché à chaque tour, actions, sortie, erreurs |
| `src/stockage.js` | Lire et écrire le fichier JSON | À coder en premier |
| `src/registre.js` | Formater, lister, trouver, vérifier, créer, ajouter | À coder |
| `src/recherche.js` | Trouver par date, journées pluvieuses, trier | À coder |
| `src/synthese.js` | Cumul de pluie, température moyenne, minimale et maximale | À coder |
| `src/bonus.js` | Supprimer, modifier, tri décroissant, journée la plus chaude | Bonus |
| `src/saisie.js`, `src/outils.js` | Saisie au clavier ; `versNombre`, `estDateValide` | Fournis : à utiliser, pas à modifier |
| `donnees/releves.json` | Les dix relevés de départ (fictifs) | Modifié par votre programme |
| `test/` | Les tests fournis ; `donnees-test.json` est une copie figée des données de départ | Ne pas modifier ; vous pouvez ajouter des tests |
| `fiches/` | Le détail de chaque partie | À lire |
| `docs/`, `README.md` | Vos livrables écrits | À compléter |
| Fiche de station | Remise par le coach agronomie | À citer |

## Démarrer

1. Vérifiez `node --version` (20 ou plus) et `git --version`. Configurez Git **à votre nom** :
   `git config --global user.name "Prénom NOM"` et `git config --global user.email "vous@exemple.com"`.
2. Créez sur GitHub un dépôt **vide** `brief-4-journal-meteo`. Ouvrez le dossier du kit dans VS Code, puis dans son terminal :

   ```powershell
   git init
   git add .
   git commit -m "Départ du brief 4 : kit fourni"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git
   git push -u origin main
   ```

3. `node app.js` affiche seulement « À compléter » : le menu est à écrire. `npm test` affiche **3 tests verts** (les outils fournis) et **35 rouges**.

Si PowerShell bloque `npm`, tapez `npm.cmd` à la place (`npm.cmd test`, `npm.cmd run test:registre`). Pour retrouver les données de départ : `git restore donnees/releves.json`.

## Repères

Organisez votre temps comme vous le voulez. Ordre conseillé, chaque étape s'appuyant sur la précédente :

| Étape | Fiche | Vérifier |
| --- | --- | --- |
| 1. Comprendre le besoin, préparer le poste, planifier | `fiches/1-concevoir.md` | `npm test` |
| 2. Lire et écrire le JSON | `fiches/2-donnees-json.md` | `npm run test:stockage` |
| 3. Le menu ; ajouter et lister ; choix 1 et 2 | `fiches/3-ajouter-lister.md` | `npm run test:registre` |
| 4. Rechercher et trier ; choix 3 et 4 | `fiches/4-rechercher-trier.md` | `npm run test:recherche` |
| 5. Synthèse ; choix 5 | `fiches/5-synthese.md` | `npm run test:synthese` |
| 6. Tester, documenter, livrer, préparer la soutenance | `fiches/6-finaliser.md` | `npm test` |
| Bonus | `fiches/7-bonus.md` | `npm run test:bonus` |

Repère de mi-parcours : les étapes 1 à 3 sont faites. Gardez la dernière demi-journée pour l'étape 6.

## Les règles

- **Individuel.** L'entraide est permise : expliquer, sans écrire le code de l'autre. Notez-la dans `docs/fiche-individuelle.md`.
- **Pas d'exemple de code.** Deux fonctions ont un pseudo-code de référence dans leur fiche ; pour les autres, écrivez votre algorithme sur papier avant de coder.
- **Cherchez par vous-même** : le cours, la documentation JavaScript de MDN (<https://developer.mozilla.org/fr/docs/Web/JavaScript>), la documentation de Node.js (<https://nodejs.org/api/>). Notez vos recherches dans `docs/journal-recherche.md`. Une IA ou un site peuvent vous aider à comprendre : citez-les, et sachez expliquer chaque ligne gardée.
- **Un code que vous ne savez pas expliquer n'est pas un acquis** : en soutenance, ses points peuvent ne pas être comptés.
- **Les tests fournis ne vérifient pas tout.** Le formateur a des tests cachés (autres données, cas limites) et joue des scénarios dans votre menu. Lisez chaque règle, écrivez vos propres tests, n'écrivez jamais un résultat en dur.
- Ne modifiez pas `src/saisie.js`, `src/outils.js` ni les tests fournis. Dans `app.js`, respectez les textes et les numéros imposés par les fiches.
- Un commit par étape qui marche, avec un message qui dit ce que vous avez fait.

## Les données

```js
{ id: 'M08', date: '2026-10-22', temperatureC: 26, pluieMm: 15, humiditeAirPct: 85 }
```

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant unique, par exemple `M08` |
| `date` | Date du relevé, au format `AAAA-MM-JJ` |
| `temperatureC` | Température en °C : un nombre, négatif ou décimal possible |
| `pluieMm` | Pluie en mm : un nombre positif ou nul |
| `humiditeAirPct` | Humidité relative de l'air en % : un nombre entre 0 et 100 |

Une température par jour : les températures minimale et maximale calculées sont celles de la **série**, pas celles de chaque journée. L'humidité relative de l'air n'est pas l'humidité du sol. Dix jours forment une **courte série** : le climat se caractérise sur une longue période, en général 30 ans (les normales climatiques). Le seuil de 10 mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.

**Résultats de référence**, avec les données de départ :

- température moyenne **28 °C** ; minimale **26 °C** ; maximale **30 °C** ; cumul de pluie **45 mm** ;
- **deux** journées avec au moins 10 mm : `M03` et `M08` ;
- la date `2026-10-22` renvoie `M08` et 15 mm ; le tri par pluie place 0 avant 2, 3, 5, 8, 12 et 15 ;
- une pluie négative et une humidité de 101 % sont refusées ; le cumul d'un journal vide vaut 0 ; la moyenne d'un journal vide affiche « aucune donnée ».

## À rendre

À l'heure de livraison, la dernière version poussée sur GitHub est évaluée :

- le code, avec tous les tests du socle au vert (seuls ceux du bonus peuvent rester rouges) ;
- `README.md` complété ;
- dans `docs/` : dictionnaire des données, tableau des tâches, relevé des tests, journal de recherche, fiche agronomique (une page), fiche individuelle.
