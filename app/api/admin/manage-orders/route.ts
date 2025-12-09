import pool from "@/lib/mysql";
import { PaymentRow } from "@/types/PaymentRow";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

interface CountRow extends RowDataPacket {
  total: number;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const offset = (page - 1) * limit;
    const dbConnect = await pool.getConnection();
 
    try {
        const [countRows] = await dbConnect.query<CountRow[]>(
            `SELECT COUNT(*) AS total FROM payments`
        );
        const total = countRows[0]?.total ?? 0;
        const [dataRows] = await dbConnect.query<PaymentRow[]>(
            `SELECT p.payment_id, p.amount, p.status, p.payment_at,
            p.quantity, p.order_status, j.jersey_id, j.name, j.team, j.image_url, j.category, j.price 
            FROM payments p
            JOIN jersey_table j ON p.jersey_id = j.jersey_id
            ORDER BY p.payment_at DESC
            LIMIT ? OFFSET ?`,
            [limit, offset]
        )

        const formatted = dataRows.map((row) => ({
            payment_id: row.payment_id,
            amount: row.amount,
            status: row.status,
            payment_at: row.payment_at,
            quantity: row.quantity,
            order_status: row.order_status,

            jerseyData: {
                jersey_id: row.jersey_id,
                name: row.name,
                team: row.team,
                image_url: row.image_url,
                category: row.category,
                price: row.price,
            },
        }));
        return NextResponse.json({ data: formatted, page, limit, total, totalPages: Math.ceil(total / limit),
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}