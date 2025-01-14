export interface ShoppingRequest {
    product_id: string,
    quantity_products: number,
    status: boolean
    cancelled: boolean,
    payment_status: boolean
    address: string
}
