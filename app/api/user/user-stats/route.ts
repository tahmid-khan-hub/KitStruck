import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jerseysResult = await pool.query<{
      totaljerseys: string;
    }>(
      `
      SELECT COALESCE(SUM(oi.quantity), 0) AS totaljerseys
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.order_id
      WHERE o.user_id = $1;
      `,
      [Number(session.user.id)]
    );

    // total reviews
    const reviewsResult = await pool.query<{
      totalreviews: string;
    }>(
      `
      SELECT COUNT(*) AS totalreviews
      FROM reviews
      WHERE user_id = $1;
      `,
      [Number(session.user.id)]
    );

    const totalJerseys = Number(jerseysResult.rows[0].totaljerseys);
    const totalReviews = Number(reviewsResult.rows[0].totalreviews);

    return NextResponse.json({
      totalJerseys,
      totalReviews,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
