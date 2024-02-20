import { api } from 'src/commons/api';

interface Customer {
    id: number;
    cnpj: string;
    status: string;
    situation: string;
    social_name: string;
    fantasy_name: string | null;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
    validated: number;
    comments: string | null;
    address_id: number;
    segment_id: number;
    partner_id: number | null;
    brand_id: number | null;
    flag_id: number | null;
    im: string | null;
    ie: string | null;
    email_billing: string | null;
    routes: any[]; // You might want to define a specific interface for routes if they have a consistent structure
    segment: {
        id: number;
        name: string;
    };
    partner: { id: number; name: string } | null;
    brand: any; // Define a specific interface if needed
    flag: any; // Define a specific interface if needed
    address: {
        id: number;
        address: string;
        number: string;
        complement: string | null;
        neighborhood: string;
        zip: string;
        city: string;
        state: string;
        latitude: string;
        longitude: string;
        updated_at: string;
    };
    price_table: {
        id_product_price_table_customers: number;
        id_product_price_table_lists: number;
        customer_id: number;
        name: string;
    }[];
    price_actor_customer: {
        id: number;
        tree_id: number;
        actor_id: number;
        customer_id: number;
        product_id: number;
        updated_by_user_id: number;
        deleted_by_user_id: number | null;
        price: string;
        incentive: any; // Define a specific interface if needed
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }[];
    customer_info: {
        customer_id: number;
        visit_frequency: string | null;
        postos_tem_troca_oleo: number | null;
        postos_tem_lavagem: number | null;
        postos_tem_conveniencia: number | null;
        postos_gerente: any; // Define a specific interface if needed
        postos_chefe_pista: any; // Define a specific interface if needed
        postos_lubrificador: any; // Define a specific interface if needed
        postos_melhor_frentista: any; // Define a specific interface if needed
        mont_conc_ca_gerente_pecas: any; // Define a specific interface if needed
        mont_conc_ca_chefe_oficina: any; // Define a specific interface if needed
        mont_conc_ca_melhor_consultor: any; // Define a specific interface if needed
        mont_conc_ca_gerente_vendas: any; // Define a specific interface if needed
        mont_conc_ca_passagem: number | null;
        mont_conc_ca_consultores: number | null;
        ca_qtd_elevadores: number | null;
        ca_qtd_mecanicos: number | null;
        ca_qtd_atendentes: number | null;
        todos_decisor_nome: string | null;
        todos_decisor_email: string | null;
        todos_decisor_aniversario: string | null;
        todos_melhor_horario: string | null;
        todos_decisor_telefone: string | null;
        tem_meta_diaria_agentes_vendas: number | null;
        responsavel_acompanhamento_meta_diaria: any; // Define a specific interface if needed
        tem_comissao_venda_agentes: number | null;
        multiplicador_nome: string | null;
        postos_galonagem: number | null;
        postos_frentistas: number | null;
        postos_tem_expositor_chao: number | null;
        postos_tem_expositor_bomba: number | null;
        postos_tem_expositor_acrilico: number | null;
        postos_tem_banners: number | null;
        postos_tem_adesivos: number | null;
        avaliacao_geral: any; // Define a specific interface if needed
        comments: string | null;
        updated_at: string | null;
    };
    customer_data: {
        customer_id: number;
        actor_id: number;
        actor_name: string;
        days_until_inactivation: number | null;
        action: string | null;
        action_status: string | null;
        visit_last_date: string | null;
        nfe_last_date: string | null;
        volume_mix_potential: number | null;
        volume_mix_current_month: string | null;
        volume_mix_average_3m: string | null;
        volume_mix_target: string | null;
        volume_mix_target_difference: string | null;
        volume_mix_target_percent: string | null;
        revenue_current_month: string | null;
        revenue_average_3m: string | null;
        updated_at: string;
    }[];
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
