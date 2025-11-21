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

  await fetch(process.env.INTERNAL_MESSAGES_POST_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    body: JSON.stringify({ message }),
  });

  return { success: true };
}
