export interface ShoppingRequest {
    product: string;
    quantity_products: number;
    status: boolean;
    value: number;
    shipping_value: number;
    cancelled: boolean;
    payment_status: boolean;
    address?: string;
}
