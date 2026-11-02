// Outils FOURNIS par les coachs : utilisez-les dans vos fonctions, ne les modifiez pas.

// Convertit un texte tapé au clavier en nombre.
// Accepte la virgule française et les espaces entre les milliers.
// Renvoie NaN (« Not a Number ») si le texte est vide ou n'est pas un nombre.
// Exemples : versNombre('5,2') → 5.2 · versNombre('3 000') → 3000
//            versNombre('abc') → NaN · versNombre('') → NaN
// Attention : Number('') vaut 0, c'est pourquoi on utilise cette fonction.
export function versNombre(texte) {
  const nettoye = String(texte ?? '').replace(/\s/g, '').replace(',', '.');
  if (nettoye === '') {
    return NaN;
  }
  const nombre = Number(nettoye);
  return Number.isFinite(nombre) ? nombre : NaN;
}

// Renvoie true si le texte est une date qui existe, écrite au format AAAA-MM-JJ.
// Exemples : estDateValide('2026-10-22') → true
//            estDateValide('22/10/2026') → false · estDateValide('2026-02-30') → false
export function estDateValide(texte) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(texte))) {
    return false;
  }
  const date = new Date(`${texte}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === texte;
}
