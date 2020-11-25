import tableauSemaineOrdre from "./Utilitaire/gestionTemps.js";

//cle api de api openweathermap.org
const api_key = "445a69057552d763082baec2aefb8976";
let resultatsApi;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".h_heure");
const h_temperature = document.querySelectorAll(".h_temperature");
const jours = document.querySelectorAll(".s_jour");
const s_temperature = document.querySelectorAll(".s_temperature");
const imgIcone = document.querySelector(".logo");
const chargementWrapper = document.querySelector(".overlay-icone-chargement");

//geolocalisation

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //console.log(position);

      //récuperer la longitude
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      //console.log("la longitude" + long + "la latitude " + lat);

      //faire appel à l'api pour récuperer la lon et lat avec une fonction

      appelApi(long, lat);
    },
    () => {
      alert(
        `vous avez refusé la géolocalisation, l'application ne peut pas récuperer votre position`
      );
    }
  );
}
//fonction récupère long et lat de l'api
function appelApi(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${api_key}`
  )
    .then((reponse) => {
      //codé la reponse de l'api en json
      return reponse.json();
    })
    .then((data) => {
      console.log(data);
      //on stock la reponse de l'api dans une constante
      resultatsApi = data;

      //console.log(resultatsApi.current.temp);
      // affichage temps actuel
      temps.innerText = resultatsApi.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatsApi.current.temp)}°`;
      localisation.innerText = resultatsApi.timezone;

      //je recupère l'heure actuelle
      let heureActuelle = new Date().getHours();

      //je fais une boucle pour récupèrer l'heure toute les 3 heures
      for (let i = 0; i < heure.length; i++) {
        //ajoute 3h à chaque iteration
        let heureIncr = heureActuelle + i * 3;

        //modifier l'heure quand on dépasse 24h sinon 27h etc...
        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = "00h";
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }
      //console.log("heure = " + heureActuelle);

      //temperature pour toute les 3 heures
      for (let i = 0; i < h_temperature.length; i++) {
        h_temperature[i].innerText = `${Math.trunc(
          resultatsApi.hourly[i * 3].temp
        )}°`;
      }

      // trois première lettre des jours se refere au fichier gestionTemps

      for (let i = 0; i < tableauSemaineOrdre.length; i++) {
        jours[i].innerText = tableauSemaineOrdre[i].slice(0, 3);
      }

      //console.log(tableauSemaine);

      //temperature par jour

      for (let i = 0; i < s_temperature.length; i++) {
        s_temperature[i].innerText = `${Math.trunc(
          resultatsApi.daily[i + 1].temp.day
        )}°`;
      }

      // Icone dynamique
      if (heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatsApi.current.weather[0].icon}.svg`;
      } else {
        imgIcone.src = `ressources/nuit/${resultatsApi.current.weather[0].icon}.svg`;
      }

      //chrgement de la page
      chargementWrapper.classList.add("disparition");
    });
}
