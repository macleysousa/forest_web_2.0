import { api } from '.';

type Segment = {
  id: number;
  name: string;
};

type SegmentResponse = {
  date_update: string;
  segments: Segment[];
  status: string;
};

export async function getSegments(lastUpdate?: string) {
  const response = await api.get<SegmentResponse>('/v2/segments', {
    params: { date_update: lastUpdate },
  });
  return response.data;
}
