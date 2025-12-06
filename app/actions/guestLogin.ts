"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function guestLoginAction() {
  const name = process.env.GUEST_NAME;
  const pass = process.env.GUEST_PASS;

  // Check if guest credentials are set
  if (!name || !pass) {
    throw new Error("Guest credentials are not configured");
  }

  // To login as guest
  const res = await fetch(process.env.INTERNAL_LOGIN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password: pass }),
  });

  if (!res.ok) {
    throw new Error("Guest login failed");
  }

  const { session_token } = await res.json();

  // Save the session token in cookies
  const cookieStore = await cookies();
  cookieStore.set("session_token", session_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  redirect("/");
}
