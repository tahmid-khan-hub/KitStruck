import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbConnect = await pool.getConnection();

    const [rows] = await dbConnect.query(
      `SELECT * FROM jersey_table WHERE category = "retro" ORDER BY sells_quantity DESC LIMIT 6`
    );

    dbConnect.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch retro collections" }, { status: 500 }
    );
  }
}
