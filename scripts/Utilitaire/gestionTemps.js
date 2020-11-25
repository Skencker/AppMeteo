// correspondre les jours de la semaine en fonction du jour actuel

const tableauSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

// recuperer le jour de la date actuelle

let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);
//console.log(jourActuel);

//met en majuscule la première lettre du jourde la semaine
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1); //
//console.log(jourActuel);

//mettre a jour le tableau de la semaine en fonction du jour actuel

let tableauSemaineOrdre = tableauSemaine
  .slice(tableauSemaine.indexOf(jourActuel))
  .concat(tableauSemaine.slice(0, tableauSemaine.indexOf(jourActuel)));

export default tableauSemaineOrdre;
