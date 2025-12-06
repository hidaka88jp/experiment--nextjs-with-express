import { cookies } from "next/headers";

export async function getUserBySession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");

    if (!token) return null; // unlogined

    // 1. token → userId
    const validateRes = await fetch(process.env.INTERNAL_VALIDATE_URL!, {
      method: "POST",
      headers: {
        Authorization: token.value,
      },
      cache: "no-store",
    });

    if (!validateRes.ok) return null;

    const { userId } = await validateRes.json();

    // 2. userId → user info
    const userRes = await fetch(`${process.env.INTERNAL_USER_URL}/${userId}`, {
      cache: "no-store",
    });

    if (!userRes.ok) return null;

    return userRes.json();
  } catch (err) {
    console.error("Error in getUserBySession:", err);
    return null;
  }
}
