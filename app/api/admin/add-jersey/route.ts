import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { jerseyData } = await req.json();
    
    try {
        await pool.query(
            `INSERT INTO jerseys (name, team, category, price, image_url, description, stock)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [jerseyData.name, jerseyData.team, jerseyData.category, jerseyData.price, jerseyData.image_url, jerseyData.description, jerseyData.stock]
        )
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    } 
}