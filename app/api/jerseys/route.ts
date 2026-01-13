import pool from "@/lib/postgresql";
import { Jersey } from "@/types/jersey";
import { NextResponse } from "next/server";

interface CountRow {
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

    const countRows = await pool.query<CountRow>(
      "SELECT COUNT(*) as total FROM jerseys"
    );

    const total = countRows.rows[0]?.total || 0;

    // sort
    let orderBy = "";
    if(sort == "price_asc") orderBy = "ORDER BY price";
    if(sort == "price_desc") orderBy = "ORDER BY price DESC";
    if(sort == "popularity") orderBy = "ORDER BY sold_quantity DESC";
    if(sort == "less_popularity") orderBy = "ORDER BY sold_quantity";

    const result = await pool.query<Jersey>(
      `SELECT * FROM jerseys WHERE name LIKE $1 ${orderBy} LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );

    return NextResponse.json({
      data: result.rows,
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
