import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface jerseyPrice {
  price: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error:"Unauthorized" }, { status: 401 });

  const { jersey_id, size, quantity, division, address, phone } = await req.json();

  try {
    const result = await pool.query<jerseyPrice>(
      "SELECT price FROM jerseys WHERE jersey_id = $1",
      [jersey_id]
    );

    if (!result.rows.length) return NextResponse.json({ error: "Invalid jersey" }, { status: 400 });
    
    const totalAmount = result.rows[0].price * quantity;

    const orderResult = await pool.query(
        `INSERT INTO orders
        (user_id, division, address, phone, total_amount, payment_status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING order_id`,
        [Number(session.user.id), division, address, phone, totalAmount, "cash_on_delivery"]
    );

    const order_id = orderResult.rows[0].order_id;
    const price = result.rows[0].price;

    await pool.query(
      `INSERT INTO order_items
      (order_id, jersey_id, size, quantity, price)
      VALUES ($1, $2, $3, $4, $5)`,
      [order_id, jersey_id, size, quantity, price]
    )

    return NextResponse.json({ success: true, order_id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Create order failed" }, { status: 500 });
  } 
}
