import axios from 'axios';
import zipcodes from 'zipcodes';

export const getGeolocation = async(zip) => {
    var location = await zipcodes.lookup(zip);
    return location;
}