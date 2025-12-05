// app/actions/postMessage.ts
"use server";

import { cookies } from "next/headers";

export async function postMessage(formData: FormData) {
  const message = formData.get("message");

  if (!message || typeof message !== "string") {
    return { error: "Message is required" };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) return { error: "Not authenticated" };

  const res = await fetch(process.env.INTERNAL_MESSAGES_POST_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    let errorMessage = "Failed to post message";

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
