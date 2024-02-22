import { api } from '../api';

interface GetNFEsParams {
  order: string;
  order_type: string;
  period: string;
  page: string;
  has_filters: string;
}

interface GetNFEsResult {
  status: 'success';
  nfes: {
    current_page: number;
    data: Array<{
      id: number;
      number_nfe: string;
      serie: string;
      date: string;
      type: string;
      nfe_vault_id: number;
      value_total: number;
      'nfes.tax_vIPI': string;
      'nfes.tax_vICMS': string;
      'nfes.tax_vST': string;
      order_number_customer: string;
      order_number_billing: string;
      segment_name: string;
      partner_name: string;
      flag_name: string;
      brand_name: null;
      city: string;
      state: string;
      customer_receiver_id: number;
      customer_receiver_cnpj: string;
      customer_receiver_social_name: string;
      customer_receiver_situation: string;
      customer_emitter_id: number;
      customer_emitter_cnpj: string;
      customer_emitter_social_name: string;
      tree_emitter_id: number;
      tree_emitter_name: string;
      actor_emitter_name: string;
      actor_receiver_name: string;
      actor_emitter_name_real: string;
      date_diff: number;
      nfe_products: Array<{
        code: string;
        quantity: string;
        quantity_mix: number;
        mix: string;
        unity: string;
        product_unity: string;
        product_amount: number;
        value_unity: number;
        value_total: number;
      }>;
    }>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
    totals: {
      count: number;
      period: string;
      total_quantity: number;
      total_quantity_mix: number;
      value_total: number;
      items: number;
      cobertura: number;
    };
  };
}

export async function getNFEs(params: GetNFEsParams) {
  const response = await api.get<GetNFEsResult>('/v2/nfes', { params });
  return response.data;
}