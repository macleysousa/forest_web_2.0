import { api } from '.';

type Segment = {
  id: number;
  name: string;
};

type Partner = {
  id: number;
  name: string;
  segment: Segment;
  segment_id: number;
};

type PartnerResponse = {
  date_update: string;
  partners: Partner[];
  status: string;
};

export async function getPartners(lastUpdate?: string) {
  const response = await api.get<PartnerResponse>('/v2/partners', {
    params: { date_update: lastUpdate },
  });
  return response.data;
}
