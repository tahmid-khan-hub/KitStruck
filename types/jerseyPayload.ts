export interface jerseyPayload {
  jersey_id: number;
  name: string;
  team: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  offer: number | null;
  category: string;
}