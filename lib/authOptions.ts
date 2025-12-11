import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./mysql";
import { RowDataPacket } from "mysql2";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

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
    async jwt({ token }) {
      if (token.email) {
        const db = await pool.getConnection();
        const [rows] = await db.query("SELECT id, role FROM users WHERE email = ?", [
          token.email,
        ]);
        db.release();

        const dbUser = rows as { id: number; role: string }[];

        if (dbUser.length > 0) {
          token.userId = dbUser[0].id;   // Always use DB id
          token.role = dbUser[0].role;  
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        if(token.userId) session.user.id = String(token.userId);
        if(token.role) session.user.role = token.role; 
      }
      if (!session.user.image || session.user.image.trim() === "") {
        session.user.image = null;
      }
      session.accessToken = await encode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
      });
      return session;
    },
  },
};
