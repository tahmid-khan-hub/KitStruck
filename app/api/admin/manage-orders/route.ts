import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    const dbConnect = await pool.getConnection();

    try {
        const [rows] = await dbConnect.query(
            `SELECT * FROM payments`
        )
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}