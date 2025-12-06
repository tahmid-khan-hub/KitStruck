import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const offset = (page - 1) * limit;

    const session = await getServerSession(authOptions);
    const dbConnect = await pool.getConnection();

    if (!session) return NextResponse.json([], { status: 200 });

    try {
        // get total orders count
        const [row] = await dbConnect.query<CountRow[]>(
            `SELECT COUNT(*) AS total FROM payments WHERE user_id = ?`,
            [session.user.id]
        );

        const total = row[0].total;

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
            LIMIT ? OFFSET ?`,
            [session.user.id, limit, offset]
        );

        return NextResponse.json({
            data: rows,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}