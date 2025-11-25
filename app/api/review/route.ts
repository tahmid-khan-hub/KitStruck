import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const dbConnect = await pool.getConnection();
  try {
    const [rows] = await dbConnect.query("SELECT * FROM review LIMIT 5");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching review", error);
    return NextResponse.json(
      { message: "Failed to fetch new arrivals" },
      { status: 500 }
    );
  } finally {
    dbConnect.release();
  }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return { success: false, message: "User not logged in" };
    }
    const user = session.user;

    const { rating, review } =
    await req.json();

    const dbConnect = await pool.getConnection();
    try {
        await dbConnect.query(
        `INSERT INTO review 
        (user_id, reviewer_name, reviewer_email, rating, comment)
         VALUES
        (?, ?, ?, ?, ?)`,
        [user.id, user.name, user.email, rating, review]
        );
    } catch (error) {
        console.error("Review submission error:", error);
        return { success: false, message: "Server error" };
    } finally {
        dbConnect.release();
    }
}
