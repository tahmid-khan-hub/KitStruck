import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();
  const dbConnect = await pool.getConnection();

  try {
    for (const item of items) {
      await dbConnect.query(
        `
        INSERT INTO cart_table (user_id, jersey_id)
        VALUES (?, ?)
        `,
        [session.user.id, item.jersey_id]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
