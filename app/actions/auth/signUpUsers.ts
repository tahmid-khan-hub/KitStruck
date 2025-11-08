"use server";
import pool from "@/lib/mysql";
import bcrypt from "bcryptjs";

export const signUpUsers = async (payload: {
  name: string;
  email: string;
  password: string;
  photoURL: string;
}) => {
  const { name, email, password, photoURL } = payload;
  if (!email || !password) return { success: false, message: "Invalid data" };

  const db = await pool;

  // checking user exist or not
  const [existingUser] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  // user exists
  if ((existingUser as any[]).length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // new user
  await db.execute(
    "INSERT INTO users (name, email, password, photoURL) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, photoURL]
  );

  return { success: true, message: "User registered successfully" };
};
