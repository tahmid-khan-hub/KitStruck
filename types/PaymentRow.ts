import { RowDataPacket } from "mysql2";

export interface PaymentRow extends RowDataPacket {
  payment_id: string;
  amount: number;
  status: string;
  payment_at: string;
  quantity: number;
  order_status: string;

  jersey_id: number;
  name: string;
  team: string;
  image_url: string;
  category: string;
  price: number;
}
