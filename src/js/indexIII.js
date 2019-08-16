import { getForecast, getIcons, iconTitleBar } from './models/Forecast';
import * as forecastView from './views/forecastView';
import { getGeolocation } from './models/Geolocation';
import * as geolocationView from './views/geolocationView';
import {} from './models/Radar';
import * as radarView from './views/radarView';
import { proxy, mapboxToken } from '../js/config';
import axios from 'axios';
// Import Leaflet into L
// import * as L from 'leaflet';
import 'leaflet';
// Import the plugin library file directly, so it will change L
import 'leaflet.nontiledlayer';
import '../../node_modules/leaflet-timedimension/dist/leaflet.timedimension.src.js';
require('leaflet.control.layers.tree');

// Get lat, long from zip code
const getLocation = async(zip) => {
    const location = await getGeolocation(zip);
    console.log(location);
    const radarID = await forecast(location);
    // getRadarData(radarID);
    // await renderMap(location.latitude, location.longitude);
    // await renderVideoMap(location.latitude, location.longitude);
    map.setView(new L.LatLng(location.latitude, location.longitude), 11, { animate: true });
    //await renderRadar(location.latitude, location.longitude, location.city, location.state);
    await forecastView.renderForecast(radarID);
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

/*
MAP
*/

// 43.0493, -88.0414
const renderMap = (lat, long) => {

    // BASE LAYERS
    const mapBoxURL = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxToken}`;
    const createLayer = (idString) => {
        return L.tileLayer(mapBoxURL, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: idString
        });
    };
    const baseLayers = {
        light: createLayer('mapbox.light'),
        emerald: createLayer('mapbox.emerald'),
        streets: createLayer('mapbox.streets'),
        outdoors: createLayer('mapbox.outdoors'),
        runBikeHike: createLayer('mapbox.run-bike-hike'),
        satellite: createLayer('mapbox.satellite'),
        satelliteStreets: createLayer('mapbox.streets-satellite')
    };
    console.log(baseLayers);

    // NOAA Overlays
    // const createOverlay = (overlayURL) => {
    //     return new L.NonTiledLayer.WMS(overlayURL, {
    //         layers: '13',
    //         format: 'image/png',
    //         transparent: true,
    //         opacity: 0.8,
    //         attribution: 'nowCOAST'
    //     })
    // };
    const createOverlay = (overlayURL, layerCount) => {
        return new L.NonTiledLayer.WMS(overlayURL, {
            layers: layerCount,
            format: 'image/png',
            transparent: true,
            opacity: 0.8,
            attribution: 'nowCOAST'
        })
    };
    var proxy = 'server/proxy.php';
    const createTimeLayer = (nonTiledOverlay) => {
        return L.timeDimension.layer.wms(nonTiledOverlay, {
            proxy: proxy,
            updateTimeDimension: false,
            wmsVersion: '1.3.0'
        })
    };
    const shortWatchURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer';
    const shortWarningURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/WmsServer';
    const longHazardsURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/WmsServer';
    const significantWeatherOutlookURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/guidance_natlcenters_meteoceanhydro_outlooks_time/MapServer/WmsServer';
    const overlayNonTiledLayers = {
        radarWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer', '1'),
        lightningWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer', '1'),
        shortWatchesWMS: {
            flashFlood: createOverlay(shortWatchURL, '0'),
            severeThunderstorm: createOverlay(shortWatchURL, '1'),
            tornado: createOverlay(shortWatchURL, '2')
        },
        shortWarningsWMS: {
            dustAdvisory: createOverlay(shortWarningURL, '0'),
            dustStormWarning: createOverlay(shortWarningURL, '1'),
            snowSquallWarning: createOverlay(shortWarningURL, '2'),
            flashFloodWarning: createOverlay(shortWarningURL, '3'),
            severeThunderstormWarning: createOverlay(shortWarningURL, '4'),
            extremeWindWarning: createOverlay(shortWarningURL, '5'),
            tornadoWarning: createOverlay(shortWarningURL, '6'),
            specialMarineWarning: createOverlay(shortWarningURL, '7'),
        },
        longHazardsWMS: {
            airQualityZ: createOverlay(longHazardsURL, '1'),
            airQualityD: createOverlay(longHazardsURL, '2'),
            wildfireConditions: createOverlay(longHazardsURL, '5'),
            coldAndHeat: createOverlay(longHazardsURL, '8'),
            snowAndFreezingPrecipitation: createOverlay(longHazardsURL, '11'),
            freezingSprayMaritime: createOverlay(longHazardsURL, '14'),
            inlandAndCoastalAreas: createOverlay(longHazardsURL, '18'),
            maritimeAreas: createOverlay(longHazardsURL, '21'),
            inlandAreas: createOverlay(longHazardsURL, '25'),
            coastalAreas: createOverlay(longHazardsURL, '28'),
            immediateCoast: createOverlay(longHazardsURL, '32'),
        },
        significantWeatherOutlookWMS: {
            nonDryThunderstormCriticalFire: createOverlay(significantWeatherOutlookURL, '1'),
            dryThunderstormCriticalFire: createOverlay(significantWeatherOutlookURL, '5'),
            severeThunderstorm: createOverlay(significantWeatherOutlookURL, '9')
        },
        griddedForecastWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer/WmsServer', '25'),
        maxTempWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_dailymaxairtemp_offsets/MapServer/WmsServer', '13'),
        precipitationWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer', '9'),

    };
    const timeLayers = {
        radarTimeLayer: createTimeLayer(overlayNonTiledLayers.radarWMS),
        lightningLayer: createTimeLayer(overlayNonTiledLayers.lightningWMS),
        shortWatchesLayer: {
            flashFloodLayer: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.flashFlood),
            severeThunderstormLayer: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.severeThunderstorm),
            tornado: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.tornado)
        },
        shortWarningsLayer: {
            dustAdvisory: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.dustAdvisory),
            dustStormWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.dustStormWarning),
            snowSquallWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.snowSquallWarning),
            flashFloodWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.flashFloodWarning),
            severeThunderstormWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.severeThunderstormWarning),
            extremeWindWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.extremeWindWarning),
            tornadoWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.tornadoWarning),
            specialMarineWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.specialMarineWarning),
        },
        // shortWatchesLayer: L.layerGroup([
        //     createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.flashFlood),
        //     createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.severeThunderstorm),
        //     createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.tornado)
        // ]),
        // shortWarningsLayer: L.layerGroup([
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.dustAdvisory),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.dustStormWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.snowSquallWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.flashFloodWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.severeThunderstormWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.extremeWindWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.tornadoWarning),
        //     createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.specialMarineWarning),
        // ]),
        longHazardsLayer: L.layerGroup([
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.airQualityZ),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.airQualityD),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.wildfireConditions),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.coldAndHeat),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.snowAndFreezingPrecipitation),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.freezingSprayMaritime),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.inlandAndCoastalAreas),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.maritimeAreas),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.inlandAreas),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.coastalAreas),
            createTimeLayer(overlayNonTiledLayers.longHazardsWMS.immediateCoast),
        ]),
        significantWeatherOutlookLayer: L.layerGroup([
            createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.nonDryThunderstormCriticalFire),
            createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.dryThunderstormCriticalFire),
            createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.severeThunderstorm)
        ]),
        griddedForecastLayer: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS),
        maxTempLayer: createTimeLayer(overlayNonTiledLayers.maxTempWMS),
        precipitationLayer: createTimeLayer(overlayNonTiledLayers.precipitationWMS),
    };


    // CREATE MAP
    const endDate = new Date();
    endDate.setUTCMinutes(0, 0, 0);
    const map = L.map('map', {
        center: new L.LatLng(lat, long),
        zoom: 4,
        layers: [baseLayers.emerald],
        //fullscreenControl: true,
        timeDimension: true,
        timeDimensionControl: true,
        timeDimensionOptions: {
            timeInterval: 'PT4H/' + endDate.toISOString(),
            period: 'PT4M',
            currentTime: endDate
        },
        timeDimensionControlOptions: {
            autoPlay: false,
            playerOptions: {
                buffer: 10,
                transitionTime: 250,
                loop: true,
            }
        }
    });
    console.log(L);
    console.log(L.nonTiledLayer);

    // RADAR: Legend
    const legend = L.control({
        position: 'bottomright'
    });
    legend.onAdd = (map) => {
        const src = 'https://nowcoast.noaa.gov/images/legends/radar.png';
        const div = L.DomUtil.create('div', 'info legend');
        div.style.width = '270px';
        div.style.height = '50px';
        div.innerHTML += '<b>Legend</b><br><img src="' + src + '" alt="legend">';
        return div;
    };
    legend.addTo(map);

    //LAYER CONTROL
    const baseMaps = {
        'Light': baseLayers.light,
        'Emerald': baseLayers.emerald,
        'Streets': baseLayers.streets,
        'Outdoors': baseLayers.outdoors,
        'Run, Bike, Hike': baseLayers.runBikeHike,
        'Satellite': baseLayers.satellite,
        'Satellite Streets': baseLayers.satelliteStreets,
    };

    const overlayMaps = {
        'NOAA NWS NEXRAD MRMS Weather Radar Imagery (Time Enabled)': timeLayers.radarTimeLayer,
        'NOAA NWS Emulated GOES-R Lightning Strike Density (Time Enabled)': timeLayers.lightningLayer,
        'NOAA NWS Watches for Short-Duration Hazards for Inland, Coastal, and Maritime Areas (Time Enabled)': timeLayers.shortWatchesLayer,
        'NOAA NWS Weather Warnings for Short-Duration Hazards in Inland, Coastal, and Maritime Areas (Time Enabled)': timeLayers.shortWarningsLayer,
        'NOAA NWS Watches, Warnings, Advisories, and Statements for Long-Duration Hazards (Time Enabled)': timeLayers.longHazardsLayer,
        'NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts (Time Enabled)': timeLayers.griddedForecastLayer,
        'NOAA NWS NCEP Significant Weather Outlooks': timeLayers.significantWeatherOutlookLayer,
        'NOAA NWS NDFD Forecasts of Daily Max Surface Air Temperature (deg. F) (Time Offsets)': timeLayers.maxTempLayer,
        'NOAA Quantitative Precipitation Estimates (Time Enabled): 24-Hour Quantitative Precipitation Accumulation (inches)': timeLayers.precipitationLayer,
    };

    // Add to Leaflet's built-in layer control
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    return map;
};
const map = renderMap(38.0, -90.50);;