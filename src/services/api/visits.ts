import { api } from '../api';

/* eslint-disable typescript-sort-keys/interface */
type Address = {
  id: number;
  address: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  complement: string;
  latitude: string;
  longitude: string;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type Customer = {
  id: number;
  social_name: string;
  cnpj: string;
  email: string | null;
  address_id: number;
  address: Address;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type Visit = {
  id: number;
  date_checkin: string;
  date_checkout: string;
  duration: number;
  status: string;
  gps_accuracy: number | null;
  ignore_visit: number;
  not_sale_reason_id: number | null;
  latitude: string;
  longitude: string;
  user_id: number;
  actor_id: number;
  customer_id: number;
  visit_comments: string | null;
  customer: Customer;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type VisitsResponse = {
  status: string;
  visits: Visit[];
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type getVisitsParams = {
  dateInit: string;
  dateEnd: string;
};
/* eslint-enable typescript-sort-keys/interface */

export async function getVisits({ dateInit, dateEnd }: getVisitsParams) {
  const response = await api.get<VisitsResponse>('/v2/visits', {
    params: { date_end: dateEnd, date_init: dateInit },
  });
  return response.data;
}
