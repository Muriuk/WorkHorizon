import { executeQuery } from "@/lib/db";

export async function getUserById(userId: number) {
  const result = await executeQuery("SELECT * FROM users WHERE id = ?", [userId]);

  const user = Array.isArray(result) ? result[0] : null;

  return user ?? null;
}
