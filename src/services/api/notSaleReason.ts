import { api } from '.';

interface NotSaleReason {
    id: number;
    title: string;
    reason: string;
}

interface NotSaleReasonsResponse {
    status: string;
    date_update: string;
    not_sale_reasons: NotSaleReason[];
}

export const getOrders = async (date: Date) => {
    const response = await api.get<NotSaleReasonsResponse>('/v2/orders', { params: { date_update: date } });
    return response.data.not_sale_reasons;
};

