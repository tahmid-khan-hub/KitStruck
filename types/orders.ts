import { Jersey } from "./jersey";

export interface orders {
    payment_id: string;
    user_id: string;
    amount: number;
    status: string;
    payment_at: string;
    jersey_id: number;
    quantity: number;
    order_status: string;
    jerseyData?: Jersey;
}