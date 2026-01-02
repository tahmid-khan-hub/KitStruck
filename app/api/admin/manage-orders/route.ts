import pool from "@/lib/mysql";
import { ordersRow } from "@/types/ordersType";
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
        const [countRows] = await dbConnect.query<CountRow[]>( `SELECT COUNT(*) AS total FROM orders`);

        const total = countRows[0]?.total ?? 0;
        const [dataRows] = await dbConnect.query<ordersRow[]>(
            `SELECT o.payment_intent_id, o.total_amount, o.status, o.created_at, o.quantity, o.size, o.address, o.delivery_status, 
            j.jersey_id, j.name, j.team, j.image_url, j.category, j.price 
            FROM orders o JOIN jersey_table j 
            ON o.jersey_id = j.jersey_id
            ORDER BY o.created_at DESC
            LIMIT ? OFFSET ?`, [limit, offset])

        const formatted = dataRows.map((row) => ({
            payment_intent_id: row.payment_intent_id,
            total_amount: row.total_amount,
            status: row.status,
            created_at: row.created_at,
            quantity: row.quantity,
            size: row.size,
            address: row.address,
            delivery_status: row.delivery_status,

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