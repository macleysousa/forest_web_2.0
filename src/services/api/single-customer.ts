import { api } from '../api';

type CustomerData = {
  action: string | null;
  action_status: string | null;
  actor_id: number;
  actor_name: string | null;
  customer_id: number;
  days_until_inactivation: number | null;
  nfe_last_date: string | null;
  revenue_average_3m: number | null;
  revenue_current_month: number | null;
  updated_at: string;
  visit_last_date: string | null;
  volume_mix_average_3m: number | null;
  volume_mix_current_month: number | null;
  volume_mix_potential: number | null;
  volume_mix_target: number | null;
  volume_mix_target_difference: number | null;
  volume_mix_target_percent: number | null;
};

type Address = {
  address: string;
  city: string;
  complement: string;
  id: number;
  latitude: string;
  longitude: string;
  neighborhood: string | null;
  number: string;
  state: string;
  updated_at: string;
  zip: string;
};

type Segment = {
  id: number;
  name: string;
};

type Partner = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  name: string;
};

type Flag = {
  id: number;
  name: string;
};

type CustomerInfo = {
  avaliacao_geral: number;
  ca_qtd_atendentes: number;
  ca_qtd_elevadores: number;
  ca_qtd_mecanicos: number;
  comments: string;
  customer_id: number;
  mont_conc_ca_chefe_oficina: string;
  mont_conc_ca_consultores: number;
  mont_conc_ca_gerente_pecas: string;
  mont_conc_ca_gerente_vendas: string;
  mont_conc_ca_melhor_consultor: string;
  mont_conc_ca_passagem: number;
  multiplicador_nome: string;
  postos_chefe_pista: string;
  postos_frentistas: number;
  postos_galonagem: number;
  postos_gerente: string;
  postos_lubrificador: string;
  postos_melhor_frentista: string;
  postos_tem_adesivos: boolean;
  postos_tem_banners: boolean;
  postos_tem_conveniencia: boolean;
  postos_tem_expositor_acrilico: boolean;
  postos_tem_expositor_bomba: boolean;
  postos_tem_expositor_chao: boolean;
  postos_tem_lavagem: boolean;
  postos_tem_troca_oleo: boolean;
  responsavel_acompanhamento_meta_diaria: string;
  tem_comissao_venda_agentes: boolean;
  tem_meta_diaria_agentes_vendas: boolean;
  todos_decisor_aniversario: string;
  todos_decisor_email: string;
  todos_decisor_nome: string;
  todos_decisor_telefone: string;
  todos_melhor_horario: string;
  visit_frequency: string;
};

/* eslint-disable typescript-sort-keys/interface */
type Customer = {
  id: number;
  cnpj: string;
  status: string;
  situation: string;
  incentive: number;
  social_name: string;
  fantasy_name: string;
  contact_name: string;
  email: string;
  email_billing: string;
  phone: string;
  validated: number;
  comments: string;
  address_id: number;
  segment_id: number;
  partner_id: number;
  brand_id: number;
  flag_id: number;
  ie: string;
  im: string;
  routes: any[]; // You may want to replace this with an appropriate type
  segment: Segment;
  partner: Partner;
  brand: Brand;
  flag: Flag;
  address: Address;
  price_table: any[]; // You may want to replace this with an appropriate type
  price_actor_customer: any[]; // You may want to replace this with an appropriate type
  customer_info: CustomerInfo;
  customer_data: CustomerData[];
};

/* eslint-disable typescript-sort-keys/interface */
type CustomerResponse = {
  status: string;
  customers: Customer[];
};
/* eslint-enable typescript-sort-keys/interface */

export async function getCustomers({
  date,
  customerId,
}: { customerId?: number; date?: string } = {}) {
  let queryParams = '';
  date ? (queryParams += `date=${date}`) : '';
  customerId
    ? (queryParams += `${date ? '&' : ''}customer_id=${customerId}`)
    : '';

  const response = await api.get<CustomerResponse>(
    `/v2/customers?${queryParams}`,
  );
  return response.data.customers;
}
