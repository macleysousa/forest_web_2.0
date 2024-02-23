import { api } from '../api';

type GetProductsParams = {
  signal: AbortController['signal'];
};

/* eslint-disable typescript-sort-keys/interface */
type GetProductsResult = {
  status: 'success';
  categories: Array<{
    id: number;
    name: string;
    products_category_id: null;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    products: Array<{
      id: number;
      code: string;
      name: string;
      unity: string;
      amount: number;
      category_id: number;
      status: number;
      image: string | null;
      inventory: null;
      segments: Array<{
        id: number;
        name: string;
        pivot: {
          product_id: number;
          segment_id: number;
        };
      }>;
      product_mix: {
        id: number;
        actor_id: number | null;
        product_id: number;
        mix: string;
        created_at: string;
        updated_at: string;
        deleted_at: null;
      } | null;
      category: {
        id: number;
        name: string;
      };
      product_price_actor_default: {
        id: number;
        tree_id: number;
        actor_id: number;
        product_id: number;
        price: string;
        price_alt_1: string | null;
        price_alt_2: string | null;
        price_alt_3: string | null;
        price_alt_4: string | null;
        price_alt_5: string | null;
        price_alt_6: string | null;
        price_alt_7: string | null;
        price_alt_8: string | null;
        price_alt_9: string | null;
        price_alt_10: string | null;
        updated_by_user_id: number;
        deleted_by_user_id: null;
        created_at: string;
        updated_at: string;
        deleted_at: null;
      } | null;
    }>;
  }>;
};
/* eslint-enable typescript-sort-keys/interface */

export const getProducts = async ({ signal }: GetProductsParams) => {
  const response = await api.get<GetProductsResult>('/v2/products', { signal });
  return response.data;
};
