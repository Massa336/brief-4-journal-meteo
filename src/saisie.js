// Adaptateur de saisie — FOURNI par les coachs : lisez-le, ne le modifiez pas.
// Un terminal ne dispose pas du prompt() du navigateur. Ce fichier utilise le module
// natif readline de Node.js pour poser une question et attendre la réponse au clavier.
import { createInterface } from 'node:readline';

let clavier = null;
let lignes = null;
let fermee = false;

// Ouvre la saisie au clavier. app.js l'appelle une fois, au démarrage.
export function ouvrirSaisie() {
  clavier = createInterface({ input: process.stdin, output: process.stdout });
  clavier.on('close', () => {
    fermee = true;
  });
  // Ctrl+C ferme la saisie : le programme quitte proprement au lieu de s'arrêter net.
  clavier.on('SIGINT', () => clavier.close());
  lignes = clavier[Symbol.asyncIterator]();
}

// Affiche la question, attend que l'utilisateur appuie sur Entrée, puis renvoie
// le texte tapé sans les espaces du début et de la fin.
// Renvoie null si la saisie est fermée (Ctrl+C, ou fin des lignes envoyées au programme).
// Exemple : const nom = await demander('Votre nom : ');
export async function demander(question) {
  if (fermee) {
    // La saisie est fermée, mais des réponses déjà tapées (ou envoyées d'un coup) peuvent attendre.
    process.stdout.write(question);
  } else {
    clavier.setPrompt(question);
    clavier.prompt();
  }
  const { value, done } = await lignes.next();
  return done ? null : value.trim();
}

// Ferme la saisie. app.js l'appelle une fois, avant de quitter.
export function fermerSaisie() {
  if (!fermee) {
    clavier.close();
  }
}
