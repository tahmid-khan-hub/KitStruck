import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/postgresql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface order {
  total_amount: number;
  payment_status: "Cash On Delivery" | "Paid";
}

interface RequestBody {
  order_id: number;
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user || session?.user?.role === "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: RequestBody = await req.json();
    const {order_id} = body;

    try {
        const result = await pool.query<order>(
            "SELECT total_amount, payment_status FROM orders WHERE order_id = $1 AND user_id = $2", [order_id, Number(session.user.id)]
        );

        if (!result.rows.length) {
            return NextResponse.json({ error: "Invalid order" }, { status: 400 });
        }

        const totalAmount = Number(result.rows[0].total_amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // convert to cents
            currency: "usd",
            metadata: { 
                order_id: Number(order_id), 
                user_id: Number(session.user.id )
            },
        });

        await pool.query( "UPDATE orders SET payment_intent_id = $1, payment_status = $2 WHERE order_id = $3 AND user_id = $4", [paymentIntent.id, "paid", order_id, Number(session.user.id)] );
        return NextResponse.json({ clientSecret: paymentIntent.client_secret, });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "payment-intent failed" }, { status: 500 });
    } 
}