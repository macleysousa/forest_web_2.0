import { api } from '.';

type Address = {
  address: string;
  city: string;
  complement: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  number: string;
  state: string;
  zip: string;
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

type CustomerStore = {
  address: Address;
  address_id: number;
  brand_id: number;
  cnpj: string;
  comments: string;
  contact_name: string;
  customer_info: CustomerInfo;
  email: string;
  email_billing: string;
  fantasy_name: string;
  flag_id: number;
  ie: string;
  im: string;
  incentive: number;
  partner_id: number;
  phone: string;
  segment_id: number;
  social_name: string;
};

export async function postCustomerStore(data: CustomerStore) {
  const response = await api.post('/v2/customers/store', data);
  return response.data;
}
