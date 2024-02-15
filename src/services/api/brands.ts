import { api } from '.';

interface Brand {
    name: string;
    id: number;
}

interface BrandResponse {
    status: string;
    date_update: string;
    brands: Brand[];
}

export async function getBrands(lastUpdate?: string) {
    const response = await api.get<BrandResponse>('/v2/brands', { params: { date_update: lastUpdate } });
    return response.data;
}
