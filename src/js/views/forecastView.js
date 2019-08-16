import { stringify } from "querystring";

const round = (num) => {
    console.log(num);
    if (typeof(num) === 'number') {
        return parseFloat(num.toFixed(2));
    } else {
        return 'N/A';
    }
};

// Change view (map vs. forecast)
const getBodyView = () => {
    let radios = document.getElementsByName('body_view');
    let map = document.querySelector('.map_container');
    let forecast = document.querySelector('.week_forecast_container')
    console.log(radios);
    let value;
    for (var i = 0; i < radios.length; i++) {
        if (!radios[i].checked) {
            value = radios[i].value;
        }
    }
    if (value === 'weather_map') {
        map.classList.toggle('hidden');
        forecast.classList.toggle('hidden');
    } else {
        map.classList.toggle('hidden');
        forecast.classList.toggle('hidden');
    }
};

export const renderCurrent = async(obj) => {
    const displayContainer = document.querySelector('.top_current_display');
    displayContainer.innerHTML = '';
    const markup = `
        <div class="current_weather_container">
            <div class="current_conditions_left">
                <div class="icon_container">
                    <img src=${obj.icon} alt=${obj.description}>
                </div>
                <div class="temp_container">
                    <div class="current_description">${obj.description}</div>
                    <div class="currentF">${await round(obj.temperature.f)}°F</div>
                    <div class="currentC">(${await round(obj.temperature.c)}°C)</div>
                </div>
            </div>
            <div class="current_other">
                <div class="current_container">
                    <div class="current_label">Humidity:</div>
                    <div class="humidity">${await round(obj.humidity)}%</div>
                    <div></div>
                </div>
                <div class="current_container">
                    <div class="current_label">Wind Speed:</div>
                    <div class="wind_speed">${obj.wind.direction} ${await round(obj.wind.speed)} mph</div>
                    <div></div>
                </div>
                <div class="current_container">
                    <div class="current_label">Barometer:</div>
                    <div class="barometerIn">${await round(obj.barometer.in)} in</div>
                    <div class="barometerMb">(${await round(obj.barometer.mb)} mb)</div>
                </div>
                <div class="current_container">
                    <div class="current_label">Detpoint:</div>
                    <div class="dewpointF">${await round(obj.dewpoint.f)}°F</div>
                    <div class="dewpointC">(${await round(obj.dewpoint.c)}°C)</div>
                </div>
                <div class="current_container">
                    <div class="current_label">Visibility:</div>
                    <div class="visibility">${await round(obj.visibility)} mi</div>
                    <div></div>
                </div>
                <div class="current_container">
                    <div class="current_label">Heat Index:</div>
                    <div class="heat_indexF">${await round(obj.heatIndex.f)}°F</div>
                    <div class="heat_indexC">(${await round(obj.heatIndex.c)}°C)</div>
                </div>
                <div class="current_container">
                    <div class="current_label">Wind Chill:</div>
                    <div class="wind_chillF">${await round(obj.windChill.f)}°F</div>
                    <div class="wind_chillC">(${await round(obj.windChill.c)}°C)</div>
                </div>
                <div class="current_container_2">
                    <div class="current_label">Last Updated:</div>
                    <div class="last_updated">${obj.lastUpdated}</div>
                </div>
            </div>
            
        </div>
        <div class="view_selector_container">
            <!--Full Forecast-->
            <input type="radio" id="full_forecast" name="body_view" value="full_forecast">
            <label for="full_forecast">Full Forecast</label><br>
            <!--Weather Map-->
            <input type="radio" id="weather_map" name="body_view" value="weather_map" checked>
            <label for="weather_map">Weather Map</label>
        </div>
    `
    displayContainer.insertAdjacentHTML('afterbegin', markup);
    document.querySelector('.view_selector_container').addEventListener('click', getBodyView);
};

export const renderForecast = (obj) => {
    document.querySelector('.week_forecast_container').innerHTML = '';
    const forecast = obj.forecast.data.properties.periods; // Array
    for (let i = 0; i < forecast.length; i = i + 2) {
        if (i % 2 === 0) {
            const detailedDayStrings = forecast[i].detailedForecast.split('.').map(str => `<div>${str.trim()}</div>`).join("");
            const detailedNightStrings = forecast[i + 1].detailedForecast.split('.').map(str => `<div>${str.trim()}</div>`).join("");
            console.log(detailedDayStrings, detailedNightStrings);
            const markup = `
                <div class="full_day_container">
                    <div class="day_container">
                        <div class="day_description_container">
                            <div class="day_label">${forecast[i].name}</div>
                            <div class="day_start">${forecast[i].startTime}</div>
                        </div>
                        <div class="day_forecast_container">
                            <div class="day_forecast_image">
                                <img src=${forecast[i].icon} alt=${forecast[i].shortForecast}>
                            </div>
                            <div class="day_detailed_forecast">${detailedDayStrings}</div>
                        </div>
                    </div>
                    <div class="night_container">
                        <div class="night_description_container">
                            <div class="night_label">${forecast[i + 1].name}</div>
                        </div>
                        <div class="night_forecast_container">
                            <div class="night_forecast_image">
                                <img src=${forecast[i + 1].icon} alt=${forecast[i + 1].shortForecast}>
                            </div>
                            <div class="night_detailed_forecast">${detailedNightStrings}</div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.week_forecast_container').insertAdjacentHTML('beforeend', markup);
            document.querySelector('.week_forecast_container').classList.add('hidden');
        }
    }
    // forecastDiv(obj);
}

const getHour = (str) => {
    const i = str.indexOf('T');
    return str.slice(i + 1, i + 6);
}

export const renderHourlyForecast = (obj) => {
    const forecastHourly = obj.forecastHourly.data.properties.periods; // Array
    let markupArr = [];
    forecastHourly.forEach(hour => {
        const markup = `
            <div class="hour_container">
                <div class="hour_description_container">
                    <div class="hour_label">${getHour(hour.startTime)}</div>
                    <div class="hour_forecast_image">
                        <img src=${hour.icon} alt=${hour.shortForecast}>
                    </div>
                    <div class="hour_temp">${hour.temperature}°F</div>
                </div>
                <div class="hour_forecast_container">
                    <div class="hour_forecast_short">Forecast: ${hour.shortForecast}</div>
                    <div class="hour_wind_speed">Wind Speed: ${hour.windSpeed}</div>
                    <div class="hour_wind_direction">Wind Direction: ${hour.windDirection}</div>
                </div>
            </div>
        `;
        markupArr.push(markup);
    });
    document.querySelector('.hourly').insertAdjacentHTML('beforeend', markupArr.join(' '));
}