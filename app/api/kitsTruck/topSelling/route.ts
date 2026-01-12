import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const result = await pool.query(
      "SELECT * FROM jerseys ORDER BY sold_quantity DESC LIMIT $1", [4]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch top selling" }, { status: 500 }
    );
  }
}
