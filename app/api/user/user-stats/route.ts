import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface CountJerseysBought extends RowDataPacket {
    totalJerseys: number;
}

interface CountReviews extends RowDataPacket {
    totalReviews: number;
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "user")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbConnect = await pool.getConnection();

    try {
        const [ jerseyRows ] = await dbConnect.query<CountJerseysBought[]>(`SELECT COUNT(*) AS totalJerseys FROM payments WHERE user_id = ?`, [session?.user?.id]);

        const [ userReviews ] = await dbConnect.query<CountReviews[]>(`SELECT COUNT(*) AS totalReviews FROM review WHERE user_id = ?`, [session?.user?.id]);


        return NextResponse.json({
            totalJerseys: jerseyRows[0].totalJerseys,
            totalReviews: userReviews[0].totalReviews
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}