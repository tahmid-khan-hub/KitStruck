import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface order extends RowDataPacket {
  total_amount: number;
  status: "draft" | "paid" | "cancelled";
}

interface RequestBody {
  order_id: number;
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session?.user?.role === "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbConnect = await pool.getConnection();
    const body: RequestBody = await req.json();
    const {order_id} = body;

    try {
        const [rows] = await dbConnect.query<order[]>(
            "SELECT total_amount, status FROM orders WHERE id = ? AND user_id = ?", [order_id, session.user.id]
        );

        if (!rows.length || rows[0].status !== "draft") {
            return NextResponse.json({ error: "Invalid order" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: rows[0].total_amount * 100, // convert to cents
            currency: "usd",
            metadata: { 
                order_id: String(order_id), 
                user_id: session.user.id 
            },
        });

        await dbConnect.query( "UPDATE orders SET payment_intent_id = ? WHERE id = ?", [paymentIntent.id, order_id] );
        return NextResponse.json({ clientSecret: paymentIntent.client_secret, });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "payment-intent failed" }, { status: 500 });
    } finally {
        dbConnect.release();
    }
}