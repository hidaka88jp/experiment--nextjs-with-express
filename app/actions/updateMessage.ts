"use server";

import { cookies } from "next/headers";

export async function updateMessageAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const message = formData.get("message") as string;

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  await fetch(`${process.env.INTERNAL_MESSAGES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    body: JSON.stringify({ message }),
  });

  // Do not use redirect here; let the client handle it
}
