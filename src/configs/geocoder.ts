import NodeGeocoder, { Options } from 'node-geocoder';

const options: Options = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  formatter: null,
  provider: 'google',
};

export const geocoder = NodeGeocoder(options);
