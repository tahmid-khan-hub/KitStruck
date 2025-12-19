import { RowDataPacket } from "mysql2";

export interface ordersType extends RowDataPacket {
    order_id: number;
    user_id: string;
    jersey_id: number;
    size: string, 
    quantity: string,
    division: string,
    address: string,
    phone: string,
    total_amount: number;
}

export interface ordersRow extends RowDataPacket {
    payment_intent_id: string;
    total_amount: number;
    status: string;
    created_at: string;
    quantity: number;
    size: string;
    address: string,

    jersey_id: number;
    name: string;
    team: string;
    image_url: string;
    category: string;
    price: number;
}