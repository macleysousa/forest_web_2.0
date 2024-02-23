import { api } from '.';

type Order = {
  order: {
    actor_id: number;
    billing_comments: string;
    cancelled_by_user_id: number | null;
    created_at: string;
    customer: {
      // Change to proper type if possible
      actor_tree_branch: Array<{
        pivot: {
          actor_id: number;
          customer_id: number;
          tree_id: number;
        };
        tree_branch_id: number;
      }>;
      address: {
        address: string;
        city: string;
        // Change to proper type if possible
        complement: string;
        country: any;
        create_mode: string | null;
        created_at: string;
        deleted_at: string | null;
        geo_confirmed: number;
        geo_update_mode: string;
        id: number;
        latitude: string;
        longitude: string;
        neighborhood: string;
        number: string;
        state: string;
        update_mode: string;
        updated_at: string;
        updated_by: string;
        zip: string;
      };
      address_id: number;
      avatar: string | null;
      brand_id: number;
      cnpj: string;
      comments: string;
      contact_name: string;
      create_mode: string;
      created_at: string;
      customer_matrix_id: number;
      deleted_at: string | null;
      email: string;
      email_billing: string | null;
      fantasy_name: string;
      // Change to proper type if possible
      flag_id: number;
      id: number;
      ie: string;
      im: string;
      incentive: any;
      partner: any;
      partner_id: any;
      phone: string;
      // Change to proper type if possible
      rating: string;
      segment: {
        created_at: string;
        deleted_at: string | null;
        id: number;
        name: string;
        updated_at: string;
      };
      segment_id: number;
      situation: string;
      social_name: string;
      status: string;
      update_mode: string;
      updated_at: string;
      validated: number;
    };
    customer_id: number;
    date: string;
    date_billing: string | null;
    date_cancelled: string | null;
    date_change_status: string | null;
    date_order_approval: string | null;
    date_send: string | null;
    date_sync: string;
    deleted_at: string | null;
    distributor_id: number;
    id: number;
    number: number;
    order_approval_reason: string | null;
    order_approvals: any[];
    order_approved_by_user_id: number | null;
    // Change to proper type if possible
    order_billing: Array<{
      // Change to proper type if possible
      created_at: string;
      deleted_at: string | null;
      id: number;
      integration_actor_id: number | null;
      integration_name: string | null;
      order_id: number;
      params: any;
      status: string;
      updated_at: string;
    }>;
    order_comments: string | null;
    // Change to proper type if possible
    order_integration: null | any;
    order_need_approval: number | null;
    order_nfe_emitter_cnpj: any[];
    // Change to proper type if possible
    order_nfes: any[];
    order_nfes_str: string;
    order_products: OrderProduct[];
    payment_option_approved_by_user_id: number | null;
    payment_option_date_approval: string | null;
    payment_option_id: number;
    payment_option_name: string;
    payment_option_need_approval: number;
    related_to_order_id: number | null;
    remote_order_number: string;
    scheduled_order_date: string | null;
    status: string;
    total_quantity: number;
    total_quantity_mix: number;
    total_value: string;
    tree_id: number;
    type: string;
    updated_at: string;
    user: {
      api_token: string;
      avatar: string | null;
      created_at: string;
      date_birth: string | null;
      deleted_at: string | null;
      email: string;
      expiration_date: string | null;
      google_registration_id: string;
      id: number;
      is_ranking: number;
      main_dashboard_id: number;
      main_tree_actor_id: string;
      mobile_app: number;
      name: string;
      password_reset_token: string | null;
      phone: string | null;
      status: number;
      updated_at: string;
      user_type_id: number;
    };
    user_cancel: null | any;
    user_id: number;
    // Change to proper type if possible
    visit: {
      actor_id: number;
      actor_name: string;
      closed_customer_image: string | null;
      created_at: string;
      customer_id: number;
      customer_latitude: string;
      customer_longitude: string;
      date_checkin: string;
      date_checkout: string;
      date_sync: string;
      deleted_at: string | null;
      distance: any;
      distributor_id: number;
      distributor_name: string;
      duration: number;
      gps_accuracy: any;
      id: number;
      // Change to proper type if possible
      ignore_visit: number;
      latitude: string;
      longitude: string;
      not_sale_reason_id: number | null;
      // Change to proper type if possible
      status: string;
      tree_id: number;
      tree_name: string;
      type: string;
      updated_at: string;
      user_id: number;
      user_name: string;
      visit_comments: string;
      visit_id: number | null;
    };
    visit_id: number; // Change to proper type if possible
  };
  status: string;
};

type OrderProduct = {
  billing_to: string;
  // Change to proper type if possible
  comments: string | null;
  // Change to proper type if possible
  created_at: string;
  deleted_at: string | null;
  energizer_send: null | any;
  id: number;
  nfe_product: any[];
  order_id: number;
  original_price: string;
  price_approval_reason: string | null;
  price_approved_by_user_id: number | null;
  price_date_approval: string | null;
  price_need_approval: number;
  price_table: string;
  // Change to proper type if possible
  product: {
    amount: number;
    category_id: number;
    code: string;
    created_at: string;
    deleted_at: string | null;
    dsh_dso: string;
    id: number;
    image: string;
    name: string;
    status: number;
    status_obsolete: number;
    unity: string;
    updated_at: string;
  };
  product_code: string;
  product_id: number;
  quantity: number;
  quantity_mix: number;
  quantity_order: number;
  sale_unity: string;
  sale_unity_order: string;
  status: null | any;
  total_price: string;
  unity_price: string;
  updated_at: string;
};

export async function getOrderById(id: string) {
  const response = await api.get<Order>(`/v2/orders/detail/${id}`);
  return response.data.order;
}
