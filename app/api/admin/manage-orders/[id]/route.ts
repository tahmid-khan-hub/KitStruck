import pool from "@/lib/mysql";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const paymentId = await params;
    const id = paymentId.id;
    const body = await req.json();
    const { order_status } = body;

    if (!order_status) {
        return NextResponse.json(
            { error: "Status is required" },{ status: 400 }
        );
    }

    const dbConnect = await pool.getConnection();

    try {
        await dbConnect.query(
            `UPDATE payments SET order_status = ? WHERE payment_id = ?`,
            [order_status, id]
        )

        return NextResponse.json(
            { message: "Order updated successfully" },{ status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}