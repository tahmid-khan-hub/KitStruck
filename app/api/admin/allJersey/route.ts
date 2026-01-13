import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { Jersey } from "@/types/jersey";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountRow {
  total: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") return NextResponse.json([], { status: 200 });
  
  try {
    const countRows = await pool.query<CountRow>(`SELECT COUNT(*) AS total FROM jerseys`);

    const total = countRows.rows[0]?.total ?? 0;

    const jerseyRows = await pool.query<Jersey>(
      `SELECT * FROM jerseys LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return NextResponse.json({
      data: jerseyRows.rows, page, limit, total, totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  } 
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json( { message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const jerseyId = searchParams.get("jerseyId");

    if (!jerseyId) return NextResponse.json( { message: "Jersey ID is required" }, { status: 400 } );

    try {
      await pool.query( "DELETE FROM jerseys WHERE jersey_id = $1", [jerseyId] );

      return NextResponse.json({
        message: "Jersey deleted successfully",
      });
    } catch (error) {
      console.error("Jersey deletion failed!", error);
      return NextResponse.json({message: "Jersey deletion failed!"})
    }
  } catch (error) {
    console.error("DELETE JERSEY ERROR:", error);
    return NextResponse.json( { message: "Internal Server Error" }, { status: 500 }
    );
  }
}

