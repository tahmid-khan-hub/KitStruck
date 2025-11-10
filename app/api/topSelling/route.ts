import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbConnect = await pool.getConnection();

    const [rows] = await dbConnect.query(
      "SELECT * FROM jerseys ORDER BY sells_quantity DESC LIMIT 3"
    );

    dbConnect.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch top selling" }, { status: 500 }
    );
  }
}
