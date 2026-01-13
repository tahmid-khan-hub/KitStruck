import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./postgresql";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

interface DBUser {
  id: number;
  name: string;
  email: string;
  password: string;
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

        const result = await pool.query<DBUser>(
          "SELECT * FROM users WHERE email = $1",
          [credentials.email]
        );

        if (result.rows.length === 0) throw new Error("No user found");

        const user = result.rows[0];
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
        const result = await pool.query<DBUser>(
          "SELECT * FROM users WHERE email = $1",
          [user?.email]
        );

        if (result.rows.length === 0) {
          await pool.query(
            "INSERT INTO users (name, email, photoURL, role) VALUES ($1, $2, $3, $4)",
            [user.name, user.email, user.image, "user"]
          );
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token }) {
      if (token.email) {
        const result = await pool.query("SELECT id, role FROM users WHERE email = $1", [ token.email,]);

        const dbUser = result.rows as { id: number; role: string }[];

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
