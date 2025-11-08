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
  if (!email || !password) return null;

  const db = await pool;

  // checking user exist or not
  const [existingUser] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  // user exists
  if ((existingUser as any[]).length > 0) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // new user
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, photoURL]
  );

  return result;
};
