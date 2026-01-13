import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const result = await pool.query(
            `SELECT * FROM users ORDER BY created_at DESC LIMIT 3`
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } 
}