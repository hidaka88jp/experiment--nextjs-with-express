"use server";

import { cookies } from "next/headers";

export async function postMessageAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) return { error: "Not authenticated" };

  const message = formData.get("message");

  const res = await fetch(process.env.INTERNAL_MESSAGES_POST_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    return { error: "Failed to post message" };
  }

  return { success: true };
}
