import { ProductsResponse } from "../products/productsResponse"

export interface ShoppingResponse {
    id: string;
    created_at: Date; 
    payment_status: boolean;
    quantity_products: number;
    slug: string;
    status: boolean;
    value: number;
    shipping_value: number;
    cancelled: boolean;
    updated_at: Date
    user: string;
    product: ProductsResponse
}
