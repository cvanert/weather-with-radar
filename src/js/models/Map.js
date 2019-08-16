import { mapboxToken } from '../../js/config';
import axios from 'axios';
import 'leaflet';
import 'leaflet.nontiledlayer';
import '../../../node_modules/leaflet-timedimension/dist/leaflet.timedimension.src.js';
import 'leaflet-groupedlayercontrol';
import * as mapView from '../views/mapView';

export const renderMap = (lat, long) => {

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

    // OVERLAY LAYERS
    const createOverlay = (overlayURL, layerCount) => {
        return new L.NonTiledLayer.WMS(overlayURL, {
            layers: layerCount,
            format: 'image/png',
            transparent: true,
            opacity: 0.7,
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
    const griddedForecastURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer/WmsServer';
    const overlayNonTiledLayers = {
        radarWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer', '1'),
        lightningWMS: createOverlay('https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer', '1'),
        shortWatchesWMS: {
            flashFlood: createOverlay(shortWatchURL, '0'),
            severeThunderstorm: createOverlay(shortWatchURL, '1'),
            tornado: createOverlay(shortWatchURL, '2')
        },
        shortWarningsWMS: {
            //dustAdvisory: createOverlay(shortWarningURL, '0'),
            //dustStormWarning: createOverlay(shortWarningURL, '1'),
            snowSquallWarning: createOverlay(shortWarningURL, '2'),
            flashFloodWarning: createOverlay(shortWarningURL, '3'),
            severeThunderstormWarning: createOverlay(shortWarningURL, '4'),
            extremeWindWarning: createOverlay(shortWarningURL, '5'),
            tornadoWarning: createOverlay(shortWarningURL, '6'),
            //specialMarineWarning: createOverlay(shortWarningURL, '7'),
        },
        longHazardsWMS: {
            //highWindsMaritime: createOverlay(longHazardsURL, '42'),
            //highWindsCoastal: createOverlay(longHazardsURL, '39'),
            //seaSurfBeachMaritime: createOverlay(longHazardsURL, '35'),
            //seaSurfBeachImmediate: createOverlay(longHazardsURL, '32'),
            floodingRiver: createOverlay(longHazardsURL, '25'),
            //floodingCoastal: createOverlay(longHazardsURL, '28'),
            //reducedVisibilityMaritime: createOverlay(longHazardsURL, '21'),
            //reducedVisibilityCoastal: createOverlay(longHazardsURL, '18'),
            //freezingSpray: createOverlay(longHazardsURL, '14'),
            snowAndFreezingRain: createOverlay(longHazardsURL, '11'),
            coldAndHeat: createOverlay(longHazardsURL, '8'),
            wildfire: createOverlay(longHazardsURL, '5'),
            airQuality: createOverlay(longHazardsURL, '2'),
        },
        significantWeatherOutlookWMS: {
            nonDryThunderstormCriticalFire: createOverlay(significantWeatherOutlookURL, '1'),
            dryThunderstormCriticalFire: createOverlay(significantWeatherOutlookURL, '5'),
            severeThunderstorm: createOverlay(significantWeatherOutlookURL, '9')
        },
        griddedForecastWMS: {
            dailyMaxTemp: createOverlay(griddedForecastURL, '49'),
            dailyMinTemp: createOverlay(griddedForecastURL, '45'),
            surfaceAirTemp: createOverlay(griddedForecastURL, '25'),
            apparentAirTemp: createOverlay(griddedForecastURL, '17'),
            surfaceDewPoint: createOverlay(griddedForecastURL, '21'),
            surfaceRelativeHumidity: createOverlay(griddedForecastURL, '13'),
            surfaceWindVelocity: createOverlay(griddedForecastURL, '53'),
            surfaceWindSpeed: createOverlay(griddedForecastURL, '9'),
            surfaceWindGust: createOverlay(griddedForecastURL, '5'),
            totalCloudCover: createOverlay(griddedForecastURL, '29'),
            precipitationAmount6: createOverlay(griddedForecastURL, '41'),
            snowfallAmount6: createOverlay(griddedForecastURL, '37'),
            precipitationProbability12: createOverlay(griddedForecastURL, '33'),
        },
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
            snowSquallWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.snowSquallWarning),
            flashFloodWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.flashFloodWarning),
            severeThunderstormWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.severeThunderstormWarning),
            extremeWindWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.extremeWindWarning),
            tornadoWarning: createTimeLayer(overlayNonTiledLayers.shortWarningsWMS.tornadoWarning),
        },
        longHazardsLayer: {
            floodingRiver: createTimeLayer(overlayNonTiledLayers.longHazardsWMS.floodingRiver),
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
        griddedForecastLayer: {
            dailyMaxTemp: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.dailyMaxTemp),
            dailyMinTemp: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.dailyMinTemp),
            surfaceAirTemp: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceAirTemp),
            apparentAirTemp: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.apparentAirTemp),
            surfaceDewPoint: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceDewPoint),
            surfaceRelativeHumidity: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceRelativeHumidity),
            surfaceWindVelocity: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceWindVelocity),
            surfaceWindSpeed: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceWindSpeed),
            surfaceWindGust: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.surfaceWindGust),
            totalCloudCover: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.totalCloudCover),
            precipitationAmount6: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.precipitationAmount6),
            snowfallAmount6: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.snowfallAmount6),
            precipitationProbability12: createTimeLayer(overlayNonTiledLayers.griddedForecastWMS.precipitationProbability12),
        },
    };


    // CREATE MAP
    const endDate = new Date();
    endDate.setUTCMinutes(0, 0, 0);
    const map = L.map('map', {
        center: new L.LatLng(lat, long),
        zoom: 4,
        layers: [baseLayers.emerald],
        fullscreenControl: true,
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
        const div = L.DomUtil.create('div', 'info_legend');
        div.style.width = '315px';
        div.style.height = '110px';
        div.innerHTML += '<div class="legend_top_container"> <select id="legend_category_select"><option value="">--Select Category--</option><option value="remotely_sensed">Remotely Sensed</option><option value="short_duration">Short-Duration Hazards</option><option value="long_duration">Long-Duration Hazards</option><option value="significant_weather_outlooks">Significant Weather Outlooks</option><option value="gridded_forecasts">Gridded Forecasts</option></select> </div> <div class="legend_middle_container"> </div><div class="legend_bottom_container"><button class="back_button">◀︎</button> <button class="forward_button">▶︎</button></div>';
        return div;
    };
    legend.addTo(map);

    //LAYER CONTROL
    const baseMaps = {
        // 'Light': baseLayers.light,
        'Emerald': baseLayers.emerald,
        'Streets': baseLayers.streets,
        'Outdoors': baseLayers.outdoors,
        'Run, Bike, Hike': baseLayers.runBikeHike,
        'Satellite': baseLayers.satellite,
        // 'Satellite Streets': baseLayers.satelliteStreets,
    };
    const shortWatchLegendURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=';
    const shortWatchLegend = {
        flashFlood: '0',
        severeThunderstorm: '1',
        tornado: '2'
    };
    const groupedOverlays = {
        //'NOAA NWS Remotely-Sensed': {
        "<span class='controlHeading group0'>Remotely-Sensed</span>": {
            'NEXRAD MRMS Weather Radar Imagery': timeLayers.radarTimeLayer,
            'Emulated GOES-R Lightning Strike Density': timeLayers.lightningLayer,
        },
        //'NOAA NWS Short-Duration Hazards': {
        "<span class='controlHeading group1'>Short-Duration Hazards</span>": {
            "<span class='controlLabel'>Severe Thunderstorm Watch</span>": timeLayers.shortWatchesLayer.severeThunderstorm,
            "<span class='controlLabel'>Severe Thunderstorm Warning</span>": timeLayers.shortWarningsLayer.severeThunderstormWarning,
            "<span class='controlLabel'>Tornado Watch</span>": timeLayers.shortWatchesLayer.tornado,
            "<span class='controlLabel'>Tornado Warning</span>": timeLayers.shortWarningsLayer.tornadoWarning,
            "<span class='controlLabel'>Flash Flood Watch</span>": timeLayers.shortWatchesLayer.flashFlood,
            "<span class='controlLabel'>Flash Flood Warning</span>": timeLayers.shortWarningsLayer.flashFloodWarning,
            "<span class='controlLabel'>Extreme Wind</span>": timeLayers.shortWarningsLayer.extremeWindWarning,
            "<span class='controlLabel'>Snow Squall Warning</span>": timeLayers.shortWarningsLayer.snowSquallWarning,
        },
        //'NOAA NWS Long-Duration Hazards': {
        "<span class='controlHeading group2'>Long-Duration Hazards</span>": {
            "<span class='controlLabel'>Flooding: River/Inland Areas</span>": timeLayers.longHazardsLayer.floodingRiver,
            "<span class='controlLabel'>Snowfall and Freezing Rain</span>": timeLayers.longHazardsLayer.snowAndFreezingRain,
            "<span class='controlLabel'>Extreme Cold and Heat</span>": timeLayers.longHazardsLayer.coldAndHeat,
            "<span class='controlLabel'>Critical Wildfire Conditions</span>": timeLayers.longHazardsLayer.wildFire,
            "<span class='controlLabel'>Unhealthy Air Quality</span>": timeLayers.longHazardsLayer.airQuality,
        },
        //'NOAA NWS NCEP Significant Weather Outlooks': {
        "<span class='controlHeading group3'>NCEP Significant Weather Outlooks</span>": {
            "<span class='controlLabel'>Severe Thunderstorms Outlook</span>": timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
            "<span class='controlLabel'>Dry Thunderstorm Critical Fire Weather Outlook</span>": timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
            "<span class='controlLabel'>Non-Dry Thunderstorm Critical Fire Weather Outlook</span>": timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
        },
        //NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts 
        "<span class='controlHeading group4'>NDFD Gridded Forecasts</span>": {
            "<span class='controlLabel'>Daily Maximum Air Temperature</span>": timeLayers.griddedForecastLayer.dailyMaxTemp,
            "<span class='controlLabel'>Daily Minimum Air Temperature</span>": timeLayers.griddedForecastLayer.dailyMinTemp,
            "<span class='controlLabel'>Surface Air Temperature</span>": timeLayers.griddedForecastLayer.surfaceAirTemp,
            "<span class='controlLabel'>Apparent Air Temperature</span>": timeLayers.griddedForecastLayer.apparentAirTemp,
            "<span class='controlLabel'>Surface Dew Point Temperature</span>": timeLayers.griddedForecastLayer.surfaceDewPoint,
            "<span class='controlLabel'>Surface Relative Humidity</span>": timeLayers.griddedForecastLayer.surfaceRelativeHumidity,
            "<span class='controlLabel'>Surface Wind Velocity (Barb)</span>": timeLayers.griddedForecastLayer.surfaceWindVelocity,
            "<span class='controlLabel'>Surface Wind Speed</span>": timeLayers.griddedForecastLayer.surfaceWindSpeed,
            "<span class='controlLabel'>Surface Wind Gust</span>": timeLayers.griddedForecastLayer.surfaceWindGust,
            "<span class='controlLabel'>Total Cloud Cover</span>": timeLayers.griddedForecastLayer.totalCloudCover,
            "<span class='controlLabel'>6-Hour Precipitation Amount</span>": timeLayers.griddedForecastLayer.precipitationAmount6,
            "<span class='controlLabel'>6-Hour Snowfall Amount</span>": timeLayers.griddedForecastLayer.snowfallAmount6,
            "<span class='controlLabel'>12-Hour Probability of Precipitation</span>": timeLayers.griddedForecastLayer.precipitationProbability12,
        }
    };
    const options = {
        groupCheckboxes: true,
    };
    L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);
    hideLayerGroups();

    const overlaySeparator = document.querySelector('.leaflet-control-layers-separator');
    const overlayTitle = `
        <div class="overlay_separator_title">NOAA NWS Map Overlays</div> <div class="leaflet-control-layers-separator"> </div>
    `;
    overlaySeparator.insertAdjacentHTML('afterend', overlayTitle);
    mapView.listenForClick();
    return map;
};

const hideLayerGroups = () => {
    let overlayContainer = document.querySelector('.leaflet-control-layers-overlays');
    let categories = [];
    for (var i = 1; i <= overlayContainer.childNodes.length; i++) {
        let group = document.getElementById(`leaflet-control-layers-group-${i}`);
        let labels = Array.from(group.childNodes).slice(1);
        group.childNodes[0].childNodes[0].classList.add(`group${i}Input`);
        categories.push(labels);
        listenForCheck(i, labels);
    }
    addHiddenClass(categories.flat());
    return categories;
};
// Add hidden class and margin-left
const addHiddenClass = (arr) => {
    arr.forEach(child => {
        child.classList.add('hidden');
        child.classList.add('marginLeft');
    });
};

// const addInputClass = ()
const listenForCheck = (i, arr) => {
    console.log(i, arr);
    document.querySelector(`.group${i}Input`).addEventListener('change', function() {
        if (this.checked) {
            arr.forEach(child => child.classList.toggle('hidden'))
        }
    });
}