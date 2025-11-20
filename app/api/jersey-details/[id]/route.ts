import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
   { params }: { params: { id: string } }
) {
  try {
    const p  = await params;
    const jerseyID = p.id;

    const dbConnect = await pool.getConnection();

    const [rows] = await dbConnect.query<RowDataPacket[]>(
      "SELECT * FROM jerseys WHERE jersey_id = ?",
      [jerseyID]
    ); 

    dbConnect.release();

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Jersey not found" },
        { status: 404 }
      );
    }

    return NextResponse.json( { success: true, data: rows[0] },
      { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch the jersey" }, { status: 500 }
    );
  }
}
