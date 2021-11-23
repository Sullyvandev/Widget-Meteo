import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './widgetMeteo.scss';

/*
Surge : outil pour déployer un projet front en static
https://surge.sh/
- il faut avoir un build de production ('yarn build')
- il faut avoir installé surge en global sur la machine ('npm install --global surge')
=> accessible depuis n'importe quel projet
- pour déployer un projet : 'surge nom-du-dossier' avec le dossier qu'on veut 
déployer (par exemple dist ou build), appuyer sur Entrée quand il propose
un nom de domaine
- la première fois qu'on lance la commande 'surge' sur la machine il faut
indiquer des identifiants pour créer un compte
- il est possible qu'il y ait une erreur si le nom de domaine est déjà pris
"Aborted - you do not have permission to publish to untidy-disgust.surge.sh"
=> dans ce cas, relancer la commande jusqu'à ce que ça marche

Pour lister nos projets : `surge list`
Pour dépublier un projet : `surge teardown nom-de-domaine`
*/

const WidgetMeteo = ({ zipCode, city }) => {
  /*
  on crée une case dans le state pour stocker la température
  En argument on fournit la valeur initiale pour la case du state
  useState retourne un tableau avec 2 informations :
    - valeur actuelle de la case
    - fonction qui permet de changer la valeur
  Quand on fait appel à la fonction qui permet de changer la valeur, React
  fait automatiquement un rendu du composant
  */
 const [temperature, setTemperature] = useState('-');

 /*
 variable d'environnement : variable qui change de valeur en fonction de l'environnement
 dans lequel on est (development/production)
 Il y a des variables qui existent automatiquement, on peut aussi en ajouter
 */
 console.log('environment: ', process.env.NODE_ENV);

  useEffect(() => {
    // URL de l'API de dev 'http://localhost:1234'
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=45590,fr&APPID=8ecfba8f1cfd93f464921214e7a79f85&units=metric`)
    .then((response) => {
      // console.log(response);

      const temperatureFromApi = response.data.main.temp;
      // par exemple -9.632884455

      // on prépare la température à afficher : pas de décimales, et on ajoute °
      const temperatureToDisplay = `${temperatureFromApi.toFixed(0)}°`
      setTemperature(temperatureToDisplay);
    });
  }, [zipCode, city]);
  // effet appliqué juste après le premier rendu du composant, puis ré-appliqué
  // si les props changent de valeur

  return (
    <article className="weather-widget">
      <div className="weather-container">
        <div className="weather-infos">
          <h3 className="weather-city">{city}</h3>
          <p className="weather-zipcode">{zipCode}</p> 
        </div>
        <div className="weather-temperature">
          {temperature}
        </div>
      </div>
    </article>
  );
};

WidgetMeteo.propTypes = {
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default WidgetMeteo;
