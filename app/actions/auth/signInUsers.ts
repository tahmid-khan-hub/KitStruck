"use server";
import pool from "@/lib/postgresql";
import { DBUser } from "@/types/db";
import bcrypt from "bcryptjs";

export const signInUsers = async(payload: {email: string; password: string;
}) =>{
    const {email, password} = payload;
    if (!email || !password) return { success: false, message: "Invalid data" };

    const result = await pool.query<DBUser>(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if(result.rows.length === 0){
        return { success: false, message: "No user exists" };
    }

    // password checking
    const user = result.rows[0];
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
        return { success: false, message: "Invalid password" };
    }

    return { success: true, message: "User sign in successfully" };
}