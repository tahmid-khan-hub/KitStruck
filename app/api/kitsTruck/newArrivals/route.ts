import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbConnect = await pool.getConnection();

    const [rows] = await dbConnect.query(
      "SELECT * FROM jersey_table ORDER BY created_at DESC LIMIT 3"
    );

    dbConnect.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json(
      { message: "Failed to fetch new arrivals" }, { status: 500 }
    );
  }
}
