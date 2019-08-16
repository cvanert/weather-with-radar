import { getForecast, getIcons, iconTitleBar } from './models/Forecast';
import * as forecastView from './views/forecastView';
import { getGeolocation } from './models/Geolocation';
import * as geolocationView from './views/geolocationView';
import { renderMap } from './models/Map';
import * as mapView from './views/mapView';
import 'leaflet';
import axios from 'axios';

const map = renderMap(38.0, -90.50);
// Get lat, long from zip code

const getLocation = async(zip) => {
    const location = await getGeolocation(zip);
    console.log(location);
    const weather = await forecast(location);
    // getRadarData(radarID);
    // await renderMap(location.latitude, location.longitude);
    // await renderVideoMap(location.latitude, location.longitude);
    //const container = L.DomUtil.setTransform('map', [location.latitude, location.longitude], 11, { animate: true });
    await map.setView([location.latitude, location.longitude], 11, { animate: true });

    //await L.map('map').setView(new L.LatLng(location.latitude, location.longitude), 11, { animate: true });
    //await renderRadar(location.latitude, location.longitude, location.city, location.state);

    await forecastView.renderForecast(weather[0]);
    await forecastView.renderCurrent(weather[1]);
}

/*
const forecast = async(obj) => {
    const data = await getForecast(obj.latitude.toString(), obj.longitude.toString());
}
*/

const forecast = async(obj) => {
    console.log(obj);
    const data = await getForecast(obj.latitude.toString(), obj.longitude.toString());
    //return data.radarID;
    // const data = await getForecast(43.0493, -88.0414);
    return data;
};

document.querySelector('.zip_input_button').addEventListener('click', function() {
    const input = document.querySelector('.zip_code').value;
    getLocation(input);
});




// https://www.wpc.ncep.noaa.gov/proto_gudes/jason/test/test3.html


// forecastView.iconTitleBar();