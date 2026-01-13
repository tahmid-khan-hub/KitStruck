import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
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

    try {
      const result = await pool.query<Jersey>(
        "SELECT * FROM jerseys WHERE jersey_id = $1",
        [jerseyId]
      );

      if (!result.rows.length) {
        return NextResponse.json(
          { message: "Jersey not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result.rows[0]);
    } catch (error) {
      console.error("Jersey not found!", error)
      return NextResponse.json({message: "Jersey not found!"})
    }

  } catch (error) {
    console.error("JERSEY FORM API ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") { return NextResponse.json( { message: "Unauthorized" }, { status: 401 } );
    }

    const body = await req.json();
    const { jersey_id, name, team, price, description, image_url, stock, offer, category } = body;

    if (!jersey_id) { return NextResponse.json( { message: "Jersey ID is required" }, { status: 400 } );
    }

    try {
      await pool.query(`UPDATE jerseys SET name = $1, team = $2, price = $3, description = $4, image_url = $5, stock = $6, offer = $7, category = $8 WHERE jersey_id = $8 `,
        [ name, team, price, description, image_url, stock, offer, category, jersey_id, ] );

      return NextResponse.json({ message: "Jersey updated successfully" });
    } catch (error) {
      console.error("Jersey update failed!", error)
      return NextResponse.json({message: "Jersey update failed!"})
    }
  } catch (error) {
    console.error("UPDATE JERSEY ERROR:", error);
    return NextResponse.json( { message: "Internal Server Error" },{ status: 500 });
  }
}
