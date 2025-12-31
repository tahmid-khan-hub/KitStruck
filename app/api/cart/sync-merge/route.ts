import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { items} = await req.json();
  const dbConnect = await pool.getConnection();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: "Invalid items" }, { status: 400 });
  
  try {
    for (const item of items) {
      if (!item.jersey_id) continue;

      const [rows] = await dbConnect.query<RowDataPacket[]>(
        `
        SELECT cart_id
        FROM cart_table
        WHERE user_id = ? AND jersey_id = ?
        `,
        [session.user.id, item.jersey_id]
      );

      if (rows.length === 0) {
        await dbConnect.query<ResultSetHeader>(
          `
          INSERT INTO cart_table (user_id, jersey_id)
          VALUES (?, ?)
          `,
          [session.user.id, item.jersey_id]
        );
      } 
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  } finally {
    dbConnect.release();
  }
}
