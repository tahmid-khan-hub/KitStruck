import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CartItem {
  jersey_id: number;
  quantity?: number;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { items } = await req.json();

  // handle single jersey_id case for backward compatibility
  let cartItems: CartItem[] = [];
  if (Array.isArray(items)) cartItems = items;
  else if (items && "jersey_id" in items)  cartItems = [items];
  
  if (cartItems.length === 0) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  
  try {
    for (const item of cartItems) {
      if (!item.jersey_id) continue;

      const result = await pool.query(
        `
        SELECT cart_id
        FROM cart
        WHERE user_id = $1 AND jersey_id = $2
        `,
        [session.user.id, item.jersey_id]
      );

      if (result.rows.length === 0) {
        await pool.query(
          `
          INSERT INTO cart (user_id, jersey_id)
          VALUES ($1, $2)
          `,
          [session.user.id, item.jersey_id]
        );
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  } 
}
