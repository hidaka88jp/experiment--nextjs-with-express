"use server";

import { cookies } from "next/headers";

export async function updateMessageAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const raw = formData.get("message");

  // --- Validation ---
  if (!Number.isFinite(id) || id <= 0) {
    return { error: "Invalid message id" };
  }

  if (typeof raw !== "string") {
    return { error: "Invalid message format" };
  }

  const message = raw;

  if (message.trim().length === 0) {
    return { error: "Message cannot be empty" };
  }

  if (message.length > 500) {
    return { error: "Message too long (max 500)" };
  }

  // --- Authentication ---
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${process.env.INTERNAL_MESSAGES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    let errorMessage = "Failed to update message";

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

  // Do not use redirect here; let the client handle it
}
