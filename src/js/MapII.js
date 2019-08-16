import { mapboxToken } from '../../js/config';
import axios from 'axios';
import 'leaflet';
import 'leaflet.nontiledlayer';
import '../../../node_modules/leaflet-timedimension/dist/leaflet.timedimension.src.js';
import 'leaflet-groupedlayercontrol';

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
            highWindsMaritime: createOverlay(longHazardsURL, '42'),
            highWindsCoastal: createOverlay(longHazardsURL, '39'),
            seaSurfBeachMaritime: createOverlay(longHazardsURL, '35'),
            seaSurfBeachImmediate: createOverlay(longHazardsURL, '32'),
            floodingRiver: createOverlay(longHazardsURL, '25'),
            floodingCoastal: createOverlay(longHazardsURL, '28'),
            reducedVisibilityMaritime: createOverlay(longHazardsURL, '21'),
            reducedVisibilityCoastal: createOverlay(longHazardsURL, '18'),
            freezingSpray: createOverlay(longHazardsURL, '14'),
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
        // Radar
        // const src = 'https://nowcoast.noaa.gov/images/legends/radar.png';
        // Lightning Strike Density
        const src = 'https://nowcoast.noaa.gov/images/legends/lightningstrikedensity.png';
        const div = L.DomUtil.create('div', 'info legend');
        div.style.width = '300px';
        div.style.height = '50px';
        div.innerHTML += '<b>Legend</b><br><img src="' + src + '" alt="legend">';
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

    // const groupedOverlays = {
    //     //'NOAA NWS Remotely-Sensed': {
    //     "<span class='controlHeading'>NOAA NWS Remotely-Sensed</span>": {
    //         'NEXRAD MRMS Weather Radar Imagery (Time Enabled)': timeLayers.radarTimeLayer,
    //         'Emulated GOES-R Lightning Strike Density (Time Enabled)': timeLayers.lightningLayer,
    //     },
    //     //'NOAA NWS Short-Duration Hazards': {
    //     "<span class='controlHeading'>NOAA NWS Short-Duration Hazards</span>": {
    //         'Severe Thunderstorm Watch': timeLayers.shortWatchesLayer.severeThunderstorm,
    //         'Severe Thunderstorm Warning': timeLayers.shortWarningsLayer.severeThunderstormWarning,
    //         'Tornado Watch': timeLayers.shortWatchesLayer.tornado,
    //         'Tornado Warning': timeLayers.shortWarningsLayer.tornadoWarning,
    //         //'Special Marine Warning': timeLayers.shortWarningsLayer.specialMarineWarning,
    //         'Flash Flood Watch': timeLayers.shortWatchesLayer.flashFlood,
    //         'Flash Flood Warning': timeLayers.shortWarningsLayer.flashFloodWarning,
    //         'Extreme Wind': timeLayers.shortWarningsLayer.extremeWindWarning,
    //         'Snow Squall Warning': timeLayers.shortWarningsLayer.snowSquallWarning,
    //         'Dust Advisory': timeLayers.shortWarningsLayer.dustAdvisory,
    //     },
    //     //'NOAA NWS Long-Duration Hazards': {
    //     "<span class='controlHeading'>NOAA NWS Long-Duration Hazards'</span>": {
    //         'High Winds: Maritime Areas': timeLayers.longHazardsLayer.highWindsMaritime,
    //         'High Winds: Coastal and Inland Areas': timeLayers.longHazardsLayer.highWindsCoastal,
    //         //'Hazardous Seas, Surf, and Beach Conditions: Maritime Areas': timeLayers.longHazardsLayer.seaSurfBeachMaritime,
    //         //'Hazardous Seas, Surf, and Beach Conditions: Immediate Coast': timeLayers.longHazardsLayer.seaSurfBeachImmediate,
    //         'Flooding: River/Inland Areas': timeLayers.longHazardsLayer.floodingRiver,
    //         'Flooding: Coastal Areas': timeLayers.longHazardsLayer.floodingCoastal,
    //         //'Reduced Visibility: Maritime Areas': timeLayers.longHazardsLayer.reducedVisibilityMaritime,
    //         'Reduced Visibility: Coastal and Inland Areas': timeLayers.longHazardsLayer.reducedVisibilityCoastal,
    //         'Freezing Spray': timeLayers.longHazardsLayer.freezingSpray,
    //         'Snowfall and Freezing Rain': timeLayers.longHazardsLayer.snowAndFreezingRain,
    //         'Extreme Cold and Heat': timeLayers.longHazardsLayer.coldAndHeat,
    //         'Critical Wildfire Conditions': timeLayers.longHazardsLayer.wildFire,
    //         'Unhealthy Air Quality': timeLayers.longHazardsLayer.airQuality,
    //     },
    //     //'NOAA NWS NCEP Significant Weather Outlooks': {
    //     "<span class='controlHeading'>NOAA NWS NCEP Significant Weather Outlooks</span>": {
    //         'Severe Thunderstorms Outlook': timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
    //         'Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
    //         'Non-Dry Thunderstorm Critical Fire Weather Outlook': timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
    //     }
    // };
    const shortWatchLegendURL = 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=';
    const shortWatchLegend = {
        flashFlood: '0',
        severeThunderstorm: '1',
        tornado: '2'
    };
    const groupedOverlays = {
        //'NOAA NWS Remotely-Sensed': {
        "<span class='controlHeading group0'>NOAA NWS Remotely-Sensed</span>": {
            'NEXRAD MRMS Weather Radar Imagery (Time Enabled)': timeLayers.radarTimeLayer,
            "<span class='legend'><img src=`https://nowcoast.noaa.gov/images/legends/radar.png` alt='legend'></span>": '',
            'Emulated GOES-R Lightning Strike Density (Time Enabled)': timeLayers.lightningLayer,
            "<span class='legend'><img src='https://nowcoast.noaa.gov/images/legends/lightningstrikedensity.png' alt='legend'></span>": '',
        },
        //'NOAA NWS Short-Duration Hazards': {
        "<span class='controlHeading group1'>NOAA NWS Short-Duration Hazards</span>": {
            // "<span class='controlLabel'><img src='https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1' alt='legend'></span>": timeLayers.shortWatchesLayer.severeThunderstorm,
            // "<span class='controlLabel'>Severe Thunderstorm Warning</span>": timeLayers.shortWarningsLayer.severeThunderstormWarning,
            // "<span class='controlLabel'><img src='https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=2' alt='legend'></span>": timeLayers.shortWatchesLayer.tornado,
            // "<span class='controlLabel'>Tornado Warning</span>": timeLayers.shortWarningsLayer.tornadoWarning,
            // 'Special Marine Warning': timeLayers.shortWarningsLayer.specialMarineWarning,
            // "<span class='controlLabel'><img src='https://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=0' alt='legend'></span>": timeLayers.shortWatchesLayer.flashFlood,
            "<span class='controlLabel'>Severe Thunderstorm Watch</span>": timeLayers.shortWatchesLayer.severeThunderstorm,
            "<span class='controlLabel'>Severe Thunderstorm Warning</span>": timeLayers.shortWarningsLayer.severeThunderstormWarning,
            "<span class='controlLabel'>Tornado Watch</span>": timeLayers.shortWatchesLayer.tornado,
            "<span class='controlLabel'>Tornado Warning</span>": timeLayers.shortWarningsLayer.tornadoWarning,
            'Special Marine Warning': timeLayers.shortWarningsLayer.specialMarineWarning,
            "<span class='controlLabel'>Flash Flood Watch</span>": timeLayers.shortWatchesLayer.flashFlood,
            "<span class='controlLabel'>Flash Flood Warning</span>": timeLayers.shortWarningsLayer.flashFloodWarning,
            "<span class='controlLabel'>Extreme Wind</span>": timeLayers.shortWarningsLayer.extremeWindWarning,
            "<span class='controlLabel'>Snow Squall Warning</span>": timeLayers.shortWarningsLayer.snowSquallWarning,
            "<span class='controlLabel'>Dust Advisory</span>": timeLayers.shortWarningsLayer.dustAdvisory,
        },
        //'NOAA NWS Long-Duration Hazards': {
        "<span class='controlHeading group2'>NOAA NWS Long-Duration Hazards</span>": {
            "<span class='controlLabel'>High Winds: Maritime Areas</span>": timeLayers.longHazardsLayer.highWindsMaritime,
            "<span class='controlLabel'>High Winds: Coastal and Inland Areas</span>": timeLayers.longHazardsLayer.highWindsCoastal,
            'Hazardous Seas, Surf, and Beach Conditions: Maritime Areas': timeLayers.longHazardsLayer.seaSurfBeachMaritime,
            'Hazardous Seas, Surf, and Beach Conditions: Immediate Coast': timeLayers.longHazardsLayer.seaSurfBeachImmediate,
            "<span class='controlLabel'>Flooding: River/Inland Areas</span>": timeLayers.longHazardsLayer.floodingRiver,
            "<span class='controlLabel'>Flooding: Coastal Areas</span>": timeLayers.longHazardsLayer.floodingCoastal,
            'Reduced Visibility: Maritime Areas': timeLayers.longHazardsLayer.reducedVisibilityMaritime,
            "<span class='controlLabel'>Reduced Visibility: Coastal and Inland Areas</span>": timeLayers.longHazardsLayer.reducedVisibilityCoastal,
            "<span class='controlLabel'>Freezing Spray</span>": timeLayers.longHazardsLayer.freezingSpray,
            "<span class='controlLabel'>Snowfall and Freezing Rain</span>": timeLayers.longHazardsLayer.snowAndFreezingRain,
            "<span class='controlLabel'>Extreme Cold and Heat</span>": timeLayers.longHazardsLayer.coldAndHeat,
            "<span class='controlLabel'>Critical Wildfire Conditions</span>": timeLayers.longHazardsLayer.wildFire,
            "<span class='controlLabel'>Unhealthy Air Quality</span>": timeLayers.longHazardsLayer.airQuality,
        },
        //'NOAA NWS NCEP Significant Weather Outlooks': {
        "<span class='controlHeading group3'>NOAA NWS NCEP Significant Weather Outlooks</span>": {
            "<span class='controlLabel'>Severe Thunderstorms Outlook</span>": timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
            "<span class='controlLabel'>Dry Thunderstorm Critical Fire Weather Outlook</span>": timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
            "<span class='controlLabel'>Non-Dry Thunderstorm Critical Fire Weather Outlook</span>": timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
        },
        //NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts 
        "<span class='controlHeading group4'>NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts</span>": {
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

    const groupedOverlays = {
        //'NOAA NWS Remotely-Sensed': {
        "<span class='controlHeading group0'>NOAA NWS Remotely-Sensed</span>": {
            "<span class='controlLabel'>NEXRAD MRMS Weather Radar Imagery (Time Enabled)<br><img class='legend' src='https://nowcoast.noaa.gov/images/legends/radar.png' alt='legend'></span>": timeLayers.radarTimeLayer,
            "<span class='controlLabel'>Emulated GOES-R Lightning Strike Density (Time Enabled)<br><img class='legend' src='https://nowcoast.noaa.gov/images/legends/lightningstrikedensity.png' alt='legend'></span>": timeLayers.lightningLayer,
        },
        //'NOAA NWS Short-Duration Hazards': {
        "<span class='controlHeading group1'>NOAA NWS Short-Duration Hazards</span>": {
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHFJREFUOI3t1CEOgDAQBMBrqKlCIPoKwrf2F9wz9nEEj24IhgYUDdgDRbrqcmKyar18HH8dAPQNRFILCECHph2jCyZsykkACEktDaML0vvO3HDeVykNv0wFK1jBn4FTTmZkObYnSFIBlAmy5DGw98fbnC5KIPQNWZsNAAAAAElFTkSuQmCC' alt='legend'>Severe Thunderstorm Watch</span>": timeLayers.shortWatchesLayer.severeThunderstorm,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIpJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fYX/UnWSZtvM3OwMzMnMbAwAA3kMFf9SdDtfcl8ty2VY9hyz0uBgYGqJepCUYNHDVw1MBhZuDG2+wMDFv1yDLk4UdmVAO/ffuWzsXFNRNWBJEJGuEGXrp06SwDA4MJJabBAACwaiBmvyYWJgAAAABJRU5ErkJggg==' alt='legend'>Severe Thunderstorm Warning</span>": timeLayers.shortWarningsLayer.severeThunderstormWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3t1LENgCAUBNAr7IwNAzCHrbWL3Bb+MW4R94AVmMCEBawk2gKV4aqfX7xcdRM6Z3oOktYCSbICkrRtuw7vcxUWggNJSLLS0PuMdT0r++2IcUZp2DMDHOAAfwaG4ADsVUhKyxeUZCTLBNXkM7DvR2tu1WwgMne1zvgAAAAASUVORK5CYII=' alt='legend'>Tornado Watch</span>": timeLayers.shortWatchesLayer.tornado,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIhJREFUOI3t1LEJwzAQQNEPJxDcMGqSQksEb5EMkcJkjHgLQ4ZQk+Y2yBICFYI0tiGt7Crod9c87ppzHJwDiDFegHGnNaWUJrcMY631NJTSJM3eIyJXYAMZSuFu1rZbCLxUgeXkI+tgBzv4Z+DsPYTQhHxEfsGc801Vn+sLauyxgWb2Bs57tLUv3BcdSRo69fUAAAAASUVORK5CYII=' alt='legend'>Tornado Warning</span>": timeLayers.shortWarningsLayer.tornadoWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIhJREFUOI3t1LEJwzAQQNEPJxDcMGqSQksEb5EMkcJkjHgLQ4ZQk+Y2yBICFYI0tiGt7Crod9c87ppzHJwDiDFegHGnNaWUJrcMY631NJTSJM3eIyJXYAMZSuFu1rZbCLxUgeXkI+tgBzv4Z+DsPYTQhHxEfsGc801Vn+sLauyxgWb2Bs57tLUv3BcdSRo69fUAAAAASUVORK5CYII=' alt='legend'>Special Marine Warning</span>": timeLayers.shortWarningsLayer.specialMarineWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1L0JgDAUBOADA+IP4g5Z7rbwjXHLuYURBQNWBm2jleSqxys+rjqHj+Oug6S9gSRZAkna0h9TqGMWNgQHkpBkqWGoI+ZxzQI9WjRbhdTwyxSwgAX8GTgEB482C+n26glKMpJpgnLyGNj7421OSpkfYOwPrqUAAAAASUVORK5CYII=' alt='legend'>Flash Flood Watch</span>": timeLayers.shortWatchesLayer.flashFlood,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI3t1LEJwzAQRuEHJxDcCB5CTVyoyApZIxnDZIx4Hhdq3GgIQxYQqBCksQ1uZVdBr7vmg785w8UZAO/9AxhOWmMIYTTrMZRSbl3OVdJiLSLyBHaQLmfuMVaBk3N8VYF18pU1sIEN/DNwsZbJuSokiRzBlNJLVT/bC6rsvYMxxhnoz2hbP2roHxHhrx/pAAAAAElFTkSuQmCC' alt='legend'>Flash Flood Warning</span>": timeLayers.shortWarningsLayer.flashFloodWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIpJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fYX+onWSZtfMbOwMzMnMbAwAA3kMFf6idDte0l8tx2WI9hy0suBgYGqJepCUYNHDVw1MBhZuDGZ+wMDIf1yDLk4TdmVAO/ffuWzsXFNRNWBJEJGuEGXrp06SwDA4MJJabBAADIeCCPXD73awAAAABJRU5ErkJggg==' alt='legend'>Extreme Wind</span>": timeLayers.shortWarningsLayer.extremeWindWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI3t1LENgzAQQNEv+SpPQMMUceElWIEyGQNljDDRFURIXoEGKWnjCktpACmtoYr8u2ue7poTTk4AvPcN0B20elXtZR26lNLFLVWWNMiMMeYK7CBuqWgnn7dbrYzmBawnn1kBC1jAPwMHmaHWLOTN5xeMMd6stY/tBWV238EQwhNwR7StLytcIJkJ1pt+AAAAAElFTkSuQmCC' alt='legend'>Snow Squall Warning</span>": timeLayers.shortWarningsLayer.snowSquallWarning,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fYQFeALJMuXP7AwMzMnMbAwAA3kMFAV4AhIlSNTMfdYrh87TMDAwPUy9QEowaOGjhq4DAz8MLlDwwMDLfIMuTN2x+oBn779i2di4trJqwIIhM0wg28dOnSWQYGBhNKTIMBAA1sIovb2rXnAAAAAElFTkSuQmCC' alt='legend'>Dust Advisory</span>": timeLayers.shortWarningsLayer.dustAdvisory,
            "<span class='controlLabel'><img class='legendColor' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAINJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fY39GYLJM27j/LwMzMnMbAwAA3kMHf0ZihOi+GbOdtOXSBgYEB6mVqglEDRw0cNXCYGbhx/1myDXn4/DWqgd++fUvn4uKaCSuCyASNcAMvXbp0loGBwYQS02AAAOXdIH8X9Ih9AAAAAElFTkSuQmCC' alt='legend'>Dust Advisory</span>": timeLayers.shortWarningsLayer.dustStormWarning,
        },
        //'NOAA NWS Long-Duration Hazards': {
        "<span class='controlHeading group2'>NOAA NWS Long-Duration Hazards</span>": {
            "<span class='controlLabel'>High Winds: Maritime Areas</span>": timeLayers.longHazardsLayer.highWindsMaritime,
            "<span class='controlLabel'>High Winds: Coastal and Inland Areas</span>": timeLayers.longHazardsLayer.highWindsCoastal,
            'Hazardous Seas, Surf, and Beach Conditions: Maritime Areas': timeLayers.longHazardsLayer.seaSurfBeachMaritime,
            'Hazardous Seas, Surf, and Beach Conditions: Immediate Coast': timeLayers.longHazardsLayer.seaSurfBeachImmediate,
            "<span class='controlLabel'>Flooding: River/Inland Areas</span>": timeLayers.longHazardsLayer.floodingRiver,
            "<span class='controlLabel'>Flooding: Coastal Areas</span>": timeLayers.longHazardsLayer.floodingCoastal,
            'Reduced Visibility: Maritime Areas': timeLayers.longHazardsLayer.reducedVisibilityMaritime,
            "<span class='controlLabel'>Reduced Visibility: Coastal and Inland Areas</span>": timeLayers.longHazardsLayer.reducedVisibilityCoastal,
            "<span class='controlLabel'>Freezing Spray</span>": timeLayers.longHazardsLayer.freezingSpray,
            "<span class='controlLabel'>Snowfall and Freezing Rain</span>": timeLayers.longHazardsLayer.snowAndFreezingRain,
            "<span class='controlLabel'>Extreme Cold and Heat</span>": timeLayers.longHazardsLayer.coldAndHeat,
            "<span class='controlLabel'>Critical Wildfire Conditions</span>": timeLayers.longHazardsLayer.wildFire,
            "<span class='controlLabel'>Unhealthy Air Quality</span>": timeLayers.longHazardsLayer.airQuality,
        },
        //'NOAA NWS NCEP Significant Weather Outlooks': {
        "<span class='controlHeading group3'>NOAA NWS NCEP Significant Weather Outlooks</span>": {
            "<span class='controlLabel'>Severe Thunderstorms Outlook<br><img class='legend' src='https://nowcoast.noaa.gov/images/legends/convectiveoutlook.png' alt='legend'></span>": timeLayers.significantWeatherOutlookLayer.severeThunderstorm,
            "<span class='controlLabel'>Dry Thunderstorm Critical Fire Weather Outlook<br><img class='legend' src='https://nowcoast.noaa.gov/images/legends/dryfireoutlook.png' alt='legend'></span>": timeLayers.significantWeatherOutlookLayer.dryThunderstormCriticalFire,
            "<span class='controlLabel'>Non-Dry Thunderstorm Critical Fire Weather Outlook<br><img class='legend' src='https://nowcoast.noaa.gov/images/legends/nondryfireoutlook.png' alt='legend'></span>": timeLayers.significantWeatherOutlookLayer.nonDryThunderstormCriticalFire
        },
        //NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts 
        "<span class='controlHeading group4'>NOAA NWS National Digital Forecast Database (NDFD) Gridded Forecasts</span>": {
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
        // Make the "Base Maps" group exclusive (use radio inputs)
        // exclusiveGroups: ["<span class='controlHeading'>Base Maps</span>"],
        // Show a checkbox next to non-exclusive group labels for toggling all
        groupCheckboxes: true,
    };
    L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);
    hideLayerGroups();
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
    }
    // Add hidden class and margin-left
const addHiddenClass = (arr) => {
    arr.forEach(child => {
        child.classList.add('hidden');
        child.classList.add('marginLeft');
    });
}

// const addInputClass = ()
const listenForCheck = (i, arr) => {
    console.log(i, arr);
    document.querySelector(`.group${i}Input`).addEventListener('change', function() {
        if (this.checked) {
            arr.forEach(child => child.classList.toggle('hidden'))
        }
    });
}

// x = document.getElementById('leaflet-control-layers-group-1') <
//     div class = ​"leaflet-control-layers-group"
// id = ​"leaflet-control-layers-group-1" > ​…​ < /div>​
// x.childNodes

// let z = Array.from(x.childNodes)
// undefined

// z[1].classList.toggle('hidden')
// true
// let 1 = [1, 2, 3, 4]
// VM42215: 1 Uncaught SyntaxError: Unexpected number
// let f = [1, 2, 3, 4, [4, 5]]
// undefined