
import { api } from '.';

interface Order {
    status: string;
    order: {
        id: number;
        visit_id: number;
        tree_id: number;
        actor_id: number;
        distributor_id: number;
        user_id: number;
        customer_id: number;
        date: string;
        number: number;
        type: string;
        status: string;
        total_value: string;
        payment_option_name: string;
        payment_option_id: number;
        payment_option_need_approval: number;
        payment_option_approved_by_user_id: number | null;
        payment_option_date_approval: string | null;
        order_comments: string | null;
        billing_comments: string;
        scheduled_order_date: string | null;
        remote_order_number: string;
        date_sync: string;
        date_send: string | null;
        date_billing: string | null;
        order_need_approval: number | null;
        order_approved_by_user_id: number | null;
        date_order_approval: string | null;
        order_approval_reason: string | null;
        cancelled_by_user_id: number | null;
        date_cancelled: string | null;
        date_change_status: string | null;
        related_to_order_id: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        order_products: OrderProduct[];
        total_quantity: number;
        total_quantity_mix: number;
        order_nfes_str: string;
        order_nfe_emitter_cnpj: any[]; // Change to proper type if possible
        visit: {
            id: number;
            tree_name: string;
            distributor_name: string;
            actor_name: string;
            customer_id: number;
            tree_id: number;
            distributor_id: number;
            actor_id: number;
            user_id: number;
            user_name: string;
            date_checkin: string;
            date_checkout: string;
            duration: number;
            distance: any; // Change to proper type if possible
            status: string;
            type: string;
            latitude: string;
            longitude: string;
            gps_accuracy: any; // Change to proper type if possible
            ignore_visit: number;
            not_sale_reason_id: number | null;
            visit_comments: string;
            date_sync: string;
            customer_latitude: string;
            customer_longitude: string;
            closed_customer_image: string | null;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
            visit_id: number | null;
        };
        customer: {
            id: number;
            contact_name: string;
            email: string;
            email_billing: string | null;
            social_name: string;
            fantasy_name: string;
            cnpj: string;
            ie: string;
            im: string;
            phone: string;
            avatar: string | null;
            status: string;
            situation: string;
            incentive: any; // Change to proper type if possible
            rating: string;
            comments: string;
            validated: number;
            address_id: number;
            segment_id: number;
            partner_id: any; // Change to proper type if possible
            flag_id: number;
            brand_id: number;
            customer_matrix_id: number;
            create_mode: string;
            update_mode: string;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
            address: {
                id: number;
                address: string;
                neighborhood: string;
                city: string;
                state: string;
                country: any; // Change to proper type if possible
                complement: string;
                zip: string;
                number: string;
                latitude: string;
                longitude: string;
                geo_update_mode: string;
                create_mode: string | null;
                update_mode: string;
                geo_confirmed: number;
                updated_by: string;
                created_at: string;
                updated_at: string;
                deleted_at: string | null;
            };
            segment: {
                id: number;
                name: string;
                created_at: string;
                updated_at: string;
                deleted_at: string | null;
            };
            partner: any; // Change to proper type if possible
            actor_tree_branch: {
                tree_branch_id: number;
                pivot: {
                    customer_id: number;
                    actor_id: number;
                    tree_id: number;
                };
            }[];
        };
        order_approvals: any[]; // Change to proper type if possible
        order_billing: {
            id: number;
            integration_name: string | null;
            integration_actor_id: number | null;
            order_id: number;
            status: string;
            params: any; // Change to proper type if possible
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        }[];
        user: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
            date_birth: string | null;
            phone: string | null;
            api_token: string;
            google_registration_id: string;
            status: number;
            user_type_id: number;
            main_dashboard_id: number;
            main_tree_actor_id: string;
            mobile_app: number;
            is_ranking: number;
            expiration_date: string | null;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
            password_reset_token: string | null;
        };
        user_cancel: null | any; // Change to proper type if possible
        order_nfes: any[]; // Change to proper type if possible
        order_integration: null | any; // Change to proper type if possible
    };
}

interface OrderProduct {
    id: number;
    order_id: number;
    product_id: number;
    product_code: string;
    unity_price: string;
    original_price: string;
    quantity: number;
    quantity_mix: number;
    total_price: string;
    price_table: string;
    sale_unity: string;
    quantity_order: number;
    sale_unity_order: string;
    price_need_approval: number;
    price_approved_by_user_id: number | null;
    price_date_approval: string | null;
    price_approval_reason: string | null;
    billing_to: string;
    energizer_send: null | any; // Change to proper type if possible
    comments: string | null;
    status: null | any; // Change to proper type if possible
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    nfe_product: any[]; // Change to proper type if possible
    product: {
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
}

export async function getOrderById(id: string) {
    const response = await api.get<Order>(`/v2/orders/detail/${id}`);
    return response.data.order;
}

