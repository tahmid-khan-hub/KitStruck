import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface totalRowsCount { total: number }

export async function GET(req: Request) { 
    const session = await getServerSession(authOptions); 
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });
    
    try { 
        const { searchParams } = new URL(req.url);
         const page = Number(searchParams.get("page") ?? 1); 
         const limit = Number(searchParams.get("limit") ?? 5); 
         const offset = (page - 1) * limit; 

        const countRows = await pool.query<totalRowsCount>(` SELECT COUNT(*) AS total FROM support_issues`);

        const totalItems = countRows.rows[0].total; 
        const totalPages = Math.ceil(totalItems / limit);

        const result = await pool.query(
            `SELECT * FROM support_issues ORDER BY 
            CASE 
            WHEN admin_reply IS NULL THEN 0 
            ELSE 1 
            END, 
            created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset] ); 
            
        return NextResponse.json({data: result.rows, page, totalPages, totalItems}); 
    } catch (error) { 
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" }); 
    } 
}

export async function PATCH(req:Request) {
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });

    const {issue_id, admin_reply} = await req.json();
    try {
        await pool.query(`
            UPDATE support_issues SET admin_reply = $1 WHERE issue_id = $2`,
            [admin_reply, issue_id]
        )
        return NextResponse.json({ success: true, message: "Support issue replied" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Server error" });
    } 
}
