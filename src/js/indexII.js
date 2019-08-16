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
            flashFlood: createOverlay(shortWatchURL, '2'),
            severeThunderstorm: createOverlay(shortWatchURL, '1'),
            tornado: createOverlay(shortWatchURL, '0')
        },
        shortWarningsWMS: {
            dustAdvisory: createOverlay(shortWarningURL, '7'),
            dustStormWarning: createOverlay(shortWarningURL, '6'),
            snowSquallWarning: createOverlay(shortWarningURL, '5'),
            flashFloodWarning: createOverlay(shortWarningURL, '4'),
            severeThunderstormWarning: createOverlay(shortWarningURL, '3'),
            extremeWindWarning: createOverlay(shortWarningURL, '2'),
            tornadoWarning: createOverlay(shortWarningURL, '1'),
            specialMarineWarning: createOverlay(shortWarningURL, '0'),
        },
        longHazardsWMS: {
            highWindsMaritime: createOverlay(longHazardsURL, '2'),
            highWindsCoastal: createOverlay(longHazardsURL, '5'),
            seaSurfBeachMaritime: createOverlay(longHazardsURL, '9'),
            seaSurfBeachImmediate: createOverlay(longHazardsURL, '12'),
            floodingRiver: createOverlay(longHazardsURL, '19'),
            floodingCoastal: createOverlay(longHazardsURL, '16'),
            reducedVisibilityMaritime: createOverlay(longHazardsURL, '23'),
            reducedVisibilityCoastal: createOverlay(longHazardsURL, '26'),
            freezingSpray: createOverlay(longHazardsURL, '29'),
            snowAndFreezingRain: createOverlay(longHazardsURL, '32'),
            coldAndHeat: createOverlay(longHazardsURL, '35'),
            wildfire: createOverlay(longHazardsURL, '38'),
            airQuality: createOverlay(longHazardsURL, '41')
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
            flashFlood: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.flashFlood),
            severeThunderstorm: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.severeThunderstorm),
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
        longHazardsLayer: {
            highWindsMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.highWindsMaritime),
            highWindsCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.highWindsCoastal),
            seaSurfBeachMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.seaSurfBeachMaritime),
            seaSurfBeachImmediate: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.seaSurfBeachImmediate),
            floodingRiver: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.floodingRiver),
            floodingCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.floodingCoastal),
            reducedVisibilityMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.reducedVisibilityMaritime),
            reducedVisibilityCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.reducedVisibilityCoastal),
            freezingSpray: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.freezingSpray),
            snowAndFreezingRain: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.snowAndFreezingRain),
            coldAndHeat: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.coldAndHeat),
            wildFire: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.wildfire),
            airQuality: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.airQuality),
        },
        significantWeatherOutlookLayer: {
            nonDryThunderstormCriticalFire: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.nonDryThunderstormCriticalFire),
            dryThunderstormCriticalFire: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.dryThunderstormCriticalFire),
            severeThunderstorm: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.severeThunderstorm)
        },
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
    const baseTree = {
        label: 'Base Layers',
        children: [
            { label: 'Light', layer: baseLayers.light },
            { label: 'Emerald', layer: baseLayers.emerald },
            { label: 'Streets', layer: baseLayers.streets },
            { label: 'Outdoors', layer: baseLayers.outdoors },
            { label: 'Run, Bike, Hike', layer: baseLayers.runBikeHike },
            { label: 'Satellite', layer: baseLayers.satellite },
            { label: 'Satellite Streets', layer: baseLayers.satelliteStreets }
        ]
    };

    const overlayTree = {
        label: 'NOAA NWS Overlay Layers',
        children: [
            { label: 'NEXRAD MRMS Weather Radar Imagery (Time Enabled)', layer: timeLayers.radarTimeLayer },
            { label: 'Emulated GOES-R Lightning Strike Density (Time Enabled)', layer: timeLayers.lightningLayer },
            {
                label: 'Watches, Warnings, Advisories, and Statements',
                children: [{
                        label: 'Short-Duration',
                        children: [{
                                label: 'Storms (e.g., Thunderstorms, Tornadoes, Water Spouts)',
                                children: [
                                    { label: 'Severe Thunderstorm Watch', layer: timeLayers.shortWatchesLayer.severeThunderstorm },
                                    { label: 'Severe Thunderstorm Warning', layer: timeLayers.shortWarningsLayer.severeThunderstormWarning },
                                    { label: 'Tornado Watch', layer: timeLayers.shortWatchesLayer.tornado },
                                    { label: 'Tornado Warning', layer: timeLayers.shortWarningsLayer.tornadoWarning },
                                    { label: 'Special Marine Warning', layer: timeLayers.shortWatchesLayer.specialMarineWarning }
                                ]
                            },
                            {
                                label: 'Flash Flooding',
                                children: [
                                    { label: 'Flash Flood Watch', layer: timeLayers.shortWatchesLayer.flashFlood },
                                    { label: 'Flash Flood Warning', layer: timeLayers.shortWarningsLayer.flashFloodWarning }
                                ]
                            },
                            {
                                label: 'Other Hazards',
                                children: [
                                    { label: 'Extreme Wind', layer: timeLayers.shortWarningsLayer.extremeWindWarning },
                                    { label: 'Snow Squall Warning', layer: timeLayers.shortWarningsLayer.snowSquallWarning },
                                    { label: 'Dust Advisory', layer: timeLayers.shortWarningsLayer.dustAdvisory },
                                    { label: 'Dust Storm Warning', layer: timeLayers.shortWarningsLayer.dustStormWarning }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Long-Duration',
                        children: [{
                                label: 'High Winds',
                                children: [
                                    { label: 'Maritime Areas', layer: timeLayers.shortWatchesLayer.highWindsMaritime },
                                    { label: 'Coastal and Inland Areas', layer: timeLayers.shortWarningsLayer.highWindsCoastal }
                                ]
                            },
                            {
                                label: 'Hazardous Seas, Surf, and Beach Conditions',
                                children: [
                                    { label: 'Maritime Areas', layer: timeLayers.shortWatchesLayer.seaSurfBeachMaritime },
                                    { label: 'Immediate Coast', layer: timeLayers.shortWarningsLayer.seaSurfBeachImmediate }
                                ]
                            },
                            {
                                label: 'Flooding',
                                children: [
                                    { label: 'River/Inland Areas', layer: timeLayers.longHazardsLayer.floodingRiver },
                                    { label: 'Coastal Areas', layer: timeLayers.longHazardsLayer.floodingCoastal }
                                ]
                            },
                            {
                                label: 'Reduced Visibility',
                                children: [
                                    { label: 'Maritime Areas', layer: timeLayers.longHazardsLayer.reducedVisibilityMaritime },
                                    { label: 'Coastal and Inland Areas', layer: timeLayers.longHazardsLayer.reducedVisibilityCoastal }
                                ]
                            },
                            { label: 'Freezing Spray', layer: timeLayers.longHazardsLayer.freezingSpray },
                            { label: 'Snowfall and Freezing Rain', layer: timeLayers.longHazardsLayer.snowAndFreezingRain },
                            { label: 'Extreme Cold and Heat', layer: timeLayers.longHazardsLayer.coldAndHeat },
                            { label: 'Critical Wildfire Conditions', layer: timeLayers.longHazardsLayer.wildFire },
                            { label: 'Unhealthy Air Quality', layer: timeLayers.longHazardsLayer.airQuality },
                        ]
                    }
                ]
            },
            {
                label: 'NCEP Significant Weather Outlooks',
                children: [
                    { label: 'Severe Thunderstorms Outlook', layer: timeLayers.significantWeatherOutlookLayer.severeThunderstorm },
                    { label: 'Dry Thunderstorm Critical Fire Weather Outlook', label: timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire },
                    { label: 'Non-Dry Thunderstorm Critical Fire Weather Outlook', label: timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire }
                ]
            }
        ]
    }

    const overlayMaps = {

    };

    // Add to Leaflet's built-in layer control
    L.control.layers.tree(baseLayers, overlayTree).addTo(map);
    return map;
};
const map = renderMap(38.0, -90.50);;




// https://www.wpc.ncep.noaa.gov/proto_gudes/jason/test/test3.html


// forecastView.iconTitleBar();

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
// require('leaflet-panel-layers');
import 'leaflet.nontiledlayer';
import '../../node_modules/leaflet-timedimension/dist/leaflet.timedimension.src.js';
import 'leaflet-groupedlayercontrol';



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
    console.log(L.NonTiledLayer);
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
            flashFlood: createOverlay(shortWatchURL, '2'),
            severeThunderstorm: createOverlay(shortWatchURL, '1'),
            tornado: createOverlay(shortWatchURL, '0')
        },
        shortWarningsWMS: {
            dustAdvisory: createOverlay(shortWarningURL, '7'),
            dustStormWarning: createOverlay(shortWarningURL, '6'),
            snowSquallWarning: createOverlay(shortWarningURL, '5'),
            flashFloodWarning: createOverlay(shortWarningURL, '4'),
            severeThunderstormWarning: createOverlay(shortWarningURL, '3'),
            extremeWindWarning: createOverlay(shortWarningURL, '2'),
            tornadoWarning: createOverlay(shortWarningURL, '1'),
            specialMarineWarning: createOverlay(shortWarningURL, '0'),
        },
        longHazardsWMS: {
            highWindsMaritime: createOverlay(longHazardsURL, '2'),
            highWindsCoastal: createOverlay(longHazardsURL, '5'),
            seaSurfBeachMaritime: createOverlay(longHazardsURL, '9'),
            seaSurfBeachImmediate: createOverlay(longHazardsURL, '12'),
            floodingRiver: createOverlay(longHazardsURL, '19'),
            floodingCoastal: createOverlay(longHazardsURL, '16'),
            reducedVisibilityMaritime: createOverlay(longHazardsURL, '23'),
            reducedVisibilityCoastal: createOverlay(longHazardsURL, '26'),
            freezingSpray: createOverlay(longHazardsURL, '29'),
            snowAndFreezingRain: createOverlay(longHazardsURL, '32'),
            coldAndHeat: createOverlay(longHazardsURL, '35'),
            wildfire: createOverlay(longHazardsURL, '38'),
            airQuality: createOverlay(longHazardsURL, '41')
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
            flashFlood: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.flashFlood),
            severeThunderstorm: createTimeLayer(overlayNonTiledLayers.shortWatchesWMS.severeThunderstorm),
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
        longHazardsLayer: {
            highWindsMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.highWindsMaritime),
            highWindsCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.highWindsCoastal),
            seaSurfBeachMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.seaSurfBeachMaritime),
            seaSurfBeachImmediate: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.seaSurfBeachImmediate),
            floodingRiver: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.floodingRiver),
            floodingCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.floodingCoastal),
            reducedVisibilityMaritime: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.reducedVisibilityMaritime),
            reducedVisibilityCoastal: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.reducedVisibilityCoastal),
            freezingSpray: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.freezingSpray),
            snowAndFreezingRain: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.snowAndFreezingRain),
            coldAndHeat: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.coldAndHeat),
            wildFire: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.wildfire),
            airQuality: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.airQuality),
        },
        significantWeatherOutlookLayer: {
            nonDryThunderstormCriticalFire: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.nonDryThunderstormCriticalFire),
            dryThunderstormCriticalFire: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.dryThunderstormCriticalFire),
            severeThunderstorm: createTimeLayer(overlayNonTiledLayers.significantWeatherOutlookWMS.severeThunderstorm)
        },
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

    const groupedOverlays = {
        'NOAA NWS Overlay Layers': {
            'NEXRAD MRMS Weather Radar Imagery (Time Enabled)': timeLayers.radarTimeLayer,
            'Emulated GOES-R Lightning Strike Density (Time Enabled)': timeLayers.lightningLayer,
            'Watches, Warnings, Advisories, and Statements': {
                'Short-Duration': {
                    'Storms (e.g., Thunderstorms, Tornadoes, Water Spouts)': {
                        'Severe Thunderstorm Watch': timeLayers.shortWatchesLayer.severeThunderstorm,
                        'Severe Thunderstorm Warning': timeLayers.shortWarningsLayer.severeThunderstormWarning,
                        'Tornado Watch': timeLayers.shortWatchesLayer.tornada
                    },
                    'Tornado Warning': timeLayers.shortWarningsLayer.tornadoWarning,
                    'Special Marine Warning': timeLayers.shortWatchesLayer.specialMarineWarning
                },
                'Flash Flooding': {
                    'Flash Flood Watch': timeLayers.shortWatchesLayer.flashFlood,
                    'Flash Flood Warning': timeLayers.shortWarningsLayer.flashFloodWarning
                },
                'Other Hazards': {
                    'Extreme Wind': timeLayers.shortWarningsLayer.extremeWindWarning,
                    'Snow Squall Warning': timeLayers.shortWarningsLayer.snowSquallWarning,
                    'Dust Advisory': timeLayers.shortWarningsLayer.dustAdvisory,
                    'Dust Storm Warning': timeLayers.shortWarningsLayer.dustStormWarning
                }
            },
            'Long-Duration': {
                'High Winds': {
                    'Maritime Areas': timeLayers.shortWatchesLayer.highWindsMaritime,
                    'Coastal and Inland Areas': timeLayers.shortWarningsLayer.highWindsCoastal
                },
                'Hazardous Seas, Surf, and Beach Conditions': {
                    'Maritime Areas': timeLayers.shortWatchesLayer.seaSurfBeachMaritime,
                    'Immediate Coast': timeLayers.shortWarningsLayer.seaSurfBeachImmediate
                },
                'Flooding': {
                    'River/Inland Areas': timeLayers.longHazardsLayer.floodingRiver,
                    'Coastal Areas': timeLayers.longHazardsLayer.floodingCoastal
                },
                'Reduced Visibility': {
                    'Maritime Areas': timeLayers.longHazardsLayer.reducedVisibilityMaritime,
                    'Coastal and Inland Areas': timeLayers.longHazardsLayer.reducedVisibilityCoastal
                },
            },
            'Freezing Spray': timeLayers.longHazardsLayer.freezingSpray,
            'Snowfall and Freezing Rain': timeLayers.longHazardsLayer.snowAndFreezingRain,
            'Extreme Cold and Heat': timeLayers.longHazardsLayer.coldAndHeat,
            'Critical Wildfire Conditions': timeLayers.longHazardsLayer.wildFire,
            'Unhealthy Air Quality': timeLayers.longHazardsLayer.airQuality,
        },
        'NCEP Significant Weather Outlooks': {
            'Severe Thunderstorms Outlook': timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
            'Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
            'Non-Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
        }
    }
    L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);
};

// Add to Leaflet's built-in layer control
// L.control.layers.tree(baseTree, overlayTree, null).addTo(map);

const map = renderMap(38.0, -90.50);;




// https://www.wpc.ncep.noaa.gov/proto_gudes/jason/test/test3.html


// forecastView.iconTitleBar();

const groupedOverlays = {
    'Remotely-Sensed': {
        'NEXRAD MRMS Weather Radar Imagery (Time Enabled)': timeLayers.radarTimeLayer,
        'Emulated GOES-R Lightning Strike Density (Time Enabled)': timeLayers.lightningLayer,
    },
    'Short-Duration Hazards': {
        'Severe Thunderstorm Watch': timeLayers.shortWatchesLayer.severeThunderstorm,
        'Severe Thunderstorm Warning': timeLayers.shortWarningsLayer.severeThunderstormWarning,
        'Tornado Watch': timeLayers.shortWatchesLayer.tornado,
        'Tornado Warning': timeLayers.shortWarningsLayer.tornadoWarning,
        'Special Marine Warning': timeLayers.shortWatchesLayer.specialMarineWarning,
        'Flash Flood Watch': timeLayers.shortWatchesLayer.flashFlood,
        'Flash Flood Warning': timeLayers.shortWarningsLayer.flashFloodWarning,
        'Extreme Wind': timeLayers.shortWarningsLayer.extremeWindWarning,
        'Snow Squall Warning': timeLayers.shortWarningsLayer.snowSquallWarning,
        'Dust Advisory': timeLayers.shortWarningsLayer.dustAdvisory,

    },
    'Long-Duration Hazards': {
        'High Winds: Maritime Areas': timeLayers.shortWatchesLayer.highWindsMaritime,
        'High Winds: Coastal and Inland Areas': timeLayers.shortWarningsLayer.highWindsCoastal,
        'Hazardous Seas, Surf, and Beach Conditions: Maritime Areas': timeLayers.shortWatchesLayer.seaSurfBeachMaritime,
        'Hazardous Seas, Surf, and Beach Conditions: Immediate Coast': timeLayers.shortWarningsLayer.seaSurfBeachImmediate,
        'Flooding: River/Inland Areas': timeLayers.longHazardsLayer.floodingRiver,
        'Flooding: Coastal Areas': timeLayers.longHazardsLayer.floodingCoastal,
        'Reduced Visibility: Maritime Areas': timeLayers.longHazardsLayer.reducedVisibilityMaritime,
        'Reduced Visibility: Coastal and Inland Areas': timeLayers.longHazardsLayer.reducedVisibilityCoastal,
        'Freezing Spray': timeLayers.longHazardsLayer.freezingSpray,
        'Snowfall and Freezing Rain': timeLayers.longHazardsLayer.snowAndFreezingRain,
        'Extreme Cold and Heat': timeLayers.longHazardsLayer.coldAndHeat,
        'Critical Wildfire Conditions': timeLayers.longHazardsLayer.wildFire,
        'Unhealthy Air Quality': timeLayers.longHazardsLayer.airQuality,
    },
    'NCEP Significant Weather Outlooks': {
        'Severe Thunderstorms Outlook': timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
        'Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
        'Non-Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
    }
    L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);
};