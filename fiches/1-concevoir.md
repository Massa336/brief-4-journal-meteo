# 1. Comprendre et préparer

**Objectif :** un poste prêt, un dépôt GitHub, le besoin compris, un plan de travail.

1. **Poste et dépôt.** Suivez « Démarrer » dans `SUJET.md`. Montrez au coach : `npm test` affiche 3 tests verts, le dépôt est sur GitHub.
2. **Le besoin.** Rédigez la partie « Contexte » du `README.md` : qui utilise l'outil, son besoin, ce qu'il saisit et ce qu'il veut voir. Distinguez la **météo d'une journée** (un relevé), une **courte série** (les données : dix jours) et le **climat** (caractérisé sur une longue période, en général 30 ans : les normales climatiques). Ne confondez pas l'**humidité relative de l'air** (en %, dans les données) et l'**humidité du sol** (absente).
3. **L'agronomie.** Avec la fiche de station et le coach agronomie, décrivez les trois grandeurs (température, pluie, humidité relative de l'air) : ce qu'elles mesurent et leur unité (°C, mm, %). Les données contiennent une seule température par jour. Gardez vos notes pour `docs/fiche-agronomique.md`.
4. **Les données.** Complétez `docs/dictionnaire-donnees.md`. Ouvrez `donnees/releves.json` et calculez à la main la température moyenne, les températures minimale et maximale de la série, le cumul de pluie et le nombre de journées avec au moins 10 mm (dans `docs/releve-tests.md`).
5. **Le code fourni.** Lisez `src/saisie.js` (la saisie au clavier), `src/outils.js` et les tests de `test/`. `app.js` est presque vide : vous y écrirez tout le menu. Notez dans `docs/journal-recherche.md` les notions que vous devrez chercher.
6. **Le plan.** Remplissez la colonne « Prévu » de `docs/taches.md` : c'est vous qui organisez vos quatre jours.

**Une expérience pour lire un test rouge :** dans `src/outils.js`, remplacez `return NaN;` par `return 0;`, lancez `npm run test:outils`, lisez le message (`expected` = attendu, `actual` = obtenu), puis annulez avec `git restore src/outils.js`.
