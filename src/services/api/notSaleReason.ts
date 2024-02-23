import { api } from '.';

type NotSaleReason = {
  id: number;
  reason: string;
  title: string;
};

type NotSaleReasonsResponse = {
  date_update: string;
  not_sale_reasons: NotSaleReason[];
  status: string;
};

export const getNotSaleReason = async (date?: Date) => {
  const response = await api.get<NotSaleReasonsResponse>('/v2/orders', {
    params: { date_update: date },
  });
  return response.data.not_sale_reasons;
};
