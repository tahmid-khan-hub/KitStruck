"use server";
import pool from "@/lib/postgresql";
import bcrypt from "bcryptjs";

export const signUpUsers = async (payload: {
  name: string;
  email: string;
  password: string;
  photoURL: string;
}) => {
  const { name, email, password, photoURL } = payload;
  if (!email || !password) return { success: false, message: "Invalid data" };

  // checking user exist or not
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  // user exists
  if (existingUser.rows.length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // new user
  await pool.query(
    "INSERT INTO users (name, email, password, photoURL) VALUES ($1, $2, $3, $4)",
    [name, email, hashedPassword, photoURL]
  );

  return { success: true, message: "User registered successfully" };
};
