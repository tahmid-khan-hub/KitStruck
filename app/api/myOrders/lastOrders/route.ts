import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json( { success: false, message: "Unauthorized" }, { status: 401 } );

    const dbConnect = await pool.getConnection();
    try {
        const [rows] = await dbConnect.query(
        `SELECT
            o.payment_intent_id, o.total_amount, o.status, o.created_at,
            o.quantity,  
            j.jersey_id, j.name, j.team, j.image_url, 
            j.category, j.price
            FROM orders o JOIN jersey_table j
            ON o.jersey_id = j.jersey_id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
            LIMIT 3`, [session.user.id] )
            
        return NextResponse.json({ success: true, data: rows });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}