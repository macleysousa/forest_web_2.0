import { api } from '../api';

/* eslint-disable typescript-sort-keys/interface */
type Order = {
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
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type OrderProduct = {
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
};

/* eslint-disable typescript-sort-keys/interface */
type Product = {
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
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type Visit = {
  id: number;
  date: string;
  customer_id: number;
  customer: Customer;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type Customer = {
  id: number;
  social_name: string;
  fantasy_name: string;
  cnpj: string;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type OrderResponse = {
  status: string;
  date_update: string;
  orders: Order[];
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type OrderParams = {
  dateInit: string;
  dateEnd: string;
  customerId?: number;
};
/* eslint-enable typescript-sort-keys/interface */

export const getOrders = async ({
  dateInit,
  dateEnd,
  customerId,
}: OrderParams) => {
  const response = await api.get<OrderResponse>('/v2/orders', {
    params: { customer_id: customerId, date_end: dateEnd, date_init: dateInit },
  });
  return response.data;
};
