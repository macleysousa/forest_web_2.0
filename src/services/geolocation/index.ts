import axios from 'axios';

const geolocation = axios.create({
  baseURL: '/api/geolocate',
});

export { geolocation };
