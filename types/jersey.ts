export interface Jersey {
  jersey_id: number;
  name: string;
  team: string;
  category: "club" | "national" | "retro";
  price: number;
  image_url: string;
  description?: string; 
  created_at: string;   
}