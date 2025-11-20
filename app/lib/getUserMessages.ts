import { cookies } from "next/headers";

export type Message = {
  id: number;
  message: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getUserMessages(): Promise<Message[]> {
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