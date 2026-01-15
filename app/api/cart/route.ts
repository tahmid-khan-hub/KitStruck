import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if(!session) return Response.json([]);
    try {
        const result = await pool.query(
            `SELECT c.cart_id,
            j.jersey_id, j.name, j.team, j.image_url, j.category, 
            j.price, j.description, j.stock, j.sold_quantity, j.offer
            FROM cart c
            JOIN jerseys j
            ON c.jersey_id = j.jersey_id
            WHERE c.user_id = $1`,
            [session?.user?.id]
        )
        return Response.json(result.rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } 
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    const { jersey_id } = await req.json();
    try {
        await pool.query(
            `DELETE FROM cart WHERE user_id = $1 AND jersey_id = $2`,
            [session.user.id, jersey_id]
        )
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } 
}