import pool from "@/lib/mysql";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {name, email, password, photoURL} = await req.json();

        const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", email);

        if((existing as any[]). length > 0){
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        const BcryptedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (name, email, password, photoURL) values (?, ?, ?, ?)",
            [name, email, BcryptedPassword, photoURL]
        );

        return NextResponse.json({ message: "User created successfully" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Registration failed" }, { status: 500 });
    }
}