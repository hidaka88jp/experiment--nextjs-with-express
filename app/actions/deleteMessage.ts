"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteMessageAction(messageId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  // Access the backend API to delete the message
  const res = await fetch(
    `${process.env.INTERNAL_MESSAGES_URL}/${messageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token.value, // ← backend expects token in Authorization header
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete message");
  }

  // after deletion, redirect to dashboard
  redirect("/dashboard");
}
