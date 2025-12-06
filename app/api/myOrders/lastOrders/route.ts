import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
        );
    }

    const dbConnect = await pool.getConnection();
    try {
        const [rows] = await dbConnect.query(
            `SELECT
            p.payment_id, p.amount, p.status, p.payment_at,
            p.quantity, p.order_status, 
            j.jersey_id, j.name, j.team, j.image_url, 
            j.category, j.price
            FROM payments p
            JOIN jersey_table j
            ON p.jersey_id = j.jersey_id
            WHERE p.user_id = ?
            ORDER BY p.payment_at DESC
            LIMIT 3`,
            [session.user.id]
        )
        return NextResponse.json({ success: true, data: rows });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}