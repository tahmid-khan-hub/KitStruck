import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountJerseysBought {
    totalJerseys: string;
}

interface CountReviews {
    totalReviews: string;
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "user")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const jerseyRows = await pool.query<CountJerseysBought>(`SELECT COUNT(*) AS totalJerseys FROM orders WHERE user_id = $1`, [session?.user?.id]);

        const userReviews = await pool.query<CountReviews>(`SELECT COUNT(*) AS totalReviews FROM reviews WHERE user_id = $1`, [session?.user?.id]);


        return NextResponse.json({
            totalJerseys: Number(jerseyRows.rows[0]?.totalJerseys ?? 0),
            totalReviews: Number(userReviews.rows[0]?.totalReviews ?? 0),
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}