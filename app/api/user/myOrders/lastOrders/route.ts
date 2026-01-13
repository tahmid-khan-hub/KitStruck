import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json( { success: false, message: "Unauthorized" }, { status: 401 } );

    try {
        const result = await pool.query(
        `SELECT
            o.payment_intent_id, o.total_amount, o.delivery_status, o.created_at,
            oi.size, oi.price,
            j.jersey_id, j.name, j.team, j.image_url, 
            j.category, j.price
            FROM orders o JOIN order_items oi
            ON oi.order_id = o.order_id
            FROM order_items oi JOIN jersey_table j
            ON oi.jersey_id = j.jersey_id
            WHERE o.user_id = $1
            ORDER BY o.created_at DESC
            LIMIT 3`, [session.user.id] )
            
        return NextResponse.json({ success: true, data: result.rows });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } 
}