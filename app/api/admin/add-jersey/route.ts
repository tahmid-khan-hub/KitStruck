import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { jerseyData } = await req.json();
    const dbConnect = await pool.getConnection();
    
    try {
        await dbConnect.query(
            `INSERT INTO jersey_table (name, team, category, price, image_url, description, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [jerseyData.name, jerseyData.team, jerseyData.category, jerseyData.price, jerseyData.image_url, jerseyData.description, jerseyData.stock]
        )
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}