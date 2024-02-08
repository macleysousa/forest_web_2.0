import { api } from '.';

interface Order {
    id: number;
    number: number;
    visit_id: number;
    customer_id: number;
    date_sync: string;
    date_send: string | null;
    date_billing: string | null;
    total_value: string;
    order_need_approval: number | null;
    payment_option_id: number;
    payment_option_name: string;
    payment_option_need_approval: number;
    status: string;
    type: string;
    billing_comments: string | null;
    scheduled_order_date: string | null;
    remote_order_number: string | null;
    nfe_id: number | null;
    number_nfe: number | null;
    nfe_date: string | null;
    order_products: OrderProduct[];
    visit: Visit;
}

interface OrderProduct {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    quantity_mix: number;
    unity_price: string;
    original_price: string;
    price_table: string;
    sale_unity: string;
    price_need_approval: number;
    product: Product;
}

interface Product {
    id: number;
    code: string;
    name: string;
    category_id: number;
    unity: string;
    amount: number;
    image: string;
    dsh_dso: string;
    status: number;
    status_obsolete: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Visit {
    id: number;
    date: string;
    customer_id: number;
    customer: Customer;
}

interface Customer {
    id: number;
    social_name: string;
    fantasy_name: string;
    cnpj: string;
}

interface OrderResponse {
    status: string;
    date_update: string;
    orders: Order[];
}

interface OrderParams {
    dateInit: string;
    dateEnd: string;
    customerId?: number;
}

export const getOrders = async ({ dateInit, dateEnd, customerId }: OrderParams) => {
    const response = await api.get<OrderResponse>('/v2/orders', { params: { date_init: dateInit, date_end: dateEnd, customer_id: customerId } });
    return response.data;
};
