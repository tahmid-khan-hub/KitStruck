import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountJerseys {
  totalJerseys: string;
}
interface CountUsers {
  totalUsers: string;
}
interface SumEarned {
    totalEarned: string;
}
interface CountReviews {
    totalReviews: string;
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const jerseyRows = await pool.query<CountJerseys>(`SELECT COUNT(*) AS totalJerseys FROM jerseys`);

        const userRows = await pool.query<CountUsers>(`SELECT COUNT(*) AS totalUsers FROM users`);

        const earnedRows = await pool.query<SumEarned>(`SELECT SUM(amount) AS totalEarned FROM payments`);

        const userReviews = await pool.query<CountReviews>(`SELECT COUNT(*) AS totalReviews FROM reviews`);

        return NextResponse.json({
            totalJerseys: Number(jerseyRows.rows[0].totalJerseys ?? 0), 
            totalUsers: Number(userRows.rows[0].totalUsers ?? 0), 
            totalEarned: Number(earnedRows.rows[0].totalEarned ?? 0),
            totalReviews: Number( userReviews.rows[0].totalReviews ?? 0)
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } 
}