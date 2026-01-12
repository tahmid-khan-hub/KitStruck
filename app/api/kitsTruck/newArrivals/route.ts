import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM jerseys ORDER BY created_at DESC LIMIT $1", [4]);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json(
      { message: "Failed to fetch new arrivals" }, { status: 500 }
    );
  }
}
