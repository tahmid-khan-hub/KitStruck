import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2";

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
  
  const dbConnect = await pool.getConnection();

  try {
    for (const item of cartItems) {
      if (!item.jersey_id) continue;

      const [rows] = await dbConnect.query<RowDataPacket[]>(
        `
        SELECT cart_id
        FROM cart_table
        WHERE user_id = ? AND jersey_id = ?
        `,
        [session.user.id, item.jersey_id]
      );

      if (rows.length === 0) {
        await dbConnect.query<ResultSetHeader>(
          `
          INSERT INTO cart_table (user_id, jersey_id)
          VALUES (?, ?)
          `,
          [session.user.id, item.jersey_id]
        );
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
