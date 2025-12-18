import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface jerseyPrice extends RowDataPacket{
    price: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error:"Unauthorized" }, { status: 401 });

  const { jersey_id, size, quantity, division, address, phone } = await req.json();

  const dbConnect = await pool.getConnection();

  try {
    const [rows] = await dbConnect.query<jerseyPrice[]>(
      "SELECT price FROM jersey_table WHERE jersey_id = ?",
      [jersey_id]
    );

    if (!rows.length) return NextResponse.json({ error: "Invalid jersey" }, { status: 400 });
    
    const totalAmount = rows[0].price * quantity;

    const [result] = await dbConnect.query<ResultSetHeader>(
        `INSERT INTO orders
        (user_id, jersey_id, size, quantity, division, address, phone, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [session.user.id, jersey_id, size, quantity, division, address, phone, totalAmount]
    );

    return NextResponse.json({ order_id: result.insertId, });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Create order failed" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
