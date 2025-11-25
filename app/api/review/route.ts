import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    const dbConnect = await pool.getConnection();
    try {
        const [rows] = await dbConnect.query(
            "SELECT * FROM review LIMIT 5"
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching review", error);
        return NextResponse.json(
        { message: "Failed to fetch new arrivals" }, { status: 500 }
        );
    } finally {
        dbConnect.release();
    }
}