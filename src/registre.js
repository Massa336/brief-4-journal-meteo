// Ajouter et lister les relevés.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Renvoie une ligne de texte qui décrit le relevé.
// Exemples : 'M08 | 2026-10-22 | 26 °C | 15 mm | air 85 %'
//            'M11 | 2026-10-25 | 27.5 °C | 4 mm | air 79 %' (JavaScript affiche un point décimal,
//            même si la virgule est acceptée à la saisie)
export function formaterReleve(releve) {
  return `${releve.id} | ${releve.date} | ${releve.temperatureC} °C | ${releve.pluieMm} mm | air ${releve.humiditeAirPct} %`;
}
 


// Renvoie un texte avec un relevé par ligne (lignes séparées par '\n'),
// ou 'Aucun relevé enregistré.' si la liste est vide.
export function listerReleves(releves) {
    if (releves.length === 0) {
      return 'Aucun relevé enregistré.';
    }
    return releves.map(formaterReleve).join('\n'); // join : pas de \n après la dernière ligne
  }


 // Renvoie le relevé qui a cet identifiant, ou undefined s'il n'existe pas.
export function trouverParId(releves, id) {
   return releves.find((releve) => releve.id === id); // find s'arrête au premier trouvé
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'M11', date: '2026-10-25', temperatureC: '27,5', pluieMm: '4', humiditeAirPct: '79' }
// Renvoie un tableau de messages d'erreur ; un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · date réelle au format AAAA-MM-JJ · temperatureC nombre
// (négatif ou décimal accepté) · pluieMm nombre positif ou nul · humiditeAirPct nombre entre 0 et 100.
// Un message par règle non respectée ; n'ajoutez aucune autre règle. Le journal reçu n'est pas modifié.
   export function verifierReleve(saisie, releves) {
  const erreurs = [];
  
    const id = String(saisie.id ?? '').trim();
    if (id === '') {
      erreurs.push("L'identifiant est obligatoire.");
   } else if (trouverParId(releves, id) !== undefined) {
      erreurs.push(`L'identifiant ${id} existe déjà dans le journal.`);
    }
  
    if (!estDateValide(saisie.date)) {
      erreurs.push('La date doit être une date réelle au format AAAA-MM-JJ.');
    }
  
     //versNombre('') vaut NaN (alors que Number('') vaut 0) : un champ vide est donc refusé.
    const temperature = versNombre(saisie.temperatureC);
    if (Number.isNaN(temperature)) {
      erreurs.push('La température doit être un nombre (en °C).');
    }
  
    const pluie = versNombre(saisie.pluieMm);
    if (Number.isNaN(pluie) || pluie < 0) {
      erreurs.push('La pluie doit être un nombre positif ou nul (en mm).');
    }
  
    const humidite = versNombre(saisie.humiditeAirPct);
    if (Number.isNaN(humidite) || humidite < 0 || humidite > 100) {
      erreurs.push("L'humidité relative de l'air doit être un nombre entre 0 et 100 (en %).");
    }
  
    return erreurs;
  }
  

// Fabrique le relevé à enregistrer à partir d'une saisie VALIDE : les trois mesures deviennent des nombres.
export function creerReleve(saisie) {
   return {
      id: String(saisie.id).trim(),
      date: saisie.date,
      temperatureC: versNombre(saisie.temperatureC),
      pluieMm: versNombre(saisie.pluieMm),
      humiditeAirPct: versNombre(saisie.humiditeAirPct),
    };
  }
// Ajoute la saisie au journal si elle est valide (verifierReleve, puis creerReleve).
// Renvoie les erreurs : [] si le relevé a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterReleve(releves, saisie) {
  const erreurs = verifierReleve(saisie, releves);
    if (erreurs.length > 0) {
      return erreurs;
    }
    releves.push(creerReleve(saisie));
    return [];
  }
