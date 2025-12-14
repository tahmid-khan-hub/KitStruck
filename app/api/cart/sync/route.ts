import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const userId = session.user.id;
  const { jersey_id, quantity } = await req.json();

  if (!jersey_id || !quantity) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const dbConnect = await pool.getConnection();

  try {
    await dbConnect.query(
      `
      INSERT INTO cart_table (user_id, jersey_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
      `,
      [userId, jersey_id, quantity, quantity]
    );

    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
