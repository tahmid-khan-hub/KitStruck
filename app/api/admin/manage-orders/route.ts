import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { ordersRow } from "@/types/ordersType";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountRow {
  total: string;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = (page - 1) * limit;

  try {
    const countRows = await pool.query<CountRow>(
      `SELECT COUNT(*) AS total FROM orders`,
    );

    const total = Number(countRows.rows[0].total);

    const dataRows = await pool.query<ordersRow>(
      `
      SELECT
        o.order_id, o.payment_intent_id, o.total_amount, o.delivery_status, o.payment_status, o.created_at, o.address,
        oi.quantity, oi.size,
        j.jersey_id, j.name, j.team, j.image_url, j.category, j.price
        FROM orders o
        JOIN order_items oi ON oi.order_id = o.order_id
        JOIN jerseys j ON oi.jersey_id = j.jersey_id
        ORDER BY o.created_at DESC
        LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    const formatted = dataRows.rows.map((row) => ({
      order_id: row.order_id,
      payment_intent_id: row.payment_intent_id,
      total_amount: row.total_amount,
      created_at: row.created_at,
      quantity: row.quantity,
      size: row.size,
      address: row.address,
      delivery_status: row.delivery_status,
      payment_status: row.payment_status,

      jerseyData: {
        jersey_id: row.jersey_id,
        name: row.name,
        team: row.team,
        image_url: row.image_url,
        category: row.category,
        price: row.price,
      },
    }));

    return NextResponse.json({
      data: formatted, page, limit, total, totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
