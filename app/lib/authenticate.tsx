'use server'
import { signIn } from "@/auth";

export async function authentication(formData: FormData) {
  try {
    const data: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const result = await signIn('credentials', {
      redirect: false,
      ...data,
    });

    if (result?.error) {
      if (result.error === 'Invalid password') {
        return { error: 'From Auth Invalid password' };
      } else if (result.error === 'User not found') {
        return { error: 'From Auth User not found' };
      }
      return { error: "Authentication failed" };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Authentication error On Authentication.tsx');
    if (error instanceof Error) {
      return { error: error.message || 'Authentication failed' };
    }
    return { error: 'Authentication failed' };
  }
}
