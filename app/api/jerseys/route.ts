import pool from "@/lib/postgresql";
import { Jersey } from "@/types/jersey";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "default";
    const offset = (page - 1) * limit;

    // sorting
    let orderBy = "";
    if (sort === "price_asc") orderBy = "ORDER BY price ASC";
    if (sort === "price_desc") orderBy = "ORDER BY price DESC";
    if (sort === "popularity") orderBy = "ORDER BY sold_quantity DESC";
    if (sort === "less_popularity") orderBy = "ORDER BY sold_quantity ASC";

    // count with search
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM jerseys WHERE name ILIKE $1`,
      [`%${search}%`]
    );

    const total = Number(countResult.rows[0].count);

    // fetch data
    const result = await pool.query<Jersey>(
      `SELECT * FROM jerseys
       WHERE name ILIKE $1
       ${orderBy}
       LIMIT $2 OFFSET $3`,
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
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch all jerseys" },
      { status: 500 }
    );
  }
}
