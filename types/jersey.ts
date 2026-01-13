import { RowDataPacket } from "mysql2";

export interface Jersey extends RowDataPacket{
  jersey_id: number;
  name: string;
  team: string;
  category: "club" | "national" | "retro";
  price: number;
  image_url: string;
  description?: string; 
  created_at: string; 
  sold_quantity: number;  
  stock: number;
  offer: number;
}

export interface CartItem extends Jersey{
  quantity: number;
}