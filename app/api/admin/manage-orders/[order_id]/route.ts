import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { order_id: number  } }) {

    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({error: "Invalid user"})

    const paramsId = await params
    const orderId = paramsId.order_id;
    const body = await req.json();
    const { delivery_status } = body;

    if(!orderId) return NextResponse.json({error: "Order id not found!" })

    if (!delivery_status) return NextResponse.json( { error: "Status is required" },{ status: 400 });

    try {
        await pool.query(
            `UPDATE orders SET delivery_status = $1 WHERE order_id = $2`,
            [delivery_status, orderId]
        )

        return NextResponse.json( { message: "Order updated successfully" },{ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    } 
}