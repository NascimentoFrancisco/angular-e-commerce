import { ProductsResponse } from "../products/productsResponse";

export interface ShoppingCartResponse{
    id: string,
    user: string,
    status: boolean;
    product: ProductsResponse
}