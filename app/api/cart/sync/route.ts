import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { jersey_id, guest_id } = await req.json();

  if (!session && !guest_id) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  const userId = session?.user?.id ?? null;

  if (!jersey_id) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const dbConnect = await pool.getConnection();

  try {
    await dbConnect.query(
      `
      INSERT INTO cart_table (user_id, jersey_id, guest_id)
      VALUES (?, ?, ?)
      `,
      [userId, jersey_id, guest_id || null]
    );

    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
