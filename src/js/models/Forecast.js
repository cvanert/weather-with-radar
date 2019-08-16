import axios from 'axios';
import { key, proxy } from '../config';

const tempToF = (c) => {
    return (c * (5 / 9)) + 32;
};

const windToMPH = (ms) => {
    return ms * 2.23694;
};

const windDirection = (deg) => {
    return deg <= 11.25 ? 'N' :
        deg <= 33.75 ? 'NNE' :
        deg <= 56.25 ? 'NE' :
        deg <= 78.75 ? 'ENE' :
        deg <= 101.25 ? 'E' :
        deg <= 123.75 ? 'ESE' :
        deg <= 146.25 ? 'SE' :
        deg <= 168.75 ? 'SSE' :
        deg <= 191.25 ? 'S' :
        deg <= 213.75 ? 'SSW' :
        deg <= 236.25 ? 'SW' :
        deg <= 258.75 ? 'WSW' :
        deg <= 281.25 ? 'W' :
        deg <= 303.75 ? 'WNW' :
        deg <= 326.25 ? 'NW' :
        deg <= 348.75 ? 'NNW' :
        'N'
};

const barometerToIn = (pa) => {
    return 0.0295300 * (pa / 100);
};


// First request: Tells app where to find relative information (e.g., office, zone, forecast) for a given point
// App can then use linked date to locate raw forecast
export const getForecast = async(lat, long) => {
    const result = await axios(`https://api.weather.gov/points/${lat},${long}`);
    const weatherObj = {
            forecast: await axios(result.data.properties.forecast),
            radarID: result.data.properties.cwa,
            forecastGridData: await axios(result.data.properties.forecastGridData),
            forecastHourly: await axios(result.data.properties.forecastHourly),
            gridX: result.data.properties.gridX,
            gridY: result.data.properties.gridY,
        }
        //     // const forecast = weatherObj.forecast.data.properties.periods;
    console.log(weatherObj, result);
    const current = await getCurrent(weatherObj.radarID, weatherObj.gridX, weatherObj.gridY);
    return [weatherObj, current];
};

/*
export const getForecast = async(lat, long) => {
    const result = await axios(`${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`);
    return weatherObj;
};
*/

export const getCurrent = async(stationID, gridX, gridY) => {
    const result = await axios(`https://api.weather.gov/gridpoints/${stationID}/${gridX},${gridY}/stations
    `);
    const latest = await axios(`${result.data.observationStations[0]}/observations/latest`);
    const current = latest.data.properties;
    const currentObj = {
        description: current.textDescription,
        temperature: {
            f: tempToF(current.temperature.value),
            c: current.temperature.value,
        },
        humidity: current.relativeHumidity.value,
        wind: {
            speed: windToMPH(current.windSpeed.value),
            direction: windDirection(current.windDirection.value),
        },
        barometer: {
            inHg: barometerToIn(current.barometricPressure.value),
            mb: current.barometricPressure.value / 100,
        },
        dewpoint: {
            f: tempToF(current.dewpoint.value),
            c: current.dewpoint.value,
        },
        visibility: current.visibility.value / 1609.344,
        heatIndex: {
            f: tempToF(current.heatIndex.value),
            c: current.heatIndex.value,
        },
        windChill: {
            f: tempToF(current.windChill.value),
            c: current.windChill.value,
        },
        lastUpdated: current.timestamp,
        icon: current.icon,

    };
    console.log(result, current, currentObj);
    return currentObj;
}