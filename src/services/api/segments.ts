import { api } from '.';

interface Segment {
    name: string;
    id: number;
}

interface SegmentResponse {
    status: string;
    date_update: string;
    segments: Segment[];
}

export async function getSegments(lastUpdate?: string) {
    const response = await api.get<SegmentResponse>('/v2/segments', { params: { date_update: lastUpdate } });
    return response.data;
}