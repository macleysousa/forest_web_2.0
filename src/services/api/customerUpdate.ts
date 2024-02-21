import { api } from '.';

interface Address {
    address_id: number;
    zip: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    update_mode: string;
    geo_update_mode: string;
}

interface CustomerInfo {
    actor_id: number;
    visit_frequency: string;
    postos_galonagem: number;
    postos_frentistas: number;
    postos_tem_troca_oleo: boolean;
    postos_tem_lavagem: boolean;
    postos_tem_conveniencia: boolean;
    postos_gerente: string;
    postos_chefe_pista: string;
    postos_lubrificador: string;
    postos_melhor_frentista: string;
    postos_tem_expositor_chao: boolean;
    postos_tem_expositor_bomba: boolean;
    postos_tem_expositor_acrilico: boolean;
    postos_tem_banners: boolean;
    postos_tem_adesivos: boolean;
    mont_conc_ca_passagem: number;
    mont_conc_ca_consultores: number;
    mont_conc_ca_gerente_pecas: string;
    mont_conc_ca_gerente_vendas: string;
    mont_conc_ca_chefe_oficina: string;
    mont_conc_ca_melhor_consultor: string;
    ca_qtd_elevadores: number;
    ca_qtd_mecanicos: number;
    ca_qtd_atendentes: number;
    todos_decisor_nome: string;
    todos_decisor_email: string;
    todos_decisor_telefone: string;
    todos_decisor_aniversario: string;
    todos_melhor_horario: string;
    avaliacao_geral: number;
    tem_meta_diaria_agentes_vendas: boolean;
    tem_comissao_venda_agentes: boolean;
    responsavel_acompanhamento_meta_diaria: string;
    multiplicador_nome: string;
    comments: string;
}

interface CustomerUpdate {
    customer_id: number;
    address_id: number;
    contact_name: string;
    email: string;
    email_billing: string;
    social_name: string;
    fantasy_name: string;
    cnpj: string;
    ie: string;
    im: string;
    phone: string;
    segment_id: number;
    partner_id: number;
    flag_id: number;
    brand_id: number;
    customer_matrix_id: number;
    situation: string;
    comments: string;
    validated: number;
    update_mode: string;
    address: Address;
    customer_info: CustomerInfo;
}

export async function putCustomerUpdate(data: CustomerUpdate) {
    const response = await api.put('/v2/customers/update', data);
    return response.data.customers;
}
