import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { payment_id, amount, jersey_id, status } = body;

  const dbConnect = await pool.getConnection();

  try {
    await dbConnect.query(
      `INSERT INTO payments (user_id, jersey_id, payment_id, amount, status)
       VALUES (?, ?, ?, ?, ?)`,
      [session.user.id, jersey_id, payment_id, amount, status]
    );

    return NextResponse.json({ success: true });
  } catch(error) {
    console.log(error);
    return NextResponse.json({ message: "save-payment failed" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
