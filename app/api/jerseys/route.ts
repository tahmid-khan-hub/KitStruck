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
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "default";
    const offset = (page - 1) * limit;

    const dbConnect = await pool.getConnection();

    const [countRows] = await dbConnect.query<CountRow[] & RowDataPacket>(
      "SELECT COUNT(*) as total FROM jersey_table"
    );

    const total = countRows[0]?.total || 0;

    // sort
    let orderBy = "";
    if(sort == "price_asc") orderBy = "ORDER BY price";
    if(sort == "price_desc") orderBy = "ORDER BY price DESC";
    if(sort == "popularity") orderBy = "ORDER BY sells_quantity DESC";
    if(sort == "less_popularity") orderBy = "ORDER BY sells_quantity";

    const [rows] = await dbConnect.query<Jersey[] & RowDataPacket>(
      `SELECT * FROM jersey_table WHERE name LIKE ? ${orderBy} LIMIT ? OFFSET ?`,
      [`%${search}%`, limit, offset]
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
