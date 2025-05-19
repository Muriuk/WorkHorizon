import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { executeQuery } from "@/lib/db";

async function getUser(email: string) {
  try {
    // Using the DB utility instead of fetch for internal API calls
    const data = await executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { type: 'string' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const credentialsFromLoginForm = z.object({
          email: z.string(),
          password: z.string(),
        }).safeParse(credentials);
      
        if (!credentialsFromLoginForm.success) {
          throw new Error("Invalid input format");
        }
      
        const { email, password } = credentialsFromLoginForm.data;
        // console.log("Attempting login with email:", email);
      
        try {
          let user = await getUser(email);
          // console.log("User from DB:", user);
      
          if (!user) {
            throw new Error("User not found");
          }
      
          if (password !== user.password) {
            console.log("Invalid password");
            throw new Error("Invalid password");
          }
          
          if (!user.is_verified) {
            throw new Error("Email not verified");
          }
      
          return {
            status: "success",
            id: user.id,
            name: user.name,
            email: user.email,
            worker_category: user.worker_category,
            is_verified: user.is_verified
          };
          
        } catch (error) {
          console.error("Authentication error from Auth.ts");
          throw error;
        }
      }
    })
  ]
});
