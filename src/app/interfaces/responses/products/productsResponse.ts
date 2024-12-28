import { UserResponse } from "../user/userResponse"

export interface ProductsResponse{
    id: string,
    name: string,
    amount: number,
    category: string,
    description: string,
    image_url: string,
    price: number 
    slug: string,
    status : boolean,
    user: UserResponse
}
