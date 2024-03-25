import { api } from '../api';

export type GetProductsFilters = {
  category?: string | undefined;
  code?: string | undefined;
  dsh_dso?: string | undefined;
  segment?: string | undefined;
  unity?: string | undefined;
};

export type GetProductsParams = GetProductsFilters & {
  page: string;
  signal: AbortSignal;
};

/* eslint-disable typescript-sort-keys/interface */
export type GetProductsResult = {
  status: 'success';

  products: {
    current_page: number;

    data: Array<{
      id: number;
      code: string;
      name: string;
      category_id: number;
      unity: string;
      amount: number;
      image: null;
      dsh_dso: string;
      status: number;
      status_obsolete: number;
      created_at: string;
      updated_at: string;
      deleted_at: null;

      segments: Array<{
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        deleted_at: null;

        pivot: {
          product_id: number;
          segment_id: number;
        };
      }>;

      category: {
        id: number;
        name: string;
        products_category_id: null;
        created_at: string;
        updated_at: string;
        deleted_at: null;
      };
    }>;

    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
  };
};
/* eslint-enable typescript-sort-keys/interface */

export const getProducts = async ({ signal, ...params }: GetProductsParams) => {
  const response = await api.get<GetProductsResult>('/products', {
    params,
    signal,
  });

  return response.data;
};
