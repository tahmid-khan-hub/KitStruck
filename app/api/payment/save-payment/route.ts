import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface OrderRowData {
  jersey_id: number;
  quantity: number;
  total_amount: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role === "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { order_id, payment_id, status } = await req.json();
  console.log(order_id, payment_id, status);

  try {
    const orders = await pool.query<OrderRowData>(
      `SELECT oi.jersey_id, oi.quantity, o.total_amount
       FROM orders o
       JOIN order_items oi 
       ON o.order_id = oi.order_id
       WHERE o.order_id = $1 AND o.user_id = $2`, 
       [order_id, Number(session.user.id)]
    );

    if (!orders.rows.length) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const totalAmount = orders.rows[0].total_amount;

    // Save payment
    await pool.query(
      `INSERT INTO payments
       (user_id, order_id, payment_id, amount, status)
       VALUES ($1, $2, $3, $4, $5)`, [ Number(session.user.id), order_id, payment_id, totalAmount, status ] );

    // Update order payment status
    await pool.query( `UPDATE orders SET payment_status = 'paid' WHERE order_id = $1`, [order_id]);

    // Update jersey sold quantities
    for (const order of orders.rows) {
      await pool.query(
        `UPDATE jerseys
         SET sold_quantity = sold_quantity + $1
         WHERE jersey_id = $2`,
        [order.quantity, order.jersey_id]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json( { error: "Save payment failed" }, { status: 500 } );
  }
}
