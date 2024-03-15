import { geolocation } from '.';

type Location = {
  administrativeLevels: {
    level1long: string;
    level1short: string;
    level2long: string;
    level2short: string;
  };
  country: string;
  countryCode: string;
  extra: {
    confidence: number;
    establishment: any;
    googlePlaceId: string;
    // You might want to replace 'any' with a specific type if known
    neighborhood: string;
    premise: any;
    // You might want to replace 'any' with a specific type if known
    subpremise: any; // You might want to replace 'any' with a specific type if known
  };
  formattedAddress: string;
  latitude: number;
  longitude: number;
  provider: string;
  streetName: string;
  streetNumber: string;
  zipcode: string;
};

type GeolocationResponse = Location[];

async function postGeolocation(data) {
  const response = await geolocation.post<GeolocationResponse>('', data);
  return response.data;
}

export { postGeolocation };
