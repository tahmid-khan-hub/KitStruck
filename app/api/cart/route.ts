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

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    const dbConnect = await pool.getConnection();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    const { jersey_id, quantity } = await req.json();
    try {
        await dbConnect.query(
            `UPDATE cart_table SET quantity = ? WHERE user_id = ?
            AND jersey_id = ?`,
            [quantity, session.user.id, jersey_id]
        )
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    const dbConnect = await pool.getConnection();
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    const { jersey_id } = await req.json();
    try {
        await dbConnect.query(
            `DELETE FROM cart_table WHERE user_id = ? AND jersey_id = ?`,
            [session.user.id, jersey_id]
        )
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}