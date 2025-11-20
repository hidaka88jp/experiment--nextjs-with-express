import { cookies } from "next/headers";

export async function getUserMessages() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) return [];

  const res = await fetch(
    `${process.env.INTERNAL_MESSAGES_USER_URL}?token=${token.value}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}