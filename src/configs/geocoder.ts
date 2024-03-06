import NodeGeocoder, { Options } from 'node-geocoder';

const options: Options = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  // fetch: async (
  //   url: RequestInfo,
  //   init?: RequestInit | undefined,
  // ): Promise<Response> => {
  //   return await fetch(url, init)
  //     .then((res) => res.json())
  //     .catch((err) => console.error(err));
  // },
  formatter: null,
  provider: 'google',
};

export const geocoder = NodeGeocoder(options);
