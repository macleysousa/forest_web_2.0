import { api } from '..';

type Actor = {
  actor_name: string;
  current: any;
  id: number;
  role: string; // You may want to replace 'any' with a specific type if possible
  tree_id: number;
  tree_name: string;
};

type Customer = {
  // You may want to replace 'any' with a specific type if possible
  actors: Actor[];
  city: string;
  cnpj: string;
  // You may want to replace 'any' with a specific type if possible
  days_until_inactivation: any;
  has_routes: any;
  id: number;
  partner: string | null;
  rating: string | null;
  segment: string;
  situation: string;
  social_name: string;
  state: string;
  status: string;
  validated: number;
};

type Link = {
  active: boolean;
  label: string;
  url: string | null;
};

type Totals = {
  active: number;
  count: number;
  inactive: number;
  inadimplente: number;
  prospect: number;
  routes: number;
};

export type CustomersResponse = {
  customers: {
    current_page: number;
    data: Customer[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    status: string;
    to: number;
    total: number;
    totals: Totals;
  };
  status: string;
};

type CustomerParamsType = {
  actor?: string;
  brand?: string;
  cadastro?: string;
  city?: string;
  cnpj?: string;
  dn_code?: string;
  flag?: string;
  has_filters: 1 | 0;
  neighborhood?: string;
  order: string;
  order_type: string;
  page: string;
  partner?: string;
  segment?: string;
  situation?: string;
  social_name?: string;
  state?: string;
  status?: string;
  tree?: string;
};

export async function getCustomers({
  cnpj,
  actor,
  social_name,
  partner,
  brand,
  flag,
  segment,
  situation,
  status,
  state,
  city,
  neighborhood,
  tree,
  dn_code,
  cadastro,
  has_filters,
  order,
  order_type,
  page,
}: CustomerParamsType) {
  const queryParams = new URLSearchParams({
    actor: actor || '',
    brand: brand || '',
    cadastro: cadastro || '',
    city: city || '',
    cnpj: cnpj || '',
    dn_code: dn_code || '',
    flag: flag || '',
    has_filters: has_filters.toString(),
    neighborhood: neighborhood || '',
    order: order || '',
    order_type: order_type || '',
    page: page.toString(),
    partner: partner || '',
    segment: segment || '',
    situation: situation || '',
    social_name: social_name || '',
    state: state || '',
    status: status || '',
    tree: tree || '',
  });

  queryParams.forEach((value, key) => {
    if (['', undefined].includes(value)) queryParams.delete(key);
  });

  const response = await api.get<CustomersResponse>(
    `/web/customers?${queryParams.toString()}`,
    {
      headers: {
        filters: 'AwA=',
      },
    },
  );
  return response.data;
}
