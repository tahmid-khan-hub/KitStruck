import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface OrderRowData extends RowDataPacket {
  jersey_id: number;
  quantity: number;
  total_amount: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role === "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { order_id, payment_id, status } = await req.json();

  const dbConnect = await pool.getConnection();

  try {
    // Fetch order (SECURE)
    const [orders] = await dbConnect.query<OrderRowData[]>(
      `SELECT jersey_id, quantity, total_amount
       FROM orders
       WHERE order_id = ? AND user_id = ?`, [order_id, session.user.id]);

    if (!orders.length) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const order = orders[0];

    // Save payment
    await dbConnect.query<ResultSetHeader>(
      `INSERT INTO payments
       (user_id, order_id, payment_id, amount, status)
       VALUES (?, ?, ?, ?, ?)`, [ session.user.id, order_id, payment_id, order.total_amount, status ] );

    // Update order status
    await dbConnect.query( `UPDATE orders SET order_status = 'paid' WHERE order_id = ?`, [order_id]);

    // Update jersey sells_quantity
    await dbConnect.query( `UPDATE jersey_table SET sells_quantity = sells_quantity + ? WHERE jersey_id = ?`, [order.quantity, order.jersey_id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json( { error: "Save payment failed" }, { status: 500 } );
  } finally {
    dbConnect.release();
  }
}
