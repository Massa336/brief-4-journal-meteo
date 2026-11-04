# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | identifiant unique | texte | non vide, absent des données |aucune| D1902 |
|date  |date du releve|date |forme AAAA-MM-JJ |aucune |2026-10-24 |
| temperatureC |temperature de l'air |nombre|nombre valide |°C |26,8 |
| pluieMm|quantite de pluie |entier |entier >=0 |mm |12 |
| humiditeAirPct |humidite de l'air |nombre |entre 0 et 100|%|89 |

**Listes de valeurs autorisées** : Aucune

**Sources** :  SUJET.md (section « Les données »),donnees/releves.json, Fiche D « Station météo et irrigation » relevés collectés en travail de groupe lors de la journée parcelle.
