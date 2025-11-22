import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./mysql";
import { RowDataPacket } from "mysql2";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";

interface DBUser {
  id: number;
  name: string;
  email: string;
  photoURL: string | null;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null>{
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        const dbConnect = await pool.getConnection();
        const [rows] = await dbConnect.query<DBUser[] & RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );
        dbConnect.release();

        if (rows.length === 0) throw new Error("No user found");

        const user = rows[0];
        const isPassword = await bcrypt.compare(credentials.password, user.password!);
        if (!isPassword) throw new Error("Incorrect password");

        // saved to session
        return {
          id: user.id.toString(), 
          name: user.name,
          email: user.email,
          image: user.photoURL,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/sign-in", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const dbConnect = await pool.getConnection();

        const [rows] = await dbConnect.query<DBUser[] & RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [user?.email]
        );

        if (rows.length === 0) {
          await dbConnect.query(
            "INSERT INTO users (name, email, photoURL, role) VALUES (?, ?, ?, ?)",
            [user.name, user.email, user.image, "user"]
          );
        }

        dbConnect.release();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token}) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // token.sub is user id
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // store user id in token
      }
      return token;
    },
  },
};
