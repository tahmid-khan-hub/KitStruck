import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dbConnect = await pool.getConnection();
    const id = params.id;

    const [rows] = await dbConnect.query<RowDataPacket[]>(
      "SELECT * FROM jerseys WHERE jersey_id = ?",
      [id]
    ); 

    dbConnect.release();

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Jersey not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ jersey: rows[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch the jersey" }, { status: 500 }
    );
  }
}
