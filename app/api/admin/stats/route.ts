import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jerseyRows = await pool.query<{
      totaljerseys: string;
    }>(`
      SELECT COALESCE(SUM(oi.quantity), 0) AS totaljerseys
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.order_id
    `);

    const userRows = await pool.query<{
      totalusers: string;
    }>(`
      SELECT COUNT(*) AS totalusers FROM users
    `);

    const earnedRows = await pool.query<{
      totalearned: string;
    }>(`
      SELECT COALESCE(SUM(amount), 0) AS totalearned FROM payments
    `);

    const reviewRows = await pool.query<{
      totalreviews: string;
    }>(`
      SELECT COUNT(*) AS totalreviews FROM reviews
    `);

    const totalJerseys = Number(jerseyRows.rows[0].totaljerseys);
    const totalUsers = Number(userRows.rows[0].totalusers);
    const totalEarned = Number(earnedRows.rows[0].totalearned);
    const totalReviews = Number(reviewRows.rows[0].totalreviews);

    return NextResponse.json({
      totalJerseys,
      totalUsers,
      totalEarned,
      totalReviews,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
