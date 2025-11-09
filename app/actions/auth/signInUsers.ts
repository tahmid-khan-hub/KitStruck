"use server";
import pool from "@/lib/mysql";
import { DBUser } from "@/types/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

export const signInUsers = async(payload: {email: string; password: string;
}) =>{
    const {email, password} = payload;
    if (!email || !password) return { success: false, message: "Invalid data" };

    const dbConnect = await pool.getConnection();

    const [rows] = await dbConnect.query<DBUser[] & RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    dbConnect.release();

    if(rows.length === 0){
        return { success: false, message: "No user exists" };
    }

    // password checking
    const user = rows[0];
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
        return { success: false, message: "Invalid password" };
    }

    return { success: true, message: "User sign in successfully" };
}