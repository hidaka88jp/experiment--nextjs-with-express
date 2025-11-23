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

  if (!token) return []; // unlogined
  const res = await fetch(process.env.INTERNAL_MESSAGES_USER_URL!, {
    method: "GET",
    headers: {
      Authorization: token.value,
    },
    cache: "no-store", // set to SSR
  });

  if (!res.ok) return [];

  return res.json();
}
