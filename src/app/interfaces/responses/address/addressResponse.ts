import { UserResponse } from "../user/userResponse";

export interface AddressResponse{
    id: string,
    active: boolean,
    user: UserResponse,
    cep: string,
    city: string,
    state: string,
    district: string,
    street: string,
    number: number,
    complement: string,
    phone_number: string,
    created_at: Date,
    updated_at: Date,
}
