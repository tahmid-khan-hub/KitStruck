import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    const dbConnect = await pool.getConnection();

    if(!session) return Response.json([]);
    try {
        const [rows] = await dbConnect.query(
            "SELECT * FROM cart_table WHERE user_id = ?",
            [session?.user?.id]
        )
        return Response.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}