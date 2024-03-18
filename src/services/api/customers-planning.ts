import { api } from '../api';

/* eslint-disable typescript-sort-keys/interface */
type GetCustomersPlanningParams = {
  page?: string | undefined;
  actor_id: string;
  tree_id: string;
  signal?: AbortSignal | undefined;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type GetCustomersPlanningResult = {
  status: 'success';
  customers_planning: {
    current_page: number;
    data: Array<{
      id: number;
      customer_id: number;
      cnpj: string;
      customer_status: string;
      social_name: string;
      customer_validated: number;
      customer_situation: string;
      city: string;
      state: string;
      customer_comments: null;
      actor_name: string;
      segment_id: number;
      segment_name: string;
      partner_id: number;
      partner_name: string;
      flag_id: number | null;
      flag_name: string | null;
      brand_id: null;
      brand_name: null;
      date: string;
      action: null;
      action_status: null;
      comments: null;
      nfe_last_date: null;
      order_last_date: null;
      order_last_id: null;
      visit_last_date: null;
      last_not_sale_reason_name: null;
      frentistas: null;
      consultores: null;
      galonagem: null;
      passagens: null;
      volume_mix_potential: null;
      volume_mix_average_3m: null;
      volume_mix_month: null;
      volume_mix_target: number;
      volume_mix_target_diff: number;
      ranking_position_percent: null;
      ranking_position_percent_3m: null;
      route: null;
    }>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    totals: {
      count_customers: number;
      count_active: number;
      count_inactive: number;
      count_prospect: number;
      sum_volume_mix_potential: number;
      sum_volume_mix_month: number;
      sum_volume_mix_target: number;
      avg_volume_mix: number;
      sum_volume_mix_target_actors: string;
      diff_sum_volume_mix_target: number;
    };
  };
};
/* eslint-enable typescript-sort-keys/interface */

export async function getCustomersPlanning({
  page,
  actor_id,
  tree_id,
  signal,
}: GetCustomersPlanningParams) {
  const params: Record<string, string> = {};

  if (page !== undefined) params.page = page;
  if (actor_id !== undefined) params.actor_id = actor_id;
  if (tree_id !== undefined) params.tree_id = tree_id;

  const response = await api.get<GetCustomersPlanningResult>(
    '/v2/customers-planning',
    { params, signal },
  );

  return response.data;
}
