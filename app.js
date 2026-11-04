// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';
import { journeeLaPlusChaude, modifierReleve, supprimerReleve, trierParTemperatureDecroissante } from './src/bonus.js';


const FICHIER_DONNEES = 'donnees/releves.json';

function afficherAccueil() {
  console.log('='.repeat(50));
  console.log('   JOURNAL MÉTÉOROLOGIQUE DE LA FERME');
  console.log('   Suivi agroclimatique de la ferme pédagogique');
  console.log('='.repeat(50));
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter un relevé');
  console.log('2. Lister les relevés');
  console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
  console.log('4. Trier (température, pluie)');
  console.log('5. Synthèse de la série');
  console.log('6. Supprimer un relevé');
  console.log('7. Modifier un relevé');
  console.log('0. Quitter');
}

async function ajouter(releves) {
  console.log('--- Ajouter un relevé ---');
  const id = await demander('Identifiant (ex. M11) : ');
  if (id === null) return;
  const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (date === null) return;
  const temperatureC = await demander('Température en °C : ');
  if (temperatureC === null) return;
  const pluieMm = await demander('Pluie en mm : ');
  if (pluieMm === null) return;
  const humiditeAirPct = await demander("Humidité relative de l'air en % : ");
  if (humiditeAirPct === null) return;

  const saisie = { id: id.toUpperCase(), date, temperatureC, pluieMm, humiditeAirPct };
  const erreurs = ajouterReleve(releves, saisie);
  if (erreurs.length > 0) {
    console.log('Relevé refusé :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevé(s).`);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, releves);
  console.log(`Relevé ${saisie.id} ajouté. Le journal compte ${releves.length} relevé(s).`);
}

function lister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}

async function rechercher(releves) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par date');
  console.log(`3. Les journées pluvieuses (au moins ${SEUIL_JOUR_PLUVIEUX} mm)`);
  const choix = await demander('Votre choix : ');
  if (choix === null) return;

  if (choix === '1') {
    const saisi = await demander('Identifiant : ');
    if (saisi === null) return;
    const id = saisi.toUpperCase();
    const releve = trouverParId(releves, id);
    console.log(releve ? formaterReleve(releve) : `Relevé ${id} introuvable.`);
  } else if (choix === '2') {
    const date = await demander('Date (AAAA-MM-JJ) : ');
    if (date === null) return;
    const releve = trouverParDate(releves, date);
    console.log(releve ? formaterReleve(releve) : `Relevé du ${date} introuvable.`);
  } else if (choix === '3') {
    const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
    console.log(`${pluvieux.length} journée(s) avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie :`);
    console.log(listerReleves(pluvieux));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

/*async function trier(releves) {
  console.log(`--- Trier ---`);
  console.log(`1.Par température croissante`);
  console.log(`2.Pluie croissante`);
  console.log(`3.Par température decroissante`);
  const choix = await demander(`votre choix : `);
  if (choix === null) return;

  if (choix === `1`) {
    console.log(listerReleves(trierParTemperature(releves)));
  } else if (choix === `2`) {
    console.log(listerReleves(trierParPluie(releves)));
  } else if (choix === `3`) {
    console.log(listerReleves(trierParTemperatureDecroissante(releves)));
  } else {
    console.log(`Choix inconnu : retour au menu.`);
  }
  
}

function synthese(releves) {
  console.log('--- Synthèse de la série ---');
  console.log(`Nombre de relevés : ${releves.length}`);

  const moyenne = moyenneTemperature(releves);
  console.log(`Température moyenne : ${moyenne === null ? 'aucune donnée' : `${moyenne} °C`}`);

  const extremes = temperatureMinMax(releves);
  if (extremes === null) {
    console.log('Températures minimale et maximale : aucune donnée');
  } else {
    console.log(`Température minimale : ${extremes.min} °C · maximale : ${extremes.max} °C`);
  }

  console.log(`Cumul de pluie : ${cumulPluie(releves)} mm`);
  console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : ${joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX).length}`);

  const chaude = journeeLaPlusChaude(releves);
  console.log(`Journée la plus chaude : ${chaude === null ? 'aucune donnée' : formaterReleve(chaude)}`);

  console.log('Rappels :');
  console.log('  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.');
  console.log(`  - Le seuil de ${SEUIL_JOUR_PLUVIEUX} mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.`);
  console.log("  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.");
}

async function supprimer(releves) {
  const saisi = await demander('Identifiant : ');
  if (saisi === null) return;
  const id = saisi.toUpperCase();
  const supprime = supprimerReleve(releves, id);
  if (supprime === undefined) {
    console.log(`Relevé ${id} introuvable.`);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, releves);
  console.log(`Relevé ${id} supprimé. Le journal compte ${releves.length} relevé(s).`);
}

async function modifier(releves) {
  const saisi = await demander('Identifiant : ');
  if (saisi === null) return;
  const id = saisi.toUpperCase();
  const champ = await demander('Champ à modifier (date, temperatureC, pluieMm, humiditeAirPct) : ');
  if (champ === null) return;
  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) return;

  const erreurs = modifierReleve(releves, id, champ, valeur);
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, releves);
  console.log(`Relevé ${id} modifié.`);
}

async function main() {
  ouvrirSaisie();
  afficherAccueil();
  let releves = [];
  try {
    releves = await
    chargerJson(FICHIER_DONNEES);
    console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le journal démarre vide.`);

  }
  let continuer = true;
    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');
      if (choix === null) {
        break; // Ctrl+C ou fin de la saisie
      }
      try {
        switch (choix) {
          case '1': await ajouter(releves); break;
          case '2': lister(releves); break;
          case '3': await rechercher(releves); break;
          case '4': await trier(releves); break;
          case '5': synthese(releves); break;
          case '6': await supprimer(releves); break;
          case '7': await modifier(releves); break;
          case '0': continuer = false; break;
          default: console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        if (String(erreur.message).startsWith('TODO')) {
          console.log(`À compléter : ${erreur.message}`);
        } else {
          console.log(`Erreur inattendue : ${erreur.message}`);
        }
      }
    }
  
    console.log('Au revoir !');
    fermerSaisie();
  }
  
  main();
