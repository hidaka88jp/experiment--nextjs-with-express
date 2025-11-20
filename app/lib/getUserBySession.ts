import { cookies } from "next/headers";

export async function getUserBySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (!token) return null; // 未ログイン

  // 1. token → userId の取得
  const validateRes = await fetch(
    `${process.env.INTERNAL_VALIDATE_URL}?token=${token.value}`,
    { cache: "no-store" }
  );

  if (!validateRes.ok) return null;

  const { userId } = await validateRes.json();

  // 2. userId → user 情報の取得
  const userRes = await fetch(`${process.env.INTERNAL_USER_URL}/${userId}`, {
    cache: "no-store",
  });

  if (!userRes.ok) return null;

  return userRes.json();
}
