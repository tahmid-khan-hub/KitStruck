import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
   { params }: { params: { id: string } }
) {
  try {
    const p  = await params;
    const jerseyID = p.id;

    const result = await pool.query(
      "SELECT * FROM jerseys WHERE jersey_id = $1",
      [jerseyID]
    ); 

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Jersey not found" },
        { status: 404 }
      );
    }

    return NextResponse.json( { success: true, data: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch the jersey" }, { status: 500 }
    );
  }
}
