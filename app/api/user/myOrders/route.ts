import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ordersRow } from "@/types/ordersType";
interface CountRow {
  total: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = (page - 1) * limit;

  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json([], { status: 200 });

  try {
    const countRows = await pool.query<CountRow>(
      `SELECT COUNT(DISTINCT o.order_id) AS total
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.order_id
      WHERE o.user_id = $1`,
      [Number(session.user.id)]
    );

    const total = countRows.rows[0]?.total ?? 0;

    const rawRows = await pool.query<ordersRow>(
      `SELECT
        o.payment_intent_id, o.total_amount, o.delivery_status, o.created_at, o.address, o.payment_status,
        oi.quantity, oi.size,
        j.jersey_id, j.name, j.team, j.image_url, 
        j.category, j.price
        FROM orders o 
        JOIN order_items oi ON oi.order_id = o.order_id
        JOIN jerseys j ON oi.jersey_id = j.jersey_id
        WHERE o.user_id = $1
        ORDER BY o.created_at DESC
        LIMIT $2 OFFSET $3`, [Number(session.user.id), limit, offset] );

    const formatted = rawRows.rows.map((row) => ({
      payment_intent_id: row.payment_intent_id,
      total_amount: row.total_amount,
      delivery_status: row.delivery_status,
      payment_status: row.payment_status,
      created_at: row.created_at,
      quantity: row.quantity,
      size: row.size,
      address: row.address,

      jerseyData: {
        jersey_id: row.jersey_id,
        name: row.name,
        team: row.team,
        image_url: row.image_url,
        category: row.category,
        price: row.price,
      },
    }));

    return NextResponse.json({ data: formatted, page, limit, total, totalPages: Math.ceil(total / limit), });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  } 
}