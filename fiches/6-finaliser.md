# 6. Tester, documenter, livrer

**Objectif :** un programme vérifié par quelqu'un d'autre, des livrables complets, une version poussée avant l'heure de livraison.

## Tester

1. `npm test` : tous les tests du socle sont verts (seuls ceux du bonus peuvent rester rouges).
2. **Faites tester par un camarade**, qui suit votre `docs/releve-tests.md` et essaie de casser le programme : pluie négative, vide, avec des lettres ou une unité (`5 mm`), avec une virgule (`2,5`, acceptée) ; humidité `101` ou `-1`, puis `0` et `100` (acceptées) ; température `-2` ou `26,5` (acceptées), vide ou en lettres ; identifiant en double, en minuscules ; date `25/10/2026` ou `2026-02-30` ; plusieurs erreurs à la fois ; choix inconnu ; Entrée sans rien taper. Contrôlez aussi la série : les dates se suivent-elles, sans doublon ni trou ? Le journal ne le vérifie pas : notez-le dans les limites du README. Corrigez, retestez, gardez la trace.
3. **Écrivez vos propres tests** dans les fichiers `test/*.test.js` pour les cas limites (au moins quatre donnent un bonus).

## Documenter

- `docs/fiche-agronomique.md`, relue par le coach agronomie.
- `README.md` : cochez seulement ce qui marche.
- Vérifiez chaque document de `docs/` (voir « À rendre » dans `SUJET.md`).

## Livrer

Vérifiez sur un autre poste, en suivant votre README, à côté de votre projet et pas dedans :

```powershell
cd ..
git clone https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git test-livraison
cd test-livraison
node app.js
npm test
```

Supprimez ensuite `test-livraison`. Avant l'heure : `git status` propre, `git push` fait.

## La soutenance (environ 15 minutes, individuelle)

1. **Démonstration (3 min)** : liste ; recherche du `2026-10-22` puis du `2026-10-30` ; journées pluvieuses ; tri par pluie ; synthèse ; un relevé saisi en direct puis la synthèse à nouveau ; une saisie refusée.
2. **Explication (4 min)** : une fonction choisie par le jury, ligne par ligne.
3. **Modification guidée (4 min)**, par exemple : tri par pluie décroissante, moyenne de l'humidité relative de l'air (76 %), refuser une température supérieure à 60 °C, compter les journées sans pluie.
4. **Questions (3 min)** : votre poste et Git (`git add`, `git commit`, `git push`) ; votre raisonnement (entrées, sortie, journal vide) ; vos recherches (journal) ; l'agronomie (les grandeurs et leurs unités, série courte et climat, humidité de l'air et du sol).
