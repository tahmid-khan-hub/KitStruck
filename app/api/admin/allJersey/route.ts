import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { Jersey } from "@/types/jersey";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const session = await getServerSession(authOptions);
  const dbConnect = await pool.getConnection();

  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const [countRows] = await dbConnect.query<CountRow[]>(`SELECT COUNT(*) AS total FROM jersey_table`);

    const total = countRows[0]?.total ?? 0;

    const [jerseyRows] = await dbConnect.query<Jersey[]>(
      `SELECT * FROM jersey_table LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return NextResponse.json({
      data: jerseyRows, page, limit, total, totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    dbConnect.release();
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

    if (!jerseyId) {
      return NextResponse.json( { message: "Jersey ID is required" }, { status: 400 } );
    }

    const dbConnect = await pool.getConnection();

    try {
      await dbConnect.query( "DELETE FROM jersey_table WHERE jersey_id = ?", [jerseyId] );

      return NextResponse.json({
        message: "Jersey deleted successfully",
      });
    } finally {
      dbConnect.release();
    }
  } catch (error) {
    console.error("DELETE JERSEY ERROR:", error);
    return NextResponse.json( { message: "Internal Server Error" }, { status: 500 }
    );
  }
}

