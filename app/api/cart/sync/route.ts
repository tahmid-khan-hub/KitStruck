import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Not logged in" }, { status: 401 });
        }
        const userId = session.user.id;
        const dbConnect = await pool.getConnection();
        const {cartItems} = await req.json();

        // insert cart item to db
        for(const item of cartItems){
            await dbConnect.query(
                `INSERT INTO cart_table (user_id, jersey_id, quantity)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
                [userId, item.jersey_id, item.quantity, item.quantity]
            )
        }
        dbConnect.release();
        return NextResponse.json({ message: "Cart synced successfully" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}