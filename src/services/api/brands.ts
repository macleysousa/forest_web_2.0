import { api } from '.';

type Brand = {
  id: number;
  name: string;
};

type BrandResponse = {
  brands: Brand[];
  date_update: string;
  status: string;
};

export async function getBrands(lastUpdate?: string) {
  const response = await api.get<BrandResponse>('/v2/brands', {
    params: { date_update: lastUpdate },
  });
  return response.data;
}
