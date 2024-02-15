import { api } from '.';

interface Segment {
    id: number;
    name: string;
}

interface Partner {
    id: number;
    name: string;
    segment_id: number;
    segment: Segment;
}

interface PartnerResponse {
    status: string;
    date_update: string;
    partners: Partner[];
}

export async function getPartners(lastUpdate?: string) {
    const response = await api.get<PartnerResponse>('/v2/partners', { params: { date_update: lastUpdate } });
    return response.data;
}