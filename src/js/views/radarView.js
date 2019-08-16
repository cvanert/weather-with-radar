import axios from 'axios';

export const getRadarData = async(lat, long) => {
    const result = await axios(`https://tilecache.rainviewer.com/v2/radar/{ts}/{size}/{z}/{${lat}}/{${long}}/{color}/{options}.png`);
    console.log(result);
    const markup = `
        <div class="radar_container">
            <img src="https://tilecache.rainviewer.com/v2/radar/{ts}/{size}/{z}/{${lat}}/{${long}}/{color}/{options}.png">
        </div>
    `;
    document.querySelector('.body_middle').insertAdjacentHTML('afterbegin', markup);
}