import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // convert to cents
            currency: "usd",
            metadata: { user_id: session.user.id },
        });
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "payment-intent failed" }, { status: 500 });
    }
}