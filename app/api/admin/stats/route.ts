import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountJerseys extends RowDataPacket {
  totalJerseys: number;
}
interface CountUsers extends RowDataPacket {
  totalUsers: number;
}
interface SumEarned extends RowDataPacket {
    totalEarned: number;
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbConnect = await pool.getConnection();

    try {
        const [ jerseyRows ] = await dbConnect.query<CountJerseys[]>(`SELECT COUNT(*) AS totalJerseys FROM jersey_table`);

        const [ userRows ] = await dbConnect.query<CountUsers[]>(`SELECT COUNT(*) AS totalUsers FROM users`);

        const [ earnedRows ] = await dbConnect.query<SumEarned[]>(`SELECT SUM(amount) AS totalEarned FROM payments`);


        return NextResponse.json({
            totalJerseys: jerseyRows[0].totalJerseys, totalUsers: userRows[0].totalUsers, totalEarned: earnedRows[0].totalEarned
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}