import GoogleProvider from "next-auth/providers/google";
import pool from "./mysql";
import { RowDataPacket } from "mysql2";
import { User } from "next-auth";

interface DBUser {
  id: number;
  name: string;
  email: string;
  photoURL: string | null;
  role: string;
}

export const authOptions = {
  providers: [
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
  },
};
