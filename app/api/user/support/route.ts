import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    const {issue_title, description} = await req.json();
    try {
        await pool.query(`
            INSERT INTO support_issues (user_id, issue_title, issue_description) VALUES
            ($1, $2, $3)`,
            [session.user.id, issue_title, description]
        )
        return NextResponse.json({ success: true, message: "Support issue created" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } 
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    try {
        const result = await pool.query(`
            SELECT * FROM support_issues WHERE user_id = $1 ORDER BY created_at`,
            [session.user.id]
        )
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } 
}