import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM jerseys WHERE category = $1 ORDER BY created_at DESC LIMIT $2`, ["retro", 4]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch retro collections" }, { status: 500 }
    );
  }
}
