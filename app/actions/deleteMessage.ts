"use server";

import { cookies } from "next/headers";

export async function deleteMessageAction(
  messageId: number
): Promise<{ error?: string; success?: boolean }> {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  const res = await fetch(`${process.env.INTERNAL_MESSAGES_URL}/${messageId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (!res.ok) {
    let errorMessage = "Failed to delete message";

    try {
      const data = await res.json();
      if (data.error) {
        errorMessage = data.error;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    return { error: errorMessage };
  }

  return { success: true };
}
