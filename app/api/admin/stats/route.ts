import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { Jersey } from "@/types/jersey";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbConnect = await pool.getConnection();

    try {
        const [ jerseyRows ] = await dbConnect.query<Jersey[]>(`SELECT COUNT(*) AS totalJerseys FROM jersey_table`);
        const totalJerseys = jerseyRows[0].totalJerseys;

        const [ totalUsers ] = await dbConnect.query(`SELECT COUNT(*) AS totalUsers FROM users`);
        const [ totalEarned ] = await dbConnect.query(`SELECT SUM(amount) AS totalEarned FROM payments`);

        return NextResponse.json({
            totalJerseys, totalUsers, totalEarned: totalEarned || 0
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}