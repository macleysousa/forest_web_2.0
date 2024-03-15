import { NextApiRequest, NextApiResponse } from 'next';
import { geocoder } from '../../configs/geocoder';

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { address } = req.body;
    try {
      const geocodedData = await geocoder.geocode(address);
      res.status(200).json(geocodedData);
    } catch (error) {
      res.status(500).json({ error: 'Geocoding failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
