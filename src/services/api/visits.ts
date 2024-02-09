import { api } from '.';

interface Address {
    id: number;
    address: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
    complement: string;
    latitude: string;
    longitude: string;
}

interface Customer {
    id: number;
    social_name: string;
    cnpj: string;
    email: string | null;
    address_id: number;
    address: Address;
}

interface Visit {
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
}

interface VisitsResponse {
    status: string;
    visits: Visit[];
}

interface getVisitsParams {
    dateInit: string;
    dateEnd: string;
}

export async function getVisits({ dateInit, dateEnd }: getVisitsParams) {
    const response = await api.get<VisitsResponse>('/v2/visits', { params: { date_init: dateInit, date_end: dateEnd } });
    return response.data;
}