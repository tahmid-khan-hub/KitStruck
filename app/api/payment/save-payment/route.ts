import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session?.user?.role === "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { payment_id, amount, jersey_id, status, quantity } = body;
  const orderStatus = "pending";

  const dbConnect = await pool.getConnection();

  try {
    // save payment
    await dbConnect.query(
      `INSERT INTO payments (user_id, jersey_id, payment_id, amount, status, quantity, order_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [session.user.id, jersey_id, payment_id, amount, status, quantity, orderStatus]
    );

    // updated sells_quantity after payment
    await dbConnect.query(
      `UPDATE jersey_table
      SET sells_quantity = sells_quantity + ?
      WHERE jersey_id = ?`,
      [quantity, jersey_id]
    )

    return NextResponse.json({ success: true });
  } catch(error) {
    console.log(error);
    return NextResponse.json({ message: "save-payment failed" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
