import { api } from '.';

interface Segment {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Flag {
    id: number;
    name: string;
    segment_id: number;
    segment: Segment;
}

interface FlagResponse {
    status: string;
    date_update: string;
    flags: Flag[];
}

export async function getFlags(lastUpdate?: string) {
    const response = await api.get<FlagResponse>('/v2/flags', { params: { date_update: lastUpdate } });
    return response.data;
}