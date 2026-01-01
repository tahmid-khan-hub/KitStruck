import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    const dbConnect = await pool.getConnection();
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    try {
        const [rows] = await dbConnect.query(`
        SELECT *
        FROM support_issues
        ORDER BY 
        CASE 
            WHEN admin_reply IS NULL THEN 0 
            ELSE 1 
        END,
        created_at DESC
  `,
            [session.user.id]
        )
        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } finally {
        dbConnect.release();
    }
}

export async function PATCH(req:Request) {
    const dbConnect = await pool.getConnection();
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    const {issue_id, admin_reply} = await req.json();
    try {
        await dbConnect.query(`
            UPDATE support_issues SET admin_reply = ? WHERE issue_id = ?`,
            [admin_reply, issue_id]
        )
        return NextResponse.json({ success: true, message: "Support issue replied" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } finally {
        dbConnect.release();
    }
}
