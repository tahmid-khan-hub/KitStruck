import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CartRow extends RowDataPacket {
  cart_id: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { items, guest_id } = await req.json();
  const dbConnect = await pool.getConnection();

  if (!session && !guest_id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    for (const item of items) {
      /* check if guest row exists */
      const [guestRows] = await dbConnect.query<CartRow[]>(
        `
        SELECT cart_id
        FROM cart_table
        WHERE guest_id = ? AND jersey_id = ?
        `,
        [guest_id, item.jersey_id]
      );

      if (guestRows.length > 0) {
        /* Convert guest row → user row */
        await dbConnect.query<ResultSetHeader>(
          `
          UPDATE cart_table
          SET user_id = ?, guest_id = NULL
          WHERE cart_id = ?
          `,
          [session?.user.id, guestRows[0].cart_id]
        );
      } else {
        /* Check if user already has this jersey */
        const [userRows] = await dbConnect.query<CartRow[]>(
          `
          SELECT cart_id
          FROM cart_table
          WHERE user_id = ? AND jersey_id = ?
          `,
          [session?.user.id, item.jersey_id]
        );

        if (userRows.length === 0) {
          /* Insert new user cart row */
          await dbConnect.query<ResultSetHeader>(
            `
            INSERT INTO cart_table (user_id, jersey_id)
            VALUES (?, ?)
            `,
            [session?.user.id, item.jersey_id]
          );
        }
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
