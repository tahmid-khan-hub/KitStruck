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
            `SELECT c.cart_id, c.quantity,
            j.jersey_id, j.name, j.team, j.image_url, j.category, 
            j.price, j.description, j.sells_quantity
            FROM cart_table c
            JOIN jersey_table j
            ON c.jersey_id = j.jersey_id
            WHERE c.user_id = ?`,
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