import { cookies } from "next/headers";

export type Message = {
  id: number;
  message: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getUserMessages(): Promise<Message[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");

    if (!token) return []; // unlogged-in

    const res = await fetch(process.env.INTERNAL_MESSAGES_USER_URL!, {
      method: "GET",
      headers: {
        Authorization: token.value,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch user messages:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("getUserMessages error:", err);
    return [];
  }
}
