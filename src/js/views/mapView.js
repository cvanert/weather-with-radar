class Overlay {
    constructor(type, title, legend) {
        this.type = type;
        this.title = title;
        this.legend = legend;
    }
};

//remotelySensed
const radar = new Overlay('remotelySensed', 'NEXRAD MRMS Weather Radar Imagery (Time Enabled)', ['https://nowcoast.noaa.gov/images/legends/radar.png']);
const lightning = new Overlay('remotelySensed', 'Emulated GOES-R Lighting Strike Density (Time Enabled)', ['https://nowcoast.noaa.gov/images/legends/lightningstrikedensity.png']);

// shortDuration
const shortDurationWatches = new Overlay('shortDuration', 'Watches for Short-Duration Hazards', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3t1LENgCAUBNAr7IwNAzCHrbWL3Bb+MW4R94AVmMCEBawk2gKV4aqfX7xcdRM6Z3oOktYCSbICkrRtuw7vcxUWggNJSLLS0PuMdT0r++2IcUZp2DMDHOAAfwaG4ADsVUhKyxeUZCTLBNXkM7DvR2tu1WwgMne1zvgAAAAASUVORK5CYII=', 'Tornado Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHFJREFUOI3t1CEOgDAQBMBrqKlCIPoKwrf2F9wz9nEEj24IhgYUDdgDRbrqcmKyar18HH8dAPQNRFILCECHph2jCyZsykkACEktDaML0vvO3HDeVykNv0wFK1jBn4FTTmZkObYnSFIBlAmy5DGw98fbnC5KIPQNWZsNAAAAAElFTkSuQmCC', 'Severe Thunderstorm Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1L0JgDAUBOADA+IP4g5Z7rbwjXHLuYURBQNWBm2jleSqxys+rjqHj+Oug6S9gSRZAkna0h9TqGMWNgQHkpBkqWGoI+ZxzQI9WjRbhdTwyxSwgAX8GTgEB482C+n26glKMpJpgnLyGNj7421OSpkfYOwPrqUAAAAASUVORK5CYII=', 'Flash Flood Watch']
]);
const shortDurationWarnings = new Overlay('shortDuration', 'Weather Warnings for Short-Duration Hazards', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIhJREFUOI3t1LEJwzAQQNEPJxDcMGqSQksEb5EMkcJkjHgLQ4ZQk+Y2yBICFYI0tiGt7Crod9c87ppzHJwDiDFegHGnNaWUJrcMY631NJTSJM3eIyJXYAMZSuFu1rZbCLxUgeXkI+tgBzv4Z+DsPYTQhHxEfsGc801Vn+sLauyxgWb2Bs57tLUv3BcdSRo69fUAAAAASUVORK5CYII=', 'Tornado Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIpJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fYX+onWSZtfMbOwMzMnMbAwAA3kMFf6idDte0l8tx2WI9hy0suBgYGqJepCUYNHDVw1MBhZuDGZ+wMDIf1yDLk4TdmVAO/ffuWzsXFNRNWBJEJGuEGXrp06SwDA4MJJabBAADIeCCPXD73awAAAABJRU5ErkJggg==', 'Extreme Wind Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIpJREFUOI1jYaAyYGFgYGCwsLDwZWBgqKfQrFknTpyYxQLl1P/9+9fYX/UnWSZtvM3OwMzMnMbAwAA3kMFf9SdDtfcl8ty2VY9hyz0uBgYGqJepCUYNHDVw1MBhZuDG2+wMDFv1yDLk4UdmVAO/ffuWzsXFNRNWBJEJGuEGXrp06SwDA4MJJabBAACwaiBmvyYWJgAAAABJRU5ErkJggg==', 'Severe Thunderstorm Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI3t1LEJwzAQRuEHJxDcCB5CTVyoyApZIxnDZIx4Hhdq3GgIQxYQqBCksQ1uZVdBr7vmg785w8UZAO/9AxhOWmMIYTTrMZRSbl3OVdJiLSLyBHaQLmfuMVaBk3N8VYF18pU1sIEN/DNwsZbJuSokiRzBlNJLVT/bC6rsvYMxxhnoz2hbP2roHxHhrx/pAAAAAElFTkSuQmCC', 'Flash Flood Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI3t1LENgzAQQNEv+SpPQMMUceElWIEyGQNljDDRFURIXoEGKWnjCktpACmtoYr8u2ue7poTTk4AvPcN0B20elXtZR26lNLFLVWWNMiMMeYK7CBuqWgnn7dbrYzmBawnn1kBC1jAPwMHmaHWLOTN5xeMMd6stY/tBWV238EQwhNwR7StLytcIJkJ1pt+AAAAAElFTkSuQmCC', 'Snow Squall Warning']
]);

// longDuration
const floodingRiver = new Overlay('longDuration', 'Flooding: River/Inland Areas', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KERgDAUA9AIXK+qunPgWKGTZAb+Dpmkq8AIDIDoAih6YEsV16h/X7yLyoTOme6DpH2BJFkFSdq5nGuJpQkLWwBJSLLasMSCPOcmMCHB7Q61Yc8McIAD/BkYtoCE1IT4w79BSUayTlBLXgP7fHzNBdoMH79e3v7UAAAAAElFTkSuQmCC', 'Flood Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHtJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs+cf2u/8b2hyzDBL6zMuTm5jJMnjy5Ae7Cb2x/GG7yfSbLQHUGXgaJnxCjWAioJRmMGjhq4KiBw8xAge+sDOoMvGQZwvUL4S4WBgZI4ZibmwsvgsgBKAUssgClAADtvx98ytDaOwAAAABJRU5ErkJggg==', 'Flood Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxve27HXf5ZlJssw4Uu/GHJzcxkmT57cAHfhZ1lmho3mHGQZ6M/AwMB9+Q8D3IXUBKMGjho4auAwM1D40i8GfzIN4X38F9XAyZMnN+Tm5sKLIHIASgGLLEApAAC+dyBQwNRTHQAAAABJRU5ErkJggg==', 'Flood Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHFJREFUOI3t1KENwCAQBdATJBgEtmtUdKs/Q2+HPxxJF+gEl4CrKikWUA1fXU68fPWdTI57DwA6ApHUCgLQcITTb74Ls2QCQEhqbeg3L3GP3Q3zlaU2nJkFLnCBPwMtWTdS7tKCJBVAnaCeNAP7fYzmAe3JIOZMeewoAAAAAElFTkSuQmCC', 'Hydrologic Outlook'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs07eTrRWQFyTLswaVnDLm5uQyTJ09ugLtQRFaQQdNckWwXPr78igHuQmqCUQNHDRw1cJgZ+ODSM7INefP4PaqBkydPbsjNzYUXQeQAlAIWWYBSAABJbiDCPePfUAAAAABJRU5ErkJggg==', 'Hydrologic Statement']
]);
const snowfall = new Overlay('longDuration', 'Snowfall and Freezing Rain', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHlJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxvsvn+ol/3xhSzDLnELM+Tm5jJMnjy5Ae5C2R9fGMxfHibPeeK2DJfZZBjgLqQmGDVw1MBRA4eZgZe4hRkYxG3JMuQxBw+qgZMnT27Izc2FF0HkAJQCFlmAUgAAKo4fjCeHoMcAAAAASUVORK5CYII=', 'Blizzard Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI3t1KENgDAUBNATpKIEDIN1kpuBv8NNwmQIRNMqFA3Ytor01M8XL6duQudMz0HSWiBJVkCS5k+/u8tVYXGLIAlJVhq6y2E91rp6AUhzQmnYMwMc4AB/BsYtAqEOyUv+gpKMZJmgmnwG9v1ozQ2/CyBykOPQdAAAAABJRU5ErkJggg==', 'Ice Storm Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI3t1KENgDAUBNATpKIEDIN1kpuBv8NNwmQIRNMqFA3Ytor01M8XL6duQudMz0HSWiBJVkCSdnq/X85VYVuMIAlJVhpezuFY1yowAJhTQmnYMwMc4AB/Bm4xIlQiS85fUJKRLBNUk8/Avh+tuQG+eiBySUx6VAAAAABJRU5ErkJggg==', 'Lake-Effect Snow Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1KENgDAUBNBLimYBUtbAsdHNwN/hNisjoDAIPAFFQ21bRXrq54uXU9ehcrr3IGklkCSLIEmb72Hx6LOwgB0kIcliQ48e0zXm1XPAigOxYc00sIEN/BkYsAMuD9lwpqAkIxknKCfJwH4fpXkAVmgd3H8mCykAAAAASUVORK5CYII=', 'Winter Storm Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHBJREFUOI3t1CEOwCAQBMATJBWYCr7Qhs/tG3p/2A8S0jp8g6sqKRZQDasuJyar1sjgmPcAoD0QSS0gAL39dmTnmjAbogAQkloaZuck+b254XpeUhqOzAQnOMGfgTbEZmRJqQZJKoAyQS2pBvb76M0D4Uof9Mc+bTsAAAAASUVORK5CYII=', 'Lake-Effect Snow Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHFJREFUOI3t1LENgDAQA0BHvNiBNSjYyjPwO3g4JBZgiIBCRUTahArF1euLkysbPo49B0lvgSR5Bkm6pWW1NFVhMWwgCUmeG1qaMF5zXb0BuMKO3PDLdLCDHfwZGMMGDHXIGY4SlOQk8wTVpBjY96M1N4g2H++U3TT5AAAAAElFTkSuQmCC', 'Winter Weather Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG5JREFUOI3t1LsNwCAQA1AHMQM75LOaZ8jt4P1QlJIhUKqg0AJVhKvTFU+u7DE4/j1IWg8kyQpI0g63nQGhCYs5giQkWWkYELAva1s9B1z5Rmk4MhOc4AR/BsYcAdeGJKQalGQkywS1pBrY76M3D2PXH9pvJziPAAAAAElFTkSuQmCC', 'Freezing Rain Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI3t1LEJgDAUBNCDCEHEKoNlkpvBv8NN4mQW6YKClUHbJJXkqs8vHlfdhM6ZnoOktUCSrIAk7fB+S85VYSFnkIQkKw2Tc9jnuQqMAJbzRGnYMwMc4AB/BoacESuR9bq+oCQjWSaoJp+BfT9acwNxdyB0nX827wAAAABJRU5ErkJggg==', 'Freezing Fog Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1CEOgDAUA9CKKYJAIpjmCDhu1DPw79CbgUJjJwghaBQL2IEiq/r54qWqDh/HXQdJewNJsgiStLrfhtIfSVgYK5CEJIsNS3+g6ebEfi3WqUZs+GUymMEM/gwMYwWgTUL2pXiCkoxknKCUPAb2/nibE5XyIDw64QCoAAAAAElFTkSuQmCC', 'Blizzard Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs41WzqWUVkyDLsx8PLDLm5uQyTJ09ugLuQVUSGgUfdlGwX/np6lQHuQmqCUQNHDRw1cJgZ+OPhZbIN+f3mCaqBkydPbsjNzYUXQeQAlAIWWYBSAACVvCDRBMf9BQAAAABJRU5ErkJggg==', 'Lake-Effect Snow Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1CEOgDAUA9CKAQGBxJBww56Bf4eeEgSCkDCCQbEwO1BkVT9fvFTV4eO4+yBpbyBJFkCStlf9eBRtEtb4CSQhyULDo2gx10MS2AEotwWh4ZfJYAYz+DOw8RO6RKQ61xiUZCTDBKUkGtjn420u0lkgEZxEY4QAAAAASUVORK5CYII=', 'Winter Storm Watch']
]);
const extreme = new Overlay('longDuration', 'Extreme Cold and Heat', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KERwCAQBMAXOAaFpo64tEAlV0O+h6uEVpISUgCCBqLCBAuoDKd+XuycOiOTY94DgI5AJLWCADTn/SgldGHenwJASGptWEqQlLYuMEYRay+pDWdmgQtc4M9A70+JsQ9x7m5BkgqgTlBPmoH9PkbzANmdH79j9qOZAAAAAElFTkSuQmCC', 'Extreme Cold Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI3t1DEKgDAUA9AMRUVRBGePmDP475AjurpKWycni67VSZrp84dHpjh8HHcdJO0NJMkSSNL83i4xVFlY13uQhCRLDWOosK1DXr0ZGKeI1PDLFLCABfwZ2PUemPOQujmeoCQjmSYoJ4+BvT/e5gSdOR9jXA7P1wAAAABJRU5ErkJggg==', 'Freeze Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3NzcxsklfTq+QTFyTLs1dM7DLm5uQyTJ09ugLuQT1CcQUZFh2wXvn9xnwHuQmqCUQNHDRw1cJgZ+OrpHbIN+fT+JaqBkydPbsjNzYUXQeQAlAIWWYBSAACu9CDWoeeyMAAAAABJRU5ErkJggg==', 'Wind Chill Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1LEJgDAUBNArUgiiILqE02SSm8G/w03iRgFbwSKFllYGbaOV5KrPLx5XncPHcddB0t5AkiyBJK3dxqmKQxYW+wCSkGSpYRUHdPOYV88De70gNfwyBSxgAX8Gxj4APg85mvUJSjKSaYJy8hjY++NtTpa8IF0ms6TKAAAAAElFTkSuQmCC', 'Hard Freeze Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KENgDAUBNATkJCAAotkDUa6Gfg73EiMgsARRE3BoGioLSjSUz9fvJy6Ah+nuA+S9gaSZAEkacNeTa0rk7Cl8yAJSRYatq7EMNdp9UZg7Q+Ehl8mgxnM4M/ApfPAmIZszRmDkoxkmKCURAP7fLzNBa8fIHRRVJJFAAAAAElFTkSuQmCC', 'Excessive Heat Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KERwCAQBMAXOAaFpo64tEAlV0O+h6uEVpISUgCCBqLCBAuoDKd+XuycOiOTY94DgI5AJLWCADTn/SgldGHenwJASGptWEqQlLYuMEYRay+pDWdmgQtc4M9A70+JsQ9x7m5BkgqgTlBPmoH9PkbzANmdH79j9qOZAAAAAElFTkSuQmCC', 'Extreme Cold Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3t1KERgDAUA9AIHIeq7hw4VmCSzMDfIZOwSjtCB0B0ARQ9sG0V16h/X7yLyoTOmZ6DpLVAkqyAJO3atiN7X4W5EEASkqw0zN7jXNcqcAcwx4jSsGcGOMAB/gx0IWCvRJaUvqAkI1kmqCafgX0/WnMDFk0gLpLcFpUAAAAASUVORK5CYII=', 'Freeze Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG9JREFUOI3t1DEKgDAUA9AgRYROCnrLnMF/h1y0oAUHESeLXVsnaabPHx6Z4vBx3HOQtBpIkiWQpJ3jtF7el7UKASQhyVLDy3sc81IEDgD6fUNq+GUa2MAG/gx0IWAoRLoYc1CSkUwTVJJsYN+P2txCjiARqegAKgAAAABJRU5ErkJggg==', 'Wind Chill Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHBJREFUOI3t1KENwCAQBdATWAa4pFMg2OrP0NvhD0fCAghERReoKikWUA1fXU68fPWdLI57DwA2A5G0BgIwjfH0qkNYTUkACElrDb2qHCEMN7xyltZwZTa4wQ3+DKwpDSN3KT1I0gC0CRpJN7Dfx2weNvcgxSifeqcAAAAASUVORK5CYII=', 'Wind Chill Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1LEJgDAUBNADgwhZIGQHcbKbwb/DjSdYihtoI1oZtE2sJFd9fvG46hw+jrsPklYCSbIEkrTtHMYdIQvzmEASkiw13BGwHH0WGBugxYzU8MtUsIIV/BnoMSE2eUiH9Q1KMpJpgnLyGtjnozQXe84dHCGVn2wAAAAASUVORK5CYII=', 'Hard Freeze Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxv+8ZnW/+OUJMsw5k83GHJzcxkmT57cAHfhP05Jht+CRmS7kOX7LQa4C6kJRg0cNXDUwGFmIPOnG2QbwvT9OaqBkydPbsjNzYUXQeQAlAIWWYBSAADEoB/sFBrnLQAAAABJRU5ErkJggg==', 'Frost Advisory'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1LEJwCAUBNAPBkIQKwdzkpshf4ebxMks7CSBVJHYqlXwqs8vHlfdJpOzvQcAHYFIagUB6J7SaXLuwor3AkBIam1ocpYjxr56IchlrdSGM7PABS7wZ2DxXiSELuR2rgVJKoA6QT1pBvb7GM0DiEwf4q1ZT58AAAAASUVORK5CYII=', 'Excessive Heat Watch'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3tlDEOgCAQBDcBgzU977DzR/sG+cP9TJ9gb20IJhZG1BaoDFNdrphMtRqV0fdB0peIRMQnIUk/mn1yKmbJ5mBAEiLiU6FTEUO/ZfZZLLFDKqxJEzZhE/5MOAcDwGZJ1uPp0sA1jiTTBOXwGdj3o5QTuDUgAXq3TswAAAAASUVORK5CYII=', 'Heat Advisory']
]);
const wildfire = new Overlay('longDuration', 'Critical Wildfire Conditions', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3NzcxvsPvDVy37hIMuwS8KfGXJzcxkmT57cAHeh7BcOBvPDAuQ5z5aB4bLMdwa4C6kJRg0cNXDUwGFm4CXhzwwMtuQZ8pjnB6qBkydPbsjNzYUXQeQAlAIWWYBSAABgLCBeUNBsvwAAAABJRU5ErkJggg==', 'Red Flag Warning'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxvs9CTqZcV5yDLs0p03DLm5uQyTJ09ugLtQVpyHwVxHhmwXXr7/gQHuQmqCUQNHDRw1cJgZeOnOG7INefzyC6qBkydPbsjNzYUXQeQAlAIWWYBSAAA2xSDE6fkJigAAAABJRU5ErkJggg==', 'Fire Weather Watch']
]);
const air = new Overlay('longDuration', 'Unhealthy Air Quality', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGRJREFUOI3t1DEKACEMBMBABPGx+4bLH/a3QeGqC9pGq8OtQophqy1yOOU7ANgORNICBGC11kdVU5i7CwAhadFQVaW1lm7Ye5doeDIXvOAFfwa6exoZY6wgSQMQE5TJMrDzYzcvXFghBv9uOgYAAAAASUVORK5CYII=', 'Air Stagnation Advisory']
]);

// outlook
const thunderstormOutlook = new Overlay('outlook', 'Severe Thunderstorms Outlook', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jugsZKTDsPwMDjb08auCogaMGjhqI00BKykRGdAMpKQvhAABd0QNSDPGCHwAAAABJRU5ErkJggg==', '< 10% Chance of Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD1JREFUOI1jYaAyYKGlgf+pYB4jigubLjWRbVKdXh0DAwONvTxq4KiBowaOGojdQFgRRCZgRDeQkRLTYAAAFzwFfVyPnPMAAAAASUVORK5CYII=', '>= 10% Chance of Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD1JREFUOI1jYaAyYKGlgf+pYB4jigv1Mm3JNunS9MMMDAw09vKogaMGjho4aiB2A2FFEJmAEd1ARkpMgwEAb/sGf7xEMOsAAAAASUVORK5CYII=', 'Marginal Risk of Severe Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADhJREFUOI1jYaAyYKGlgf+pYB4jigv/U2AkIyOEpqmXRw0cNXDUwFEDsRsIK4LIBIzoBlJmHBQAAF8jA1XJU6ZXAAAAAElFTkSuQmCC', 'Slight Risk of Severe Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADlJREFUOI1jYaAyYKGlgf+pYB4jigv/T6PApCwITVMvjxo4auCogaMGYjcQVgSRCRjRDWSkyDgoAACDOwO+AJAcIwAAAABJRU5ErkJggg==', 'Enhanced Risk of Severe Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jigspMZERStPUy6MGjho4auCogdgNZMSlijjAiG4gheZBAAALgAJUXqzQHAAAAABJRU5ErkJggg==', 'Moderate Risk of Severe Thunderstorms'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADpJREFUOI1jYaAyYKGlgf+pYB4jigv/U2AmIwMjAwMDjb08auCogaMGjhqI3UBYEUQmYEQ3kCLTYAAAXiIDVbuaJW4AAAAASUVORK5CYII=', 'High Risk of Severe Thunderstorms']
]);
const dryOutlook = new Overlay('outlook', 'Dry Thunderstorm Critical Fire Weather Outlook', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jugsZKTDsPwMDjb08auCogaMGjhqI00BKykRGdAMpKQvhAABd0QNSDPGCHwAAAABJRU5ErkJggg==', 'No Dry Thunderstorms Expected'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD1JREFUOI1jYaAyYKGlgf+pYB4jigu73dXINql05y0GBgYae3nUwFEDRw0cNRC7gbAiiEzAiG4gIyWmwQAAYycGW8prgWAAAAAASUVORK5CYII=', 'Isolated Dry Thunderstorms Expected'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jigspMZERStPUy6MGjho4auCogdgNZMSlijjAiG4gheZBAAALgAJUXqzQHAAAAABJRU5ErkJggg==', 'Scattered Dry Thunderstorms Expected']
]);
const nonDryOutlook = new Overlay('outlook', 'Non-Dry Thunderstorm Critical Fire Weather Outlook', [
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jugsZKTDsPwMDjb08auCogaMGjhqI00BKykRGdAMpKQvhAABd0QNSDPGCHwAAAABJRU5ErkJggg==', 'No Non-Dry Thunderstorms Expected'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADlJREFUOI1jYaAyYKGlgf+pYB4jigv/11NgUiOEpqmXRw0cNXDUwFEDsRsIK4LIBIzoBjJSZBwUAACLIwPVgadrdwAAAABJRU5ErkJggg==', 'Elevated Risk Area'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jigspMZERStPUy6MGjho4auCogdgNZMSlijjAiG4gheZBAAALgAJUXqzQHAAAAABJRU5ErkJggg==', 'Critical Area'],
    ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADxJREFUOI1jYaAyYKGlgf+pYB4jigv/Mxwl3yQGawYGBhp7edTAUQNHDRw1ELuBsCKITMCIbiAjJabBAABx2AOPZH/HJwAAAABJRU5ErkJggg==', 'Extremely Critical Area']
]);

// gridded
const dailyMaxTemp = new Overlay('gridded', 'Daily Max Air Temperature', ['https://nowcoast.noaa.gov/images/legends/airtemperature.png']);
const dailyMinTemp = new Overlay('gridded', 'Daily Min Air Temperature', ['https://nowcoast.noaa.gov/images/legends/airtemperature.png']);
const surfaceTemp = new Overlay('gridded', 'Surface Air Temperature', ['https://nowcoast.noaa.gov/images/legends/airtemperature.png']);
const apparentTemp = new Overlay('gridded', 'Apparent Air Temperature', ['https://nowcoast.noaa.gov/images/legends/airtemperature.png']);
const surfaceDewPoint = new Overlay('gridded', 'Surface Dew Point Temperature', ['https://nowcoast.noaa.gov/images/legends/airtemperature.png']);
const surfaceHumidity = new Overlay('gridded', 'Surface Relative Humidity', ['https://nowcoast.noaa.gov/images/legends/relativehumidity.png']);
const windVelocity = new Overlay('gridded', 'Surface Wind Velocity (Barb)', ['https://nowcoast.noaa.gov/images/legends/flowvis-windbarbs.png']);
const windSpeed = new Overlay('gridded', 'Surface Wind Speed', ['https://nowcoast.noaa.gov/images/legends/wind-speed.png']);
const windGust = new Overlay('gridded', 'Surface Wind Gust', ['https://nowcoast.noaa.gov/images/legends/wind-speed.png']);
const cloudCover = new Overlay('gridded', 'Total Cloud Cover', ['https://nowcoast.noaa.gov/images/legends/skycover.png']);
const precipitation6Hour = new Overlay('gridded', '6-Hour Precipitation Amount', ['https://nowcoast.noaa.gov/images/legends/precipitation.png']);
const snowfall6Hour = new Overlay('gridded', '6-Hour Snowfall Amount', ['https://nowcoast.noaa.gov/images/legends/snowfall.png']);
const precipitationProbability12Hour = new Overlay('gridded', '12-Hour Probability of Precipitation', ['https://nowcoast.noaa.gov/images/legends/probabilityofprecip.png']);

const remotelySensedArr = [radar, lightning];

const shortDurationArr = [shortDurationWatches, shortDurationWarnings];

const longDurationArr = [floodingRiver, snowfall, extreme, wildfire, air];

const outlookArr = [thunderstormOutlook, dryOutlook, nonDryOutlook];

const griddedArr = [dailyMaxTemp, dailyMinTemp, surfaceTemp, apparentTemp, surfaceDewPoint, surfaceHumidity, windVelocity, windSpeed, windGust, cloudCover, precipitation6Hour, snowfall6Hour, precipitationProbability12Hour];


const clearLegend = () => {
    document.querySelector('.legend_middle_container').innerHTML = '';
};

const createHTMLArr = (arr) => {
    let markupArr = [];
    for (var i = 0; i < arr.length; i++) {
        markupArr.push(`<div class="title ${arr[i].type}_${i}">${arr[i].title}</div><div class="legend_body"><img class="single_image" src='${arr[i].legend}'></div>`);
    }
    console.log(markupArr);
    return markupArr;
};

// shortDuration, longDuration
const createHTMLNestedArr = (arr) => {
    let markupArr = [];
    for (var i = 0; i < arr.length; i++) {
        let markupStart = `<div class="title ${arr[i].type}_${i}">${arr[i].title}</div><div class="legend_body"><table class="multiple_images">`;
        let markupTable = [];
        let markupEnd = `</table></div>`;
        for (var j = 0; j < arr[i].legend.length; j++) {
            markupTable.push(`<tr><td class="legend_icon"><img class="multi" src='${arr[i].legend[j][0]}'</td><td class="legend_description">${arr[i].legend[j][1]}</td></tr>`);
        }
        markupArr.push(markupStart + markupTable.join(' ') + markupEnd);
    }
    return markupArr;
};

export const listenForClick = () => {
    const categorySelector = document.getElementById('legend_category_select');
    const next = document.querySelector('.forward_button');
    const previous = document.querySelector('.back_button');
    const bodyDiv = document.querySelector('.legend_middle_container');
    let category, legendTitleClass, page, change;
    // Selection change in category
    categorySelector.addEventListener('change', (event) => {
        category = categorySelector.value;
        categorySelected(category, 0, 'none');
    });
    // Next clicked
    next.addEventListener('click', (event) => {
        legendTitleClass = bodyDiv.children[0].classList[1]
        category = legendTitleClass.slice(0, legendTitleClass.indexOf('_'));
        page = +(legendTitleClass.slice(legendTitleClass.indexOf('_') + 1));
        console.log(legendTitleClass, category, page);
        categorySelected(category, page, 'pos');
    });
    // Previous clicked
    previous.addEventListener('click', (event) => {
        legendTitleClass = bodyDiv.children[0].classList[1]
        category = legendTitleClass.slice(0, legendTitleClass.indexOf('_'));
        page = +(legendTitleClass.slice(legendTitleClass.indexOf('_') + 1));
        console.log(legendTitleClass, category, page);
        categorySelected(category, page, 'neg');
    });
};


export const categorySelected = (category, page, change) => {
    let markup;
    if (category === 'remotely_sensed' || category === 'remotelySensed') {
        markup = createHTMLArr(remotelySensedArr);
    } else if (category === 'short_duration' || category === 'shortDuration') {
        markup = createHTMLNestedArr(shortDurationArr);
    } else if (category === 'long_duration' || category === 'longDuration') {
        markup = createHTMLNestedArr(longDurationArr);
    } else if (category === 'significant_weather_outlooks' || category === 'outlook') {
        markup = createHTMLNestedArr(outlookArr);
    } else if (category === 'gridded_forecasts' || category === 'gridded') {
        markup = createHTMLArr(griddedArr);
    }
    console.log(markup);
    renderLegendBody(markup, page, change)
}

const renderLegendBody = (markup, page, change) => {
    const legendBody = document.querySelector('.legend_middle_container');
    console.log(markup[1]);
    clearLegend();
    if (change === 'none') {
        legendBody.insertAdjacentHTML('afterbegin', markup[page]);
    } else if (change === 'pos') {
        if (page < markup.length - 1) {
            legendBody.insertAdjacentHTML('afterbegin', markup[page + 1]);
        } else {
            legendBody.insertAdjacentHTML('afterbegin', markup[0]);
        }
    } else if (change === 'neg') {
        if (page === 0) {
            legendBody.insertAdjacentHTML('afterbegin', markup[markup.length - 1]);
        } else {
            legendBody.insertAdjacentHTML('afterbegin', markup[page - 1]);
        }
    }
}