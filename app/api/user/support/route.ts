import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const dbConnect = await pool.getConnection();
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    const {issue_title, description} = await req.json();
    try {
        await dbConnect.query(`
            INSERT INTO support_issues (user_id, issue_title, issue_description) VALUES
            (?, ?, ?)`,
            [session.user.id, issue_title, description]
        )
        return NextResponse.json({ success: true, message: "Support issue created" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } finally {
        dbConnect.release();
    }
}