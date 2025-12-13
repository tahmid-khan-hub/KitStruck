import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { Jersey } from "@/types/jersey";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jerseyId = searchParams.get("jerseyId");

    if (!jerseyId) {
      return NextResponse.json(
        { message: "Jersey ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbConnect = await pool.getConnection();

    try {
      const [rows] = await dbConnect.query<Jersey[]>(
        "SELECT * FROM jersey_table WHERE jersey_id = ?",
        [jerseyId]
      );

      if (!rows.length) {
        return NextResponse.json(
          { message: "Jersey not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(rows[0]);
    } finally {
      dbConnect.release();
    }

  } catch (error) {
    console.error("JERSEY FORM API ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
