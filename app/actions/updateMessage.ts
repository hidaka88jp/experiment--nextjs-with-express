"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateMessageAction(messageId: number, newMessage: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(
    `${process.env.INTERNAL_MESSAGES_URL}/${messageId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value, // To send authentication token to Express API
      },
      body: JSON.stringify({ message: newMessage }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update message");
  }

  redirect("/dashboard");
}
