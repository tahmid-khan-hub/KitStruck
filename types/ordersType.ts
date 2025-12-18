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