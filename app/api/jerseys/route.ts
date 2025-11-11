import pool from "@/lib/mysql";
import { Jersey } from "@/types/jersey";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const offset = (page - 1) * limit;

    const dbConnect = await pool.getConnection();

    const [countRows] = await dbConnect.query<CountRow[] & RowDataPacket>(
      "SELECT COUNT(*) as total FROM jerseys"
    );

    const total = countRows[0]?.total || 0;

    const [rows] = await dbConnect.query<Jersey[] & RowDataPacket>(
      "SELECT * FROM jerseys LIMIT ? OFFSET ?",
      [limit, offset]
    );

    dbConnect.release();

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch all jerseys" }, { status: 500 }
    );
  }
}
