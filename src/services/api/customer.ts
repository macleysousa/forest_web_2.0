import { api } from 'src/commons/api';

interface CustomerData {
    customer_id: number;
    actor_id: number;
    actor_name: string | null;
    days_until_inactivation: number | null;
    action: string | null;
    action_status: string | null;
    visit_last_date: string | null;
    nfe_last_date: string | null;
    volume_mix_potential: number | null;
    volume_mix_current_month: number | null;
    volume_mix_average_3m: number | null;
    volume_mix_target: number | null;
    volume_mix_target_difference: number | null;
    volume_mix_target_percent: number | null;
    revenue_current_month: number | null;
    revenue_average_3m: number | null;
    updated_at: string;
}

interface Address {
    id: number;
    address: string;
    number: string;
    complement: string;
    neighborhood: string | null;
    zip: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    updated_at: string;
}

interface Segment {
    id: number;
    name: string;
}

interface Partner {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Flag {
    id: number;
    name: string;
}

interface CustomerInfo {
    customer_id: number;
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

interface Customer {
    id: number;
    cnpj: string;
    status: string;
    situation: string;
    incentive: boolean | null;
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
}

interface CustomerResponse {
    status: string;
    customers: Customer[];
}


export async function getCustomers({ date, customerId }: { date?: string; customerId?: number } = {}) {
    let queryParams = '';
    date ? queryParams += `date=${date}` : '';
    customerId ? queryParams += `${date ? '&' : ''}customer_id=${customerId}` : '';

    const response = await api.get<CustomerResponse>(`/v2/customers?${queryParams}`);
    return response.data.customers;
}
