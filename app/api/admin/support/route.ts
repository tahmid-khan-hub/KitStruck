import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface totalRowsCount extends RowDataPacket { total: number }

export async function GET(req: Request) { 
    const dbConnect = await pool.getConnection(); 
    const session = await getServerSession(authOptions); 
    if(!session?.user) return NextResponse.json({ success: false, message: "User not logged in" });
    
    try { 
        const { searchParams } = new URL(req.url);
         const page = Number(searchParams.get("page") ?? 1); 
         const limit = Number(searchParams.get("limit") ?? 5); 
         const offset = (page - 1) * limit; 

        const [countRows] = await dbConnect.query<totalRowsCount[]>(` SELECT COUNT(*) AS total FROM support_issues`);

        const totalItems = countRows[0].total; 
        const totalPages = Math.ceil(totalItems / limit);

        const [rows] = await dbConnect.query(
            `SELECT * FROM support_issues ORDER BY 
            CASE WHEN admin_reply IS NULL THEN 0 ELSE 1 END, 
            created_at DESC LIMIT ? OFFSET ? `,
        [limit, offset] ); 
            
        return NextResponse.json({data: rows, page, totalPages, totalItems}); 
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
