import { api } from '.';

type Segment = {
  created_at: string;
  deleted_at: string | null;
  id: number;
  name: string;
  updated_at: string;
};

type Flag = {
  id: number;
  name: string;
  segment: Segment;
  segment_id: number;
};

type FlagResponse = {
  date_update: string;
  flags: Flag[];
  status: string;
};

export async function getFlags(lastUpdate?: string) {
  const response = await api.get<FlagResponse>('/v2/flags', {
    params: { date_update: lastUpdate },
  });
  return response.data;
}
