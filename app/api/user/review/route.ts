import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC ");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching review", error);
    return NextResponse.json(
      { message: "Failed to fetch review" },
      { status: 500 }
    );
  } 
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ success: false, message: "User not logged in" }, { status: 401 });
    }
    const user = session.user;

    const { rating, review } = await req.json();
    console.log(rating, review);

    try {
        await pool.query(
        `INSERT INTO reviews
        (user_id, reviewer_name, reviewer_email, reviewer_image, rating, comment)
         VALUES
        (?, ?, ?, ?, ?, ?)`,
        [user.id, user.name, user.email, user.image, rating, review]
        );
        return NextResponse.json(
          { success: true, message: "Review submitted successfully" }, { status: 201 }
        );
    } catch (error) {
        console.error("Review submission error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    } 
}
