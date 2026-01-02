import { Jersey } from "./jersey";

export interface orders {
    payment_intent_id: string;
    user_id: string;
    total_amount: number;
    status: string;
    created_at: string;
    jersey_id: number;
    quantity: number;
    size: string;
    address: string,
    delivery_status: string;
    jerseyData?: Jersey;
}